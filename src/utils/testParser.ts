import { SmartRouter, SmartRouterTrade } from "@pancakeswap/smart-router";
import { PancakeSwapSmartWalletRouter } from "../smartWalletRouter";
import { CurrencyAmount, TradeType } from "@pancakeswap/swap-sdk-core";
import { BUSD_TESTNET, CAKE_TESTNET } from "@pancakeswap/tokens";
import { getPublicClient } from "../provider/walletClient";
import { getViemClients } from "../provider/client";
import { WNATIVE } from "@pancakeswap/sdk";
import { RouterTradeType } from "../encoder/buildOperation";
import { Routers } from "../encoder/buildOperation";
import { SmartWalletTradeOptions } from "../types/smartWallet";

const trade = {
      tradeType: 0,
      routes: [
            {
                  percent: 100,
                  type: 1,
                  pools: [
                        {
                              type: 1,
                              token0: {
                                    chainId: 97,
                                    decimals: 18,
                                    symbol: "WBNB",
                                    isNative: false,
                                    isToken: true,
                                    address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
                              },
                              token1: {
                                    chainId: 97,
                                    decimals: 18,
                                    symbol: "CAKE",
                                    isNative: false,
                                    isToken: true,
                                    address: "0xFa60D973F7642B748046464e165A65B7323b0DEE",
                              },
                              fee: 10000,
                              liquidity: "1913215756141381620982108xxx",
                              sqrtRatioX96: "445106238770258671016912788768541574xxx",
                              tick: 310845,
                              address: "0x703bc57fc0a39bd81D668B2477f7c20E546945fD",
                              token0ProtocolFee: { numerator: "32xxx", denominator: "100xxx", isPercent: true },
                              token1ProtocolFee: { numerator: "32xxx", denominator: "100xxx", isPercent: true },
                        },
                        {
                              type: 1,
                              token0: {
                                    chainId: 97,
                                    decimals: 18,
                                    symbol: "WBNB",
                                    isNative: false,
                                    isToken: true,
                                    address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
                              },
                              token1: {
                                    chainId: 97,
                                    decimals: 18,
                                    symbol: "BUSD",
                                    isNative: false,
                                    isToken: true,
                                    address: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
                              },
                              fee: 2500,
                              liquidity: "32327086774529248510xxx",
                              sqrtRatioX96: "276551843588733602088612387846xxx",
                              tick: 25002,
                              address: "0x994fA482580Fe98C53cF79be61768eb3d01795b8",
                              token0ProtocolFee: { numerator: "32xxx", denominator: "100xxx", isPercent: true },
                              token1ProtocolFee: { numerator: "32xxx", denominator: "100xxx", isPercent: true },
                        },
                  ],
                  path: [
                        {
                              chainId: 97,
                              decimals: 18,
                              symbol: "CAKE",
                              isNative: false,
                              isToken: true,
                              address: "0xFa60D973F7642B748046464e165A65B7323b0DEE",
                        },
                        {
                              chainId: 97,
                              decimals: 18,
                              symbol: "WBNB",
                              isNative: false,
                              isToken: true,
                              address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
                        },
                        {
                              chainId: 97,
                              decimals: 18,
                              symbol: "BUSD",
                              isNative: false,
                              isToken: true,
                              address: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
                        },
                  ],
                  inputAmount: {
                        numerator: "40000000000000000000000xxx",
                        denominator: "1xxx",
                        currency: {
                              chainId: 97,
                              decimals: 18,
                              symbol: "CAKE",
                              isNative: false,
                              isToken: true,
                              address: "0xFa60D973F7642B748046464e165A65B7323b0DEE",
                        },
                        decimalScale: "1000000000000000000xxx",
                  },
                  outputAmount: {
                        numerator: "15248735840xxx",
                        denominator: "1xxx",
                        currency: {
                              chainId: 97,
                              decimals: 18,
                              symbol: "BUSD",
                              isNative: false,
                              isToken: true,
                              address: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
                        },
                        decimalScale: "1000000000000000000xxx",
                  },
            },
      ],
      gasEstimate: "193000xxx",
      gasEstimateInUSD: {
            numerator: "0xxx",
            denominator: "1xxx",
            currency: {
                  chainId: 97,
                  decimals: 18,
                  symbol: "USDT",
                  isNative: false,
                  isToken: true,
                  address: "0x0fB5D7c73FA349A90392f873a4FA1eCf6a3d0a96",
            },
            decimalScale: "1000000000000000000xxx",
      },
      inputAmount: {
            numerator: "40000000000000000000000xxx",
            denominator: "1xxx",
            currency: {
                  chainId: 97,
                  decimals: 18,
                  symbol: "CAKE",
                  isNative: false,
                  isToken: true,
                  address: "0xFa60D973F7642B748046464e165A65B7323b0DEE",
            },
            decimalScale: "1000000000000000000xxx",
      },
      outputAmount: {
            numerator: "15248735840xxx",
            denominator: "1xxx",
            currency: {
                  chainId: 97,
                  decimals: 18,
                  symbol: "BUSD",
                  isNative: false,
                  isToken: true,
                  address: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
            },
            decimalScale: "1000000000000000000xxx",
      },
      blockNumber: 39190064,
};

