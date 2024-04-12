import { MaxUint256, SignatureTransfer } from '@pancakeswap/permit2-sdk';
import { getTokenPrices } from '@pancakeswap/price-api-sdk';
import { CurrencyAmount, WNATIVE, Price } from '@pancakeswap/sdk';
import { SwapRouter, SMART_ROUTER_ADDRESSES, SmartRouter } from '@pancakeswap/smart-router';
import { PancakeSwapUniversalRouter, getUniversalRouterAddress } from '@pancakeswap/universal-router-sdk';
import { parseAbiItem, createPublicClient, fallback, http, createWalletClient, formatTransactionRequest, erc20Abi, getFunctionSelector, encodeAbiParameters, maxUint256, getContract, BaseError, parseUnits } from 'viem';
import { polygonZkEvm, arbitrum, arbitrumGoerli, zkSync, zkSyncTestnet, linea, opBNBTestnet, base, baseGoerli, scrollSepolia, sepolia, arbitrumSepolia, baseSepolia, bsc, bscTestnet, goerli, mainnet, polygonZkEvmTestnet, opBNB, lineaTestnet } from 'viem/chains';
import { parseAccount, getTransactionError, getContractError } from 'viem/utils';
import { ChainId } from '@pancakeswap/chains';
import { privateKeyToAccount } from 'viem/accounts';
import { ethereumTokens, goerliTestnetTokens, bscTokens, bscTestnetTokens, arbitrumTokens, arbitrumGoerliTokens, polygonZkEvmTokens, polygonZkEvmTestnetTokens, zksyncTokens, zkSyncTestnetTokens, lineaTokens, lineaTestnetTokens, opBnbTokens, opBnbTestnetTokens, baseTokens, baseTestnetTokens, scrollSepoliaTokens, arbSepoliaTokens, baseSepoliaTokens } from '@pancakeswap/tokens';
import { CurrencyAmount as CurrencyAmount$1 } from '@pancakeswap/swap-sdk-core';

