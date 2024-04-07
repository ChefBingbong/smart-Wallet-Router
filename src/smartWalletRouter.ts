/* eslint-disable lines-between-class-members */
import type { ChainId } from "@pancakeswap/chains";
import { getTokenPrices } from "@pancakeswap/price-api-sdk";
import { CurrencyAmount, type Currency, type TradeType } from "@pancakeswap/sdk";
import { SwapRouter, type SmartRouterTrade, type SwapOptions } from "@pancakeswap/smart-router";
import { BaseError } from "abitype";
import { Address, PublicClient, formatTransactionRequest, type Hex } from "viem";
import { bscTestnet } from "viem/chains";
import { getContractError, getTransactionError, parseAccount } from "viem/utils";
import { getUniversalRouterAddress } from "@pancakeswap/universal-router-sdk";
import { Routers } from "./encoder/buildOperation";
import { OperationType, WalletOperationBuilder, encodeOperation } from "./encoder/walletOperations";
import { PancakeSwapOptions, PancakeSwapUniversalRouter as UniversalRouter } from "@pancakeswap/universal-router-sdk";
import { getViemClient } from "./provider/client";
import { getPublicClient, getWalletClient, signer } from "./provider/walletClient";
import { ClasicTrade } from "./trades/classicTrade";
import type { ClassicTradeOptions, SmartWalletGasParams, SmartWalletTradeOptions, UserOp } from "./types/smartWallet";
import { getSmartWallet, getSmartWalletFactory } from "./utils/contracts";
import { getNativeWrappedToken, getTokenPriceByNumber, getUsdGasToken } from "./utils/estimateGas";
import { permit2TpedData } from "./permit/permit2TypedData";
import { typedMetaTx } from "./utils/typedMetaTx";
import { erc20Abi as ERC20ABI } from "viem";
import { RouterCofig } from "./types/eip712";
import { getSwapRouterAddress } from "./utils/getSwapRouterAddress";
import { AccountNotFoundError } from "./utils/error";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export abstract class SmartWalletRouter {
      public static account: Address;
      public static smartWallet: Address;
      public static chainId: ChainId;
      public static isInitialized = false;
      public static tradeConfig = {} as Partial<ClassicTradeOptions<any>> & SmartRouterTrade<TradeType>;

      public static updateConfig(config: RouterCofig) {
            this.account = config.account;
            this.smartWallet = config.smartWallet;
            this.chainId = config.chainId;
      }

      public static buildClassicTrade<UTradeOps extends SwapOptions & PancakeSwapOptions>(
            trade: SmartRouterTrade<TradeType>,
            options: ClassicTradeOptions<UTradeOps>,
      ) {
            this.tradeConfig = { ...options, trade };
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
            this.tradeConfig = { ...options, trade };

            const planner = new WalletOperationBuilder();
            const tradeCommand = new ClasicTrade(trade, options);
            tradeCommand.encode(planner);

            return SmartWalletRouter.encodePlan(planner, {
                  ...options,
                  token: (this.tradeConfig.inputAmount.currency as any).address,
                  amount: this.tradeConfig.inputAmount.quotient,
            });
      }

      public static encodePlan(
            planner: WalletOperationBuilder,
            config: SmartWalletTradeOptions & { token: Address; amount: bigint },
      ) {
            const { userOps, externalUserOps } = planner;
            const { address, nonce } = config.smartWalletDetails;

            const smartWalletTypedData = typedMetaTx(userOps, nonce, address, config.chainId);
            const permit2TypedData = permit2TpedData(
                  config.chainId,
                  config.token,
                  signer.address,
                  address,
                  signer.address,
                  config.amount,
                  0n,
            );

            return { permitDetails: permit2TypedData, smartWalletDetails: smartWalletTypedData, externalUserOps };
      }

      public static async sendTransactionFromRelayer(
            chainId: ChainId,
            txConfig: UserOp,
            config: { externalClient?: PublicClient },
      ) {
            const asyncClient = getPublicClient({ chainId });
            const externalClient = config?.externalClient;
            const client = externalClient || getWalletClient({ chainId });

            if (!client.account) throw new AccountNotFoundError();
            const account = parseAccount(client.account);

            try {
                  const tradeMeta = await client.prepareTransactionRequest({
                        to: txConfig.to,
                        value: txConfig.amount,
                        data: txConfig.data,
                        chain: bscTestnet,
                        account,
                  });
                  const chainFormat = client.chain?.formatters?.transactionRequest?.format;
                  const format = chainFormat || formatTransactionRequest;

                  if (account.type === "local" && externalClient) {
                        const serializer = client.chain?.serializers?.transaction;
                        const signedTx = await account.signTransaction(format(tradeMeta), { serializer });
                        const txHash = await client.sendRawTransaction({ serializedTransaction: signedTx });
                        return await asyncClient.waitForTransactionReceipt({ hash: txHash, confirmations: 2 });
                  }

                  const txHash = await client.sendTransaction({
                        ...tradeMeta,
                        maxFeePerGas: undefined,
                        maxPriorityFeePerGas: undefined,
                  });
                  return await asyncClient.waitForTransactionReceipt({ hash: txHash, confirmations: 2 });
            } catch (error: unknown) {
                  const errParams = { ...txConfig, account: client.account };
                  throw getTransactionError(error as BaseError, errParams);
            }
      }

      public static async estimateSmartWalletFees({ userOps, trade, chainId }: SmartWalletGasParams): Promise<any> {
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

            let tradeGasEstimation = trade?.gasEstimate ?? (trade as any)?.gasUseEstimate ?? 0n;
            // biome-ignore lint/complexity/noForEach: <explanation>
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

            let gasCostInQuoteToken: CurrencyAmount<Currency> = CurrencyAmount.fromRawAmount(outputCurrency, 0n);
            let gasCostInBaseToken: CurrencyAmount<Currency> = CurrencyAmount.fromRawAmount(outputCurrency, 0n);
            let gasCostInUSD: CurrencyAmount<Currency> = CurrencyAmount.fromRawAmount(usdToken, 0n);

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
                  gasCostInQuoteToken,
                  gasCostInBaseToken,
                  gasCostInUSD,
            };
      }

      public static async getContractAllowance(
            tokenAddress: Address,
            owner: Address,
            spender: Address,
            chainId: ChainId,
            amountToCheck?: bigint,
      ): Promise<{ allowance: bigint; needsApproval: boolean }> {
            try {
                  const client = getViemClient({ chainId });

                  const allowance = await client.readContract({
                        functionName: "allowance",
                        args: [owner, spender],
                        address: tokenAddress,
                        abi: ERC20ABI,
                  });

                  let needsApproval = false;
                  if (amountToCheck && allowance < amountToCheck) {
                        needsApproval = true;
                        return { allowance, needsApproval };
                  }

                  return { allowance, needsApproval };
            } catch (error) {
                  throw getContractError(error as BaseError, {
                        abi: ERC20ABI,
                        address: tokenAddress,
                        args: [owner, spender],
                        functionName: "allowance",
                  });
            }
      }

      public static encodeSmartRouterTrade(args: [UserOp[], Hex], to: Address) {
            const { encodedSelector, encodedInput } = encodeOperation(OperationType.EXEC, args);
            const callData = encodedSelector.concat(encodedInput.substring(2)) as Hex;
            return { to, amount: 0n, data: callData };
      }

      public static async getUserSmartWalletDetails(userAddress: Address, chainId: ChainId) {
            const publicClient = getPublicClient({ chainId });
            const factory = getSmartWalletFactory(chainId);
            const address = await factory.read.walletAddress([userAddress, BigInt(0)]);

            const code = await publicClient.getBytecode({ address });
            const smartWallet = getSmartWallet(chainId, address);
            const nonce = code !== "0x" ? await smartWallet.read.nonce() : BigInt(0);
            return { address, nonce, wallet: smartWallet };
      }
}
