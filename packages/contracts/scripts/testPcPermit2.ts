import { ChainId } from "@pancakeswap/chains";
import {
     AllowanceTransfer,
     MaxAllowanceTransferAmount,
     PERMIT_EXPIRATION,
     PERMIT_SIG_EXPIRATION,
     PermitBatch,
     PermitTransferFrom,
     SignatureTransfer,
     Witness,
     toDeadline,
} from "@pancakeswap/permit2-sdk";
import chalk from "chalk";
import { ethers } from "ethers";
import { maxUint256, type Address } from "viem";
// import { Deployments, ExtendedChainId } from "../src/constants/deploymentUtils";
// import { PERMIT_SIG_EXPIRATION, toDeadline } from "../src/permit/permit2TypedData";
// import { PUBLIC_NODES } from "../src/provider/chains";
// import { UserOp } from "../src/types/smartWallet";
// import { signTypedTx } from "../src/utils/typedMetaTx";
import { ECDSAWalletFactory__factory, ECDSAWallet__factory, ERC20__factory } from "../typechain-types";
import { sign } from "../test/utils/sign";

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
     const chainId = config.chainId;
     const provider = new ethers.providers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545/");

     const deployerPk = config?.smartWalletSigner;
     const userPk = config?.userWalletSigner;
     const smartWalletSigner = new ethers.Wallet(deployerPk, provider);
     const userWalletSigner = new ethers.Wallet(userPk, provider);

     const smartWalletFactory = ECDSAWalletFactory__factory.connect(
          "0xE9c632c0Bc8aB05E7f4Cb3136E6607e613bB687D",
          smartWalletSigner,
     );
     const PERMIT2_ADDRESS = "0x89b5B5d93245f543D53CC55923DF841349a65169";

     const userSmartWalletAddress = await smartWalletFactory.walletAddress(userWalletSigner.address, 0n);
     const userSmartWallet = ECDSAWallet__factory.connect(userSmartWalletAddress, provider);

     const ERC20Asset = ERC20__factory.connect("0x501B55184813f7a29eb98DECD8EC9B6D07DEB263", provider);

     //      const tc = await ERC20Asset.connect(userWalletSigner).approve(PERMIT2_ADDRESS, maxUint256); // approve max
     //      await tc.wait(1);
     //      console.log(await smartWalletFactory.tokenBalancesByUser(userSmartWallet.address, ERC20Asset.address));
     //      console.log(await smartWalletFactory.tokenBalancesByUser(smartWalletSigner.address, ERC20Asset.address));
     //      console.log(await smartWalletFactory.tokenBalancesByUser(userSmartWalletAddress, ERC20Asset.address));

     const userBalance1 = await ERC20Asset.balanceOf(smartWalletSigner.address);
     const userSWBalance1 = await ERC20Asset.balanceOf(userWalletSigner.address);
     const recipientBalance1 = await ERC20Asset.balanceOf(userSmartWalletAddress);

     console.log(chalk.yellow(`User bal before: ${userBalance1}`));
     console.log(chalk.yellow(`User Smart Wallet bal before: ${userSWBalance1}`));
     console.log(chalk.yellow(`Recipient bal before: ${recipientBalance1}\n`));

     const amount = BigInt(10 * 10 ** 18);
     const fee = BigInt(1 * 10 ** 18);
     const totalAmount = fee + amount;

     // const permit: PermitTransferFrom = {
     //       permitted: {
     //             token: ERC20Asset.address,
     //             amount: totalAmount,
     //       },
     //       spender: smartWalletFactory.address,
     //       nonce: 30n,
     //       deadline: toDeadline(PERMIT_SIG_EXPIRATION).toString(),
     // };

     // const witness: Witness = {
     //       witnessTypeName: "Witness",
     //       witnessType: { Witness: [{ name: "user", type: "address" }] },
     //       witness: { user: smartWalletSigner.address },
     // };
     // const { domain, types, values } = SignatureTransfer.getPermitData(
     //       permit,
     //       PERMIT2_ADDRESS,
     //       config.chainId,
     //       witness,
     // );
     // let signature = await userWalletSigner._signTypedData(domain, types, values);
     const permitB: PermitBatch = {
          details: [
               {
                    token: ERC20Asset.address,
                    amount: MaxAllowanceTransferAmount,
                    expiration: toDeadline(PERMIT_EXPIRATION).toString(),
                    nonce: 73n,
               },
          ],
          spender: userSmartWalletAddress,
          sigDeadline: toDeadline(PERMIT_SIG_EXPIRATION).toString(),
     };

     const { domain, types, values } = AllowanceTransfer.getPermitData(permitB, PERMIT2_ADDRESS, 31337);
     let signature = await userWalletSigner._signTypedData(domain, types, values);
     const feeAsset = ERC20Asset.address;

     //      const gasPrice = await userWalletSigner.getGasPrice();
     //      const gas = await userSmartWallet
     //           .connect(smartWalletSigner)
     //           .estimateGas.deposit(
     //                amount,
     //                ERC20Asset.address,
     //                userWalletSigner.address,
     //                PERMIT2_ADDRESS,
     //                permitB,
     //                signature,
     //                { gasLimit: 2000 },
     //           );

     const gasPrice = (await userWalletSigner.getGasPrice()).toBigInt();

     const t = await userSmartWallet.connect(smartWalletSigner).populateTransaction.deposit(
          amount,
          ERC20Asset.address,
          userWalletSigner.address,
          PERMIT2_ADDRESS,
          permitB,
          signature,
          //    {
          //         gasLimit: 500000,
          //         gasPrice,
          //    },
     );

     //      const gasPrice = (await userWalletSigner.getGasPrice()).toBigInt();
     // const gas = await smartWalletFactory
     //       .connect(smartWalletSigner)
     //       .estimateGas.deposit(
     //             amount,
     //             fee,
     //             ERC20Asset.address,
     //             smartWalletSigner.address,
     //             userWalletSigner.address,
     //             permit,
     //             signature,
     //             {
     //                   gasLimit: gas,
     //                   gasPrice,
     //             },
     //       );

     // const t = await smartWalletFactory
     //       .connect(smartWalletSigner)
     //       .populateTransaction.deposit(
     //             amount,
     //             fee,
     //             ERC20Asset.address,
     //             smartWalletSigner.address,
     //             userWalletSigner.address,
     //             permit,
     //             signature,
     //             {
     //                   gasLimit: gas,
     //                   gasPrice,
     //             },
     //       );

     const op = [
          {
               to: t.to,
               amount: 0n,
               data: t.data,
          },
     ] as UserOp[];

     console.log(op);
     const currentWalletTxNonce = (await userSmartWallet?.nonce?.()) ?? 0n;

     const signature2 = await sign(op, currentWalletTxNonce.toBigInt(), userWalletSigner, userSmartWalletAddress);

     const exec = await userSmartWallet
          .connect(smartWalletSigner)
          .populateTransaction.exec(op, signature2.sig, ERC20Asset.address, gasPrice, {
               gasLimit: 65460n,
               gasPrice,
          });

     const xx = await smartWalletSigner.sendTransaction(exec);
     const r = await xx.wait(1);
     console.log(r, gasPrice);

     //      console.log(await smartWalletFactory.tokenBalancesByUser(userSmartWallet.address, ERC20Asset.address));
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
