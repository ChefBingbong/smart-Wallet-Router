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
      const factory = await ECDSAWalletFactory__factory.connect(
            "0xC6D72727dAD90e4711412e369aE67706d0EF7C02" as string,
            signer
      );

      const depositor = await Depositor__factory.connect(
            "0x1beE54aa2b4089d85dbB96C2e39A7BDA1Da98a00" as string,
            signer
      );

      const walletaddress = await factory.walletAddress(
            "0xdBf48f5DB3d4bd13b9a29052947cB2edD6a2d132",
            0
      );
      console.log(walletaddress);
      if (walletaddress) return;
      const code = await p.getCode(walletaddress);

      if (code === "0x") {
            const tx = await factory.createWallet(
                  "0xdBf48f5DB3d4bd13b9a29052947cB2edD6a2d132"
            );
            const reciept = await tx.wait(1);
            console.log(reciept);
      }

      const wallet = await ECDSAWallet__factory.connect(walletaddress, p);
      const nonce = await wallet.nonce();

      const WETH = ERC20__factory.connect(
            "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa",
            p
            // user
      );

      const tx1 = await WETH.connect(signer).populateTransaction.transfer(
            wallet.address,
            1786,
            {
                  gasLimit: 20000000,
            }
      );

      console.log(await WETH.balanceOf(depositor.address));
      console.log(await WETH.balanceOf(wallet.address));
      console.log(
            await WETH.balanceOf("0xdBf48f5DB3d4bd13b9a29052947cB2edD6a2d132")
      );

      // const r = await tx1.wait(1);
      // console.log(r);
      const tx2 = await depositor
            .connect(signer)
            .populateTransaction.depositTokensToForwarder(
                  100,
                  WETH.address,
                  signer.address,
                  wallet.address,
                  { gasLimit: 2000000 }
            );

      const userOps: UserOp[] = [
            // Pay relayer for submission.
            // {
            //       to: tx1.to,
            //       amount: "0",
            //       data: tx1.data,
            // },
            // Pay relayer for submission.
            {
                  to: wallet.address,
                  amount: "0",
                  data: tx1.data,
            },
      ];

      const domain = {
            name: "ECDSAWallet",
            version: "0.0.1",
            chainId: 80001,
            verifyingContract: wallet.address,
      };
      console.log(wallet.address, "wallet");
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
            nonce: nonce,
            chainID: 80001,
            sigChainID: 80001,
      };

      const signature = await signer._signTypedData(domain, types, value);
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
            { gasLimit: 2000000 }
      );
      //for bl and other complicated trasbnsantions, return the promise and allow user
      //to process tx own their on instead of being lmitied by api.
      let reciept: any = "0x0";

      const walletTx = await signer.sendTransaction({
            data: "0xa9059cbb00000000000000000000000013e7f71a3e8847399547ce127b8de420b282e4e4000000000000000000000000000000000000000000000000002386f26fc10000",
      });
      reciept = await walletTx.wait(1);

      console.log(await WETH.balanceOf(depositor.address));
      console.log(await WETH.balanceOf(wallet.address));
      console.log(
            await WETH.balanceOf("0xdBf48f5DB3d4bd13b9a29052947cB2edD6a2d132")
      );

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
