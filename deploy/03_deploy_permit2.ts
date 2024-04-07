import type { DeployFunction } from "hardhat-deploy/types";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

const func: DeployFunction = async (hre: HardhatRuntimeEnvironment) => {
      const { deploy } = hre.deployments;
      const { deployer } = await hre.getNamedAccounts();

      const res = await deploy("Permit2", {
            from: deployer,
            args: [],
            log: true,
      });
      // await res.d
      console.log("Permit2 Address", res.address);
};
export default func;

func.tags = ["Permit2"];
