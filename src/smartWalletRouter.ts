import { ChainId, TradeType } from "@pancakeswap/sdk";
import { SmartRouter, SmartRouterTrade } from "@pancakeswap/smart-router";
import { MethodParameters } from "@pancakeswap/v3-sdk";
import invariant from "tiny-invariant";
import { Address, encodeFunctionData, toHex } from "viem";
import { PancakeSwapTrade } from "./entities/protocols/pancakeswap";
import { encodePermit } from "./utils/inputTokens";
import { RoutePlanner } from "./utils/routerCommands";
import { PancakeSwapOptions, SwapRouterConfig } from "./entities/types";
import { UniversalRouterABI } from "./abis/UniversalRouter";
import { SmartWallet, UserOp } from "./api";
import { Contract, PopulatedTransaction, ethers } from "ethers";
import { PUBLIC_NODES } from "./provider/chains";
import {
      ECDSAWalletFactory,
      ECDSAWalletFactory__factory,
      ECDSAWallet__factory,
      ERC20,
      ERC20__factory,
      IWallet,
} from "../typechain-types";
import { Deployments } from "./constants/deploymentUtils";
import { typedMetaTx } from "./utils/typedMetaTx";
import { formatUserOp, formatUserOpSwapCall } from "../test/utils/formatUserOp";
import { parseContractError } from "../test/utils/error";
import { defaultAbiCoder } from "@ethersproject/abi";
import { getBNBPriceFromOracle, getCakePriceFromOracle } from "./provider/price";
import { SupportedFeeTokens } from "./constants/commonAssets";

export interface SwapCall {
      address: Address;
      calldata: Hex;
      value: Hex;
}

type SmartWalletTrade = {
      tokenAddress: Address;
      outPutTokenAddress: Address;
      amount: string;
      outputAmount: string;
      calls: SwapCall[];
};

export enum UserOperations {
      ApproveSmartWallet = "ApproveSmartWallet",
      TransferToSmartWallet = "TransferToSmartWallet",
      ApproveSwapRouter = "ApproveSwapRouter",
      ExecuteSwapCall = "ExecuteSwapCall",
      TransferOutputFeeToRelayer = "TransferOutputFeeToRelayer",
      TransferInputFeeToRelayer = "TransferInputFeeToRelayer",
}
export class PancakeSwapSmartWalletlRouter {
      public account: Address;
      public chainId: ChainId;
      public trade: SmartWalletTrade;
      public estimatedGas = 193292;

      constructor(account: Address, chainId: ChainId, trade: SmartWalletTrade) {
            this.account = account;
            this.chainId = chainId;
            this.trade = trade;
      }

      public async executeSmartWallet(signature: string, userOps: UserOp[], useRelayer: boolean) {
            const userSmartWallet = await this.getSmartWallet(true);
            const wallet = userSmartWallet.wallet;

            const gasEstimate = await wallet?.estimateGas.exec(userOps, signature);
            const gasPrice = await wallet!.provider.getGasPrice();
            const txCost = gasPrice.mul(gasEstimate);

            const execTx = await wallet.populateTransaction.exec(userOps, signature);
            if (useRelayer) {
                  const outPutToken = this.getERC20Token(this.trade.outPutTokenAddress);
                  const balanceBeforeTrade = await outPutToken.balanceOf(userSmartWallet.address);

                  const walletTx = await this.getSigner().sendTransaction(execTx);
                  const receipt = await walletTx.wait(1);

                  const balanceAfterTrade = await outPutToken.balanceOf(userSmartWallet.address);
                  const amountRecieved = Number(balanceAfterTrade) - Number(balanceBeforeTrade);

                  const bnbPriceUsd = await getBNBPriceFromOracle();
                  const txCostInUsd = Number(bnbPriceUsd) * Number(txCost);
                  const amountAfterFee = amountRecieved - txCostInUsd;

                  // const redeemTx = await this.getSigner().sendTransaction(execTx);

                  return { receipt, execTx: undefined, txCost };
            }

            return { receipt: undefined, execTx, txCost };
      }

      public async estimateFeesInInutToken() {
            const userSmartWallet = await this.getSmartWallet(false);
            const tokenContract = this.getERC20Token(this.trade.tokenAddress);
            const tokenContract2 = this.getERC20Token(this.trade.outPutTokenAddress);

            console.log(await tokenContract2.balanceOf(userSmartWallet.address));
            console.log(await tokenContract2.balanceOf(await this.getSigner().getAddress()));

            const gasPrice = await userSmartWallet.wallet!.provider.getGasPrice();
            const txCostInGas = gasPrice.mul(this.estimatedGas);

            const bnbPriceUsd = await getBNBPriceFromOracle();
            const txCostInUsd = Number(bnbPriceUsd) * Number(txCostInGas);
            const txCostInCake = (Number(txCostInGas) * Number(this.trade.amount)) / 10 ** 18;

            return { txCostInCake: BigInt(txCostInCake) };
      }

      public isTokenPayableTrade() {
            const isInputAssetStable = SupportedFeeTokens[this.chainId].includes(this.trade.tokenAddress);
            const isOutputAssetStable = SupportedFeeTokens[this.chainId].includes(this.trade.outPutTokenAddress);
            return { isInputAssetStable, isOutputAssetStable };
      }