const options = {
      recipient: "0xC39D95F6156B2eCB9977BCc75Ca677a80e06c60D",
      slippageTolerance: {
            numerator: "50xxx",
            denominator: "10000xxx",
            isPercent: true,
      },
      deadlineOrPreviousBlockhash: "1712288654",
};

const USEROP = [
      {
            to: "0x8d008B313C1d6C7fE2982F62d32Da7507cF43551",
            amount: 0n,
            data: "0x23b872dd000000000000000000000000c39d95f6156b2ecb9977bcc75ca677a80e06c60d000000000000000000000000a7c46c163dd8625ba1458ed066ece7b26a045af500000000000000000000000000000000000000000000000000b1a2bc2ec50000",
      },
      {
            to: "0x8d008B313C1d6C7fE2982F62d32Da7507cF43551",
            amount: 0n,
            data: "0x095ea7b30000000000000000000000009a082015c919ad0e47861e5db9a1c7070e81a2c700000000000000000000000000000000000000000000000000b1a2bc2ec50000",
      },
      // {
      //   to: '0x9A082015c919AD0E47861e5Db9A1c7070E81A2C7',
      //   amount: 0n,
      //   data: '0x3593564c000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000660f738e00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000100000000000000000000000000c39d95f6156b2ecb9977bcc75ca677a80e06c60d00000000000000000000000000000000000000000000000000b1a2bc2ec5000000000000000000000000000000000000000000000000000000003a37897d893800000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002b8d008b313c1d6c7fe2982f62d32da7507cf435510001f4ae13d989dac2f0debff460ac112a837c89baa7cd000000000000000000000000000000000000000000'
      // }
];
const replacer = (key: any, value: any) => {
      if (typeof value === "bigint") {
            return `${value.toString()}xxx`;
      }
      return value;
};

const jsonString = JSON.stringify(trade ?? { hey: "ss" }, replacer);
const jsonString2 = JSON.stringify(options ?? { hey: "ss" }, replacer);

// console.log(jsonString)

const parsedObj = JSON.parse(jsonString, (key, value) => {
      if (typeof value === "string" && value.endsWith("xxx")) {
            return BigInt(value.slice(0, -3)); // Extract the number part and convert it to BigInt
      }
      return value;
}) as SmartRouterTrade<TradeType>;

const parsedObj2 = JSON.parse(jsonString2, (key, value) => {
      if (typeof value === "string" && value.endsWith("xxx")) {
            return BigInt(value.slice(0, -3)); // Extract the number part and convert it to BigInt
      }
      return value;
});
console.log(parsedObj);

async function main() {
      const pools = await SmartRouter.getV3CandidatePools({
            currencyA: CAKE_TESTNET,
            currencyB: WNATIVE[97],
            // subgraphProvider: ({ chainId }) => (chainId ? v3Clients[chainId] : undefined),
            onChainProvider: getViemClients as any,
            blockNumber: await getPublicClient({ chainId: 97 }).getBlockNumber(),
      });
      const poolProvider = SmartRouter.createStaticPoolProvider(pools);
      const quoteProvider = SmartRouter.createQuoteProvider({ onChainProvider: getPublicClient as any });
      const deferAmount = CurrencyAmount.fromRawAmount(CAKE_TESTNET, (50 * 10 ** 15).toString());

      const res = await SmartRouter.getBestTrade(deferAmount, WNATIVE[97], TradeType.EXACT_INPUT, {
            gasPriceWei: await getPublicClient({ chainId: 97 }).getGasPrice(),
            // maxHops,
            poolProvider,
            // maxSplits,
            quoteProvider,
            // allowedPoolTypes: poolTypes,
            // quoterOptimization,
            // quoteCurrencyUsdPrice,
            // nativeCurrencyUsdPrice,
            // signal,
      });
      const smartWalletDetails = await PancakeSwapSmartWalletRouter.getUserSmartWalletDetails(
            "0xC39D95F6156B2eCB9977BCc75Ca677a80e06c60D",
            97,
      );

      const feeOptions = await PancakeSwapSmartWalletRouter.estimateSmartWalletFees({
            userOps: USEROP as any,
            trade: res as any,
            chainId: 97,
      });
      const ops: SmartWalletTradeOptions = {
            router: Routers.UniversalRouter,
            underlyingTradeOptions: parsedObj2,
            requiresExternalApproval: true,
            SmartWalletTradeType: RouterTradeType.CustomFeeCurrencyTrade,
            smartWalletDetails,
            account: "0xC39D95F6156B2eCB9977BCc75Ca677a80e06c60D",
            chainId: 97,
            feeOptions,
      };

      const r = PancakeSwapSmartWalletRouter.buildSmartWalletTrade(res as any, ops) as any;
      console.log(r);
}
main();
