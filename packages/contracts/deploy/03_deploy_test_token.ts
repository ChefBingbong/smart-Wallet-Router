// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
     const { deploy } = hre.deployments;
     const { deployer } = await hre.getNamedAccounts();

     const res = await deploy("XYZ", {
          from: deployer,
          args: [],
          log: true,
     });

     console.log("XYZ deployed to:", res.address);
};

export default func;

func.tags = ["XYZ"];
