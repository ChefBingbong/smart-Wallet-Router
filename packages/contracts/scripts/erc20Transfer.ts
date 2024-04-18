import { ChainId } from "@pancakeswap/chains";
import chalk from "chalk";
import { ethers } from "hardhat";
import type { Address } from "viem";
import type { UserOp } from "../test/utils/sign";
import { Deployments, type ExtendedChainId } from "../src/constants/deploymentUtils";
import { PUBLIC_NODES } from "../src/provider/chains";
import { sleep } from "../src/utils/sleep";
import { signTypedTx } from "../src/utils/typedMetaTx";
import { parseContractError } from "../test/utils/error";
import type { Transaction } from "../test/utils/sign";
import { ECDSAWalletFactory__factory, ECDSAWallet__factory, ERC20__factory } from "../typechain-types";
import { formatUnits } from "ethers/lib/utils";

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
     const relayerFormatted = formatUnits(config.relayerFee, "gwei");
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

     const ERC20Asset = ERC20__factory.connect("0x80a14816eCfC8454962dad80d882E8e8fFCb1819", smartWalletSigner);

     const userBalance = await provider.getBalance(userWalletSigner.address);
     const userSWBalance = await provider.getBalance(smartWalletSigner.address);
     const recipientBalance = await provider.getBalance(config.recipientAddress);

     console.log(chalk.yellow(`User bal before: ${userBalance}`));
     console.log(chalk.yellow(`User Smart Wallet bal before: ${userSWBalance}`));
     console.log(chalk.yellow(`Recipient bal before: ${recipientBalance}\n`));

     await sleep(2000);

     const userWalletContractCode = await provider.getCode(userSmartWalletAddress);

     let isCreationTx = false;
     if (userWalletContractCode === "0x") {
          isCreationTx = true;
          console.log(
               // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
               chalk.yellow(`Wallet Not deployed yet. initiating creation Tx.`),
          );
          await sleep(2000);

          const relayerFee = Number(config.relayerFee);
          const feeThreshold = 10000;

          if (!relayerFee || Number(relayerFormatted) < feeThreshold) {
               console.log(
                    chalk.red(
                         `The relayer needs to be funded on wallet creation to 
                              fund the deployement cost. please add relayer fee param!`,
                    ),
               );
               return;
          }
          const userWalletCreationTx = await smartWalletFactory.createWallet(userWalletSigner.address);
          const receipt = await userWalletCreationTx.wait(2);
          console.log(
               chalk.yellow(
                    `Successfully deployed user Smart Wallet at tx: ${receipt.transactionHash},
                        Now Proceeding to execute Transfer Tx.`,
               ),
          );
     }

     const userSmartWallet = ECDSAWallet__factory.connect(userSmartWalletAddress, provider);
     const currentWalletTxNonce = (await userSmartWallet?.nonce()) ?? 0;

     const populatedTransferTx = await ERC20Asset.connect(smartWalletSigner).populateTransaction.transfer(
          config.recipientAddress,
          config.amount,
     );

     const transferTx: UserOp = {
          to: ERC20Asset.address as Address,
          amount: 0n,
          data: populatedTransferTx.data as Hex,
     };

     const userOps = [transferTx];

     const signature = await signTypedTx(
          userOps,
          userWalletSigner,
          userSmartWalletAddress as Address,
          currentWalletTxNonce,
          chainId,
          chainId,
     );

     const transaction: Transaction = {
          userOps,
          chainID: chainId,
          signature,
     };

     if (isCreationTx && config.relayerFee) {
          try {
               const gasPrice = await userSmartWallet.provider.getGasPrice();
               const gas = await userSmartWallet.estimateGas.exec(transaction.userOps as any, transaction.signature, {
                    gasLimit: 200000,
               });

               const txCost = gasPrice.mul(gas);
               if (txCost.gt(transaction.userOps[0].amount)) {
                    console.log(
                         chalk.red(`
                              Insufficient fee payment for Smart wallet, gas
                              cost is greater than fee`),
                    );
                    return;
               }
          } catch (err: unknown) {
               console.log(parseContractError(err));
               return;
          }
     }
     const metaExecTxCallData = await userSmartWallet
          .connect(smartWalletSigner)
          .populateTransaction.exec(userOps, signature);

     const smartWalletTx = await smartWalletSigner.sendTransaction(metaExecTxCallData);
     const txReciept = await smartWalletTx.wait(1);

     console.log(chalk.green("transfer successful}\n", txReciept));
     console.log(txReciept);
     await sleep(1500);

     const userBalanceAfter = await provider.getBalance(userWalletSigner.address);
     const userSWBalanceAfter = await provider.getBalance(smartWalletSigner.address);
     const recipientBalanceAfter = await provider.getBalance(config.recipientAddress);
     console.log(chalk.yellow(`User bal after: ${userBalanceAfter}`));
     console.log(chalk.yellow(`Smart Wallet bal after: ${userSWBalanceAfter}`));
     console.log(chalk.yellow(`Recipient bal after: ${recipientBalanceAfter}`));
}

const customConfig: SmartWalletConfig = {
     chainId: ChainId.BSC_TESTNET,
     smartWalletSigner: "22a557c558a2fa235e7d67839b697fc2fb1b53c8705ada632c07dee1eac330a4",
     userWalletSigner: "225bfce31326a62a6360dfc47c1b8f9ba0ad5b45c988fb66f2494cacd106048a",
     recipientAddress: "0x356c5fA625F89481a76d9f7Af4eD866CD8c6CB4B",
     amount: 100,
     relayerFee: 0,
};

main(customConfig).catch((error) => {
     console.error(error);
     process.exitCode = 1;
});