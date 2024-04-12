import { getPermit2Address } from "@pancakeswap/permit2-sdk";
import { ChainId, type TradeType } from "@pancakeswap/sdk";
import { SmartRouter, SwapRouter, type SmartRouterTrade } from "@pancakeswap/smart-router";
import { maxUint256, type Address } from "viem";
import { getUniversalRouterAddress } from "@pancakeswap/universal-router-sdk";
import { RouterTradeType, Routers, type Command } from "../encoder/buildOperation";
import { OperationType, type WalletOperationBuilder } from "../encoder/walletOperations";
import { getSwapRouterAddress } from "../utils/getSwapRouterAddress";
import { PancakeSwapUniversalRouter } from "@pancakeswap/universal-router-sdk";
import type { SmartWalletTradeOptions } from "../types/smartWallet";

export const SupportedFeeTokens: { [chain: number]: Address[] } = {
      [ChainId.BSC_TESTNET]: ["0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee"],
};
export const RouterRecipientByTrade: { [router in Routers]: (chain: ChainId) => Address } = {
      [Routers.UniversalRouter]: (chainId: ChainId) => getUniversalRouterAddress(chainId),
      [Routers.SmartOrderRouter]: (chainId: ChainId) => getSwapRouterAddress(chainId),
};
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
            const { chainId, smartWalletDetails, account } = options;

            const tradeOptions = options.underlyingTradeOptions;
            const inputToken = trade.inputAmount.currency.wrapped.address;
            const routerRecipient = RouterRecipientByTrade[this.options.router](chainId);

            const amountIn = SmartRouter.maximumAmountIn(
                  trade,
                  tradeOptions.slippageTolerance,
                  trade.inputAmount,
            ).quotient;

            const universalRouterAddress = getUniversalRouterAddress(chainId);
            const smartRouterAddress = getSwapRouterAddress(chainId);
            const permit2Address = getPermit2Address(chainId);

            if (options.walletPermitOptions?.permit2TransferFrom) {
                  const permitSpender = options.walletPermitOptions.permit2TransferFrom.permit.spender;
                  const permitToken = options.walletPermitOptions.permit2TransferFrom.permit.permitted.token;

                  if (this.tradeType === RouterTradeType.SmartWalletTrade && options.hasApprovedPermit2) {
                        planner.addExternalUserOperation(
                              OperationType.APPROVE,
                              [permit2Address, maxUint256],
                              inputToken,
                        );
                  }

                  planner.addExternalUserOperation(OperationType.PERMIT2_TRANSFER_TO_RELAYER_WITNESS, [
                        amountIn,
                        permitToken as Address,
                        account,
                        permitSpender as Address,
                        permit, // to add
                        permitSignature, // to do add
                  ]);
                  planner.addExternalUserOperation(OperationType.CLAIM_PERMIT, [permitToken, amountIn], permitToken);
                  planner.addExternalUserOperation(OperationType.TRANSFER, [routerRecipient, amountIn], permitToken);
            } else {
                  if (!options.hasApprovedRelayer) {
                        planner.addExternalUserOperation(
                              OperationType.APPROVE,
                              [smartWalletDetails.address, amountIn],
                              inputToken,
                        );
                  }
                  planner.addUserOperation(
                        OperationType.TRANSFER_FROM,
                        [account, smartWalletDetails.address, amountIn],
                        inputToken,
                  );
            }
            if (routerRecipient === smartRouterAddress) {
                  const { calldata, value } = SwapRouter.swapCallParameters(trade, tradeOptions);
                  planner.addUserOperation(OperationType.APPROVE, [routerRecipient, BigInt(amountIn)], inputToken);
                  planner.addUserOperationFromCall([{ address: routerRecipient, calldata, value }]);
            }
            if (routerRecipient === universalRouterAddress) {
                  const { calldata, value } = PancakeSwapUniversalRouter.swapERC20CallParameters(trade, tradeOptions);
                  planner.addUserOperation(OperationType.APPROVE, [routerRecipient, BigInt(amountIn)], inputToken);
                  planner.addUserOperationFromCall([{ address: routerRecipient, calldata, value }]);
            }
      }

      private addMandatoryOperations = (planner: WalletOperationBuilder) => {
            const { trade, options } = this;
            const { slippageTolerance } = options.underlyingTradeOptions;
            const { account, smartWalletDetails, chainId } = options;

            const amountIn = SmartRouter.maximumAmountIn(trade, slippageTolerance, trade.inputAmount).quotient;
            const swapRouterAddress = getUniversalRouterAddress(chainId);

            const inputToken = this.trade.inputAmount.currency.wrapped.address;
            const urOptions = options.underlyingTradeOptions;

            const { calldata, value } = PancakeSwapUniversalRouter.swapERC20CallParameters(trade, urOptions);

            planner.addUserOperation(
                  OperationType.TRANSFER_FROM,
                  [account, smartWalletDetails.address, amountIn],
                  inputToken,
            );
            planner.addUserOperation(OperationType.APPROVE, [swapRouterAddress, BigInt(amountIn)], inputToken);
            //     planner.addUserOperationFromCall([{ address, calldata, value }])
      };
}
