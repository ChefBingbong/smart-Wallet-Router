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

     const libRes = await deploy("ContractAddresses", {
          from: deployer,
          args: [],
          log: true,
          skipIfAlreadyDeployed: false,
          deterministicDeployment: "0x01",
     });

     const res = await deploy("ECDSAWalletFactory", {
          libraries: {
               ContractAddresses: libRes.address,
          },
          from: deployer,
          args: [smartWallet.address],
          log: true,
          skipIfAlreadyDeployed: false,
          deterministicDeployment: "0x07",
     });
     // await res.d
     console.log("ECDSAWalletFactory Address", res.address);
};
export default func;

func.tags = ["ECDSAWalletFactory"];
