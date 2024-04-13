import { ChainId } from "@pancakeswap/chains";
import { Permit2ABI, PermitTransferFrom, SignatureTransfer, Witness } from "@pancakeswap/permit2-sdk";
import chalk from "chalk";
import { ethers } from "ethers";
// import BigNumber from 'b'
// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { maxUint256, type Address } from "viem";
import { Deployments, ExtendedChainId } from "../src/constants/deploymentUtils";
import { PERMIT_SIG_EXPIRATION, toDeadline } from "../src/permit/permit2TypedData";
import { PUBLIC_NODES } from "../src/provider/chains";
import { UserOp } from "../src/types/smartWallet";
import { signTypedTx } from "../src/utils/typedMetaTx";
import { ECDSAWalletFactory__factory, ECDSAWallet__factory, ERC20__factory } from "../typechain-types";
import { getViemClient } from "../src/provider/client";

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
      const provider = new ethers.providers.JsonRpcProvider(PUBLIC_NODES[chainId][0]);

      const deployerPk = config?.smartWalletSigner;
      const userPk = config?.userWalletSigner;
      const smartWalletSigner = new ethers.Wallet(deployerPk, provider);
      const userWalletSigner = new ethers.Wallet(userPk, provider);

      const smartWalletFactory = ECDSAWalletFactory__factory.connect(
            Deployments[chainId].ECDSAWalletFactory,
            smartWalletSigner,
      );
      const PERMIT2_ADDRESS = "0x89b5B5d93245f543D53CC55923DF841349a65169";
      // const userSmartWalletAddress = await smartWalletFactory
      //       .connect(userWalletSigner)
      //       .walletAddress(userWalletSigner.address, 0);

      // console.log(
      //       chainId,
      //       smartWalletFactory.address,
      //       userSmartWalletAddress,
      //       Deployments[chainId].ECDSAWalletFactory,
      //       smartWalletFactory,
      // );
      const userSmartWalletAddress = await smartWalletFactory.walletAddress(userWalletSigner.address, 0n);
      const userSmartWallet = ECDSAWallet__factory.connect(userSmartWalletAddress, provider);

      // // console.log(PERMIT2_ADDRESS);
      // const client = getViemClient({ chainId });
      // const allowance = await client.readContract({
      //       functionName: "allowance",
      //       args: [userWalletSigner.address, "0x501B55184813f7a29eb98DECD8EC9B6D07DEB263", smartWalletFactory.address],
      //       address: PERMIT2_ADDRESS,
      //       abi: Permit2ABI,
      // });

      // console.log(allowance);
      // return;
      // return;
      // const userSmartWalletAddress = await smartWalletFactory.walletAddress(userWalletSigner.address, 0n);
      // const userSmartWallet = ECDSAWallet__factory.connect(userSmartWalletAddress, provider);

      // u;
      console.log(userSmartWallet);
      const ERC20Asset = ERC20__factory.connect("0x501B55184813f7a29eb98DECD8EC9B6D07DEB263", provider);
      // const PERMIT2_ADDRESS = getPermit2Address(config.chainId);

      // const tc = await ERC20Asset.connect(userWalletSigner).approve(PERMIT2_ADDRESS, maxUint256); // approve max
      const tc = await ERC20Asset.connect(userWalletSigner).approve(PERMIT2_ADDRESS, maxUint256); // approve max
      await tc.wait(1);
      console.log(await smartWalletFactory.tokenBalancesByUser(userSmartWallet.address, ERC20Asset.address));
      console.log(await smartWalletFactory.tokenBalancesByUser(smartWalletSigner.address, ERC20Asset.address));
      console.log(await smartWalletFactory.tokenBalancesByUser(userSmartWalletAddress, ERC20Asset.address));

      const userBalance1 = await ERC20Asset.balanceOf(smartWalletSigner.address);
      const userSWBalance1 = await ERC20Asset.balanceOf(userWalletSigner.address);
      const recipientBalance1 = await ERC20Asset.balanceOf(userSmartWalletAddress);

      console.log(chalk.yellow(`User bal before: ${userBalance1}`));
      console.log(chalk.yellow(`User Smart Wallet bal before: ${userSWBalance1}`));
      console.log(chalk.yellow(`Recipient bal before: ${recipientBalance1}\n`));

      const amount = BigInt(10 * 10 ** 18);
      const fee = BigInt(1 * 10 ** 18);
      const totalAmount = fee + amount;

      const permit: PermitTransferFrom = {
            permitted: {
                  token: ERC20Asset.address,
                  amount: totalAmount,
            },
            spender: smartWalletFactory.address,
            nonce: 30n,
            deadline: toDeadline(PERMIT_SIG_EXPIRATION).toString(),
      };

      const witness: Witness = {
            witnessTypeName: "Witness",
            witnessType: { Witness: [{ name: "user", type: "address" }] },
            witness: { user: smartWalletSigner.address },
      };
      const { domain, types, values } = SignatureTransfer.getPermitData(
            permit,
            PERMIT2_ADDRESS,
            config.chainId,
            witness,
      );
      let signature = await userWalletSigner._signTypedData(domain, types, values);
      // const signature = await us._signTypedData(domain, types, value);
      // const signatureEncoded = defaultAbiCoder.encode(["uint256", "bytes"], [97, signature]);

      const gasPrice = await userWalletSigner.getGasPrice();
      const gas = await smartWalletFactory.connect(smartWalletSigner).estimateGas.deposit(
            amount,
            fee,
            ERC20Asset.address,
            smartWalletSigner.address,
            userWalletSigner.address,
            permit,
            signature,
            // { gasLimit: 20000 },
      );

      const t = await smartWalletFactory
            .connect(smartWalletSigner)
            .populateTransaction.deposit(
                  amount,
                  fee,
                  ERC20Asset.address,
                  smartWalletSigner.address,
                  userWalletSigner.address,
                  permit,
                  signature,
                  {
                        gasLimit: gas,
                        gasPrice,
                  },
            );

      const op = [
            {
                  to: t.to,
                  amount: 0n,
                  data: t.data,
            },
      ] as UserOp[];

      console.log(op);
      const currentWalletTxNonce = (await userSmartWallet?.nonce?.()) ?? 0;

      const signature2 = await signTypedTx(
            op,
            userWalletSigner,
            userSmartWalletAddress,
            currentWalletTxNonce,
            chainId,
            chainId,
      );

      const exec = await userSmartWallet.connect(smartWalletSigner).populateTransaction.exec(op, signature2);

      const xx = await smartWalletSigner.sendTransaction(exec);
      const r = await xx.wait(1);
      console.log(r);

      console.log(await smartWalletFactory.tokenBalancesByUser(userSmartWallet.address, ERC20Asset.address));

      const userBalance = await ERC20Asset.balanceOf(smartWalletSigner.address);
      const userSWBalance = await ERC20Asset.balanceOf(userWalletSigner.address);
      const recipientBalance = await ERC20Asset.balanceOf(userSmartWalletAddress);
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

