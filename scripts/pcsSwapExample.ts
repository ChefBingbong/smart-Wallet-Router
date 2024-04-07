import IPancakePair from "../abis/IPancakePair.json";
import PCAKE_ROUTERABI from "../abis/PancakeRouter.json";
import FACTORY_ABI from "../abis/FactoryAbi.json";
import Web3 from "web3";
import { useCallback } from "react";
import { NoEthereumProviderError } from "@web3-react/injected-connector";
import {
      Fetcher,
      Token,
      TradeType,
      Percent,
      Route,
      Trade,
      TokenAmount,
      Pair,
      // ChainId,
} from "@pancakeswap-libs/sdk";
import { JsonRpcProvider } from "@ethersproject/providers";
import { ChainId } from "@pancakeswap/chains";
import chalk from "chalk";
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import type { Address } from "viem";
import type { UserOp } from "../src/api";
import { Deployments, ExtendedChainId } from "../src/constants/deploymentUtils";
import { PUBLIC_NODES } from "../src/provider/chains";
import { sleep } from "../src/utils/sleep";
import { signTypedTx } from "../src/utils/typedMetaTx";
import { parseContractError } from "../test/utils/error";
import type { Transaction } from "../test/utils/sign";
import { ECDSAWalletFactory__factory, ECDSAWallet__factory, ERC20__factory } from "../typechain-types";
import { slice } from "lodash";
import { defaultAbiCoder, formatUnits } from "ethers/lib/utils";
import { PancakeSwapSmartWalletlRouter } from "../src/smartWalletRouter";

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

const addresses = {
      PANCAKE_ROUTER: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
};

