import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import * as dotenv from "dotenv";
dotenv.config();

const defaultAccounts = ["22a557c558a2fa235e7d67839b697fc2fb1b53c8705ada632c07dee1eac330a4"];

const config: HardhatUserConfig = {
     networks: {
          hardhat: {
               forking: {
                    enabled: true,
                    url: "https://eth.llamarpc.com",
                    blockNumber: 19595025,
               },
               gas: 3000000,
               // url: "http://127.0.0.1:8545",
               // chainId: 31337,
          },
          catalogMainnet: {
               url: "https://rpc.catalog.fi/testnet",
               accounts: defaultAccounts,
          },
          catalogTestnet: {
               url: "https://rpc.catalog.fi/testnet",
               accounts: defaultAccounts,
          },
          bobaMainnet: {
               url: "https://mainnet.boba.network",
               accounts: defaultAccounts,
          },
          ethereumMainnet: {
               url: "https://mainnet.infura.io/v3/e110322e378a4f268172084e63ac8b8d",
               accounts: defaultAccounts,
          },
          ethereumTestnet: {
               url: "https://goerli.infura.io/v3/e110322e378a4f268172084e63ac8b8d",
               accounts: defaultAccounts,
          },
          polygonMainnet: {
               url: "https://polygon-mainnet.infura.io/v3/e110322e378a4f268172084e63ac8b8d",
               accounts: defaultAccounts,
          },
          polygonTestnet: {
               url: "https://rpc.ankr.com/polygon_mumbai",
               accounts: defaultAccounts,
          },
          avalancheMainnet: {
               url: "https://rpc-mumbai.maticvigil.com/https://rpc-mumbai.maticvigil.com/",
               accounts: defaultAccounts,
          },
          avalancheTestnet: {
               url: "https://avalanche-fuji.infura.io/v3/47b89f1cf0cd47419f9a57674278610b",
               accounts: defaultAccounts,
          },
          arbitrumMainnet: {
               url: "https://arbitrum-mainnet.infura.io/v3/47b89f1cf0cd47419f9a57674278610b",
               accounts: defaultAccounts,
          },
          arbitrumTestnet: {
               url: "https://arbitrum-goerli.infura.io/v3/47b89f1cf0cd47419f9a57674278610b",
               accounts: defaultAccounts,
          },
          klaytnMainnet: {
               url: "https://public-node-api.klaytnapi.com/v1/cypress",
               accounts: defaultAccounts,
          },
          klaytnTestnet: {
               url: "https://api.baobab.klaytn.net:8651",
               accounts: defaultAccounts,
          },
          fantomMainnet: {
               url: "https://rpc.ftm.tools/",
               accounts: defaultAccounts,
          },
          fantomTestnet: {
               url: "https://rpc.testnet.fantom.network/",
               accounts: defaultAccounts,
          },
          optimismMainnet: {
               url: "https://optimism-mainnet.infura.io/v3/e110322e378a4f268172084e63ac8b8d",
               accounts: defaultAccounts,
          },
          optimismTestnet: {
               url: "https://optimism-goerli.infura.io/v3/e110322e378a4f268172084e63ac8b8d",
               accounts: defaultAccounts,
          },
          gnosisMainnet: {
               url: "https://rpc.gnosischain.com/",
               accounts: defaultAccounts,
          },
          auroraMainnet: {
               url: "https://aurora-mainnet.infura.io/v3/e110322e378a4f268172084e63ac8b8d",
               accounts: defaultAccounts,
          },
          auroraTestnet: {
               url: "https://aurora-testnet.infura.io/v3/e110322e378a4f268172084e63ac8b8d",
               accounts: defaultAccounts,
          },
          bnbMainnet: {
               url: "https://bsc-dataseed1.binance.org/",
               accounts: defaultAccounts,
          },
          bnbTestnet: {
               url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
               accounts: defaultAccounts,
          },
          moonbeamMainnet: {
               url: "https://moonbase-alpha.public.blastapi.io",
               accounts: defaultAccounts,
          },
          moonbeamTestnet: {
               url: "https://rpc.api.moonriver.moonbeam.network/",
               accounts: defaultAccounts,
          },
          zkEvmTestnet: {
               url: "https://polygon-zkevm-testnet.rpc.thirdweb.com",
               accounts: defaultAccounts,
          },
     },

     namedAccounts: {
          deployer: {
               default: 0, // here this will by default take the first account as deployer
          },
     },
     solidity: {
          version: "0.8.17",
          settings: {
               viaIR: true,
               optimizer: {
                    enabled: true,
                    runs: 1000,
               },
          },
     },
};

export default config;
