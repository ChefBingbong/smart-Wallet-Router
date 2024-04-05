import { ChainId } from "@pancakeswap/chains";
import { getTokenPrices } from "@pancakeswap/price-api-sdk";
import { Currency, CurrencyAmount, Token, TradeType, WNATIVE } from "@pancakeswap/sdk";
import { SmartRouterTrade, SwapOptions, SwapRouter } from "@pancakeswap/smart-router";
import {
      PancakeSwapOptions,
      PancakeSwapUniversalRouter as UniversalRouter,
      getUniversalRouterAddress,
} from "@pancakeswap/universal-router-sdk";
import {
      Address,
      BaseError,
      ContractFunctionRevertedError,
      Hex,
      PrepareTransactionRequestReturnType,
      encodePacked,
      toFunctionSelector,
} from "viem";
import { bscTestnet } from "viem/chains";
import { smartWalletAbi } from "../abis/SmartWalletAbi";
import { UserOp } from "../test/utils/sign";
import { Routers } from "./encoder/buildOperation";
import { ABI_PARAMETER, OperationType, WalletOperationBuilder, encodeOperation } from "./encoder/walletOperations";
import { getTokenPriceByNumber } from "./utils/estimateGas";
import { getPublicClient, getWalletClient, signer } from "./provider/walletClient";
import { ClasicTrade } from "./trades/classicTrade";
import {
      ClassicTradeOptions,
      ExecuteTradeCallback,
      FeeResponse,
      SmartWalletDetails,
      SmartWalletGasParams,
      SmartWalletTradeOptions,
} from "./types/smartWallet";
import { getErc20Contract, getSmartWallet, getSmartWalletFactory } from "./utils/contracts";
import { getSwapRouterAddress } from "./utils/getSwapRouterAddress";
import { typedMetaTx } from "./utils/typedMetaTx";
import { getNativeWrappedToken, getUsdGasToken } from "./utils/estimateGas";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export abstract class PancakeSwapSmartWalletRouter {
      public static buildClassicTrade<UTradeOps extends SwapOptions & PancakeSwapOptions>(
            trade: SmartRouterTrade<TradeType>,
            options: ClassicTradeOptions<UTradeOps>,
      ) {
            const routeOptions = options.underlyingTradeOptions;
            if (options.router === Routers.UniversalRouter) {
                  const { value, calldata } = UniversalRouter.swapERC20CallParameters(trade, routeOptions);
                  const swapRouterAddress = getUniversalRouterAddress(options.chainId);
                  return { address: swapRouterAddress, calldata, value };
            }

            const { value, calldata } = SwapRouter.swapCallParameters(trade, routeOptions);
            const swapRouterAddress = getSwapRouterAddress(options.chainId);
            return { address: swapRouterAddress, calldata, value };
      }

      public static buildSmartWalletTrade(trade: SmartRouterTrade<TradeType>, options: SmartWalletTradeOptions) {
            const planner = new WalletOperationBuilder();
            const tradeCommand = new ClasicTrade(trade, options);
            tradeCommand.encode(planner);

            return PancakeSwapSmartWalletRouter.encodePlan(planner, {
                  smartWalletDetails: options.smartWalletDetails,
                  chainId: options.chainId,
            });
      }

      public static buildSmartWalletTradeWithCustomGasToken(
            trade: SmartRouterTrade<TradeType>,
            options: SmartWalletTradeOptions,
      ) {
            const planner = new WalletOperationBuilder();
            const tradeCommand = new ClasicTrade(trade, options);
            tradeCommand.encode(planner);

            return PancakeSwapSmartWalletRouter.encodePlan(planner, {
                  smartWalletDetails: options.smartWalletDetails,
                  chainId: options.chainId,
            });
      }

      private static async executeSmartWalletTrade({
            signCallback,
            walletOperations,
            account,
            chainId,
      }: ExecuteTradeCallback): Promise<{ populatedTrade?: PrepareTransactionRequestReturnType; hash?: Hex }> {
            const callData = walletOperations[0].data?.slice(0, 8);
            const transferSelector = toFunctionSelector(ABI_PARAMETER[OperationType.TRANSFER_FROM]);
            const isUsingRelayer = Boolean(callData === transferSelector);

            if (isUsingRelayer) {
                  const asset = getErc20Contract(chainId, walletOperations[0].to);
                  const { address } = await this.getUserSmartWalletDetails(account, chainId);
                  const allowance = await asset.read.allowance([account, address]);
                  if (allowance <= BigInt(0)) throw new Error("need to appove smart wallet first.");
            }
            const signature = await signCallback();
            const signatureEncoded = encodePacked(["uint256", "bytes"], [BigInt(chainId), signature]);

            const userSmartWallet = await this.getUserSmartWalletDetails(account, chainId);

            const publicClient = getPublicClient({ chainId });
            const walletClient = getWalletClient({ chainId });

            const sim = await publicClient
                  .simulateContract({
                        address: userSmartWallet.address,
                        abi: smartWalletAbi,
                        functionName: "exec",
                        args: [walletOperations, signatureEncoded],
                        account: signer.address,
                  })
                  .catch((err) => {
                        if (err instanceof BaseError) {
                              const revertError = err.walk((err) => err instanceof ContractFunctionRevertedError);
                              if (revertError && revertError instanceof ContractFunctionRevertedError) {
                                    console.log(revertError.cause);
                                    console.log(revertError.name);
                              }
                        }
                  });

            if (!sim?.request.args) throw new Error("Error simulating contract");

            const { encodedSelector, encodedInput } = encodeOperation(OperationType.EXEC, sim?.request.args);
            const operationCalldata = encodedSelector.concat(encodedInput.substring(2)) as Hex;

            const populatedExecTx = await walletClient.prepareTransactionRequest({
                  account: isUsingRelayer ? signer : account,
                  to: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
                  value: sim?.request.value,
                  data: operationCalldata,
                  chain: bscTestnet,
            });

            if (isUsingRelayer) {
                  const hash = await walletClient.sendTransaction(populatedExecTx);
                  return { hash };
            }
            return { populatedTrade: populatedExecTx };
      }

      private static encodePlan(
            planner: WalletOperationBuilder,
            config: Pick<SmartWalletTradeOptions, "smartWalletDetails" | "chainId">,
      ) {
            const { userOps, externalUserOps } = planner;
            const { address, nonce } = config.smartWalletDetails;
            const tradeTypedMetaData = typedMetaTx(userOps, nonce, address, config.chainId);
            const executeTradeCallback = this.executeSmartWalletTrade;

            return { tradeTypedMetaData, externalUserOps, executeTradeCallback };
      }

      public static async estimateSmartWalletFees({
            userOps,
            trade,
            chainId,
      }: SmartWalletGasParams): Promise<FeeResponse> {
            const publicClient = getPublicClient({ chainId: 56 });
            const usdToken = getUsdGasToken(56);
            if (!usdToken) {
                  throw new Error(`No valid usd token found on chain ${chainId}`);
            }
            const nativeWrappedToken = getNativeWrappedToken(56);
            if (!nativeWrappedToken) {
                  throw new Error(`Unsupported chain ${chainId}. Native wrapped token not found.`);
            }

            const inputCurrency = trade.inputAmount.currency;
            const outputCurrency = trade.outputAmount.currency;

            const [quoteCurrencyUsdPrice, baseCurrencyUsdPrice, nativeCurrencyUsdPrice] = await getTokenPrices(56, [
                  "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
                  "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
                  nativeWrappedToken.address,
            ]);

            console.log(quoteCurrencyUsdPrice, baseCurrencyUsdPrice, nativeCurrencyUsdPrice);

            const quotePriceInUsd = getTokenPriceByNumber(usdToken, outputCurrency, quoteCurrencyUsdPrice?.priceUSD);
            const basePriceInUsd = getTokenPriceByNumber(usdToken, inputCurrency, baseCurrencyUsdPrice?.priceUSD);
            const nativePriceInUsd = getTokenPriceByNumber(
                  usdToken,
                  nativeWrappedToken,
                  nativeCurrencyUsdPrice?.priceUSD,
            );

            const quotePriceInNative =
                  quotePriceInUsd && nativePriceInUsd ? nativePriceInUsd.multiply(quotePriceInUsd.invert()) : undefined;

            const basePriceInNative =
                  basePriceInUsd && nativePriceInUsd ? nativePriceInUsd.multiply(basePriceInUsd.invert()) : undefined;

            let tradeGasEstimation = trade.gasEstimate;
            userOps.forEach(async (operation: UserOp) => {
                  tradeGasEstimation += await publicClient.estimateGas({
                        data: operation.data,
                        account: signer.address,
                        to: operation.to,
                        value: operation.amount,
                  });
            });

            const gasPrice = await publicClient.getGasPrice();
            const baseGasCostWei = gasPrice * tradeGasEstimation;
            const totalGasCostNativeCurrency = CurrencyAmount.fromRawAmount(nativeWrappedToken, baseGasCostWei);

            let gasCostInQuoteToken: CurrencyAmount<Currency> = CurrencyAmount.fromRawAmount(outputCurrency, 0);
            let gasCostInBaseToken: CurrencyAmount<Currency> = CurrencyAmount.fromRawAmount(outputCurrency, 0);
            let gasCostInUSD: CurrencyAmount<Currency> = CurrencyAmount.fromRawAmount(usdToken, 0);

            if (inputCurrency.isNative) gasCostInBaseToken = totalGasCostNativeCurrency;
            if (outputCurrency.isNative) gasCostInQuoteToken = totalGasCostNativeCurrency;
            if (!inputCurrency.isNative && !outputCurrency.isNative && quotePriceInNative && basePriceInNative) {
                  gasCostInQuoteToken = quotePriceInNative.quote(totalGasCostNativeCurrency);
                  gasCostInBaseToken = basePriceInNative.quote(totalGasCostNativeCurrency);
            }

            if (nativePriceInUsd) {
                  gasCostInUSD = nativePriceInUsd.quote(totalGasCostNativeCurrency);
            }
            return {
                  gasEstimate: tradeGasEstimation,
                  gasCostInQuoteToken: Number(gasCostInQuoteToken.quotient) / 10 ** 18,
                  gasCostInBaseToken: Number(gasCostInBaseToken.quotient) / 10 ** 18,
                  gasCostInUSD: Number(gasCostInUSD.quotient) / 10 ** 18,
            };
      }

      public static async getUserSmartWalletDetails(
            userAddress: Address,
            chainId: ChainId,
      ): Promise<SmartWalletDetails> {
            const publicClient = getPublicClient({ chainId });
            const factory = getSmartWalletFactory(chainId);
            const address = await factory.read.walletAddress([userAddress, BigInt(0)]);

            const code = await publicClient.getBytecode({ address });
            const smartWallet = getSmartWallet(chainId, address);
            const nonce = code === "0x" ? await smartWallet.read.nonce() : BigInt(0);
            return { address, nonce };
      }

      public static async getSmartWalletApproval(userAddress: Address, asset: Address, chainId: ChainId) {
            const token = getErc20Contract(chainId, asset);
            const { address } = await this.getUserSmartWalletDetails(userAddress, chainId);
            const allowance = await token.read.allowance([userAddress, address]);
            const requiresExternalApproval = Boolean(allowance <= BigInt(0));
            return { requiresExternalApproval };
      }
}
