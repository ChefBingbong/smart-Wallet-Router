import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";
import { PERMIT2_ADDRESS } from "@uniswap/permit2-sdk";
import { getPermit2Address } from "@pancakeswap/permit2-sdk";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
     const { deploy, get } = hre.deployments;
     const { deployer } = await hre.getNamedAccounts();
     const smartWallet = await get("SmartWalletFactory");

     console.log("deployer Address", deployer);
     console.log("smart wallet Address", smartWallet.address);

     const res = await deploy("ECDSAWalletFactory", {
          from: deployer,
          args: [smartWallet.address],
          log: true,
          skipIfAlreadyDeployed: false,
          deterministicDeployment: "0x0005",
     });
     // await res.d
     console.log("ECDSAWalletFactory Address", res.address);
};
export default func;

func.tags = ["ECDSAWalletFactory"];
