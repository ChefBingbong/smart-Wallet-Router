import { ethers } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import type {
      SmartWalletV2,
      SmartWalletFactoryV2,
      ABC,
      XYZ,
      SmartWalletV2__factory,
      SmartWalletFactoryV2__factory,
} from "../typechain-types";
import { UserOp, sign } from "./utils/sign";

describe("SmartWalletV2", () => {
      // Users
      let ALICE: SignerWithAddress;
      let BOB: SignerWithAddress;

      // Owner
      let OWNER: SignerWithAddress;

      // Forwarder
      let factory: SmartWalletFactoryV2;

      // Wallets
      let aliceWallet: SmartWalletV2;
      let bobWallet: SmartWalletV2;

      let abc: ABC;
      let xyz: XYZ;

      before(async () => {
            [OWNER, ALICE, BOB] = await ethers.getSigners();

            // deploy token
            const ABC = await ethers.getContractFactory("ABC");
            abc = (await ABC.deploy()) as ABC;
            await abc.deployed();

            // deploy XYZ
            const XYZ = await ethers.getContractFactory("XYZ");
            xyz = (await XYZ.deploy()) as XYZ;
            await xyz.deployed();

            // deploy Wallet implementation
            const Wallet = (await ethers.getContractFactory(
                  "SmartWalletV2"
            )) as SmartWalletV2__factory;
            const wallet = await Wallet.deploy();
            await wallet.deployed();
            // await wallet.__SmartWalletV2_init(OWNER.address);

            // deploy WalletFactory
            const WalletFactory = (await ethers.getContractFactory(
                  "SmartWalletFactoryV2"
            )) as SmartWalletFactoryV2__factory;
            factory = await WalletFactory.deploy(wallet.address);
            await factory.deployed();

            // Setup user accounts
            await abc.transfer(ALICE.address, "100000000000000000000");
            await xyz.transfer(ALICE.address, "1000000000000000000000000");
      });

      // ----- UPDATE PARNER -----
      it("User should be able to create a wallet for themselves.", async () => {
            await factory.connect(ALICE).createWallet(ALICE.address);
            const aliceWalletAddress = await factory.wallet(ALICE.address, 0);
            aliceWallet = (await ethers.getContractAt(
                  "SmartWalletV2",
                  aliceWalletAddress
            )) as SmartWalletV2;
            expect(await aliceWallet.owner()).to.equal(ALICE.address);
      });

      it("User should be able to create a wallet for someone else.", async () => {
            await factory.connect(ALICE).createWallet(BOB.address);
            const bobWalletAddress = await factory.wallet(BOB.address, 0);
            bobWallet = (await ethers.getContractAt(
                  "SmartWalletV2",
                  bobWalletAddress
            )) as SmartWalletV2;
            expect(await bobWallet.owner()).to.equal(BOB.address);
      });

      it("User should be able to do any call through the wallet.", async () => {
            await abc.connect(ALICE).transfer(aliceWallet.address, "100000000");
            expect(await abc.balanceOf(aliceWallet.address)).to.equal("100000000");
            const tx = await abc.populateTransaction.transfer(
                  ALICE.address,
                  "100000000"
            );
            const userOps: UserOp[] = [
                  {
                        to: abc.address,
                        amount: "0",
                        data: tx.data,
                  },
            ];
            const ALICEabcSignedTx = await sign(userOps, tx, ALICE, factory.address);
            const tx1 = await aliceWallet
                  .connect(ALICE)
                  .populateTransaction.multiCall(
                        [abc.address],
                        [ALICEabcSignedTx.values.userOps[0].data]
                  );
            await ALICE.sendTransaction(tx1);
            expect(await abc.balanceOf(aliceWallet.address)).to.equal("0");
      });

      it("User should be able to send funds to the wallet before and after creation.", async () => {
            const aliceNewWalletAddr = await factory.wallet(ALICE.address, 1);
            await ALICE.sendTransaction({
                  to: aliceNewWalletAddr,
                  value: "100000000",
            });
            await abc.connect(ALICE).transfer(aliceNewWalletAddr, "100000000");
            expect(await abc.balanceOf(aliceNewWalletAddr)).to.equal("100000000");
            expect(await ethers.provider.getBalance(aliceNewWalletAddr)).to.equal(
                  "100000000"
            );
            await factory.connect(ALICE).createWallet(ALICE.address);
            await ALICE.sendTransaction({
                  to: aliceNewWalletAddr,
                  value: "100000000",
            });
            await abc.connect(ALICE).transfer(aliceNewWalletAddr, "100000000");
            expect(await abc.balanceOf(aliceNewWalletAddr)).to.equal("200000000");
            expect(await ethers.provider.getBalance(aliceNewWalletAddr)).to.equal(
                  "200000000"
            );

            const aliceNewWallet = (await ethers.getContractAt(
                  "SmartWalletV2",
                  aliceNewWalletAddr
            )) as SmartWalletV2;
            const tx = await abc.populateTransaction.transfer(
                  ALICE.address,
                  "200000000"
            );
            await aliceNewWallet.connect(ALICE).call(abc.address, tx.data!);
            await aliceNewWallet
                  .connect(ALICE)
                  .callWithValue(ALICE.address, "200000000", "0x");

            expect(await abc.balanceOf(aliceNewWalletAddr)).to.equal("0");
            expect(await ethers.provider.getBalance(aliceNewWalletAddr)).to.equal(
                  "0"
            );
      });
});