// src/smartWalletRouter.ts
var ABI_STRUCT_PERMIT_DETAILS = `
struct PermitDetails {
  address token;
  uint160 amount;
  uint48 expiration;
  uint48 nonce;
}`.replaceAll("\n", "");
var ABI_STRUCT_PERMIT_SINGLE = `
struct PermitSingle {
  PermitDetails details;
  address spender;
  uint256 sigDeadline;
}
`.replaceAll("\n", "");
var ABI_STRUCT_PERMIT_BATCH = `
struct PermitBatch {
  PermitSingle[] details;
  address spender;
  uint256 sigDeadline;
}
`.replaceAll("\n", "");
var ABI_STRUCT_ALLOWANCE_TRANSFER_DETAILS = `
struct AllowanceTransferDetails {
  address from;
  address to;
  uint160 amount;
  address token;
}
`.replaceAll("\n", "");
var ABI_PARAMETER = {
  // samrt wallet ops
  ["CREATE_WALLET" /* CREATE_WALLET */]: parseAbiItem("function createWallet(address _owner)"),
  ["EXEC" /* EXEC */]: parseAbiItem([
    "function exec(UserOp[] calldata userOps, bytes calldata _signature)",
    "struct UserOp { address to; uint256 amount; bytes data; }"
  ]),
  // ERC20 ops
  ["TRANSFER" /* TRANSFER */]: parseAbiItem("function transfer(address to, uint256 amount)"),
  ["TRANSFER_FROM" /* TRANSFER_FROM */]: parseAbiItem("function transferFrom(address from, address to, uint256 amount)"),
  ["APPROVE" /* APPROVE */]: parseAbiItem("function approve(address spender, uint256 amount)"),
  // PERMIT OPS
  ["PERMIT2_PERMIT" /* PERMIT2_PERMIT */]: parseAbiItem([
    "function permit2Permit(PermitSingle permitSingle, bytes data)",
    ABI_STRUCT_PERMIT_SINGLE,
    ABI_STRUCT_PERMIT_DETAILS
  ]),
  ["PERMIT2_PERMIT_BATCH" /* PERMIT2_PERMIT_BATCH */]: parseAbiItem([
    "function permit2PermitBatch(PermitBatch permitBatch, bytes data)",
    ABI_STRUCT_PERMIT_BATCH,
    ABI_STRUCT_PERMIT_SINGLE,
    ABI_STRUCT_PERMIT_DETAILS
  ]),
  ["PERMIT2_TRANSFER_FROM" /* PERMIT2_TRANSFER_FROM */]: parseAbiItem(
    "function permit2TransferFrom(address token, address recipient, uint160 amount)"
  ),
  ["PERMIT2_TRANSFER_FROM_BATCH" /* PERMIT2_TRANSFER_FROM_BATCH */]: parseAbiItem([
    "function permit2PermitTransferFromBatch(AllowanceTransferDetails[] batchDetails)",
    ABI_STRUCT_ALLOWANCE_TRANSFER_DETAILS
  ]),
  // SW PERMIT OPS
  ["PERMIT2_TRANSFER_TO_RELAYER_WITNESS" /* PERMIT2_TRANSFER_TO_RELAYER_WITNESS */]: parseAbiItem([
    "function deposit(uint256 _amount, address _token, address _owner, address _user, PermitTransferFrom calldata _permit, bytes calldata _signature)",
    "struct PermitTransferFrom { TokenPermissions permitted; uint256 nonce; uint256 deadline; }",
    "struct TokenPermissions { address token; uint256 amount; }"
  ]),
  ["CLAIM_PERMIT" /* CLAIM_PERMIT */]: parseAbiItem(
    "function withdrawERC20(address _token, uint256 _amount, address recipient)"
  )
};
var WalletOperationBuilder = class {
  constructor() {
    this.addUserOperationFromCall = (calls) => {
      calls.forEach((call) => {
        const { address, value, calldata } = call;
        const userOperation = { to: address, amount: BigInt(value), data: calldata };
        this.userOps.push(userOperation);
      });
    };
    this.userOps = [];
    this.externalUserOps = [];
  }
  addUserOperation(type, parameters, contract, value = 0n) {
    const { encodedSelector, encodedInput } = encodeOperation(type, parameters);
    const operationCalldata = encodedSelector.concat(encodedInput.substring(2));
    const userOperation = { to: contract, amount: value, data: operationCalldata };
    this.userOps.push(userOperation);
  }
  addExternalUserOperation(type, parameters, contract = void 0, value = 0n) {
    const { encodedSelector, encodedInput } = encodeOperation(type, parameters);
    const operationCalldata = encodedSelector.concat(encodedInput.substring(2));
    const userOperation = { to: contract, value, data: operationCalldata };
    this.externalUserOps.push(userOperation);
  }
};
function encodeOperation(type, parameters) {
  const operationAbiItem = ABI_PARAMETER[type];
  const encodedSelector = getFunctionSelector(operationAbiItem);
  const encodedInput = encodeAbiParameters(operationAbiItem.inputs, parameters);
  return { encodedSelector, encodedInput };
}
var PERMIT_SIG_EXPIRATION = 18e5;
var toDeadline = (expiration) => {
  return Math.floor((Date.now() + expiration) / 1e3);
};
var generatePermitTransferFromTypedData = (token, amount, spender, _witness, nonce) => {
  const permit = {
    permitted: {
      token,
      amount
    },
    spender,
    nonce,
    deadline: toDeadline(PERMIT_SIG_EXPIRATION).toString()
  };
  const witness = {
    witnessTypeName: "Witness",
    witnessType: { Witness: [{ name: "user", type: "address" }] },
    witness: { user: _witness }
  };
  return { permit, witness };
};
var permit2TpedData = (chainId, token, spender, witness, amount, nonce) => {
  if (!chainId)
    throw new Error("PERMIT: missing chainId");
  if (!token)
    throw new Error("PERMIT: missing token");
  if (!spender)
    throw new Error("PERMIT: missing spender");
  if (!token)
    throw new Error("PERMIT: missing token");
  if (nonce === void 0)
    throw new Error("PERMIT: missing nonce");
  const permit = generatePermitTransferFromTypedData(token, amount, spender, witness, nonce);
  const {
    domain,
    types,
    values: message
  } = SignatureTransfer.getPermitData(
    permit.permit,
    "0x89b5B5d93245f543D53CC55923DF841349a65169",
    chainId,
    permit.witness
  );
  return {
    ...permit,
    domain,
    types,
    primaryType: "PermitTransferFrom",
    values: message
  };
};
var polygonTokens = {
  weth: "0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa"
};
var Deployments = {
  [80001 /* POLYGON_TESTNET */]: {
    ECDSAWalletFactory: "0xC6D72727dAD90e4711412e369aE67706d0EF7C02",
    SmartWalletFactory: "0xab381dB93d006bF653D62c1727D418f6E76a28e7",
    Depositor: "0x",
    Permit2: "0x",
    ...polygonTokens
  },
  [31337 /* LOCAL */]: {
    ECDSAWalletFactory: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
    SmartWalletFactory: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    Depositor: "0x",
    Permit2: "0x"
    // weth: "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9",
  },
  [ChainId.ETHEREUM]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.GOERLI]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.BSC]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.BSC_TESTNET]: {
    // ECDSAWalletFactory: "0x7Cc708b5175cf51aA87d90f85F77180e596638e8",
    SmartWalletFactory: "0x6831823A1DD41BB3D1700306f953146C0F5C7e9C",
    ECDSAWalletFactory: "0x7db8033a94b5F12ff34880D509e782220C2c40D4",
    // SmartWalletFactory: "0xA0BAC90193566cB5158aB74e067997B9f28e17AD",
    // '0x89b5B5d93245f543D53CC55923DF841349a65169'
    Depositor: "0x",
    Permit2: "0x89b5B5d93245f543D53CC55923DF841349a65169"
  },
  [ChainId.ZKSYNC_TESTNET]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.ZKSYNC]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.OPBNB_TESTNET]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.OPBNB]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.POLYGON_ZKEVM]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.POLYGON_ZKEVM_TESTNET]: {
    ECDSAWalletFactory: "0x4E06FBDb972F3473C4CD838156156F7B7dA0405D",
    SmartWalletFactory: "0x798e5A9A79f6229AB8792B5a98f2b49B1b3a3cF6",
    Depositor: "0x2BAF15BA3A2d06C763C03e17C15B9370C3c73b12",
    Permit2: "0x"
  },
  [ChainId.ARBITRUM_ONE]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.ARBITRUM_GOERLI]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.ARBITRUM_SEPOLIA]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.SCROLL_SEPOLIA]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.LINEA]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.LINEA_TESTNET]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.BASE]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.BASE_TESTNET]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.BASE_SEPOLIA]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  },
  [ChainId.SEPOLIA]: {
    ECDSAWalletFactory: "0x",
    SmartWalletFactory: "0x",
    Depositor: "0x",
    Permit2: "0x"
  }
};

