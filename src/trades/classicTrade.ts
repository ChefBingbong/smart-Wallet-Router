import { Currency, TradeType } from "@pancakeswap/sdk";
import { SmartRouter, SmartRouterTrade } from "@pancakeswap/smart-router";
import { PancakeSwapUniversalRouter, getUniversalRouterAddress } from "@pancakeswap/universal-router-sdk";
import { SupportedFeeTokens } from "../constants/commonAssets";
import { Command, RouterTradeType } from "../encoder/buildOperation";
import { OperationType, WalletOperationBuilder } from "../encoder/walletOperations";
import { signer } from "../provider/walletClient";
import { SmartWalletTradeOptions } from "../types/smartWallet";
import invariant from "tiny-invariant";
import { encodeInputTokenOptions } from "../encoder/permit2Operations";
import { Address } from "viem";

export class ClasicTrade implements Command {
      readonly tradeType: RouterTradeType;

      constructor(
            public trade: SmartRouterTrade<TradeType>,
            public options: SmartWalletTradeOptions,
      ) {
            this.tradeType = this.options.SmartWalletTradeType;
            const { underlyingTradeOptions } = options;
            if (underlyingTradeOptions.fee && underlyingTradeOptions.flatFee) {
                  throw new Error("Cannot specify both fee and flatFee");
            }
      }

      encode(planner: WalletOperationBuilder): void {
            const { trade, options } = this;
            const { chainId, smartWalletDetails, walletPermitOtions } = options;
            const { slippageTolerance } = options.underlyingTradeOptions;

            const executeFromWallet = this.tradeType === RouterTradeType.CustomFeeCurrencyTrade;

            if (executeFromWallet && !options.feeOptions) {
                  throw new Error("Fee data must be provided for this trade type");
            }
            const inputToken = trade.inputAmount.currency.wrapped.address;
            const outputToken = trade.outputAmount.currency.wrapped.address;
            const amountIn = SmartRouter.maximumAmountIn(trade, slippageTolerance, trade.inputAmount).quotient;

            if (!!walletPermitOtions?.approval && !!walletPermitOtions?.permit2Permit)
                  invariant(
                        walletPermitOtions?.approval.token === walletPermitOtions?.permit2Permit.details.token,
                        `inconsistent token`,
                  );
            if (!!walletPermitOtions?.approval && !!walletPermitOtions?.permit2TransferFrom)
                  invariant(
                        walletPermitOtions?.approval.token === walletPermitOtions?.permit2TransferFrom.token,
                        `inconsistent token`,
                  );
            if (!!walletPermitOtions?.permit2TransferFrom && !!walletPermitOtions?.permit2Permit)
                  invariant(
                        walletPermitOtions?.permit2TransferFrom.token ===
                              walletPermitOtions?.permit2Permit.details.token,
                        `inconsistent token`,
                  );

            const swapRouterAddress = getUniversalRouterAddress(chainId);
            if (walletPermitOtions?.permit2TransferFrom) {
                  planner.addExternalUserOperation(
                        OperationType.PERMIT2_TRANSFER_FROM,
                        [
                              walletPermitOtions?.permit2TransferFrom.token as Address,
                              smartWalletDetails.address as Address,
                              amountIn,
                        ],
                        swapRouterAddress,
                  );
            }

            this.addMandatoryOperations(planner, executeFromWallet);

            const isInputAssetStable = SupportedFeeTokens[chainId].includes(inputToken);
            const isOutputAssetStable = SupportedFeeTokens[chainId].includes(outputToken);

            let feeToken: Currency | undefined;
            if (executeFromWallet && isInputAssetStable) feeToken = trade.inputAmount.currency;
            if (executeFromWallet && isOutputAssetStable) feeToken = trade.outputAmount.currency;

            if (executeFromWallet && feeToken) {
                  let feeAmount = options.feeOptions?.gasCostInQuoteToken;
                  if (feeToken.wrapped.address === inputToken) {
                        feeAmount = options.feeOptions?.gasCostInBaseToken;
                  }
                  if (feeAmount) {
                        planner.addExternalUserOperation(
                              OperationType.TRANSFER,
                              [signer.address, BigInt(feeAmount)],
                              inputToken,
                        );
                  }
            }
      }

      private addMandatoryOperations = (planner: WalletOperationBuilder, executeFromWallet: boolean) => {
            const { trade, options } = this;
            const { slippageTolerance } = options.underlyingTradeOptions;
            const { account, smartWalletDetails, chainId } = options;

            const inputToken = this.trade.inputAmount.currency.wrapped.address;
            const amountIn = SmartRouter.maximumAmountIn(trade, slippageTolerance, trade.inputAmount).quotient;

            if (!executeFromWallet) {
                  planner.addUserOperation(
                        OperationType.TRANSFER_FROM,
                        [account, smartWalletDetails.address, amountIn],
                        inputToken,
                  );
            }
            const swapRouterAddress = getUniversalRouterAddress(chainId);
            planner.addUserOperation(OperationType.APPROVE, [swapRouterAddress, BigInt(amountIn)], inputToken);

            const urOptions = options.underlyingTradeOptions;
            const methodParameters = PancakeSwapUniversalRouter.swapERC20CallParameters(trade, urOptions);

            planner.addUserOperationFromCall([
                  {
                        address: swapRouterAddress,
                        calldata: methodParameters.calldata,
                        value: methodParameters.value,
                  },
            ]);
      };
}
