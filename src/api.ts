import { config } from "dotenv";
import cors from "cors";
import express from "express";
import { BigNumberish, ethers } from "ethers";
import { ECDSAWalletFactory, ECDSAWalletFactory__factory, ECDSAWallet__factory, IWallet } from "../typechain-types";
import { Address, Hex } from "viem";

config();

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors({ origin: "*" }));

const providers = new Map<number, ethers.providers.Provider>([
      [1, new ethers.providers.JsonRpcProvider("https://mainnet.infura.io/v3/e110322e378a4f268172084e63ac8b8d")],
      [5, new ethers.providers.JsonRpcProvider("https://goerli.infura.io/v3/e110322e378a4f268172084e63ac8b8d")],
      [3120, new ethers.providers.JsonRpcProvider("https://mainnet.catalog.fi/rpc")],
      [18414, new ethers.providers.JsonRpcProvider("https://rpc.catalog.fi/testnet")],
      [56, new ethers.providers.JsonRpcProvider("https://bsc-dataseed1.binance.org")],
      [
            80001,
            new ethers.providers.JsonRpcProvider(
                  "https://polygon-mumbai.g.alchemy.com/v2/Jcsa7sP9t3l4NPGg2pg9FDUMvVXt4Im-",
            ),
      ],
]);

const FACTORY_ABI = [
      "function createWallet(address _owner) external returns (address)",
      "function walletAddress(address _owner, uint256 _nonce) external view returns (address)",
];

const WALLET_ABI_EXACT = `[
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_contract",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_value",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "bytes",
        "name": "_data",
        "type": "bytes"
      }
    ],
    "name": "LogCall",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "LogReceivedEther",
    "type": "event"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "internalType": "struct IWallet.UserOp[]",
        "name": "userOps",
        "type": "tuple[]"
      },
      {
        "internalType": "bytes",
        "name": "_signature",
        "type": "bytes"
      }
    ],
    "name": "exec",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nonce",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`;

export interface SmartWallet {
      address: Address;
      wallet?: IWallet;
}

export interface UserOp {
      to: Address;
      amount: BigNumberish;
      data: Hex;
}

interface Transaction {
      userOps: UserOp[];
      chainID: number;
      signature: string;
}

function getProvider(chainID: number): ethers.providers.Provider {
      const provider = providers.get(chainID);
      return provider ? provider : new ethers.providers.JsonRpcProvider("http://localhost:8545");
}

async function getFactory(chainID: number): Promise<ECDSAWalletFactory> {
      return await ECDSAWalletFactory__factory.connect(
            "0xd3c31047E4622EA0c804cdB11338D6e100D3bCF6" as string,
            getSigner(chainID),
      );
}

async function getWallet(address: string, chainID: number): Promise<IWallet> {
      return (await ECDSAWallet__factory.connect(address, getSigner(chainID))) as IWallet;
}

async function getSmartWallet(addr: string, nonce: string, chainID: number, deploy?: boolean): Promise<SmartWallet> {
      const factory = await getFactory(chainID);
      console.log("hey");
      console.log(factory);
      let wallet: SmartWallet = {
            address: await factory.walletAddress(addr, nonce),
      };
      const signer = await getSigner(chainID);
      console.log(wallet);
      const code = await getProvider(chainID)!.getCode(wallet.address);
      console.log(code);
      if (code === "0x") {
            if (!deploy) {
                  return wallet;
            }
            const tx = await factory.connect(signer).createWallet(addr, { gasLimit: 200000 });
            const reciept = await tx.wait(1);
            console.log(reciept);
      }
      wallet.wallet = await getWallet(wallet.address, chainID);
      return wallet;
}

function getSigner(chainID: number): ethers.Signer {
      return new ethers.Wallet(
            "c5528b154423e65dc2ceb1cd21e108650e4a5c2815f7b3db3663b2bfc849d860",
            getProvider(chainID)!,
      );
}

async function getNonceMap(address: string, id: string): Promise<Map<string, BigNumberish>> {
      let nonceMap = new Map<string, number>();
      providers.forEach(async (provider, chainId) => {
            let nonce: number = 0;
            if ((await provider.getCode(address)) !== "0x") {
                  nonce = (await (await getWallet(address, chainId)).nonce()).toNumber();
            }
            console.log(chainId, nonce);
            nonceMap = nonceMap.set(chainId.toString(), nonce);
      });
      console.log(nonceMap);
      return nonceMap;
}

function parseContractError(err: any): string {
      return (
            err as {
                  reason: string;
            }
      ).reason;
}

app.get("/", (req, res) => {
      res.status(200).send({ result: "ok" });
});

app.get("/addresses/:address", async (req, res) => {
      const signerAddress = req.params.address;
      console.log(signerAddress);
      const id = req.query.id ? req.query.id.toString() : "0";

      if (!req.query.chainId) {
            const smartWallet = await getSmartWallet(signerAddress, id, 1);
            console.log(smartWallet);
            res.status(200).send({
                  address: smartWallet.address,
                  nonces: JSON.stringify(Object.fromEntries(await getNonceMap(signerAddress, id))),
            });
            return;
      }
      const smartWallet = await getSmartWallet(signerAddress, id, parseInt(req.query.chainId.toString()));

      const nonce = smartWallet.wallet ? await smartWallet.wallet.nonce() : 0;
      res.status(200).send({
            address: smartWallet.address,
            nonces: { [req.query.chainId.toString()]: nonce },
      });
});

app.get("/relayer", async (req, res) => {
      const chainid = parseInt(req.query.chainId!.toString());
      res.status(200).send({ address: await getSigner(chainid).getAddress() });
});

app.post("/transactions/:address", async (req, res) => {
      const id = req.query.id ? req.query.id.toString() : "0";
      const addr = req.params.address;
      const sendInternally: string = req.body["sendInternally"];
      const tx: Transaction = req.body["transaction"];
      console.log(tx);
      const signer = await getSigner(tx.chainID);
      console.log(signer);
      const wallet = await getSmartWallet(addr, id, tx.chainID, true);
      console.log(wallet);

      const gasPrice = await wallet.wallet!.provider.getGasPrice();
      try {
            const gas = await wallet.wallet!.estimateGas.exec(tx.userOps, tx.signature, { gasLimit: 200000 });
            const txCost = gasPrice.mul(gas);
            const relayer = await getSigner(tx.chainID).getAddress();
            const isPayingRelayer = tx.userOps[0].to === relayer;

            if (isPayingRelayer && txCost.gt(await tx.userOps[0].amount)) {
                  res.status(402).send({ error: "Insufficient fee payment" });
                  return;
            }
      } catch (err: any) {
            console.log(400, parseContractError(err));
            res.status(400).send({ error: parseContractError(err) });
            return;
      }
      const execTx = await wallet.wallet!.populateTransaction.exec(tx.userOps, tx.signature, { gasLimit: 200000 });
      //for bl and other complicated trasbnsantions, return the promise and allow user
      //to process tx own their on instead of being lmitied by api.
      let reciept: any = "0x0";
      if (sendInternally === "true") {
            const walletTx = await signer.sendTransaction(execTx);
            reciept = await walletTx.wait(1);
      }
      res.status(201).send({ execTx: execTx, txHash: reciept });
});

app.listen(port, async () => {
      console.log(`listening at http://localhost:${port}`);
});
