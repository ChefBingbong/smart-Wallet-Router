import { ChainId } from "@pancakeswap/chains";
import chalk from "chalk";
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import type { Address } from "viem";
import { ExtendedChainId } from "../src/constants/deploymentUtils";
import { PancakeSwapSmartWalletRouter } from "../src/smartWalletRouter2";

export type SmartWalletConfig = {
      chainId: ChainId | ExtendedChainId;
      smartWalletSigner: string;
      userWalletSigner: string;
      recipientAddress: Address;
      fromAsset: Address;
      toAsset: Address;
      amount: number | string;
      relayerFee: number | string;
};

async function main(config: SmartWalletConfig) {
      console.log(chalk.yellow(`Starting Smart Wallet Native Transfer: ${config.chainId}\n`));

      await PancakeSwapSmartWalletRouter.buildSmartWalletTrade();
}

const customConfig: SmartWalletConfig = {
      chainId: ChainId.BSC_TESTNET,
      smartWalletSigner: "22a557c558a2fa235e7d67839b697fc2fb1b53c8705ada632c07dee1eac330a4",
      userWalletSigner: "225bfce31326a62a6360dfc47c1b8f9ba0ad5b45c988fb66f2494cacd106048a",
      recipientAddress: "0x356c5fA625F89481a76d9f7Af4eD866CD8c6CB4B",
      fromAsset: "0xFa60D973F7642B748046464e165A65B7323b0DEE",
      toAsset: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      amount: "100000000000000000000000000",
      relayerFee: 0,
};

main(customConfig).catch((error) => {
      console.error(error);
      process.exitCode = 1;
});

export const assetsBaseConfig: Record<any, any> = {
      BUSD: {
            Icon: "Asset.BUSD",
            shortName: "BUSD",
            fullName: "Binance USD",
            decimals: 18,
            address: "0xaB1a4d4f1D656d2450692D237fdD6C7f9146e814",
            chain: "BinanceSmartChain",
            chainId: 97,
      },
      WBNB: {
            Icon: "Asset.WBNB",
            shortName: "WBNB",
            fullName: "Wrapped BNB",
            decimals: 18,
            address: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
            chain: "BinanceSmartChain",
            chainId: 97,
      },
      CAKE: {
            Icon: "Asset.CAKE",
            shortName: "CAKE",
            fullName: "PancakeCake Token",
            decimals: 18,
            address: "0xFa60D973F7642B748046464e165A65B7323b0DEE",
            chain: "BinanceSmartChain",
            chainId: 97,
      },
};
