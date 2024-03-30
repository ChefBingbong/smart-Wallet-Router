import { ChainId } from "@pancakeswap/chains";
import type { Address } from "viem";

export enum Contracts {
      ECDSAWalletFactory = "ECDSAWalletFactory",
      SmartWalletFactory = "SmartWalletFactory",
      Depositor = "Depositor",
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
            ...polygonTokens,
      },
      [ChainId.ETHEREUM]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.GOERLI]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.BSC]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.BSC_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.ZKSYNC_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.ZKSYNC]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.OPBNB_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.OPBNB]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.POLYGON_ZKEVM]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.POLYGON_ZKEVM_TESTNET]: {
            ECDSAWalletFactory: "0x4E06FBDb972F3473C4CD838156156F7B7dA0405D",
            SmartWalletFactory: "0x798e5A9A79f6229AB8792B5a98f2b49B1b3a3cF6",
            Depositor: "0x2BAF15BA3A2d06C763C03e17C15B9370C3c73b12",
      },

      [ChainId.ARBITRUM_ONE]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.ARBITRUM_GOERLI]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.ARBITRUM_SEPOLIA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.SCROLL_SEPOLIA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.LINEA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.LINEA_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.BASE]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.BASE_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.BASE_SEPOLIA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
      [ChainId.SEPOLIA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
      },
};