// src/provider/chains.ts
var CHAINS = [
  bsc,
  bscTestnet,
  goerli,
  mainnet,
  zkSync,
  polygonZkEvm,
  polygonZkEvmTestnet,
  arbitrum,
  base,
  scrollSepolia,
  arbitrumGoerli,
  baseGoerli,
  opBNBTestnet,
  zkSyncTestnet,
  opBNB,
  linea,
  lineaTestnet
];
var POLYGON_ZKEVM_NODES = [
  "https://f2562de09abc5efbd21eefa083ff5326.zkevm-rpc.com/",
  ...polygonZkEvm.rpcUrls.default.http
];
var ARBITRUM_NODES = [
  ...arbitrum.rpcUrls.default.http,
  "https://arbitrum-one.publicnode.com",
  "https://arbitrum.llamarpc.com"
].filter(Boolean);
var PUBLIC_NODES = {
  [ChainId.BSC]: [
    "https://bsc.publicnode.com",
    "https://binance.llamarpc.com",
    "https://bsc-dataseed1.defibit.io",
    "https://bsc-dataseed1.binance.org"
  ].filter(Boolean),
  [ChainId.BSC_TESTNET]: ["https://data-seed-prebsc-1-s2.binance.org:8545"],
  [ChainId.ETHEREUM]: [
    "https://ethereum.publicnode.com",
    "https://eth.llamarpc.com",
    "https://cloudflare-eth.com"
  ].filter(Boolean),
  [ChainId.GOERLI]: ["https://eth-goerli.public.blastapi.io"].filter(Boolean),
  [ChainId.ARBITRUM_ONE]: [...ARBITRUM_NODES].filter(Boolean),
  [ChainId.ARBITRUM_GOERLI]: arbitrumGoerli.rpcUrls.default.http,
  [ChainId.POLYGON_ZKEVM]: [...POLYGON_ZKEVM_NODES],
  [ChainId.POLYGON_ZKEVM_TESTNET]: ["https://polygon-zkevm-testnet.rpc.thirdweb.com"],
  [ChainId.ZKSYNC]: [...zkSync.rpcUrls.default.http],
  [ChainId.ZKSYNC_TESTNET]: zkSyncTestnet.rpcUrls.default.http,
  [ChainId.LINEA]: linea.rpcUrls.default.http,
  [ChainId.LINEA_TESTNET]: [
    "https://rpc.goerli.linea.build",
    "https://linea-testnet.rpc.thirdweb.com",
    "https://consensys-zkevm-goerli-prealpha.infura.io/v3/93e8a17747e34ec0ac9a554c1b403965"
  ],
  [ChainId.OPBNB_TESTNET]: opBNBTestnet.rpcUrls.default.http,
  [ChainId.OPBNB]: ["https://opbnb.publicnode.com"],
  [ChainId.BASE]: ["https://base.publicnode.com", ...base.rpcUrls.default.http].filter(Boolean),
  [ChainId.BASE_TESTNET]: baseGoerli.rpcUrls.default.http,
  [ChainId.SCROLL_SEPOLIA]: scrollSepolia.rpcUrls.default.http,
  [ChainId.SEPOLIA]: sepolia.rpcUrls.default.http,
  [ChainId.ARBITRUM_SEPOLIA]: arbitrumSepolia.rpcUrls.default.http,
  [ChainId.BASE_SEPOLIA]: baseSepolia.rpcUrls.default.http,
  [80001 /* POLYGON_TESTNET */]: ["https://rpc.ankr.com/polygon_mumbai"],
  [31337 /* LOCAL */]: ["http://127.0.0.1:8545/"]
};

