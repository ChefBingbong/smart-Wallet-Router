// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { Depositor, ECDSAWallet__factory } from "../typechain-types";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
      const { deploy, get } = hre.deployments;
      const { deployer } = await hre.getNamedAccounts();

      const smartWallet = await get("SmartWalletFactory");

      console.log("smart wallet :", smartWallet.address);
      const res = await deploy("Depositor", {
            from: deployer,
            args: [smartWallet.address],
            log: true,
      });

      console.log("Depositor deployed to:", res.address);
};

export default func;

func.tags = ["Depositor"];
