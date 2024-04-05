import { Address, Hex, getContract, maxUint256 } from "viem";
import { ERC20__factory } from "../typechain-types";
import { RouterTradeType } from "./encoder/buildOperation";
import { OperationType, WalletOperationBuilder } from "./encoder/walletOperations";
import { PUBLIC_NODES } from "./provider/chains";
import { Contract, PopulatedTransaction, ethers } from "ethers";
import { ChainId } from "@pancakeswap/chains";
import { Deployments } from "./constants/deploymentUtils";
import { getPublicClient, getWalletClient, signer } from "./provider/walletClient";
import { smartWalletFactoryAbi } from "../abis/SmartWalletFactoryAbi";
import { smartWalletAbi } from "../abis/SmartWalletAbi";
import { getErc20Contract, getSmartWallet, getSmartWalletFactory } from "./utils/contracts";
import {
      PancakeSwapOptions,
      PancakeSwapUniversalRouter,
      getUniversalRouterAddress,
} from "@pancakeswap/universal-router-sdk";
import { Currency, CurrencyAmount, Price, TradeType } from "@pancakeswap/sdk";
import { SmartRouterTrade } from "@pancakeswap/smart-router";
import { ClasicTrade } from "./trades/classicTrade";
import { typedMetaTx } from "./utils/typedMetaTx";
import { UserOp } from "../test/utils/sign";
import { getTokenPrices } from "@pancakeswap/price-api-sdk";
import tryParseAmount from "./utils/tryParseAmount";
import { getTokenPriceByNumber } from "./provider/price";
import { Token, WNATIVE } from "@pancakeswap/sdk";
import { usdGasTokensByChain } from "./constants/gasTokens";

export function getUsdGasToken(chainId: ChainId): Token | null {
      return usdGasTokensByChain[chainId]?.[0] ?? null;
}

export function getNativeWrappedToken(chainId: ChainId): Token | null {
      return WNATIVE[chainId] ?? null;
}

export interface SwapCall {
      address: Address;
      calldata: Hex;
      value: Hex;
}

export type SmartWalletTrade<TradeType> = {
      tokenAddress: Address;
      outPutTokenAddress: Address;
      amount: string;
      outputAmount: string;
      calls: SwapCall[];
      tradeType: TradeType;
};

export type SmartWalletTradeOptions = {
      useSmartWalletRouter: boolean;
      underlyingTradeOptions: PancakeSwapOptions;
      requiresExternalApproval: boolean;
      executeFromWallet: boolean;
      smartWalletDetails: { address: Address; nonce: bigint };
      account: Address;
      chainId: ChainId;
};
type Config = {
      smartWalletDetails: WalletDetails;
      chainId: ChainId;
};
type SmartWalletGasParams = { userOps: UserOp[]; trade: SmartRouterTrade<TradeType>; chainId: ChainId };
type WalletDetails = { address: Address; nonce: bigint };
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export abstract class PancakeSwapSmartWalletRouter {
      public static buildSmartWalletTrade(trade: SmartRouterTrade<TradeType>, options: SmartWalletTradeOptions) {
            const inputToken = trade.inputAmount.currency.wrapped.address;
            const outputToken = trade.inputAmount.currency.wrapped.address;

            if (options.useSmartWalletRouter) {
                  const urOptions = options.underlyingTradeOptions;
                  const { value, calldata } = PancakeSwapUniversalRouter.swapERC20CallParameters(trade, urOptions);
                  const swapRouterAddress = getUniversalRouterAddress(options.chainId);
                  const universalRouterTrade = { address: swapRouterAddress, calldata, value };
                  return [universalRouterTrade];
            }

            const planner = new WalletOperationBuilder();
            const tradeCommand = new ClasicTrade(trade, { ...options, inputToken, outputToken });

            tradeCommand.encode(planner);
            return PancakeSwapSmartWalletRouter.encodePlan(planner, {
                  smartWalletDetails: options.smartWalletDetails,
                  chainId: options.chainId,
            });
      }

      private static encodePlan(planner: WalletOperationBuilder, config: Config) {
            const { userOps, externalUserOps } = planner;
            const { address, nonce } = config.smartWalletDetails;
            const tradeTypedMetaData = typedMetaTx(userOps, Number(nonce), address, config.chainId);
            return { tradeTypedMetaData, externalUserOps };
      }

      public static async estimateSmartWalletFees({ userOps, trade, chainId }: SmartWalletGasParams) {
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
                        account: signer,
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

      public static async getUserSmartWalletDetails(userAddress: Address, chainId: ChainId): Promise<WalletDetails> {
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
