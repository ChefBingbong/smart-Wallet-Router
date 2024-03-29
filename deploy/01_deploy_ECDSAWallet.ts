import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { DeployFunction } from "hardhat-deploy/types";

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
      });
      console.log("ECDSAWalletFactory Address", res.address);
};
export default func;

func.tags = ["ECDSAWalletFactory"];