// src/provider/client.ts
function createViemPublicClients({ transportSignal } = {}) {
  return CHAINS.reduce(
    (prev, cur) => {
      return {
        ...prev,
        [cur.id]: createPublicClient({
          chain: cur,
          transport: fallback(
            PUBLIC_NODES[cur.id].map(
              (url) => http(url, {
                timeout: 1e4,
                fetchOptions: {
                  signal: transportSignal
                }
              })
            ),
            {
              rank: false
            }
          ),
          batch: {
            multicall: {
              batchSize: cur.id === ChainId.POLYGON_ZKEVM ? 128 : 1024 * 200,
              wait: 16
            }
          },
          pollingInterval: 6e3
        })
      };
    },
    {}
  );
}
var viemClients = createViemPublicClients();
createViemPublicClientGetter({ viemClients });
function createViemPublicClientGetter({
  viemClients: viemClientsOverride,
  ...restParams
} = {}) {
  const clients = viemClientsOverride || createViemPublicClients(restParams);
  return function getClients({ chainId }) {
    return clients[chainId];
  };
}
var createClients = (chains) => {
  return chains.reduce(
    (prev, cur) => {
      const clientConfig = {
        chain: cur,
        transport: fallback(
          PUBLIC_NODES[cur.id].map(
            (url) => http(url, {
              timeout: 15e3
            })
          ),
          {
            rank: false
          }
        ),
        batch: {
          multicall: {
            batchSize: cur.id === ChainId.POLYGON_ZKEVM ? 128 : 154 * 200,
            wait: 16
          }
        }
      };
      const client = createPublicClient(clientConfig);
      return {
        // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
        ...prev,
        [cur.id]: client
      };
    },
    {}
  );
};
var publicClients = createClients(CHAINS);
var getViemClient = ({ chainId }) => {
  return publicClients[chainId];
};
var account = "0x22a557c558a2fa235e7d67839b697fc2fb1b53c8705ada632c07dee1eac330a4";
var userAccount = "0x225bfce31326a62a6360dfc47c1b8f9ba0ad5b45c988fb66f2494cacd106048a";
privateKeyToAccount(userAccount);
var signer = privateKeyToAccount(account);
var createClients2 = (chains) => {
  return (type) => {
    return chains.reduce(
      (prev, cur) => {
        const clientConfig = { chain: cur, transport: http() };
        const client = type === "Wallet" ? createWalletClient({ ...clientConfig, account: signer, key: "SmartWaletClient" }) : createPublicClient(clientConfig);
        return {
          // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
          ...prev,
          [cur.id]: client
        };
      },
      {}
    );
  };
};
var createUserClients = (chains) => {
  return (type) => {
    return chains.reduce(
      (prev, cur) => {
        const clientConfig = { chain: cur, transport: http() };
        const client = type === "Wallet" ? createWalletClient({ ...clientConfig, account: userAccount }) : createPublicClient(clientConfig);
        return {
          // biome-ignore lint/performance/noAccumulatingSpread: <explanation>
          ...prev,
          [cur.id]: client
        };
      },
      {}
    );
  };
};
var publicClients2 = createClients2(CHAINS)("Public");
var walletClients = createClients2(CHAINS)("Wallet");
createUserClients(CHAINS)("Wallet");
var getPublicClient = ({ chainId }) => {
  return publicClients2[chainId];
};
var getWalletClient = ({ chainId }) => {
  return walletClients[chainId];
};
var getSwapRouterAddress = (chainId) => {
  return SMART_ROUTER_ADDRESSES[chainId];
};
var RouterRecipientByTrade = {
  ["UniversalRouter" /* UniversalRouter */]: (chainId) => getUniversalRouterAddress(chainId),
  ["SmartRouter" /* SmartOrderRouter */]: (chainId) => getSwapRouterAddress(chainId)
};
var ClasicTrade = class {
  constructor(trade, options) {
    this.trade = trade;
    this.options = options;
    this.addMandatoryOperations = (planner) => {
      const { trade, options } = this;
      const { slippageTolerance } = options.underlyingTradeOptions;
      const { account: account2, smartWalletDetails, chainId } = options;
      const amountIn = SmartRouter.maximumAmountIn(trade, slippageTolerance, trade.inputAmount).quotient;
      const swapRouterAddress = getUniversalRouterAddress(chainId);
      const inputToken = this.trade.inputAmount.currency.wrapped.address;
      const urOptions = options.underlyingTradeOptions;
      PancakeSwapUniversalRouter.swapERC20CallParameters(trade, urOptions);
      planner.addUserOperation(
        "TRANSFER_FROM" /* TRANSFER_FROM */,
        [account2, smartWalletDetails.address, amountIn],
        inputToken
      );
      planner.addUserOperation("APPROVE" /* APPROVE */, [swapRouterAddress, BigInt(amountIn)], inputToken);
    };
    this.tradeType = this.options.SmartWalletTradeType;
    const { underlyingTradeOptions } = options;
    if (underlyingTradeOptions?.fee && underlyingTradeOptions?.flatFee) {
      throw new Error("Cannot specify both fee and flatFee");
    }
  }
  encode(planner) {
    const { trade, options } = this;
    const { chainId, smartWalletDetails, account: account2 } = options;
    const tradeOptions = options.underlyingTradeOptions;
    const inputToken = trade.inputAmount.currency.wrapped.address;
    const routerRecipient = RouterRecipientByTrade[this.options.router](chainId);
    const amountIn = SmartRouter.maximumAmountIn(
      trade,
      tradeOptions.slippageTolerance,
      trade.inputAmount
    ).quotient;
    const universalRouterAddress = getUniversalRouterAddress(chainId);
    const smartRouterAddress = getSwapRouterAddress(chainId);
    const permit2Address = "0x89b5B5d93245f543D53CC55923DF841349a65169";
    if (options.isUsingPermit2 && this.tradeType === "SmartWalletTrade" /* SmartWalletTrade */ && options.hasApprovedPermit2) {
      planner.addExternalUserOperation("APPROVE" /* APPROVE */, [permit2Address, maxUint256], inputToken);
    } else if (!options.isUsingPermit2) {
      const transferAmount = options.fees ? amountIn + options.fees.feeAmount.quotient : amountIn;
      if (!options.hasApprovedRelayer) {
        planner.addExternalUserOperation(
          "APPROVE" /* APPROVE */,
          [smartWalletDetails.address, transferAmount],
          inputToken
        );
      }
      planner.addUserOperation(
        "TRANSFER_FROM" /* TRANSFER_FROM */,
        [account2, smartWalletDetails.address, transferAmount],
        inputToken
      );
    }
    if (routerRecipient === smartRouterAddress) {
      const { calldata, value } = SwapRouter.swapCallParameters(trade, tradeOptions);
      planner.addUserOperation("APPROVE" /* APPROVE */, [routerRecipient, BigInt(amountIn)], inputToken);
      planner.addUserOperationFromCall([{ address: routerRecipient, calldata, value }]);
    }
    if (routerRecipient === universalRouterAddress) {
      const { calldata, value } = PancakeSwapUniversalRouter.swapERC20CallParameters(trade, tradeOptions);
      planner.addUserOperation("APPROVE" /* APPROVE */, [routerRecipient, BigInt(amountIn)], inputToken);
      planner.addUserOperationFromCall([{ address: routerRecipient, calldata, value }]);
    }
  }
};