const fetchPairData = async (tokenA: Token, tokenB: Token, provider: JsonRpcProvider) => {
      const factory = new ethers.Contract("0x6725f303b657a9451d8ba641348b6761a6cc7a17", FACTORY_ABI, provider);

      const pairAddress = await factory.getPair(tokenA.address, tokenB.address);

      const [reserves0, reserves1] = await new ethers.Contract(pairAddress, IPancakePair, provider).getReserves();
      const balances = tokenA.sortsBefore(tokenB) ? [reserves0, reserves1] : [reserves1, reserves0];
      return new Pair(new TokenAmount(tokenA, balances[0]), new TokenAmount(tokenB, balances[1]));
};
async function main(config: SmartWalletConfig) {
      console.log(chalk.yellow(`Starting Smart Wallet Native Transfer: ${config.chainId}\n`));
      const swapCalls = [
            {
                  address: "0x9a489505a00cE272eAa5e07Dba6491314CaE3796",
                  calldata: "0x5ae401dc00000000000000000000000000000000000000000000000000000000660da9ac00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000e4472b43f3000000000000000000000000000000000000000000000d5bae9c493d6768000000000000000000000000000000000000000000000000000000000006a785118b0000000000000000000000000000000000000000000000000000000000000080000000000000000000000000a7c46c163dd8625ba1458ed066ece7b26a045af50000000000000000000000000000000000000000000000000000000000000002000000000000000000000000fa60d973f7642b748046464e165a65b7323b0dee000000000000000000000000ed24fc36d5ee211ea25a80239fb8c4cfd80f12ee00000000000000000000000000000000000000000000000000000000",
                  value: "0x00",
            },
      ];

      const swr = new PancakeSwapSmartWalletlRouter("0xC39D95F6156B2eCB9977BCc75Ca677a80e06c60D", 97, {
            tokenAddress: "0xFa60D973F7642B748046464e165A65B7323b0DEE",
            amount: "63082000000000000000000",
            outputAmount: "28723221226",
            outPutTokenAddress: "0xeD24FC36d5Ee211Ea25A80239Fb8C4Cfd80f12Ee",
            calls: swapCalls,
      });
      // const c = await swr.estimateFeesInInutToken();
      // return;
      const s = await swr.getTypedTxMetaData();
      return;
      const chainId = config.chainId;
      const provider = new ethers.providers.JsonRpcProvider(PUBLIC_NODES[chainId][0]);

      const userPk = config?.userWalletSigner;
      const userWalletSigner = new ethers.Wallet(userPk, provider);

      // console.log(s.externalApprovalOp);
      console.log(s);
      // console.log(c);

      if (s.externalApprovalOp) {
            const userApproval = await userWalletSigner.sendTransaction(s.externalApprovalOp);
            const r = await userApproval.wait(1);
            console.log(r);
      }

      const signature = await userWalletSigner._signTypedData(s.domain, s.types, s.values);
      const signatureEncoded = defaultAbiCoder.encode(["uint256", "bytes"], [97, signature]);

      const txReciept = await swr.executeSmartWallet(signatureEncoded, s.values.userOps, false);
      if (txReciept.execTx) {
            const smartWalletTx = await userWalletSigner.sendTransaction(txReciept.execTx);
            const r = await smartWalletTx.wait(1);
            console.log(r);
      }

      console.log(txReciept.txCost);
      // const smartWalletFactory = ECDSAWalletFactory__factory.connect(
      //       Deployments[chainId].ECDSAWalletFactory,
      //       smartWalletSigner
      // );

      // const userSmartWalletAddress = await smartWalletFactory.walletAddress(
      //       userWalletSigner.address,
      //       0
      // );

      // const userBalance = await provider.getBalance(userWalletSigner.address);
      // const userSWBalance = await provider.getBalance(smartWalletSigner.address);
      // const recipientBalance = await provider.getBalance(config.recipientAddress);

      // console.log(chalk.yellow(`User bal before: ${userBalance}`));
      // console.log(chalk.yellow(`User Smart Wallet bal before: ${userSWBalance}`));
      // console.log(chalk.yellow(`Recipient bal before: ${recipientBalance}\n`));

      // await sleep(2000);

      // const userWalletContractCode = await provider.getCode(userSmartWalletAddress);

      // const userSmartWallet = ECDSAWallet__factory.connect(
      //       userSmartWalletAddress,
      //       smartWalletSigner
      // );
      // const currentWalletTxNonce = (await userSmartWallet?.nonce()) ?? 0;

      // const tradeAmount = config.amount.toString();
      // const [token0, token1] = await Promise.all(
      //       [config.fromAsset, config.toAsset].map(
      //             (tokenAddress) => new Token(ChainId.BSC_TESTNET, tokenAddress, 18)
      //       )
      // );

      // const pair = await fetchPairData(token0, token1, provider);
      // const route = await new Route([pair], token0);
      // const trade = await new Trade(
      //       route,
      //       new TokenAmount(token0, tradeAmount as any),
      //       TradeType.EXACT_INPUT
      // );

      // const slippageTolerance = new Percent("50", "10000");

      // // create transaction parameters
      // const amountOutMin = trade.minimumAmountOut(slippageTolerance).raw;
      // const convertedOutAmount = Number(amountOutMin) / 10 ** 18; //for now i know token decimals chagge
      // const path = [config.fromAsset, config.toAsset];
      // const to = userWalletSigner.address;
      // const deadline = Math.floor(Date.now() / 1000) + 60 * 20;

      // const tx = [
      //       config.amount,
      //       Number(amountOutMin),
      //       path,
      //       to,
      //       deadline,
      //       {
      //             gasLimit: ethers.utils.hexlify(200000),
      //       },
      // ];

      // console.log(convertedOutAmount, Number(amountOutMin));

      // const approvalTx = await ERC20__factory.connect(
      //       config.fromAsset,
      //       userWalletSigner
      // ).approve(userSmartWalletAddress, config.amount);

      // await approvalTx.wait(1);
      // const populatedTransferTx = await ERC20__factory.connect(
      //       config.fromAsset,
      //       userWalletSigner
      // ).populateTransaction.transferFrom(
      //       userWalletSigner.address,
      //       userSmartWalletAddress,
      //       config.amount
      // );
      // console.log(
      //       await ERC20__factory.connect(
      //             config.fromAsset,
      //             userWalletSigner
      //       ).balanceOf(
      //             // "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
      //             userSmartWalletAddress
      //             // "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
      //             // userSmartWalletAddress
      //       )
      // );
      // const populatedApprovalTx = await ERC20__factory.connect(
      //       config.fromAsset,
      //       smartWalletSigner
      // ).populateTransaction.approve(
      //       "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
      //       config.amount
      // );

      // const pancakeswap = new ethers.Contract(
      //       "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
      //       PCAKE_ROUTERABI,
      //       smartWalletSigner
      // );
      // const populatedSwapTx =
      //       await pancakeswap.populateTransaction.swapExactTokensForTokens?.(...tx);

      // const userOps: UserOp[] = [
      //       {
      //             to: populatedTransferTx.to,
      //             amount: "0",
      //             data: populatedTransferTx.data,
      //       },
      //       {
      //             to: populatedApprovalTx.to,
      //             amount: "0",
      //             data: populatedApprovalTx.data,
      //       },
      //       {
      //             to: populatedSwapTx.to,
      //             amount: "0",
      //             data: populatedSwapTx.data,
      //       },
      // ];

      // const signature = await signTypedTx(
      //       userOps,
      //       userWalletSigner,
      //       userSmartWalletAddress,
      //       currentWalletTxNonce,
      //       chainId,
      //       chainId
      // );

      // const metaExecTxCallData = await userSmartWallet
      //       .connect(smartWalletSigner)
      //       .populateTransaction.exec(userOps, signature);

      // const smartWalletTx = await smartWalletSigner.sendTransaction(
      //       metaExecTxCallData
      // );
      // const txReciept = await smartWalletTx.wait(1);

      // console.log(chalk.green(`transfer successful ${txReciept.transactionHash}\n`));
}
// address
// :
// "0x9a489505a00cE272eAa5e07Dba6491314CaE3796"
// calldata
// :
// "0x5ae401dc00000000000000000000000000000000000000000000000000000000660d3f9900000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000e404e45aaf000000000000000000000000fa60d973f7642b748046464e165a65b7323b0dee000000000000000000000000ae13d989dac2f0debff460ac112a837c89baa7cd0000000000000000000000000000000000000000000000000000000000002710000000000000000000000000c39d95f6156b2ecb9977bcc75ca677a80e06c60d00000000000000000000000000000000000000000000130edb0660dc9cdc000000000000000000000000000000000000000000000000000000000000a76ca574000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"
// value
// :
// "0x00"
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
