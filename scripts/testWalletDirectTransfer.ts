// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import {
      Depositor__factory,
      ECDSAWalletFactory__factory,
      ECDSAWallet__factory,
      ERC20__factory,
} from "../typechain-types";
import { defaultAbiCoder } from "@ethersproject/abi";
import { UserOp } from "../src/api";
//Meta Transactions
async function main() {
      const p = new ethers.providers.JsonRpcProvider(
            "https://rpc.ankr.com/polygon_mumbai"
      );

      const signer = new ethers.Wallet(
            "22a557c558a2fa235e7d67839b697fc2fb1b53c8705ada632c07dee1eac330a4",
            p
      );

      const user = new ethers.Wallet(
            "225bfce31326a62a6360dfc47c1b8f9ba0ad5b45c988fb66f2494cacd106048a",
            p
      );

      const factory = await ECDSAWalletFactory__factory.connect(
            "0xC6D72727dAD90e4711412e369aE67706d0EF7C02" as string,
            signer
      );

      const walletaddress = await factory.walletAddress(user.address, 0);

      const wallet = await ECDSAWallet__factory.connect(walletaddress, p);

      // const userSigner = await wallet.provider.sendTransaction;
      // console.log(userSigner);
      const gasPrice = await wallet.provider.getGasPrice();

      const nonce = await user.getTransactionCount();
      console.log(nonce);
      const signedtx = await user.signTransaction({
            gasLimit: 2000000,
            chainId: 80001,
            nonce,
            gasPrice,
            from: user.address,
            to: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
            data: "0xa9059cbb000000000000000000000000b62c986544516e4784f310cec6d95a8f756561ec000000000000000000000000000000000000000000000000000000e8d4a51000",
      });
      const walletTx = await wallet.provider.sendTransaction(signedtx);
      const reciept = await walletTx.wait(1);

      console.log(reciept);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
      console.error(error);
      process.exitCode = 1;
});
// 2145575543308883296;
// 511379121684697785;