      public async getTypedTxMetaData() {
            const tokenContract = this.getERC20Token(this.trade.tokenAddress);
            const userSmartWallet = await this.getSmartWallet(false);
            const swaddress = userSmartWallet.address;

            const nonce = (await userSmartWallet?.wallet?.nonce()) ?? 0;
            const smartWalletAllowance = await tokenContract.allowance(this.account, swaddress);
            const needsExternalApproval = Boolean(Number(smartWalletAllowance) < Number(this.trade.amount));

            const externalApprovalOp = await this.generateUserOp(UserOperations.ApproveSmartWallet, [
                  needsExternalApproval,
            ]);

            const approvalOp = await this.generateUserOp(UserOperations.ApproveSwapRouter, [
                  this.trade.calls[0].address,
                  this.trade.amount,
            ]);
            const transferOp = await this.generateUserOp(UserOperations.TransferToSmartWallet, [
                  this.account,
                  userSmartWallet.address,
                  this.trade.amount,
            ]);

            const swapRoutesUserOps = await this.generateUserOp(UserOperations.ExecuteSwapCall, [this.trade.calls]);

            const transferFeeOp = await this.generateUserOp(UserOperations.TransferOutputFeeToRelayer, [
                  await this.getSigner().getAddress(),
                  BigInt(Math.round(Number(this.trade.outputAmount) * 0.2)).toString(),
            ]);

            const { domain, types, values } = await typedMetaTx(
                  [transferOp, approvalOp, ...swapRoutesUserOps, transferFeeOp],
                  nonce,
                  swaddress,
                  this.chainId
            );
            return { domain, types, values, externalApprovalOp };
      }

      public async generateUserOp<Targs extends Array<string | number | SwapCall[] | boolean>>(
            operationType: UserOperations,
            args: Targs
      ) {
            const { isInputAssetStable, isOutputAssetStable } = this.isTokenPayableTrade();

            const tokenContract = this.getERC20Token(this.trade.tokenAddress);
            const outPutTokenContract = this.getERC20Token(this.trade.outPutTokenAddress);
            const userSmartWallet = await this.getSmartWallet(false);

            if (operationType === UserOperations.ApproveSmartWallet) {
                  const needsExternalApproval = args[0];
                  const params = [userSmartWallet.address, ethers.constants.MaxUint256];

                  const approvalMeta = await this.populateTx<Targs>(tokenContract, "approve", params);
                  return needsExternalApproval ? approvalMeta : undefined;
            }
            if (operationType === UserOperations.ApproveSwapRouter) {
                  const approvalMeta = await this.populateTx<Targs>(tokenContract, "approve", args);
                  return formatUserOp(approvalMeta);
            }
            if (operationType === UserOperations.TransferToSmartWallet) {
                  const transferMeta = await this.populateTx<Targs>(tokenContract, "transferFrom", args);
                  return formatUserOp(transferMeta);
            }
            if (operationType === UserOperations.ExecuteSwapCall) {
                  const swapMeta = args[0].map((call) => formatUserOpSwapCall(call));
                  return swapMeta;
            }
            if (operationType === UserOperations.TransferOutputFeeToRelayer) {
                  const shouldExecute = Boolean(isOutputAssetStable && !isInputAssetStable);
                  const transferMeta = await this.populateTx<Targs>(outPutTokenContract, "transfer", args);
                  return shouldExecute ? formatUserOp(transferMeta) : undefined;
            }
            return undefined;
      }

      public async getSmartWallet(deploy?: boolean): Promise<SmartWallet> {
            const factory = await this.getFactory();
            const address = await factory.walletAddress(this.account, 0);
            const code = await this.getProvider()?.getCode(address);

            if (code === "0x") {
                  if (!deploy) return { address } as SmartWallet;
                  const deployTx = await this.populateTx(factory, "createWallet", [
                        this.account,
                        { value: 15000000000 },
                  ]);
                  const walletTx = await this.getSigner().sendTransaction(deployTx);
                  await walletTx.wait(1);
            }

            const wallet = await this.getWallet(address);
            return { wallet, address };
      }

      private async populateTx<T extends Array<string | number | SwapCall[] | boolean>>(
            contract: Contract,
            method: string,
            args: T
      ): Promise<PopulatedTransaction> {
            return await contract.populateTransaction[method](...args);
      }

      private getProvider(): ethers.providers.Provider {
            return new ethers.providers.JsonRpcProvider(PUBLIC_NODES[this.chainId][0]);
      }

      private async getFactory(): Promise<ECDSAWalletFactory> {
            return ECDSAWalletFactory__factory.connect(
                  Deployments[this.chainId].ECDSAWalletFactory as string,
                  this.getSigner()
            );
      }

      private async getWallet(address: string): Promise<IWallet> {
            return ECDSAWallet__factory.connect(address, this.getProvider()) as IWallet;
      }

      private getSigner(): ethers.Wallet {
            return new ethers.Wallet(
                  "22a557c558a2fa235e7d67839b697fc2fb1b53c8705ada632c07dee1eac330a4",
                  this.getProvider()
            );
      }

      private getERC20Token(tokenAddress: Address): ERC20 {
            return ERC20__factory.connect(tokenAddress, this.getProvider());
      }
}
