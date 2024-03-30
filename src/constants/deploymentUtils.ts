import { ChainId } from "@pancakeswap/chains";
import type { Address } from "viem";
import {
      sepoliaTokens,
      ethereumTokens,
      goerliTestnetTokens,
      bscTokens,
      bscTestnetTokens,
      zksyncTokens,
      zkSyncTestnetTokens,
      opBnbTestnetTokens,
      opBnbTokens,
      polygonZkEvmTokens,
      polygonZkEvmTestnetTokens,
      arbitrumTokens,
      arbitrumGoerliTokens,
      arbSepoliaTokens,
      scrollSepoliaTokens,
      lineaTokens,
      baseTokens,
      baseTestnetTokens,
      baseSepoliaTokens,
} from "@pancakeswap/tokens";
import { lineaTestnet } from "viem/chains";

export enum Contracts {
      ECDSAWalletFactory = "ECDSAWalletFactory",
      SmartWalletFactory = "SmartWalletFactory",
      Depositor = "Depositor",
      weth = "weth",
      wbtc = "wbtc",
}
export enum ExtendedChainId {
      POLYGON_TESTNET = 80001,
}
type Deployments = {
      [chain in ChainId | ExtendedChainId]: { [contract in Contracts]: Address };
};

export const polygonTokens = {
      weth: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
};

export const Deployments: Deployments = {
      [ExtendedChainId.POLYGON_TESTNET]: {
            ECDSAWalletFactory: "0xC6D72727dAD90e4711412e369aE67706d0EF7C02",
            SmartWalletFactory: "0xab381dB93d006bF653D62c1727D418f6E76a28e7",
            Depositor: "0x",
            wbtc: "0x",
            ...polygonTokens,
      },
      [ChainId.ETHEREUM]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            ...ethereumTokens,
      },
      [ChainId.GOERLI]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...goerliTestnetTokens,
      },
      [ChainId.BSC]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...bscTokens,
      },
      [ChainId.BSC_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...bscTestnetTokens,
      },
      [ChainId.ZKSYNC_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...zkSyncTestnetTokens,
      },
      [ChainId.ZKSYNC]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...zksyncTokens,
      },
      [ChainId.OPBNB_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...opBnbTestnetTokens,
      },
      [ChainId.OPBNB]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...opBnbTokens,
      },
      [ChainId.POLYGON_ZKEVM]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...polygonZkEvmTokens,
      },
      [ChainId.POLYGON_ZKEVM_TESTNET]: {
            ECDSAWalletFactory: "0x052305e528e7f74f8797F78d2A1BdfbF541837eE",
            SmartWalletFactory: "0xE0Ea28e7F775D01CBf1aee71F233b4D26f050d09",
            Depositor: "0x51599e716D568616C497271f0578af0018255872",
            wbtc: "0xF8C44B2dA7AB773278e5c9E5d59b6401da2D078e",
            ...polygonZkEvmTestnetTokens,
      },
      [ChainId.ARBITRUM_ONE]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...arbitrumTokens,
      },
      [ChainId.ARBITRUM_GOERLI]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...arbitrumGoerliTokens,
      },
      [ChainId.ARBITRUM_SEPOLIA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...arbSepoliaTokens,
      },
      [ChainId.SCROLL_SEPOLIA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...scrollSepoliaTokens,
      },
      [ChainId.LINEA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...lineaTokens,
      },
      [ChainId.LINEA_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...lineaTestnet,
      },
      [ChainId.BASE]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...baseTokens,
      },
      [ChainId.BASE_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...baseTestnetTokens,
      },
      [ChainId.BASE_SEPOLIA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...baseSepoliaTokens,
      },
      [ChainId.SEPOLIA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            wbtc: "0x",
            ...sepoliaTokens,
      },
};
