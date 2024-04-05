import {
      Address,
      BaseError,
      ContractFunctionRevertedError,
      Hex,
      PrepareTransactionRequestReturnType,
      PublicClient,
      SimulateContractParameters,
      WalletClient,
      encodeFunctionData,
      encodePacked,
      getContract,
      maxUint256,
      toBytes,
      toFunctionSelector,
      toHex,
} from "viem";
import { ERC20__factory } from "../typechain-types";
import { RouterTradeType } from "./encoder/buildOperation";
import { ABI_PARAMETER, OperationType, WalletOperationBuilder, encodeOperation } from "./encoder/walletOperations";
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
      PancakeSwapUniversalRouter as UniversalRouter,
      getUniversalRouterAddress,
} from "@pancakeswap/universal-router-sdk";
import { Currency, CurrencyAmount, Price, TradeType } from "@pancakeswap/sdk";
import {
      SMART_ROUTER_ADDRESSES,
      SmartRouter,
      SmartRouterTrade,
      SwapOptions,
      SwapRouter,
} from "@pancakeswap/smart-router";
import { ClasicTrade } from "./trades/classicTrade";
import { EIP712TypedData, typedMetaTx } from "./utils/typedMetaTx";
import { UserOp } from "../test/utils/sign";
import { getTokenPrices } from "@pancakeswap/price-api-sdk";
import tryParseAmount from "./utils/tryParseAmount";
import { getTokenPriceByNumber } from "./provider/price";
import { Token, WNATIVE } from "@pancakeswap/sdk";
import { usdGasTokensByChain } from "./constants/gasTokens";
import { getSwapRouterAddress } from "./utils/getSwapRouterAddress";
import { bscTestnet } from "viem/chains";

export function getUsdGasToken(chainId: ChainId): Token | null {
      return usdGasTokensByChain[chainId]?.[0] ?? null;
}

export function getNativeWrappedToken(chainId: ChainId): Token | null {
      return WNATIVE[chainId] ?? null;
}

export interface SwapCall {
      address: readonly Address;
      calldata: Hex;
      value: Hex;
}

interface E {
      signCallback: (args?: any) => Promise<`0x${string}`>;
      walletOperations: U0[];
      account: Address;
      chainId: ChainId;
}

export type SmartWalletTrade<TradeType> = {
      tokenAddress: Address;
      outPutTokenAddress: Address;
      amount: string;
      outputAmount: string;
      calls: SwapCall[];
      tradeType: TradeType;
};

export enum Routers {
      UniversalRouter = "UniversalRouter",
      SmartRouter = "SmartRouter",
}

export interface BaseTradeOptions<TOps> {
      account: Address;
      chainId: ChainId;
      router: Routers;
      underlyingTradeOptions: TOps;
}

export interface ClassicTradeOptions<TOps> extends BaseTradeOptions<TOps> {
      router: Routers;
}
export interface SmartWalletTradeOptions extends BaseTradeOptions<PancakeSwapOptions> {
      requiresExternalApproval: boolean;
      smartWalletDetails: { address: Address; nonce: bigint };
      SmartWalletTradeType: RouterTradeType;
      router: Routers;
      feeOptions?: FeeResponse;
}
type Config = {
      smartWalletDetails: WalletDetails;
      chainId: ChainId;
};
export type FeeResponse = {
      gasEstimate: bigint;
      gasCostInQuoteToken: number;
      gasCostInBaseToken: number;
      gasCostInUSD: number;
};
type U0 = { readonly to: Address; readonly amount: bigint; readonly data: Hex };
type SmartWalletGasParams = { userOps: UserOp[]; trade: SmartRouterTrade<TradeType>; chainId: ChainId };
type WalletDetails = { address: Address; nonce: bigint };
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
      }: E): Promise<{ populatedTrade?: PrepareTransactionRequestReturnType; hash?: Hex }> {
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

      private static encodePlan(planner: WalletOperationBuilder, config: Config) {
            const { userOps, externalUserOps } = planner;
            const { address, nonce } = config.smartWalletDetails;
            const tradeTypedMetaData = typedMetaTx(userOps, Number(nonce), address, config.chainId);
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
