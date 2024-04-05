import { ChainId } from "@pancakeswap/sdk";
import { Contract, PopulatedTransaction, ethers } from "ethers";
import { Address } from "viem";
import { formatUserOp, formatUserOpSwapCall } from "../test/utils/formatUserOp";
import {
      ECDSAWalletFactory,
      ECDSAWalletFactory__factory,
      ECDSAWallet__factory,
      ERC20,
      ERC20__factory,
      IWallet,
} from "../typechain-types";
import { SmartWallet, UserOp } from "./api";
import { SupportedFeeTokens } from "./constants/commonAssets";
import { Deployments } from "./constants/deploymentUtils";
import { PUBLIC_NODES } from "./provider/chains";
import { getBNBPriceFromOracle } from "./provider/price";
import { typedMetaTx } from "./utils/typedMetaTx";
import { getPublicClient, getWalletClient, signer } from "./provider/walletClient";
import { getContract, erc20Abi, SimulateContractReturnType } from "viem";
import { smartWalletAbi } from "../abis/SmartWalletAbi";
import { smartWalletFactoryAbi } from "../abis/SmartWalletFactoryAbi";

export interface SwapCall {
      address: Address;
      calldata: Hex;
      value: Hex;
}

export type SmartWalletTrade = {
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

            const nonce = (await userSmartWallet?.wallet?.read.nonce()) ?? 0;
            const smartWalletAllowance = await tokenContract.read.allowance([this.account, swaddress]);
            const needsExternalApproval = Boolean(Number(smartWalletAllowance) < Number(this.trade.amount));

            const externalApprovalOp = await this.generateUserOp(UserOperations.ApproveSmartWallet, [
                  needsExternalApproval,
            ]);

            // const approvalOp = await this.generateUserOp(UserOperations.ApproveSwapRouter, [
            //       this.trade.calls[0].address,
            //       this.trade.amount,
            // ]);
            // const transferOp = await this.generateUserOp(UserOperations.TransferToSmartWallet, [
            //       this.account,
            //       userSmartWallet.address,
            //       this.trade.amount,
            // ]);

            // const swapRoutesUserOps = await this.generateUserOp(UserOperations.ExecuteSwapCall, [this.trade.calls]);

            // const transferFeeOp = await this.generateUserOp(UserOperations.TransferOutputFeeToRelayer, [
            //       signer,
            //       BigInt(Math.round(Number(this.trade.outputAmount) * 0.2)).toString(),
            // ]);

            const { domain, types, values } = await typedMetaTx([], nonce, swaddress, this.chainId);
            return { domain, types, values, externalApprovalOp };
      }

      public async generateUserOp<Targs extends Array<string | number | SwapCall[] | boolean>>(
            operationType: UserOperations,
            args: Targs,
      ) {
            const { isInputAssetStable, isOutputAssetStable } = this.isTokenPayableTrade();

            const tokenContract = this.trade.tokenAddress;
            const outPutTokenContract = this.trade.outPutTokenAddress;
            const userSmartWallet = await this.getSmartWallet(false);

            if (operationType === UserOperations.ApproveSmartWallet) {
                  const needsExternalApproval = args[0];
                  const params = [userSmartWallet.wallet?.address, ethers.constants.MaxUint256];

                  const approvalMeta = await this.populateTx<Targs>(tokenContract, erc20Abi, "approve", params);
                  console.log(approvalMeta);
                  return needsExternalApproval ? approvalMeta.result : undefined;
            }
            if (operationType === UserOperations.ApproveSwapRouter) {
                  const approvalMeta = await this.populateTx<Targs>(tokenContract, erc20Abi, "approve", args);
                  return formatUserOp(approvalMeta.result);
            }
            if (operationType === UserOperations.TransferToSmartWallet) {
                  const transferMeta = await this.populateTx<Targs>(tokenContract, erc20Abi, "transferFrom", args);
                  return formatUserOp(transferMeta.result);
            }
            if (operationType === UserOperations.ExecuteSwapCall) {
                  const swapMeta = args[0].map((call) => formatUserOpSwapCall(call));
                  return swapMeta;
            }
            if (operationType === UserOperations.TransferOutputFeeToRelayer) {
                  const shouldExecute = Boolean(isOutputAssetStable && !isInputAssetStable);
                  const transferMeta = await this.populateTx<Targs>(outPutTokenContract, erc20Abi, "transfer", args);
                  return shouldExecute ? formatUserOp(transferMeta.result) : undefined;
            }
            return undefined;
      }

      public async getSmartWallet(deploy?: boolean) {
            const factory = await this.getFactory();
            const address = await factory.read.walletAddress([this.account, BigInt(0)], { account: this.account });
            const code = await this.getProvider().getBytecode({ address });

            if (code === "0x") {
                  if (!deploy) return { address } as SmartWallet;
                  const deployTx = await this.populateTx(factory.address, smartWalletFactoryAbi, "createWallet", [
                        this.account,
                        { value: 15000000000 },
                  ]);
                  await this.getSigner().sendTransaction(deployTx.request);
            }

            const wallet = await this.getWallet(address);
            return { wallet, address };
      }

      private async populateTx<T extends Array<string | number | SwapCall[] | boolean>>(
            address: Address,
            abi: any,
            functionName: string,
            args: T,
      ) {
            return await this.getProvider().simulateContract({
                  address,
                  abi,
                  functionName,
                  args: args as any,
                  account: signer,
            });
      }

      private getProvider() {
            return getPublicClient({ chainId: this.chainId });
      }

      private async getFactory() {
            return getContract({
                  address: Deployments[this.chainId].ECDSAWalletFactory,
                  client: this.getSigner(),
                  abi: smartWalletFactoryAbi,
            });
      }

      private async getWallet(address: Address) {
            return getContract({ address, client: this.getProvider(), abi: smartWalletAbi });
      }

      private getSigner() {
            return getWalletClient({ chainId: this.chainId });
      }

      private getERC20Token(address: Address) {
            return getContract({ address, client: this.getProvider(), abi: erc20Abi });
      }
}