// src/abis/SmartWalletFactoryAbi.ts
var smartWalletFactoryAbi = [
  {
    inputs: [
      { internalType: "contract SmartWalletFactory", name: "_factory", type: "address" },
      { internalType: "address", name: "_permit2", type: "address" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    inputs: [],
    name: "PERMIT2",
    outputs: [{ internalType: "contract IPermit2", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_owner", type: "address" }],
    name: "createWallet",
    outputs: [{ internalType: "contract IWallet", name: "", type: "address" }],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "address", name: "_token", type: "address" },
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "address", name: "_user", type: "address" },
      {
        components: [
          {
            components: [
              { internalType: "address", name: "token", type: "address" },
              { internalType: "uint256", name: "amount", type: "uint256" }
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions",
            name: "permitted",
            type: "tuple"
          },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "uint256", name: "deadline", type: "uint256" }
        ],
        internalType: "struct ISignatureTransfer.PermitTransferFrom",
        name: "_permit",
        type: "tuple"
      },
      { internalType: "bytes", name: "_signature", type: "bytes" }
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "address", name: "", type: "address" }
    ],
    name: "tokenBalancesByUser",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_owner", type: "address" },
      { internalType: "uint256", name: "_nonce", type: "uint256" }
    ],
    name: "walletAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  }
];

// src/abis/SmartWalletAbi.ts
var smartWalletAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "previousAdmin",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "newAdmin",
        type: "address"
      }
    ],
    name: "AdminChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "beacon",
        type: "address"
      }
    ],
    name: "BeaconUpgraded",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint8",
        name: "version",
        type: "uint8"
      }
    ],
    name: "Initialized",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_contract",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_value",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "_data",
        type: "bytes"
      }
    ],
    name: "LogCall",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "_from",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "LogReceivedEther",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "implementation",
        type: "address"
      }
    ],
    name: "Upgraded",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    name: "__ECDSAWallet_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "__SmartWallet_init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_chainID",
        type: "uint256"
      }
    ],
    name: "domainSeperator",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256"
          },
          {
            internalType: "bytes",
            name: "data",
            type: "bytes"
          }
        ],
        internalType: "struct IWallet.UserOp[]",
        name: "userOps",
        type: "tuple[]"
      },
      {
        internalType: "bytes",
        name: "_signature",
        type: "bytes"
      }
    ],
    name: "exec",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "nonce",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "proxiableUUID",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address"
      }
    ],
    name: "upgradeTo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newImplementation",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "upgradeToAndCall",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
];

