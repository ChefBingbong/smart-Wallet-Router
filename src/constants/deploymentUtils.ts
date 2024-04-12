import { ChainId } from "@pancakeswap/chains";
import type { Address } from "viem";

export enum Contracts {
      ECDSAWalletFactory = "ECDSAWalletFactory",
      SmartWalletFactory = "SmartWalletFactory",
      Depositor = "Depositor",
      Permit2 = "Permit2",
}
export enum ExtendedChainId {
      POLYGON_TESTNET = 80001,
      LOCAL = 31337,
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
            Permit2: "0x",
            ...polygonTokens,
      },
      [ExtendedChainId.LOCAL]: {
            ECDSAWalletFactory: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
            SmartWalletFactory: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
            Depositor: "0x",
            Permit2: "0x",
            // weth: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
      },
      [ChainId.ETHEREUM]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.GOERLI]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.BSC]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.BSC_TESTNET]: {
            // ECDSAWalletFactory: "0x7Cc708b5175cf51aA87d90f85F77180e596638e8",
            SmartWalletFactory: "0x6831823A1DD41BB3D1700306f953146C0F5C7e9C",
            ECDSAWalletFactory: "0x7db8033a94b5F12ff34880D509e782220C2c40D4",
            // SmartWalletFactory: "0xA0BAC90193566cB5158aB74e067997B9f28e17AD",
            // '0x89b5B5d93245f543D53CC55923DF841349a65169'
            Depositor: "0x",
            Permit2: "0x89b5B5d93245f543D53CC55923DF841349a65169",
      },
      [ChainId.ZKSYNC_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.ZKSYNC]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.OPBNB_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.OPBNB]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.POLYGON_ZKEVM]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.POLYGON_ZKEVM_TESTNET]: {
            ECDSAWalletFactory: "0x4E06FBDb972F3473C4CD838156156F7B7dA0405D",
            SmartWalletFactory: "0x798e5A9A79f6229AB8792B5a98f2b49B1b3a3cF6",
            Depositor: "0x2BAF15BA3A2d06C763C03e17C15B9370C3c73b12",
            Permit2: "0x",
      },

      [ChainId.ARBITRUM_ONE]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.ARBITRUM_GOERLI]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.ARBITRUM_SEPOLIA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.SCROLL_SEPOLIA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.LINEA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.LINEA_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.BASE]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.BASE_TESTNET]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.BASE_SEPOLIA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
      [ChainId.SEPOLIA]: {
            ECDSAWalletFactory: "0x",
            SmartWalletFactory: "0x",
            Depositor: "0x",
            Permit2: "0x",
      },
};
