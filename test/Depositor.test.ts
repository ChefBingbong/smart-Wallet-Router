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
      Depositor,
      Depositor__factory,
      ECDSAWalletFactory__factory,
      SmartWalletFactory__factory,
      ECDSAWalletFactory,
      ECDSAWallet,
} from "../typechain-types";
import { UserOp, sign } from "./utils/sign";

describe("Depositor", () => {
      // Users
      let ALICE: SignerWithAddress;
      let BOB: SignerWithAddress;

      // Owner
      let OWNER: SignerWithAddress;

      let factory: ECDSAWalletFactory;
      let wallet: ECDSAWalletFactory;
      let depositor: Depositor;

      // Wallets
      let aliceWallet: ECDSAWallet;
      let bobWallet: ECDSAWallet;
      let abc: ABC;
      let xyz: XYZ;

      before(async () => {
            [OWNER, ALICE, BOB] = await ethers.getSigners();

            // deploy token
            const ABC = await ethers.getContractFactory("ABC");
            abc = (await ABC.deploy()) as ABC;
            await abc.deployed();

            // deploy Wallet implementation
            const Wallet = (await ethers.getContractFactory(
                  "SmartWalletFactory"
            )) as SmartWalletFactory__factory;
            wallet = await Wallet.connect(OWNER).deploy();
            wallet.connect(OWNER).deployed();

            // deploy WalletFactory
            const WalletFactory = (await ethers.getContractFactory(
                  "ECDSAWalletFactory"
            )) as ECDSAWalletFactory__factory;
            factory = await WalletFactory.connect(OWNER).deploy(wallet.address);
            await factory.connect(OWNER).deployed();

            const Depositor = (await ethers.getContractFactory(
                  "Depositor"
            )) as Depositor__factory;
            depositor = await Depositor.deploy(wallet.address);
            await depositor.deployed();

            await factory.createWallet(ALICE.address);
            const aliceWalletAddress = await factory.walletAddress(ALICE.address, 0);
            aliceWallet = (await ethers.getContractAt(
                  "ECDSAWallet",
                  aliceWalletAddress
            )) as ECDSAWallet;

            const msgSenders = await depositor.connect(OWNER).getMsgSenders();
            console.log(msgSenders, "DDD", wallet.address);
            console.log(aliceWallet.address, aliceWalletAddress, ALICE.address);

            // Setup user accounts
            await abc.transfer(ALICE.address, "100000000000000000000");

            await abc.connect(ALICE).approve(depositor.address, 100);

            await depositor
                  .connect(ALICE)
                  .depositTokensToForwarder(
                        100,
                        abc.address,
                        ALICE.address,
                        aliceWallet.address
                  );

            const userOps: UserOp[] = [
                  {
                        to: OWNER.address,
                        amount: "100000000000",
                        data: "0x",
                  },
                  // {
                  //       to: depositor.address,
                  //       amount: "0",
                  //       data: tx1.data,
                  // },
            ];
            // console.log("nnnnnn", aliceWallet.address, bobWallet.address);
            const ALICEabcSignedTx = await sign(
                  userOps,
                  0,
                  ALICE,
                  aliceWallet.address.toLowerCase()
            );
            const tx2 = await aliceWallet.populateTransaction.exec(
                  ALICEabcSignedTx.values.userOps,
                  ALICEabcSignedTx.sig
                  // tx.from
            );

            await OWNER.sendTransaction(tx2);
      });

      // ----- UPDATE PARNER -----
      it("User should be able to create a wallet for themselves.", async () => {});
});
