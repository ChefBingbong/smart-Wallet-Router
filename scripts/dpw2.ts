// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import {
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

      const user = new ethers.Wallet(
            "225bfce31326a62a6360dfc47c1b8f9ba0ad5b45c988fb66f2494cacd106048a",
            p
      );

      const signer = new ethers.Wallet(
            "22a557c558a2fa235e7d67839b697fc2fb1b53c8705ada632c07dee1eac330a4",
            p
      );
      const factory = await ECDSAWalletFactory__factory.connect(
            "0xC6D72727dAD90e4711412e369aE67706d0EF7C02" as string,
            signer
      );
      const walletaddress = await factory.walletAddress(
            "0xC39D95F6156B2eCB9977BCc75Ca677a80e06c60D",
            1
      );
      const signerwal = await factory.walletAddress(signer.address, 0);
      console.log(walletaddress, "wallet");

      const code = await p.getCode(walletaddress);

      if (code === "0x") {
            const tx = await factory.createWallet(
                  "0xC39D95F6156B2eCB9977BCc75Ca677a80e06c60D"
            );
            const reciept = await tx.wait(1);
            console.log(reciept);
      }

      const wallet = await ECDSAWallet__factory.connect(walletaddress, signer);
      const nonce = await wallet.nonce();

      const WETH = ERC20__factory.connect(
            "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
            user
            // user
      );

      const unsignedtx = await WETH.connect(user).populateTransaction.approve(
            wallet.address,
            "10000"
      );

      console.log("sender bal", await WETH.allowance(user.address, signerwal));
      console.log("sender smart wallet bal", await WETH.balanceOf(wallet.address));
      console.log("signer bal", await WETH.balanceOf(signer.address));

      // if (wallet.address !== "") return;
      const userOps: UserOp[] = [
            // Pay relayer for submission.
            {
                  to: unsignedtx.to,
                  amount: "0",
                  data: unsignedtx.data,
            },
      ];

      const domain = {
            name: "ECDSAWallet",
            version: "0.0.1",
            chainId: 80001,
            verifyingContract: wallet.address,
      };
      // console.log(wallet.address, "wallet");
      const types = {
            UserOp: [
                  { name: "to", type: "address" },
                  { name: "amount", type: "uint256" },
                  { name: "data", type: "bytes" },
            ],
            ECDSAExec: [
                  { name: "userOps", type: "UserOp[]" },
                  { name: "nonce", type: "uint256" },
                  { name: "chainID", type: "uint256" },
                  { name: "sigChainID", type: "uint256" },
            ],
      };

      const value = {
            userOps: userOps,
            nonce,
            chainID: 80001,
            sigChainID: 80001,
      };

      const signature = await user._signTypedData(domain, types, value);
      const signatureEncoded = defaultAbiCoder.encode(
            ["uint256", "bytes"],
            [80001, signature]
      );
      const gasPrice = await wallet.provider.getGasPrice();

      // try {
      //       const gas = await wallet.estimateGas.exec(userOps, signatureEncoded);
      //       const txCost = gasPrice.mul(gas);
      //       const relayer = await signer.getAddress();
      //       const isPayingRelayer = userOps[0].to === relayer;

      //       if (isPayingRelayer && txCost.gt(await userOps[0].amount)) {
      //             console.log({ error: "Insufficient fee payment" });
      //             return;
      //       }
      // } catch (err: any) {
      //       console.log(400, err, "error");

      //       return;
      // }
      const execTx = await wallet.populateTransaction.exec(
            userOps,
            signatureEncoded,
            { gasLimit: 200000 }
      );
      //for bl and other complicated trasbnsantions, return the promise and allow user
      //to process tx own their on instead of being lmitied by api.
      let reciept: any = "0x0";

      const walletTx = await signer.sendTransaction(execTx);
      reciept = await walletTx.wait(1);
      console.log(reciept);
      console.log("sender bal", await WETH.balanceOf(user.address));
      console.log("sender smart wallet bal", await WETH.balanceOf(user.address));
      console.log("signer bal", await WETH.balanceOf(user.address));

      console.log("sender all", await WETH.allowance(user.address, signerwal));
      console.log(
            "sender smart all bal",
            await WETH.allowance(signerwal, user.address)
      );
      // console.log("signer bal", await WETH.allowance(user.address));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
      console.error(error);
      process.exitCode = 1;
});
// 2145575543308883296;
// 511379121684697785;
