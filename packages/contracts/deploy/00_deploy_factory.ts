import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
     const { deploy } = hre.deployments;
     const { deployer } = await hre.getNamedAccounts();

     console.log("Deployer Address", deployer);
     const res = await deploy("SmartWalletFactory", {
          from: deployer,
          args: [],
          log: true,
          skipIfAlreadyDeployed: false,
          deterministicDeployment: "0x0005",
     });
     console.log("SmartWalletFactory Address", res.address);
};
export default func;

func.tags = ["SmartWalletFactory"];
