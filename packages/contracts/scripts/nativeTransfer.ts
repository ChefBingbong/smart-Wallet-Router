import { ChainId } from "@pancakeswap/chains";
import chalk from "chalk";
import { ethers } from "hardhat";
import type { Address } from "viem";
import type { UserOp } from "../test/utils/sign";
import { Deployments, ExtendedChainId } from "../src/constants/deploymentUtils";
import { PUBLIC_NODES } from "../src/provider/chains";
import { sleep } from "../src/utils/sleep";
import { signTypedTx } from "../src/utils/typedMetaTx";
import { ECDSAWalletFactory__factory, ECDSAWallet__factory } from "../typechain-types";

export type SmartWalletConfig = {
     chainId: ChainId | ExtendedChainId;
     smartWalletSigner: string;
     userWalletSigner: string;
     recipientAddress: Address;
     amount: number | string;
     relayerFee: number | string;
};

async function main(config: SmartWalletConfig) {
     console.log(chalk.yellow(`Starting Smart Wallet Native Transfer: ${config.chainId}\n`));
     const amountFormatted = config.amount;

     const chainId = config.chainId;
     const provider = new ethers.providers.JsonRpcProvider(PUBLIC_NODES[chainId][0]);

     const deployerPk = config?.smartWalletSigner;
     const userPk = config?.userWalletSigner;
     const smartWalletSigner = new ethers.Wallet(deployerPk, provider);
     const userWalletSigner = new ethers.Wallet(userPk, provider);

     const smartWalletFactory = ECDSAWalletFactory__factory.connect(
          Deployments[chainId].ECDSAWalletFactory,
          smartWalletSigner,
     );

     const userSmartWalletAddress = await smartWalletFactory.walletAddress(userWalletSigner.address, 0);

     const userBalancBeforer = await provider.getBalance(userWalletSigner.address);
     const signerBalBefore = await provider.getBalance(smartWalletSigner.address);
     const userSWBalanceBefore = await provider.getBalance(userSmartWalletAddress);
     const recipientBalanceBefore = await provider.getBalance(config.recipientAddress);

     console.log(chalk.yellow(`User bal before: ${userBalancBeforer}`));
     console.log(chalk.yellow(`sigmert bal before: ${signerBalBefore}`));
     console.log(chalk.yellow(`User Smart Wallet bal before: ${userSWBalanceBefore}`));
     console.log(chalk.yellow(`Recipient bal before: ${recipientBalanceBefore}\n`));

     await sleep(2000);

     const userWalletContractCode = await provider.getCode(userSmartWalletAddress);
     if (userWalletContractCode === "0x") {
          console.log(
               chalk.yellow(
                    `Smart wallet not deployed for ${userWalletSigner.address}, please run deloySmartWallet.ts`,
               ),
          );
          return;
     }

     const userSmartWallet = ECDSAWallet__factory.connect(userSmartWalletAddress, smartWalletSigner);
     const currentWalletTxNonce = (await userSmartWallet?.nonce()) ?? 0;

     const userOps: UserOp[] = [
          {
               to: userSmartWalletAddress,
               amount: amountFormatted,
               data: "0x",
          },
     ];

     const signature = await signTypedTx(
          userOps,
          userWalletSigner,
          userSmartWalletAddress,
          currentWalletTxNonce,
          chainId,
          chainId,
     );

     const metaExecTxCallData = await userSmartWallet
          .connect(smartWalletSigner)
          .populateTransaction.exec(userOps, signature);

     const smartWalletTx = await smartWalletSigner.sendTransaction(metaExecTxCallData);
     const txReciept = await smartWalletTx.wait(1);

     console.log(chalk.green(`transfer successful ${txReciept.transactionHash}\n`));
     await sleep(1500);

     const userBalanceAfter = await provider.getBalance(userWalletSigner.address);
     const signerBalAfter = await provider.getBalance(smartWalletSigner.address);
     const userSWBalanceAfter = await provider.getBalance(userSmartWalletAddress);
     const recipientBalanceAfter = await provider.getBalance(config.recipientAddress);
     console.log(chalk.yellow(`User bal after: ${userBalanceAfter}`));
     console.log(chalk.yellow(`signer Wallet bal after: ${signerBalAfter}`));
     console.log(chalk.yellow(`Smart Wallet bal after: ${userSWBalanceAfter}`));
     console.log(chalk.yellow(`Recipient bal after: ${recipientBalanceAfter}`));
}

const customConfig: SmartWalletConfig = {
     chainId: ExtendedChainId.LOCAL,
     smartWalletSigner: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
     userWalletSigner: "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
     recipientAddress: "0x356c5fA625F89481a76d9f7Af4eD866CD8c6CB4B",
     amount: "10000000000000000",
     relayerFee: 18000000000,
};

main(customConfig).catch((error) => {
     console.error(error);
     process.exitCode = 1;
});
