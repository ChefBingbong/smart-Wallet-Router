import { PancakeSwapSmartWalletRouter } from "../smartWalletRouter2";

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

const replacer = (key: any, value: any) => {
      if (typeof value === "bigint") {
            return `${value.toString()}xxx`;
      }
      return value;
};

const jsonString = JSON.stringify(trade ?? { hey: "ss" }, replacer);
// console.log(jsonString)

const parsedObj = JSON.parse(jsonString, (key, value) => {
      if (typeof value === "string" && value.endsWith("xxx")) {
            return BigInt(value.slice(0, -3)); // Extract the number part and convert it to BigInt
      }
      return value;
});

console.log(parsedObj);
async function main() {
      const r = await PancakeSwapSmartWalletRouter.estimateSmartWalletFees({
            userOps: [],
            trade: parsedObj as any,
            chainId: 97,
      });
      console.log(r);
}
main();
