import { ChainId } from "@pancakeswap/chains";
import { SupportedFeeTokens } from "../constants/commonAssets";
import { Command, RouterTradeType } from "../encoder/buildOperation";
import { OperationType, WalletOperationBuilder } from "../encoder/walletOperations";
import { SmartWalletTrade, SmartWalletTradeOptions, SwapCall } from "../smartWalletRouter2";
import { SmartWallet } from "../api";
import {
      PancakeSwapOptions,
      PancakeSwapUniversalRouter,
      getUniversalRouterAddress,
} from "@pancakeswap/universal-router-sdk";
import { SmartRouter, SmartRouterTrade } from "@pancakeswap/smart-router";
import { TradeType } from "@pancakeswap/sdk";
import { Address } from "viem";

export type WalletTradeOptions = SmartWalletTradeOptions & {
      inputToken: Address;
      outputToken: Address;
};
// Wrapper for pancakeswap router-sdk trade entity to encode swaps for Universal Router
export class ClasicTrade implements Command {
      readonly tradeType: RouterTradeType = RouterTradeType.ClassicTrade;
      readonly type: TradeType;

      constructor(
            public trade: SmartRouterTrade<TradeType>,
            public options: WalletTradeOptions,
      ) {
            this.type = this.trade.tradeType;
            const { underlyingTradeOptions } = options;
            if (underlyingTradeOptions.fee && underlyingTradeOptions.flatFee) {
                  throw new Error("Cannot specify both fee and flatFee");
            }
      }

      encode(planner: WalletOperationBuilder): void {
            const { trade, options } = this;
            const { chainId, smartWalletDetails } = options;
            const { slippageTolerance } = options.underlyingTradeOptions;

            const inputToken = trade.inputAmount.currency.wrapped.address;
            const outputToken = trade.outputAmount.currency.wrapped.address;

            const isInputAssetStable = SupportedFeeTokens[chainId].includes(inputToken);
            const isOutputAssetStable = SupportedFeeTokens[chainId].includes(outputToken);

            const amountIn = SmartRouter.maximumAmountIn(trade, slippageTolerance, trade.inputAmount).quotient;
            const amountOut = SmartRouter.minimumAmountOut(trade, slippageTolerance, trade.outputAmount).quotient;

            if (this.options.requiresExternalApproval) {
                  planner.addExternalUserOperation(
                        OperationType.APPROVE,
                        [smartWalletDetails.address, BigInt(amountIn)],
                        inputToken,
                  );
            }
            this.addMandatoryOperations(planner);
      }

      private addMandatoryOperations = (planner: WalletOperationBuilder) => {
            const { trade, options } = this;
            const { slippageTolerance } = options.underlyingTradeOptions;
            const { account, smartWalletDetails, executeFromWallet, chainId } = options;

            const inputToken = this.trade.inputAmount.currency.wrapped.address;
            const amountIn = SmartRouter.maximumAmountIn(trade, slippageTolerance, trade.inputAmount).quotient;

            if (!executeFromWallet) {
                  planner.addUserOperation(
                        OperationType.TRANSFER_FROM,
                        [account, smartWalletDetails.address, amountIn],
                        inputToken,
                  );
            }
            planner.addUserOperation(OperationType.APPROVE, [smartWalletDetails.address, BigInt(amountIn)], inputToken);

            const urOptions = options.underlyingTradeOptions;
            const methodParameters = PancakeSwapUniversalRouter.swapERC20CallParameters(trade, urOptions);
            const swapRouterAddress = getUniversalRouterAddress(chainId);

            planner.addUserOperationFromCall([
                  {
                        address: swapRouterAddress,
                        calldata: methodParameters.calldata,
                        value: methodParameters.value,
                  },
            ]);
      };
}
