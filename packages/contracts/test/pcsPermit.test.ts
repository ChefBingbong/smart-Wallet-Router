import { ethers } from "hardhat";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
// import { it } from "mocha";
// import { SmartWallet, SmartWalletFactory, ABC, XYZ } from "../../typechain-types";
import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import {
  type SmartWallet,
  type SmartWalletFactory,
  type ABC,
  type XYZ,
  type ECDSAWalletFactory,
  type ECDSAWalletFactory__factory,
  type SmartWalletFactory__factory,
  type IWallet,
  type ECDSAWallet,
  type Permit2__factory,
  type Permit2,
  type AMMSwap,
  type AMMSwap__factory,
  SmartWallet__factory,
  ECDSAWallet__factory,
  WalletBridgeVerifier__factory,
  WalletBridgeVerifier,
  PQR,
  ICALLER__factory,
  CALLER__factory,
} from "../typechain-types";
import { sign } from "./utils/sign";
import type { AllowanceOp, UserOp } from "./utils/sign";

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
import { formatEther } from "ethers/lib/utils";

describe("Permit2 Signature Transfer", () => {
  // const PERMIT2_ADDRESS = getPermit2Address(97);
  let OWNER: SignerWithAddress;
  let BOB: SignerWithAddress;

  // ALICE
  let ALICE: SignerWithAddress;

  // Forwarder
  let factory: ECDSAWalletFactory;
  let bridgeVerifier: WalletBridgeVerifier;

  // Wallets
  let aliceWallet: ECDSAWallet;
  let amm: AMMSwap;

  let weth: ABC;
  let cake: XYZ;
  let busd: PQR;

  before(async () => {
    [OWNER, ALICE, BOB] = await ethers.getSigners();

    await deployERC20();

    const AMM = (await ethers.getContractFactory(
      "AMMSwap",
    )) as AMMSwap__factory;

    amm = await AMM.connect(OWNER).deploy(cake.address, busd.address);
    await amm.deployed();

    const Caler = (await ethers.getContractFactory(
      "CALLER",
    )) as CALLER__factory;

    const caller = await Caler.connect(OWNER).deploy();
    await caller.deployed();
    //     console.log(bridgeVerifier.address, "hhsssh

    const BridgeVerifiewr = (await ethers.getContractFactory(
      "WalletBridgeVerifier",
    )) as WalletBridgeVerifier__factory;

    bridgeVerifier = await BridgeVerifiewr.connect(OWNER).deploy(
      caller.address,
    );
    await bridgeVerifier.deployed();
    console.log(bridgeVerifier.address, "hhssshh");
    const Wallet = (await ethers.getContractFactory(
      "SmartWalletFactory",
    )) as SmartWalletFactory__factory;

    const wallet = await Wallet.connect(OWNER).deploy(
      weth.address,
      amm.address,
      amm.address,
      [weth.address, cake.address, busd.address],
    );
    await wallet.deployed();

    const WalletFactory = (await ethers.getContractFactory(
      "ECDSAWalletFactory",
    )) as ECDSAWalletFactory__factory;

    factory = await WalletFactory.connect(OWNER).deploy(wallet.address);
    await factory.deployed();

    weth.connect(OWNER).transfer(amm.address, "100000000000000000000");
    cake.connect(OWNER).transfer(amm.address, "100000000000000000000");
    busd.connect(OWNER).transfer(amm.address, "100000000000000000000");

    cake.connect(OWNER).transfer(ALICE.address, "100000000000000000000");
    console.log(
      amm.address,
      OWNER.address,
      ALICE.address,
      factory.address,
      cake.address,
      busd.address,
    );
  });

  async function deployERC20() {
    const WETH = await ethers.getContractFactory("ABC");
    weth = (await WETH.deploy()) as ABC;
    await weth.deployed();

    const CAKE = await ethers.getContractFactory("XYZ");
    cake = (await CAKE.deploy()) as XYZ;
    await cake.deployed();

    const BUSD = await ethers.getContractFactory("PQR");
    busd = (await BUSD.deploy()) as PQR;
    await busd.deployed();
  }

  // ----- UPDATE PARNER -----
  it("User should be able to create a wallet for themselves.", async () => {
    const alicewalletAddress = await factory.walletAddress(ALICE.address, 0);
    console.log(alicewalletAddress);
    await factory
      .connect(ALICE)
      .createWallet(ALICE.address, { value: 15000000000 });

    aliceWallet = await ECDSAWallet__factory.connect(alicewalletAddress, ALICE);
    expect(await aliceWallet.owner()).to.equal(ALICE.address);
  });

  it("User should be able to deposit", async () => {
    await cake
      .connect(ALICE)
      .approve(aliceWallet.address, MaxAllowanceTransferAmount); // approve max
    await weth
      .connect(ALICE)
      .approve(aliceWallet.address, MaxAllowanceTransferAmount); // approve max
    await busd
      .connect(ALICE)
      .approve(aliceWallet.address, MaxAllowanceTransferAmount); // approve max

    const reciever = ALICE.address;
    const amount = BigInt(1 * 10 ** 18);

    console.log(formatEther(await busd.balanceOf(ALICE.address)));
    console.log(formatEther(await cake.balanceOf(ALICE.address)));
    console.log(formatEther(await cake.balanceOf(aliceWallet.address)));
    console.log(formatEther(await busd.balanceOf(aliceWallet.address)));
    console.log(formatEther(await cake.balanceOf(OWNER.address)));
    console.log(formatEther(await busd.balanceOf(OWNER.address)));

    const allowanceOps = {
      details: [
        {
          token: cake.address,
          amount: MaxAllowanceTransferAmount,
          expiration: BigInt(toDeadline(PERMIT_EXPIRATION).toString()),
          nonce: 0n,
        },
        {
          token: cake.address,
          amount: MaxAllowanceTransferAmount,
          expiration: BigInt(toDeadline(PERMIT_EXPIRATION).toString()),
          nonce: 1n,
        },
      ],
      spender: aliceWallet.address,
      sigDeadline: BigInt(toDeadline(PERMIT_SIG_EXPIRATION)),
    } as AllowanceOp;

    const walletTransferMeta = await aliceWallet
      .connect(OWNER)
      .populateTransaction.transferFrom(
        ALICE.address,
        aliceWallet.address,
        amount,
        cake.address,
      );
    const approveAMMMeta = await cake
      .connect(OWNER)
      .populateTransaction.approve(amm.address, amount);

    const swapMeta = await amm
      .connect(OWNER)
      .populateTransaction.swap(amount, reciever);

    const userOps = [
      {
        to: walletTransferMeta.to,
        amount: 0n,
        chainId: 31337,
        data: walletTransferMeta.data,
      },
      {
        to: approveAMMMeta.to,
        amount: 0n,
        chainId: 31337,
        data: approveAMMMeta.data,
      },
      {
        to: swapMeta.to,
        amount: 0n,
        chainId: 31337,
        data: swapMeta.data,
      },
    ] as UserOp[];

    const bridgeOps = [
      {
        to: walletTransferMeta.to,
        amount: 0n,
        chainId: 31337,
        data: "0x",
      },
    ] as UserOp[];

    console.log(
      userOps.forEach((op) => {
        console.log(op.data);
      }),
    );
    const signedDataValues = await sign(
      userOps,
      bridgeOps,
      allowanceOps,
      0,
      ALICE,
      31337,
      31337,
      31337,
      aliceWallet.address,
    );

    const execMeta = await aliceWallet
      .connect(OWNER)
      .populateTransaction.exec(
        signedDataValues.values,
        signedDataValues.signature,
      );

    const relayerTx = await OWNER.sendTransaction(execMeta);
    const receipt = await relayerTx.wait(1);
    //     console.log(receipt);

    console.log(formatEther(await busd.balanceOf(ALICE.address)));
    console.log(formatEther(await cake.balanceOf(ALICE.address)));
    console.log(formatEther(await cake.balanceOf(aliceWallet.address)));
    console.log(formatEther(await busd.balanceOf(aliceWallet.address)));
    console.log(formatEther(await cake.balanceOf(OWNER.address)));
    console.log(formatEther(await busd.balanceOf(OWNER.address)));
  });
});
