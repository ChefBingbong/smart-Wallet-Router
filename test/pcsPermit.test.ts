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
} from "../typechain-types";
import { UserOp, sign } from "./utils/sign";
import { getPermit2Address, SignatureTransfer, Witness } from "@pancakeswap/permit2-sdk";
import { constants } from "ethers";
import { PermitTransferFrom } from "@pancakeswap/permit2-sdk";
import { Console } from "console";

describe("Permit2 Signature Transfer", () => {
      // const PERMIT2_ADDRESS = getPermit2Address(97);
      let ALICE: SignerWithAddress;
      let BOB: SignerWithAddress;

      // Owner
      let OWNER: SignerWithAddress;

      // Forwarder
      let factory: ECDSAWalletFactory;
      let permit2: Permit2;

      // Wallets
      let aliceWallet: ECDSAWallet;
      let bobWallet: ECDSAWallet;

      let abc: ABC;
      let xyz: XYZ;

      before(async () => {
            [ALICE, OWNER, BOB] = await ethers.getSigners();
            console.log(ALICE.address, OWNER.address, BOB.address);
            console.log(await ethers.provider.getNetwork());

            const Permit2 = (await ethers.getContractFactory("Permit2")) as Permit2__factory;
            permit2 = await Permit2.connect(OWNER).deploy();
            await permit2.deployed();

            const Wallet = (await ethers.getContractFactory("SmartWalletFactory")) as SmartWalletFactory__factory;

            const wallet = await Wallet.connect(ALICE).deploy();
            await wallet.deployed();

            const WalletFactory = (await ethers.getContractFactory(
                  "ECDSAWalletFactory",
            )) as ECDSAWalletFactory__factory;

            factory = await WalletFactory.connect(ALICE).deploy(wallet.address, permit2.address);
            await factory.deployed();

            console.log("FACTORY", wallet.address);
            console.log("ECDSAFACTORY", factory.address);
            await deployERC20();

            // Setup user accounts
            // await abc.transfer(ALICE.address, "100000000000000000000");
            // await xyz.transfer(ALICE.address, "1000000000000000000000000");
      });

      async function deployERC20() {
            const ABC = await ethers.getContractFactory("ABC");
            abc = (await ABC.deploy()) as ABC;
            await abc.deployed();
            return { abc };
      }

      // ----- UPDATE PARNER -----
      it("User should be able to create a wallet for themselves.", async () => {
            await abc.transfer(OWNER.address, "100000000000000000000");

            const alicewaladdr = await factory.walletAddress(OWNER.address, 0);
            await factory.connect(OWNER).createWallet(OWNER.address, { value: 15000000000 });

            const OWNERWallet = (await ethers.getContractAt("ECDSAWallet", alicewaladdr)) as ECDSAWallet;

            // expect(await OWNERWallet.ALICE()).to.equal(OWNER.address);
      });

      it("User should be able to deposit", async () => {
            await abc.transfer(OWNER.address, "100000000000000000000");

            await abc.connect(ALICE).approve(permit2.address, constants.MaxUint256); // approve max
            const alicewaladdr = await factory.walletAddress(ALICE.address, 0);
            await factory.connect(ALICE).createWallet(ALICE.address, { value: 15000000000 });

            const alicewallet = (await ethers.getContractAt("ECDSAWallet", alicewaladdr)) as ECDSAWallet;
            await alicewallet.deployed();
            const amount = 1000;

            console.log(ALICE.address, OWNER.address, BOB.address);
            console.log(await factory.tokenBalancesByUser(OWNER.address, abc.address));
            console.log(await factory.tokenBalancesByUser(BOB.address, abc.address));

            const permit: PermitTransferFrom = {
                  permitted: {
                        token: abc.address,
                        amount: amount,
                  },
                  spender: factory.address,
                  nonce: 0,
                  deadline: constants.MaxUint256.toBigInt(),
            };

            const witness: Witness = {
                  witnessTypeName: "Witness",
                  witnessType: { Witness: [{ name: "user", type: "address" }] },
                  witness: { user: OWNER.address },
            };
            const { domain, types, values } = SignatureTransfer.getPermitData(permit, permit2.address, 31337, witness);
            let signature = await ALICE._signTypedData(domain, types, values);

            const t = await factory
                  .connect(OWNER)
                  .populateTransaction.deposit(amount, abc.address, ALICE.address, OWNER.address, permit, signature);

            const op = [
                  {
                        to: t.to,
                        amount: 0n,
                        data: t.data,
                  },
            ] as UserOp[];
            const exec = await alicewallet.connect(OWNER).populateTransaction.exec(op, "0x00");
            const xx = await OWNER.sendTransaction(exec);
            // const r = await xx.wait(1);
            // console.log(r);
            // console.log(await factory.tokenBalancesByUser(OWNER.address, abc.address));
            // await factory.connect(OWNER).withdrawERC20(abc.address, 500, alicewallet.address);
            // console.log(await factory.tokenBalancesByUser(OWNER.address, abc.address));
            // console.log(await factory.tokenBalancesByUser(alicewallet.address, abc.address));

            // console.log(factory.signer);

            // expect(await vault.tokenBalancesByUser(user.address, abc.address), amount);
            // expect(await erc20.balanceOf(ALICE.address), 0);
            // expect(await erc20.balanceOf(vault.address), amount);
      });
});