// src/utils/contracts.ts
var getSmartWalletFactory = (chainId) => {
  const client = getPublicClient({ chainId });
  const address = Deployments[chainId].ECDSAWalletFactory;
  return getContract({ address, client, abi: smartWalletFactoryAbi });
};
var getSmartWallet = (chainId, address) => {
  const client = getPublicClient({ chainId });
  return getContract({ address, client, abi: smartWalletAbi });
};
var getErc20Contract = (chainId, address) => {
  const client = getPublicClient({ chainId });
  getWalletClient({ chainId });
  return getContract({ address, client, abi: erc20Abi });
};
var AccountNotFoundError = class extends BaseError {
  constructor({ docsPath } = {}) {
    super(
      [
        "Could not find an Account to execute with this Action.",
        "Please provide an Account with the `account` argument on the Action, or by supplying an `account` to the WalletClient."
      ].join("\n"),
      {
        docsPath,
        docsSlug: "account"
      }
    );
    this.name = "AccountNotFoundError";
  }
};
var usdGasTokensByChain = {
  [ChainId.ETHEREUM]: [ethereumTokens.usdt],
  [ChainId.GOERLI]: [goerliTestnetTokens.usdc],
  [ChainId.BSC]: [bscTokens.usdt],
  [ChainId.BSC_TESTNET]: [bscTestnetTokens.usdt],
  [ChainId.ARBITRUM_ONE]: [arbitrumTokens.usdc],
  [ChainId.ARBITRUM_GOERLI]: [arbitrumGoerliTokens.usdc],
  [ChainId.POLYGON_ZKEVM]: [polygonZkEvmTokens.usdt],
  [ChainId.POLYGON_ZKEVM_TESTNET]: [polygonZkEvmTestnetTokens.usdt],
  [ChainId.ZKSYNC]: [zksyncTokens.usdc],
  [ChainId.ZKSYNC_TESTNET]: [zkSyncTestnetTokens.usdc],
  [ChainId.LINEA]: [lineaTokens.usdc],
  [ChainId.LINEA_TESTNET]: [lineaTestnetTokens.usdc],
  [ChainId.OPBNB]: [opBnbTokens.usdt],
  [ChainId.OPBNB_TESTNET]: [opBnbTestnetTokens.usdc],
  [ChainId.BASE]: [baseTokens.usdc],
  [ChainId.BASE_TESTNET]: [baseTestnetTokens.usdc],
  [ChainId.SCROLL_SEPOLIA]: [scrollSepoliaTokens.usdc],
  [ChainId.SEPOLIA]: [scrollSepoliaTokens.usdc],
  [ChainId.ARBITRUM_SEPOLIA]: [arbSepoliaTokens.usdc],
  [ChainId.BASE_SEPOLIA]: [baseSepoliaTokens.usdc]
};
function tryParseAmount(value, currency) {
  if (!value || !currency) {
    return void 0;
  }
  try {
    const typedValueParsed = parseUnits(value, currency.decimals).toString();
    if (typedValueParsed !== "0") {
      return CurrencyAmount$1.fromRawAmount(currency, BigInt(typedValueParsed));
    }
  } catch (error) {
    console.debug(`Failed to parse input amount: "${value}"`, error);
  }
  return void 0;
}
var tryParseAmount_default = tryParseAmount;

// src/utils/estimateGas.ts
function getUsdGasToken(chainId) {
  return usdGasTokensByChain[chainId]?.[0] ?? null;
}
function getNativeWrappedToken(chainId) {
  return WNATIVE[chainId] ?? null;
}
var getTokenPriceByNumber = (baseCurrency, quoteCurrency, price) => {
  const quoteAmount = tryParseAmount_default(String(price), baseCurrency);
  const baseAmount = tryParseAmount_default("1", quoteCurrency);
  if (!baseAmount || !quoteAmount) {
    return void 0;
  }
  return new Price({ baseAmount, quoteAmount });
};

// src/utils/typedMetaTx.ts
var typedMetaTx = (userOps, nonce, smartWalletAddress, chainId) => {
  const domain = {
    name: "ECDSAWallet",
    version: "0.0.1",
    chainId,
    verifyingContract: smartWalletAddress
  };
  const types = {
    UserOp: [
      { name: "to", type: "address" },
      { name: "amount", type: "uint256" },
      { name: "data", type: "bytes" }
    ],
    ECDSAExec: [
      { name: "userOps", type: "UserOp[]" },
      { name: "nonce", type: "uint256" },
      { name: "chainID", type: "uint256" },
      { name: "sigChainID", type: "uint256" }
    ]
  };
  const values = {
    userOps,
    nonce,
    chainID: chainId,
    sigChainID: chainId
  };
  return { domain, types, values };
};

