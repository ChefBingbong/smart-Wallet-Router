import { JsonRpcProvider } from "@ethersproject/providers";
import {
     AllowanceTransfer,
     MaxAllowanceTransferAmount,
     PERMIT_EXPIRATION,
     PERMIT_SIG_EXPIRATION,
     toDeadline,
     type PermitBatch,
} from "@pancakeswap/permit2-sdk";
import { CurrencyAmount, ERC20Token, Percent, TradeType, type ChainId } from "@pancakeswap/sdk";
import { SMART_ROUTER_ADDRESSES, SmartRouter, SwapRouter, type SmartRouterTrade } from "@pancakeswap/smart-router";
import chalk from "chalk";
import hre from "hardhat";
import { hexToBigInt, type Address } from "viem";
import { bscTestnet } from "viem/chains";
import { sign } from "../test/utils/sign";
import {
     ECDSAWalletFactory__factory,
     ECDSAWallet__factory,
     ERC20__factory,
     Permit2__factory,
} from "../typechain-types";
import { Deployments } from "../utils/deploymentUtils";
import { sleep } from "./deploySmartWallet";
import { getClient, v3SubgraphClient } from "./utils/client";
import { parseContractError } from "./utils/error";

async function main(config: ScriptConfig) {
     const chainId = await hre.getChainId();
     const chain = bscTestnet;
     const provider = new JsonRpcProvider(chain?.rpcUrls.default.http[0]);
     const smartRouterClient = getClient(chain);

     console.log(chalk.yellow("Setting up Contracts and Network Config"));
     await sleep(3000);

     const { get } = hre.deployments;
     const { deployer, user, name } = await hre.getNamedAccounts();

     const userWalletSigner = new hre.ethers.Wallet(
          "225bfce31326a62a6360dfc47c1b8f9ba0ad5b45c988fb66f2494cacd106048a",
          provider,
     );
     const smartWalletSigner = new hre.ethers.Wallet(
          "22a557c558a2fa235e7d67839b697fc2fb1b53c8705ada632c07dee1eac330a4",
          provider,
     );

     const smartWalletFactory = ECDSAWalletFactory__factory.connect(
          (await get("ECDSAWalletFactory")).address,
          smartWalletSigner,
     );
     const userSmartWalletAddress = await smartWalletFactory.connect(userWalletSigner).walletAddress(user, 0n);
     const userSmartWallet = ECDSAWallet__factory.connect(userSmartWalletAddress, provider);

     if ((await provider.getCode(userSmartWalletAddress)) === "0x") {
          console.log(
               chalk.yellow(
                    `Smart wallet not deployed for ${userWalletSigner.address}, please run deloySmartWallet.ts`,
               ),
          );
          return;
     }
     console.log(
          await userSmartWallet.getTradeRoute(
               Deployments[Number(chainId) as ChainId].WETH9,
               Deployments[Number(chainId) as ChainId].Cake,
               Deployments[Number(chainId) as ChainId].PancakeSwapV2Facotry,
               Deployments[Number(chainId) as ChainId].PancakeSwapV3Facotry,
          ),
     );

     const CakeContract = ERC20__factory.connect(Deployments[Number(chainId) as ChainId].Cake, provider);
     const BusdContract = ERC20__factory.connect(Deployments[Number(chainId) as ChainId].Busd, provider);
     const permit2Contract = Permit2__factory.connect(Deployments[Number(chainId) as ChainId].Permit2, provider);

     const CAKE = new ERC20Token(
          Number(chainId),
          CakeContract.address as Address,
          await CakeContract.decimals(),
          await CakeContract.symbol(),
     );
     const BUSD = new ERC20Token(
          Number(chainId),
          BusdContract.address as Address,
          await BusdContract.decimals(),
          await BusdContract.symbol(),
     );

     const baseAsset = config.baseAsset === CAKE.symbol ? CAKE : BUSD;
     const quoteAsset = config.quoteAsset === CAKE.symbol ? CAKE : BUSD;
     const feeAsset = config.feeAsset === CAKE.symbol ? CAKE : BUSD;
     const amountIn = CurrencyAmount.fromRawAmount(baseAsset, config.amountIn);

     console.log(
          chalk.yellow(
               `Swapping from CAKE to BUSD on ${name} network.
            User CAKE balance: ${await CakeContract.balanceOf(user)},
            Relayer CAKE balance: ${await CakeContract.balanceOf(deployer)}
            User BUSD balance: ${await BusdContract.balanceOf(user)},
            Relayer BUSD balance: ${await BusdContract.balanceOf(deployer)}
            Proceeding to Build Permit tx\n\n`,
          ),
     );
     await sleep(3000);

     const permit2Address = permit2Contract.address as Address;
     const allow = await permit2Contract.allowance(user, baseAsset.address, userSmartWalletAddress);
     console.log(allow.nonce);
     const permitDetails: PermitBatch = {
          details: [
               {
                    token: baseAsset.address,
                    amount: MaxAllowanceTransferAmount,
                    expiration: toDeadline(PERMIT_EXPIRATION).toString(),
                    nonce: allow.nonce,
               },
          ],
          spender: userSmartWalletAddress,
          sigDeadline: toDeadline(PERMIT_SIG_EXPIRATION).toString(),
     };

     const gasPrice = (await provider.getGasPrice()).toBigInt();
     const { domain, types, values } = AllowanceTransfer.getPermitData(permitDetails, permit2Address, Number(chainId));
     const permitSignature = await userWalletSigner._signTypedData(domain, types, values);

     let permitRawTx: PopulatedTransaction;
     try {
          const permitLimit = await userSmartWallet
               .connect(smartWalletSigner)
               .estimateGas.deposit(
                    amountIn.quotient,
                    baseAsset.address,
                    feeAsset.address,
                    quoteAsset.address,
                    user,
                    permit2Address,
                    permitDetails,
                    gasPrice,
                    permitSignature,
               );

          permitRawTx = await userSmartWallet
               .connect(smartWalletSigner)
               .populateTransaction.deposit(
                    amountIn.quotient,
                    baseAsset.address,
                    feeAsset.address,
                    quoteAsset.address,
                    user,
                    permit2Address,
                    permitDetails,
                    gasPrice,
                    permitSignature,
                    { gasLimit: permitLimit, gasPrice },
               );
     } catch (error) {
          console.log(chalk.red("Transaction failed at the permit transfer step"));
          throw new Error(parseContractError(error));
     }

     console.log(chalk.yellow("Permit transfer build successfully,..Proceeding to build V3 smart router trade\n\n"));
     await sleep(3000);

     const quoteProvider = SmartRouter.createQuoteProvider({
          onChainProvider: () => smartRouterClient as never,
     });

     let bestTradeRoute: SmartRouterTrade<TradeType>;
     try {
          const [v2Pools, v3Pools] = await Promise.all([
               SmartRouter.getV2CandidatePools({
                    onChainProvider: () => smartRouterClient,
                    v2SubgraphProvider: () => v2SubgraphClient,
                    v3SubgraphProvider: () => v3SubgraphClient,
                    currencyA: CAKE,
                    currencyB: BUSD,
               } as never),
               SmartRouter.getV3CandidatePools({
                    onChainProvider: () => smartRouterClient,
                    subgraphProvider: () => v3SubgraphClient,
                    currencyA: CAKE,
                    currencyB: BUSD,
                    subgraphFallback: false,
               } as never),
          ]);
          const pools = [...v2Pools, ...v3Pools];

          bestTradeRoute = (await SmartRouter.getBestTrade(amountIn, BUSD, TradeType.EXACT_INPUT, {
               gasPriceWei: gasPrice,
               maxHops: 2,
               maxSplits: 2,
               poolProvider: SmartRouter.createStaticPoolProvider(pools),
               quoteProvider,
               quoterOptimization: true,
          })) as SmartRouterTrade<TradeType>;
     } catch (error) {
          console.log(chalk.red("Transaction failed at the smart router build step"), error);
          throw new Error(parseContractError(error));
     }

     console.log(
          chalk.yellow("V3 Trade built successfully,..Proceeding to build and execute Smart Wallet Operations\n\n"),
     );
     await sleep(3000);

     const routerAddress = SMART_ROUTER_ADDRESSES[Number(chainId) as ChainId];
     const rawApprovalTx = await CakeContract.connect(smartWalletSigner).populateTransaction.approve(
          routerAddress,
          amountIn.quotient,
     );

     const rawV3TradeTx = SwapRouter.swapCallParameters(bestTradeRoute, {
          recipient: user,
          slippageTolerance: new Percent(1),
     });
     const smartWalletOperations = [
          {
               to: permitRawTx.to,
               amount: BigInt(0),
               data: permitRawTx.data,
          },
          {
               to: rawApprovalTx.to,
               amount: BigInt(0),
               data: rawApprovalTx.data,
          },
          {
               to: routerAddress,
               amount: hexToBigInt(rawV3TradeTx.value),
               data: rawV3TradeTx.calldata,
          },
     ] as UserOp[];

     const currentWalletTxNonce = await userSmartWallet?.nonce();
     const smartWalletSignature = await sign(
          smartWalletOperations,
          currentWalletTxNonce.toBigInt(),
          userWalletSigner,
          userSmartWalletAddress,
     );

     let smartWalletTxReceipt: TransactionReceipt;
     try {
          const rawSmartWalletTx = await userSmartWallet
               .connect(smartWalletSigner)
               .populateTransaction.exec(
                    smartWalletOperations,
                    smartWalletSignature.sig,
                    Deployments[Number(chainId) as ChainId].WETH9,
                    Deployments[Number(chainId) as ChainId].PancakeSwapV2Facotry,
                    Deployments[Number(chainId) as ChainId].PancakeSwapV3Facotry,
               );

          const deployerTransaction = await smartWalletSigner.sendTransaction(rawSmartWalletTx);
          smartWalletTxReceipt = await deployerTransaction.wait(1);
     } catch (error) {
          console.log(chalk.red("Transaction failed at the smart router build step"), error);
          throw new Error(parseContractError(error));
     }

     console.log(
          chalk.yellow(
               `\nSuccessfully swaped from 5 CAKE to BUSD on ${name} network\n.
        User CAKE balance after: ${await CakeContract.balanceOf(user)},\n
        Relayer CAKE balance after: ${await CakeContract.balanceOf(deployer)}\n
        User BUSD balance after: ${await BusdContract.balanceOf(user)},\n
        Relayer BUSD balance after: ${await BusdContract.balanceOf(deployer)}\n
        Transaction Hash: ${smartWalletTxReceipt.transactionHash}`,
          ),
     );
}

type ScriptConfig = { baseAsset: string; quoteAsset: string; feeAsset: string; amountIn: bigInt };

main({
     baseAsset: "CAKE",
     quoteAsset: "BUSD",
     feeAsset: "CAKE",
     amountIn: BigInt(5 * 10 ** 18),
}).catch((error) => {
     console.error(error);
     process.exitCode = 1;
});
