import { ethers } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
// import { it } from "mocha";
// import { SmartWallet, SmartWalletFactory, ABC, XYZ } from "../../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type {
     SmartWallet,
     SmartWalletFactory,
     ABC,
     XYZ,
     ECDSAWalletFactory,
     ECDSAWalletFactory__factory,
     SmartWalletFactory__factory,
     IWallet,
     ECDSAWallet,
     Permit2__factory,
     Permit2,
     AMMSwap,
     AMMSwap__factory,
} from "../typechain-types";
import { AllowanceOp, UserOp, sign } from "./utils/sign";
import {
     AllowanceTransfer,
     generatePermitTypedData,
     getPermit2Address,
     MaxAllowanceExpiration,
     MaxAllowanceTransferAmount,
     PERMIT_EXPIRATION,
     PERMIT_SIG_EXPIRATION,
     type PermitBatch,
     PermitBatchTransferFrom,
     SignatureTransfer,
     toDeadline,
     Witness,
} from "@pancakeswap/permit2-sdk";
import { constants } from "ethers";
import { PermitTransferFrom } from "@pancakeswap/permit2-sdk";
import { Console } from "console";
import { ERC20Token } from "@pancakeswap/sdk";
import { maxUint256, zeroAddress } from "viem";

describe("Permit2 Signature Transfer", () => {
     // const PERMIT2_ADDRESS = getPermit2Address(97);
     let OWNER: SignerWithAddress;
     let BOB: SignerWithAddress;

     // ALICE
     let ALICE: SignerWithAddress;

     // Forwarder
     let factory: ECDSAWalletFactory;
     let permit2: Permit2;

     // Wallets
     let OWNERWallet: ECDSAWallet;
     let bobWallet: ECDSAWallet;
     let amm: AMMSwap;

     let abc: ABC;
     let xyz: XYZ;

     before(async () => {
          [OWNER, ALICE, BOB] = await ethers.getSigners();
          console.log(OWNER.address, ALICE.address, BOB.address);
          console.log(await ethers.provider.getNetwork());

          const Permit2 = (await ethers.getContractFactory("Permit2")) as Permit2__factory;
          permit2 = await Permit2.connect(OWNER).deploy();
          await permit2.deployed();

          const Wallet = (await ethers.getContractFactory("SmartWalletFactory")) as SmartWalletFactory__factory;

          const wallet = await Wallet.connect(OWNER).deploy();
          await wallet.deployed();

          const WalletFactory = (await ethers.getContractFactory("ECDSAWalletFactory")) as ECDSAWalletFactory__factory;

          factory = await WalletFactory.connect(OWNER).deploy(wallet.address);
          await factory.deployed();

          console.log("FACTORY", wallet.address);
          console.log("ECDSAFACTORY", factory.address);
          await deployERC20();
          const { abc, xyz } = await deployERC20();
          //     abc.connect(OWNER).transfer(xyz)
          //     AMMSwap
          const AMM = (await ethers.getContractFactory("AMMSwap")) as AMMSwap__factory;

          amm = await AMM.connect(OWNER).deploy(abc.address, xyz.address);
          await amm.deployed();
          abc.connect(OWNER).transfer(amm.address, "100000000000000000000");
          xyz.connect(OWNER).transfer(amm.address, "100000000000000000000");

          // Setup user accounts
          // await abc.transfer(OWNER.address, "100000000000000000000");
          // await xyz.transfer(OWNER.address, "1000000000000000000000000");
     });

     async function deployERC20() {
          const ABC = await ethers.getContractFactory("ABC");
          abc = (await ABC.deploy()) as ABC;
          await abc.deployed();

          const XYZ = await ethers.getContractFactory("XYZ");
          xyz = (await XYZ.deploy()) as ABC;
          await xyz.deployed();
          return { abc, xyz };
     }

     // ----- UPDATE PARNER -----
     it("User should be able to create a wallet for themselves.", async () => {
          await abc.transfer(ALICE.address, "100000000000000000000");
          await xyz.transfer(ALICE.address, "100000000000000000000");

          const alicewal = await factory.walletAddress(ALICE.address, 0);
          await factory.connect(ALICE).createWallet(ALICE.address, { value: 15000000000 });

          const ALICEWallet = (await ethers.getContractAt("ECDSAWallet", alicewal)) as ECDSAWallet;

          // expect(await ALICEWallet.OWNER()).to.equal(ALICE.address);
     });

     it("User should be able to deposit", async () => {
          await abc.connect(OWNER).burn("9999999000000000000000");

          await abc.connect(ALICE).approve(permit2.address, MaxAllowanceTransferAmount); // approve max
          //     await xyz.connect(ALICE).approve(permit2.address, constants.MaxUint256); // approve max

          const ownerwal = await factory.walletAddress(ALICE.address, 0);
          await factory.connect(ALICE).createWallet(ALICE.address, { value: 15000000000 });

          const OWNERwallet = (await ethers.getContractAt("ECDSAWallet", ownerwal)) as ECDSAWallet;
          // await OWNERwallet.deployed();
          //     console.log(OWNERWallet);
          const amount = BigInt(1 * 10 ** 18);

          console.log(await xyz.balanceOf(ALICE.address));
          console.log(await abc.balanceOf(ALICE.address));

          console.log(await abc.balanceOf(OWNER.address));
          console.log(await xyz.balanceOf(OWNER.address));
          //     const permit: PermitBatchTransferFrom = {
          //          permitted: [
          //               {
          //                    token: abc.address,
          //                    amount: amount,
          //               },
          //               {
          //                    token: xyz.address,
          //                    amount: amount,
          //               },
          //          ],

          //          spender: factory.address,
          //          nonce: 0,
          //          deadline: constants.MaxUint256.toBigInt(),
          //     };

          //     const witness: Witness = {
          //          witnessTypeName: "Witness",
          //          witnessType: { Witness: [{ name: "user", type: "address" }] },
          //          witness: { user: OWNER.address },
          //     };
          //     const { domain, types, values } = SignatureTransfer.getPermitData(
          //          permit,
          //          //    0n,
          //          permit2.address,
          //          31337,
          //          witness,
          //     );
          //     console.log(
          //          await permit2
          //               .connect(ALICE)
          //               .allowance(xyz.address, factory.address, 1000n, toDeadline(PERMIT_EXPIRATION).toString()),
          //     );

          const permit: Permit = generatePermitTypedData(
               new ERC20Token(31337, abc.address, await abc.decimals(), await abc.symbol()),
               0n,
               factory.address,
          );

          const permitB: PermitBatch = {
               details: [
                    {
                         token: abc.address,
                         amount: MaxAllowanceTransferAmount,
                         expiration: toDeadline(PERMIT_EXPIRATION).toString(),
                         nonce: 0n,
                    },
                    // {
                    //       token: xyz.address,
                    //       amount: 1000n,
                    //       expiration: toDeadline(PERMIT_EXPIRATION).toString(),
                    //       nonce: 0n,
                    // },
               ],
               spender: ownerwal,
               sigDeadline: toDeadline(PERMIT_SIG_EXPIRATION).toString(),
          };

          const { domain, types, values } = AllowanceTransfer.getPermitData(permitB, permit2.address, 31337);
          let signature = await ALICE._signTypedData(domain, types, values);
          //     let signature = await ALICE._signTypedData(domain, types, values);
          const feeAsset = xyz.address;
          const t = await OWNERwallet.connect(OWNER).populateTransaction.deposit(
               amount,
               abc.address,
               feeAsset,
               xyz.address,
               ALICE.address,
               permit2.address,
               permitB,
               (await ALICE.getGasPrice()).toBigInt(),
               signature,
          );

          const reciever = feeAsset === abc.address ? ALICE.address : ownerwal;
          const approveAMM = await abc.connect(OWNER).populateTransaction.approve(amm.address, amount);
          const swapAmm = await amm.connect(OWNER).populateTransaction.swap(amount, reciever);

          const op = [
               //    {
               //         to: t.to,
               //         amount: 0n,
               //         data: t.data,
               //    },
               {
                    to: approveAMM.to,
                    amount: 0n,
                    data: approveAMM.data,
               },
               //    {
               //         to: swapAmm.to,
               //         amount: 0n,
               //         data: swapAmm.data,
               //    },
          ] as UserOp[];

          const alOp = {
               details: {
                    token: abc.address,
                    amount: MaxAllowanceTransferAmount,
                    expiration: BigInt(toDeadline(PERMIT_EXPIRATION).toString()),
                    nonce: 0n,
               },
               spender: OWNER.address,
               sigDeadline: BigInt(toDeadline(PERMIT_SIG_EXPIRATION)),
          } as AllowanceOp;

          const signeduop = await sign(op, alOp, 0, ALICE, ownerwal);

          const exec = await OWNERwallet.connect(OWNER).populateTransaction.exec(
               signeduop.values.userOps,
               signeduop.values.allowanceOp,
               signeduop.sig,
               zeroAddress,
               zeroAddress,
               zeroAddress,
          );
          const alicewal = await factory.walletAddress(ALICE.address, 0);

          const xx = await OWNER.sendTransaction(exec);
          const r = await xx.wait(1);
          //     console.log(r);

          console.log(await xyz.balanceOf(ALICE.address));
          console.log(await abc.balanceOf(ALICE.address));

          console.log(await abc.balanceOf(OWNER.address));
          console.log(await xyz.balanceOf(OWNER.address));
          //     console.log(
          //          await permit2
          //               .connect(ALICE)
          //               .approve(xyz.address, factory.address, MaxAllowanceTransferAmount, MaxAllowanceExpiration),
          //     );
          console.log(await permit2.allowance(alicewal, xyz.address, OWNER.address));
          //     console.log(await abc.allowance(ALICE.address, OWNER.address));

          // await factory.connect(ALICE).withdrawERC20(abc.address, 500, OWNERwallet.address);
          console.log(await abc.balanceOf(alicewal));
          //     console.log(await factory.tokenBalancesByUser(alicewal, abc.address));

          // console.log(factory.signer);

          // expect(await vault.tokenBalancesByUser(user.address, abc.address), amount);
          // expect(await erc20.balanceOf(OWNER.address), 0);
          // expect(await erc20.balanceOf(vault.address), amount);
     });
});
