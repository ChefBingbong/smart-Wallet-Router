import { ChainId } from "@pancakeswap/chains";
import BigNumber from "bignumber.js";
import { useCallback, useMemo, useState } from "react";
import {
  Address,
  erc20ABI,
  useAccount,
  useChainId,
  useContractRead,
} from "wagmi";
import { ChainsAdapter } from "~/config/chains";
import {
  Asset,
  AssetBaseConfig,
  assets,
  assetsBaseConfig,
} from "../lib/assets";

export const useTokenBalance = (tokenAddress: Address, forceBSC?: boolean) => {
  return useTokenBalanceByChain(
    tokenAddress,
    forceBSC ? ChainId.BSC : undefined,
  );
};

export const useTokenBalanceByChain = (
  tokenAddress: Address,
  chainIdOverride?: ChainId,
) => {
  const { address: account } = useAccount();
  const chainId = useChainId();

  const { data, status, ...rest } = useContractRead({
    chainId: chainIdOverride ?? chainId,
    abi: erc20ABI,
    address: tokenAddress,
    functionName: "balanceOf",
    args: [account || "0x"],
    enabled: !!account,
    watch: true,
  });

  return {
    ...rest,
    fetchStatus: status,
    balance: useMemo(
      () =>
        typeof data !== "undefined"
          ? new BigNumber(data.toString())
          : new BigNumber(0),
      [data],
    ),
  };
};
interface TransferProps {
  signerAddress: string;
}

enum TransactionStatus {
  Ready = "Send",
  Sending = "Sending...",
  Complete = "Sent!",
}

function Transfer(props: TransferProps) {
  const { connector } = useAccount();
  const [amount, setAmount] = useState("");
  const [asset, setAsset] = useState<AssetBaseConfig>(assetsBaseConfig.CAKE);
  const [toAsset, setToAsset] = useState<AssetBaseConfig>(
    assetsBaseConfig.BUSD,
  );

  const [chain, setChain] = useState(ChainsAdapter[asset.chainId].name);
  const [toChain, setToChain] = useState(ChainsAdapter[toAsset.chainId].name);

  const balance = useTokenBalance(asset.address as Address);
  const [recipientAddress, setRecipientAddress] = useState("");

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(e.target.value);
  };

  const handleAsset = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newAsset = assetsBaseConfig[e.target.value as Asset];
      const newChain = ChainsAdapter[asset.chainId].name;
      setAsset(newAsset);
      setChain(newChain);
    },
    [setAsset, setChain, asset],
  );

  const handleToAsset = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newAsset = assetsBaseConfig[e.target.value as Asset];
      const newChain = ChainsAdapter[toAsset.chainId].name;
      setToAsset(newAsset);
      setToChain(newChain);
    },
    [setToAsset, setToChain, toAsset],
  );

  const handleChain = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const newChainId = e.target.value;
    const newChain = Object.values(ChainsAdapter).find(
      (c) => c.name === newChainId,
    )?.name;
    setChain(newChain);
  }, []);

  const handleRecipient = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRecipientAddress(e.target.value);
  };

  return (
    <div className="w-[60%]">
      <span className="w-full font-medium text-gray-700">
        Transfer without gas
      </span>
      <div className="mt-1 flex w-full items-center">
        <select
          className="my-2 h-14 grow rounded-md bg-gray-100 px-6 outline-none focus:bg-gray-200"
          value={asset.shortName}
          onChange={handleAsset}
        >
          {Object.entries(assets).map(([k], i) => {
            return <option key={i}>{k}</option>;
          })}
        </select>
      </div>
      <div className=" flex w-full items-center">
        <select
          className="mb-2 h-14 grow rounded-md bg-gray-100 px-6 outline-none focus:bg-gray-200"
          value={toAsset.shortName}
          onChange={handleToAsset}
        >
          {Object.entries(assets).map(([k], i) => {
            return <option key={i}>{k}</option>;
          })}
        </select>
      </div>
      <div className="mb-1 flex w-full items-center">
        <input
          type="number"
          className="h-14 grow rounded-md bg-gray-100 px-6 text-right outline-none focus:bg-gray-200"
          value={amount}
          placeholder="enter an amount to swap"
          onChange={handleAmount}
          required
        />
      </div>
      <div className="my-2 flex w-full items-center">
        <input
          type="number"
          className="h-14 grow rounded-md bg-gray-100 px-6 text-right outline-none focus:bg-gray-200"
          value={amount}
          placeholder="you recieve"
          onChange={handleAmount}
          disabled
        />
      </div>
      {/* <div className="mt-1 flex items-center">
        <span className="ml-2 font-medium text-gray-700">from</span>
        <select
          className="ml-2 h-14 w-40 rounded-md bg-gray-100 px-6 outline-none focus:bg-gray-200"
          value={chain}
          onChange={handleChain}
        >
          {Object.values(ChainsAdapter).map((chain, i) => {
            return <option key={i}>{chain.name}</option>;
          })}
        </select>
        <span className="ml-2 font-medium text-gray-700">to</span>
        <input
          type="text"
          className="ml-2 h-14 grow rounded-md bg-gray-100 px-6 outline-none focus:bg-gray-200"
          value={recipientAddress}
          placeholder="0xblah"
          onChange={handleRecipient}
          required
        />

        <button
          className="ml-2 rounded-md bg-indigo-600 px-10 py-4 font-medium text-white hover:bg-indigo-700"
          onClick={() => null}
        >
          {"send"}
        </button>
      </div> */}
      <p className="mt-1 text-xs font-medium uppercase text-gray-500">{`Max: ${
        balance.balance
          ? balance.balance.shiftedBy(-asset.decimals).toFixed(2)
          : "-"
      } ${asset.shortName}`}</p>
      {/* {error && <p className="font-medium text-red-400 mt-1">{error}</p>} */}
    </div>
  );
}

export default Transfer;
