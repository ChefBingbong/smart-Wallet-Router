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
import { ethers } from "ethers";
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

interface SwapCall {
      address: Address;
      calldata: Hex;
      value: Hex;
}
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export abstract class PancakeSwapSmartWalletlRouter {
      /**
       * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
       * @param trades to produce call parameters for
       * @param options options for the call parameters
       */
      public static async getTypedTxMetaData(
            userAddresss: Address,
            tokenAddress: Address,
            swapArgs: SwapCall[],
            amount: number,
            chainId: ChainId
      ) {
            const tokenContract = this.getERC20Token(tokenAddress, chainId);
            const userSmartWallet = await this.getSmartWallet(userAddresss, chainId, false);

            const currentWalletTxNonce = (await userSmartWallet?.wallet?.nonce()) ?? 0;
            const smartWalletAllowance = await tokenContract.allowance(userAddresss, userSmartWallet.address);

            console.log(smartWalletAllowance);
            const approvalTxFroSigner =
                  Number(smartWalletAllowance) < amount
                        ? await tokenContract.populateTransaction.approve(
                                userSmartWallet.address,
                                ethers.constants.MaxUint256
                          )
                        : undefined;

            const { transferOp, approvalOp } = await this.getTransferMetaTxs(
                  userAddresss,
                  userSmartWallet.address,
                  tokenContract,
                  swapArgs,
                  amount
            );

            const swapRoutesUserOps = swapArgs.map((call) => {
                  return {
                        to: call.address,
                        amount: "0",
                        data: call.calldata,
                  };
            });
            const userOps: UserOp[] = [
                  {
                        to: transferOp.to,
                        amount: "0",
                        data: transferOp.data,
                  },
                  {
                        to: approvalOp.to,
                        amount: "0",
                        data: approvalOp.data,
                  },
                  ...swapRoutesUserOps,
            ];

            const { domain, types, values } = await typedMetaTx(
                  userOps,
                  userSmartWallet.address,
                  currentWalletTxNonce,
                  chainId,
                  chainId
            );
            return { domain, types, values, approvalTxFroSigner };
      }
      /**
       * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
       * @param trades to produce call parameters for
       * @param options options for the call parameters
       */
      public static async getSmartWallet(addr: string, chainID: number, deploy?: boolean): Promise<SmartWallet> {
            const factory = await this.getFactory(chainID);
            const wallet: SmartWallet = {
                  address: await factory.walletAddress(addr, 0),
            };
            const signer = this.getSigner(chainID);
            const code = await this.getProvider(chainID)?.getCode(wallet.address);
            if (code === "0x") {
                  if (!deploy) return wallet;

                  const populatedCreationTx = await factory.connect(signer).populateTransaction.createWallet(addr);
                  const walletTx = await signer.sendTransaction(populatedCreationTx);

                  await walletTx.wait(1);
            }
            wallet.wallet = await this.getWallet(wallet.address, chainID);
            return wallet;
      }

      private static async getTransferMetaTxs(
            userAddresss: Address,
            smartWalletAddress: Address,
            tokenContract: ERC20,
            swapArgs: SwapCall[],
            amount: number
      ): Promise<{ transferOp: ethers.PopulatedTransaction; approvalOp: ethers.PopulatedTransaction }> {
            const transferOp = await tokenContract.populateTransaction.transferFrom(
                  userAddresss,
                  smartWalletAddress,
                  amount
            );
            const approvalOp = await tokenContract.populateTransaction.approve(swapArgs[0].address, amount);

            return { transferOp, approvalOp };
      }

      private static getProvider(chainId: ChainId): ethers.providers.Provider {
            return new ethers.providers.JsonRpcProvider(PUBLIC_NODES[chainId][0]);
      }

      private static async getFactory(chainId: ChainId): Promise<ECDSAWalletFactory> {
            return ECDSAWalletFactory__factory.connect(
                  Deployments[chainId].ECDSAWalletFactory as string,
                  this.getSigner(chainId)
            );
      }

      private static async getWallet(address: string, chainID: number): Promise<IWallet> {
            return ECDSAWallet__factory.connect(address, this.getSigner(chainID)) as IWallet;
      }

      private static getSigner(chainID: number): ethers.Signer {
            return new ethers.Wallet(
                  "22a557c558a2fa235e7d67839b697fc2fb1b53c8705ada632c07dee1eac330a4",
                  this.getProvider(chainID)
            );
      }

      private static getERC20Token(tokenAddress: Address, chainId: ChainId): ERC20 {
            return ERC20__factory.connect(tokenAddress, this.getProvider(chainId));
      }
}
