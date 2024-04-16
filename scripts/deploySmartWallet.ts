import { ChainId } from "@pancakeswap/chains";
import chalk from "chalk";
import { ethers } from "hardhat";
import { Deployments, type ExtendedChainId } from "../src/constants/deploymentUtils";
import { sleep } from "../src/utils/sleep";
import { ECDSAWalletFactory__factory } from "../typechain-types";
import { PUBLIC_NODES } from "../src/provider/chains";

export type SmartWalletConfig = {
      chainId: ChainId | ExtendedChainId;
      smartWalletSigner: string;
      account: string;
      relayerFee: number | string;
};

async function main(config: SmartWalletConfig) {
      const chainId = config.chainId;
      const provider = new ethers.providers.JsonRpcProvider(PUBLIC_NODES[chainId][0]);

      const deployerPk = config?.smartWalletSigner;
      const smartWalletSigner = new ethers.Wallet(deployerPk, provider);

      const smartWalletFactory = ECDSAWalletFactory__factory.connect(
            Deployments[chainId].ECDSAWalletFactory,
            smartWalletSigner,
      );

      const userSmartWalletAddress = await smartWalletFactory.walletAddress(config.account, 0);

      const userWalletContractCode = await provider.getCode(userSmartWalletAddress);
      if (userWalletContractCode === "0x") {
            console.log(
                  // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
                  chalk.yellow(`Wallet Not deployed yet. initiating creation Tx.`),
            );
            await sleep(2000);

            const value = Number(config.relayerFee);

            if (!value) {
                  console.log(
                        chalk.red(
                              `The relayer needs to be funded on wallet creation to
                              fund the deployement cost. please add relayer fee param!`,
                        ),
                  );
                  return;
            }
            const tx = await smartWalletFactory.populateTransaction.createWallet(config.account, { value });

            const creationTx = await smartWalletSigner.sendTransaction(tx);
            const receipt = await creationTx.wait(1);
            console.log(
                  chalk.yellow(
                        `Successfully deployed user Smart Wallet at tx: ${receipt.transactionHash},
                       `,
                  ),
            );
            return;
      }
      console.log(chalk.yellow(`Smart wallet already deployed`));
}

const customConfig: SmartWalletConfig = {
      chainId: ChainId.BSC_TESTNET,
      smartWalletSigner: "22a557c558a2fa235e7d67839b697fc2fb1b53c8705ada632c07dee1eac330a4",
      account: "0xC39D95F6156B2eCB9977BCc75Ca677a80e06c60D",
      relayerFee: 1500000000,
};

main(customConfig).catch((error) => {
      console.error(error);
      process.exitCode = 1;
});