// src/smartWalletRouter.ts
function calculateGasMargin(value, margin = 1000n) {
  return value * (10000n + margin) / 10000n;
}
var _SmartWalletRouter = class _SmartWalletRouter {
  static updateConfig(config) {
    this.account = config.account;
    this.smartWallet = config.smartWalletDetails.address;
    this.chainId = config.chainId;
  }
  static buildClassicTrade(trade, options) {
    this.tradeConfig = { ...options, ...trade };
    const routeOptions = options.underlyingTradeOptions;
    if (options.router === "UniversalRouter" /* UniversalRouter */) {
      const { value: value2, calldata: calldata2 } = PancakeSwapUniversalRouter.swapERC20CallParameters(trade, routeOptions);
      const swapRouterAddress2 = getUniversalRouterAddress(options.chainId);
      return { address: swapRouterAddress2, calldata: calldata2, value: value2 };
    }
    const { value, calldata } = SwapRouter.swapCallParameters(trade, routeOptions);
    const swapRouterAddress = getSwapRouterAddress(options.chainId);
    return { address: swapRouterAddress, calldata, value };
  }
  static buildSmartWalletTrade(trade, options) {
    this.tradeConfig = { ...options, ...trade };
    const planner = new WalletOperationBuilder();
    const tradeCommand = new ClasicTrade(trade, options);
    tradeCommand.encode(planner);
    return _SmartWalletRouter.encodePlan(planner, {
      ...options,
      token: this.tradeConfig.inputAmount.currency.address,
      amount: this.tradeConfig.inputAmount.quotient
    });
  }
  static encodePlan(planner, config) {
    const { userOps, externalUserOps } = planner;
    const { address, nonce } = config.smartWalletDetails;
    const smartWalletTypedData = typedMetaTx(userOps, nonce, address, config.chainId);
    const permitSpender = Deployments[config.chainId].ECDSAWalletFactory;
    const permit2TypedData = permit2TpedData(
      config.chainId,
      userOps[0].to,
      permitSpender,
      signer.address,
      config.amount,
      14n
      // get correct nonce on FE
    );
    return { permitDetails: permit2TypedData, smartWalletDetails: smartWalletTypedData, externalUserOps };
  }
  static appendPermit2UserOp(signature, account2, permit2TypedData) {
    const permitPlanner = new WalletOperationBuilder();
    permitPlanner.addUserOperation(
      "PERMIT2_TRANSFER_TO_RELAYER_WITNESS" /* PERMIT2_TRANSFER_TO_RELAYER_WITNESS */,
      [
        BigInt(permit2TypedData.values.permitted.amount),
        permit2TypedData.values.permitted.token,
        signer.address,
        account2,
        permit2TypedData.permit,
        signature
      ],
      permit2TypedData.values.spender
    );
    return permitPlanner;
  }
  static async sendTransactionFromRelayer(chainId, txConfig, config) {
    const asyncClient = getPublicClient({ chainId });
    const externalClient = config?.externalClient;
    const client = externalClient || getWalletClient({ chainId });
    if (!client.account)
      throw new AccountNotFoundError();
    const account2 = parseAccount(client.account);
    try {
      const gasPrice = await asyncClient.getGasPrice();
      const gasE = await asyncClient.estimateGas({
        to: txConfig.to,
        value: txConfig.amount,
        data: txConfig.data,
        account: account2
        // gas: 20000,
      });
      const tradeMeta = await client.prepareTransactionRequest({
        to: txConfig.to,
        value: txConfig.amount,
        data: txConfig.data,
        chain: bscTestnet,
        gas: calculateGasMargin(gasE),
        gasPrice,
        account: account2
      });
      const chainFormat = client.chain?.formatters?.transactionRequest?.format;
      const format = chainFormat || formatTransactionRequest;
      if (account2.type === "local" && externalClient) {
        const serializer = client.chain?.serializers?.transaction;
        const signedTx = await account2.signTransaction(format(tradeMeta), { serializer });
        const txHash2 = await client.sendRawTransaction({ serializedTransaction: signedTx });
        return await asyncClient.waitForTransactionReceipt({ hash: txHash2, confirmations: 2 });
      }
      const txHash = await client.sendTransaction({ ...tradeMeta });
      return await asyncClient.waitForTransactionReceipt({ hash: txHash, confirmations: 1 });
    } catch (error) {
      const errParams = { ...txConfig, account: client.account };
      throw getTransactionError(error, errParams);
    }
  }
  static async estimateSmartWalletFees({ address, options, trade, chainId }) {
    const publicClient = getPublicClient({ chainId: 56 });
    const usdToken = getUsdGasToken(56);
    if (!usdToken) {
      throw new Error(`No valid usd token found on chain ${chainId}`);
    }
    const nativeWrappedToken = getNativeWrappedToken(56);
    if (!nativeWrappedToken) {
      throw new Error(`Unsupported chain ${chainId}. Native wrapped token not found.`);
    }
    const inputCurrency = trade.inputAmount.currency;
    const outputCurrency = trade.outputAmount.currency;
    const [quoteCurrencyUsdPrice, baseCurrencyUsdPrice, nativeCurrencyUsdPrice] = await getTokenPrices(56, [
      "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56",
      "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
      nativeWrappedToken.address
    ]);
    const quotePriceInUsd = getTokenPriceByNumber(usdToken, outputCurrency, quoteCurrencyUsdPrice?.priceUSD);
    const basePriceInUsd = getTokenPriceByNumber(usdToken, inputCurrency, baseCurrencyUsdPrice?.priceUSD);
    const nativePriceInUsd = getTokenPriceByNumber(
      usdToken,
      nativeWrappedToken,
      nativeCurrencyUsdPrice?.priceUSD
    );
    const quotePriceInNative = quotePriceInUsd && nativePriceInUsd ? nativePriceInUsd.multiply(quotePriceInUsd.invert()) : void 0;
    const basePriceInNative = basePriceInUsd && nativePriceInUsd ? nativePriceInUsd.multiply(basePriceInUsd.invert()) : void 0;
    let tradeGasEstimation = trade?.gasEstimate ?? trade?.gasUseEstimate ?? 0n;
    const contract = getErc20Contract(97, trade.inputAmount.currency.wrapped.address);
    if (options.isUsingPermit2) {
      await contract.estimateGas.transferFrom([address, options.smartWalletDetails.address, 0n], { account: signer.address }).then((gas) => {
        tradeGasEstimation += gas;
      }).catch((e) => {
        tradeGasEstimation += 25000n;
      });
      await contract.estimateGas.transferFrom([address, options.smartWalletDetails.address, 0n], { account: signer.address }).then((gas) => {
        tradeGasEstimation += gas;
      }).catch((e) => {
        tradeGasEstimation += 25000n;
      });
    } else {
      await contract.estimateGas.transferFrom([address, options.smartWalletDetails.address, 0n], {
        account: signer.address
      }).then((gas) => {
        tradeGasEstimation += gas;
      }).catch((e) => {
        tradeGasEstimation += 25000n;
      });
      await contract.estimateGas.transfer([signer.address, 0n], { account: signer.address }).then((gas) => {
        tradeGasEstimation += gas;
      }).catch((e) => {
        tradeGasEstimation += 25000n;
      });
    }
    await contract.estimateGas.approve([SMART_ROUTER_ADDRESSES[97], MaxUint256], { account: signer.address }).then((gas) => {
      tradeGasEstimation += gas;
    }).catch((e) => {
      tradeGasEstimation += 25000n;
    });
    await contract.estimateGas.transfer([signer.address, trade.inputAmount.quotient], { account: address }).then((gas) => {
      tradeGasEstimation += gas;
    }).catch((e) => {
      tradeGasEstimation += 25000n;
    });
    const estimationOfSmartWalletBatchExec = 50000n;
    const gasPrice = await publicClient.getGasPrice();
    const baseGasCostWei = gasPrice * (tradeGasEstimation + estimationOfSmartWalletBatchExec);
    const totalGasCostNativeCurrency = CurrencyAmount.fromRawAmount(nativeWrappedToken, baseGasCostWei);
    let gasCostInQuoteToken = CurrencyAmount.fromRawAmount(outputCurrency, 0n);
    let gasCostInBaseToken = CurrencyAmount.fromRawAmount(outputCurrency, 0n);
    let gasCostInUSD = CurrencyAmount.fromRawAmount(usdToken, 0n);
    if (inputCurrency.isNative)
      gasCostInBaseToken = totalGasCostNativeCurrency;
    if (outputCurrency.isNative)
      gasCostInQuoteToken = totalGasCostNativeCurrency;
    if (!inputCurrency.isNative && !outputCurrency.isNative && quotePriceInNative && basePriceInNative) {
      gasCostInQuoteToken = quotePriceInNative.quote(totalGasCostNativeCurrency);
      gasCostInBaseToken = basePriceInNative.quote(totalGasCostNativeCurrency);
    }
    if (nativePriceInUsd) {
      gasCostInUSD = nativePriceInUsd.quote(totalGasCostNativeCurrency);
    }
    return {
      gasEstimate: tradeGasEstimation,
      gasCostInNative: totalGasCostNativeCurrency,
      gasCostInQuoteToken,
      gasCostInBaseToken,
      gasCostInUSD
    };
  }
  static async getContractAllowance(tokenAddress, owner, spender, chainId, amountToCheck) {
    try {
      const client = getViemClient({ chainId });
      const allowance = await client.readContract({
        functionName: "allowance",
        args: [owner, spender],
        address: tokenAddress,
        abi: erc20Abi
      });
      let needsApproval = false;
      if (amountToCheck && allowance < amountToCheck) {
        needsApproval = true;
        return { allowance, needsApproval };
      }
      return { allowance, needsApproval };
    } catch (error) {
      throw getContractError(error, {
        abi: erc20Abi,
        address: tokenAddress,
        args: [owner, spender],
        functionName: "allowance"
      });
    }
  }
  static encodeSmartRouterTrade(args, to) {
    const { encodedSelector, encodedInput } = encodeOperation("EXEC" /* EXEC */, args);
    const callData = encodedSelector.concat(encodedInput.substring(2));
    return { to, amount: 0n, data: callData };
  }
  static async getUserSmartWalletDetails(userAddress, chainId) {
    const publicClient = getPublicClient({ chainId });
    const factory = getSmartWalletFactory(chainId);
    const address = await factory.read.walletAddress([userAddress, BigInt(0)]);
    const code = await publicClient.getBytecode({ address });
    const smartWallet = getSmartWallet(chainId, address);
    const nonce = code !== "0x" ? await smartWallet.read.nonce() : BigInt(0);
    return { address, nonce, wallet: smartWallet };
  }
};
_SmartWalletRouter.isInitialized = false;
_SmartWalletRouter.tradeConfig = {};
var SmartWalletRouter = _SmartWalletRouter;

export { SmartWalletRouter };