// const { factory, permit2, wallet, ALICE, OWNER, BOB } = await loadFixture(loadContracts);
// const { abc } = await deployERC20();
// await abc.transfer(OWNER.address, "100000000000000000000");

// await abc.connect(ALICE).approve(PERMIT2_ADDRESS, constants.MaxUint256); // approve max
// const alicewaladdr = await factory.walletAddress(ALICE.address, 0);
// const dep = await factory.connect(ALICE).createWallet(ALICE.address, { value: 15000000000 });
// await dep.wait(1);
// const alicewallet = (await ethers.getContractAt("ECDSAWallet", alicewaladdr)) as ECDSAWallet;
// await alicewallet.deployed();
// const amount = 1000;

// console.log(ALICE.address, OWNER.address, BOB.address);
// console.log(await factory.tokenBalancesByUser(OWNER.address, abc.address));
// console.log(await factory.tokenBalancesByUser(BOB.address, abc.address));

// const permit: PermitTransferFrom = {
//       permitted: {
//             token: abc.address,
//             amount: amount,
//       },
//       spender: factory.address,
//       nonce: 0,
//       deadline: constants.MaxUint256.toBigInt(),
// };

// const witness: Witness = {
//       witnessTypeName: "Witness",
//       witnessType: { Witness: [{ name: "user", type: "address" }] },
//       witness: { user: OWNER.address },
// };
// const { domain, types, values } = SignatureTransfer.getPermitData(permit, PERMIT2_ADDRESS, 1, witness);
// let signature = await ALICE._signTypedData(domain, types, values);

// const t = await factory
//       .connect(OWNER)
//       .populateTransaction.deposit(amount, abc.address, ALICE.address, OWNER.address, permit, signature);

// const op = [
//       {
//             to: t.to,
//             amount: 0n,
//             data: t.data,
//       },
// ] as UserOp[];
// // const exec = await alicewallet.connect(OWNER).populateTransaction.exec(op, "0x00");
// const xx = await OWNER.sendTransaction(t);
// const r = await xx.wait(1);
// console.log(r);
// console.log(await factory.tokenBalancesByUser(OWNER.address, abc.address));
// await factory.connect(OWNER).withdrawERC20(abc.address, 500, alicewallet.address);
// console.log(await factory.tokenBalancesByUser(OWNER.address, abc.address));
// console.log(await factory.tokenBalancesByUser(alicewallet.address, abc.address));
