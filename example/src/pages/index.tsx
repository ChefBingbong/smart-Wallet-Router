"use-client";
import { defaultAbiCoder } from "@ethersproject/abi";
import {
  getWalletPermit2Address as getPermit2Address,
  getWalletPermit2Address,
} from "~/utils/getWalletPermit2Address";
import { type ChainId, type Currency, CurrencyAmount } from "@pancakeswap/sdk";
import { CopyIcon } from "@pancakeswap/uikit";
import { LoadingSpinner } from "@saas-ui/react";
import { SmartWalletRouter } from "@smart-wallet/router-sdk";
import { useQuery } from "@tanstack/react-query";
import type BigNumber from "bignumber.js";
import type React from "react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type TransactionReceipt,
  TransactionRejectedRpcError,
  UserRejectedRequestError,
  Address,
} from "viem";
import {
  useAccount,
  useChainId,
  useConnect,
  useDisconnect,
  useNetwork,
  useSignTypedData,
  useSwitchNetwork,
} from "wagmi";
import { SliderToggleButton } from "~/components/TabSelect";
import { TransactionCard } from "~/components/TransactionDetails";
import { useTokenBalance } from "~/hooks/useBalance";
import { useSmartRouterBestTrade } from "~/hooks/useSmartRouterBestTrade";
import { type Asset, assets, assetsBaseConfig } from "~/lib/assets";
import { wagmiconfig as config } from "~/pages/_app";
import { getSmartWalletOptions } from "~/utils/getSmartWalletOptions";
import {
  PERMIT_SIG_EXPIRATION,
  PermitTransferFrom,
  SignatureTransfer,
  Witness,
  toDeadline,
} from "@pancakeswap/permit2-sdk";

export enum ConfirmModalState {
  REVIEWING = 0,
  WRAPPING = 1,
  RESETTING_APPROVAL = 2,
  APPROVING_TOKEN = 3,
  PERMITTING = 4,
  PENDING_CONFIRMATION = 5,
  COMPLETED = 6,
}

const formatBalance = (b: BigNumber, asset: Currency) =>
  b.shiftedBy(-asset.decimals).toFixed(3);

const IndexPage = () => {
  const { chain: currenChain } = useNetwork();
  const chainId = useChainId() as ChainId;
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchNetwork } = useSwitchNetwork();

  const { signTypedDataAsync } = useSignTypedData();
  const { disconnect } = useDisconnect();

  const [tx, setTx] = useState<string | undefined>(undefined);
  const [txState, setTXState] = useState<ConfirmModalState>(
    ConfirmModalState.REVIEWING,
  );

  const [inputValue, setInputValue] = useState("");
  const [asset, setAsset] = useState<Currency>(assetsBaseConfig.CAKE);
  const [toAsset, setToAsset] = useState<Currency>(assetsBaseConfig.BUSD);
  const [feeAsset, setFeeAsset] = useState<Currency>(assetsBaseConfig.CAKE);

  const balance = useTokenBalance(asset.wrapped.address, true);
  const balance2 = useTokenBalance(toAsset.wrapped.address, true);

  const amount = useMemo(
    () =>
      CurrencyAmount.fromRawAmount(
        asset,
        Number(inputValue) * 10 ** asset.decimals,
      ),
    [asset, inputValue],
  );

  const transactionStatusDisplay = useMemo(() => {
    switch (txState) {
      case ConfirmModalState.REVIEWING:
        return `Trade ${asset.symbol}`;
      case ConfirmModalState.APPROVING_TOKEN:
        return `Approving Smart wallet for ${asset.symbol}`;
      case ConfirmModalState.PENDING_CONFIRMATION:
        return "Executing Smart Wallet Ops";
      case ConfirmModalState.COMPLETED:
        return "transaction Successful";
      default:
        return `Trade ${asset.symbol}`;
    }
  }, [txState, asset]);

  const handleAssetChange = useCallback(
    (
      e: React.ChangeEvent<HTMLSelectElement>,
      setFunction: React.Dispatch<React.SetStateAction<Currency>>,
    ) => {
      const newAsset = assetsBaseConfig[e.target.value as Asset];
      setFunction(newAsset);
    },
    [],
  );

  const handleAmount = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  }, []);

  const { data: smartWalletDetails } = useQuery({
    queryKey: ["smartWalletDetails", address, chainId],
    queryFn: async () => {
      if (!address || !chainId) return;
      return SmartWalletRouter.getUserSmartWalletDetails(address, chainId);
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(address && chainId),
  });

  const {
    data: trade,
    isLoading,
    isFetching,
  } = useSmartRouterBestTrade({
    toAsset: toAsset,
    fromAsset: asset,
    chainId,
    account: address,
    amount: amount,
  });

  console.log(trade);
  const { data: allowance } = useQuery({
    queryKey: ["allowance-query", chainId, asset.symbol, address, chainId],
    queryFn: async () => {
      if (!asset || !chainId || !address || !smartWalletDetails || !amount)
        return undefined;

      const [permit2Allowances, smartWalletAllowances] = await Promise.all([
        SmartWalletRouter.getContractAllowance(
          asset.wrapped.address,
          address,
          getPermit2Address(chainId),
          chainId,
          amount.quotient,
        ),
        SmartWalletRouter.getContractAllowance(
          asset.wrapped.address,
          address,
          smartWalletDetails?.address,
          chainId,
          amount.quotient,
        ),
      ]);
      return { permit2Allowances, smartWalletAllowances };
    },

    refetchInterval: 20000,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(
      address && asset && chainId && smartWalletDetails && amount,
    ),
  });

  const { data: fees } = useQuery({
    queryKey: ["fees-query", chainId, address, trade?.gasEstimate.toString()],
    queryFn: async () => {
      if (!address || !chainId || !trade || !allowance) return undefined;
      const options = getSmartWalletOptions(
        address,
        true,
        allowance,
        smartWalletDetails as never,
        chainId,
        undefined as never,
      );
      return SmartWalletRouter.estimateSmartWalletFees({
        address,
        options,
        trade,
        chainId,
      });
    },

    refetchInterval: 20000,
    retry: false,
    refetchOnWindowFocus: false,
    enabled: Boolean(allowance && address && trade && chainId),
  });

  const swapCallParams = useMemo(() => {
    if (
      !trade ||
      !chainId ||
      !allowance ||
      !smartWalletDetails ||
      !fees ||
      !address
    )
      return undefined;

    const options = getSmartWalletOptions(
      address,
      true,
      allowance,
      smartWalletDetails as never,
      chainId,
      // {
      //   feeTokenAddress: feeAsset.wrapped.address,
      //   feeAmount: fees.gasCostInBaseToken,
      // } as never,
      undefined,
    );
    return SmartWalletRouter.buildSmartWalletTrade(trade, options);
  }, [trade, address, chainId, allowance, smartWalletDetails, fees, feeAsset]);

  const swap = useCallback(async () => {
    if (!swapCallParams || !address || !allowance) return;

    const windowClient = await config.connector?.getWalletClient();
    const externalOps = swapCallParams.externalUserOps;

    if (externalOps.length > 0) {
      setTXState(ConfirmModalState.APPROVING_TOKEN);

      for (const externalOp of externalOps) {
        await SmartWalletRouter.sendTransactionFromRelayer(
          chainId,
          externalOp as never,
          {
            externalClient: windowClient,
          },
        );
      }
    }
    const permitTypedData = swapCallParams.permitDetails;
    setTXState(ConfirmModalState.PENDING_CONFIRMATION);

    await signTypedDataAsync({
      account: address,
      domain: permitTypedData.domain,
      types: permitTypedData.types,
      message: permitTypedData.values,
      primaryType: "PermitWitnessTransferFrom",
    }).then(async (permittSig) => {
      const { domain, types, values } = swapCallParams.smartWalletDetails;
      const { userOps: permiUserOps } = SmartWalletRouter.appendPermit2UserOp(
        permittSig,
        address,
        permitTypedData,
      );
      const updatedOps = [...permiUserOps, ...values.userOps];

      await signTypedDataAsync({
        account: address,
        domain,
        types,
        message: {
          ...values,
          userOps: updatedOps,
        },
        primaryType: "ECDSAExec",
      })
        .then(async (signature) => {
          const signatureEncoded = defaultAbiCoder.encode(
            ["uint256", "bytes"],
            [chainId, signature],
          );

          const tradeEncoded = SmartWalletRouter.encodeSmartRouterTrade(
            [updatedOps, signatureEncoded],
            smartWalletDetails?.address,
          );

          let response = null;
          if (
            (SmartWalletRouter.tradeConfig.tradeType as unknown as string) !==
            "SmartWalletTrade"
          ) {
            response = await SmartWalletRouter.sendTransactionFromRelayer(
              chainId,
              tradeEncoded,
            );
          } else {
            response = await SmartWalletRouter.sendTransactionFromRelayer(
              chainId,
              tradeEncoded,
              {
                externalClient: windowClient,
              },
            );
          }
          setTx(response.transactionHash);
          setTXState(ConfirmModalState.COMPLETED);
          return response as TransactionReceipt;
        })
        .catch((err: unknown) => {
          setTXState(ConfirmModalState.REVIEWING);
          if (err instanceof UserRejectedRequestError) {
            throw new TransactionRejectedRpcError(
              Error("Transaction rejected"),
            );
          }
          throw new Error(`Swap Failed ${err as string}`);
        });
    });
  }, [
    swapCallParams,
    address,
    signTypedDataAsync,
    chainId,
    allowance,
    smartWalletDetails,
  ]);

  useEffect(() => {
    if (isConnected && currenChain?.id !== chainId) {
      switchNetwork?.(chainId);
    }
    if (txState === ConfirmModalState.COMPLETED) {
      const i = setTimeout(() => setTXState(ConfirmModalState.REVIEWING), 2000);
      return () => clearInterval(i);
    }
  }, [isConnected, switchNetwork, currenChain, chainId, txState]);

  return (
    <div className="-m-[100px] grid h-screen">
      {!address ? (
        // biome-ignore lint/a11y/useButtonType: <explanation>
        <button
          className="rounded-md bg-indigo-600 py-4 font-medium text-white hover:bg-indigo-700"
          onClick={() => connect({ connector: connectors[0] })}
        >
          {!isConnected ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="mx-auto my-auto w-[600px]">
          <div className="">
            <div className="flex w-full flex-col justify-between">
              <p className="mb-3  overflow-hidden text-ellipsis text-xl font-medium text-gray-500">
                <span className="text-gray-700">
                  {" "}
                  {`${asset.symbol} Balance:`}
                </span>
                <span>{formatBalance(balance.balance, asset)}</span>
              </p>
              <p className="mb-12  overflow-hidden text-ellipsis text-xl font-medium text-gray-500">
                <span className="text-gray-700">
                  {" "}
                  {`${toAsset.symbol} Balance:`}
                </span>
                <span>{formatBalance(balance2.balance, toAsset)}</span>
              </p>
            </div>
            <span className="font-medium text-gray-700">
              Your Smart Wallet Address
            </span>
            <div className="mt-1 flex">
              <span className="flex h-14  grow items-center justify-between rounded-md bg-gray-100 px-6">
                {smartWalletDetails?.address}
                <CopyIcon
                  className="ml-2 hover:cursor-pointer"
                  onClick={async () => {
                    await navigator.clipboard.writeText(
                      smartWalletDetails?.address as string,
                    );
                  }}
                />
              </span>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
              <button
                className="ml-2 rounded-md bg-indigo-600 px-4 py-4 font-medium text-white hover:bg-indigo-700"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center justify-center">
            {/* <SliderToggleButton /> */}
            <div className="w-full">
              <SliderToggleButton />

              <div className="relative my-2 flex w-full items-center rounded-md bg-gray-100 focus-within:bg-gray-200">
                <select
                  className="absolute h-14 grow rounded-md bg-transparent pl-6 pr-12 outline-none "
                  value={asset.symbol}
                  onChange={(e) => handleAssetChange(e, setAsset)}
                >
                  {Object.entries(assets).map(([k], i) => {
                    return <option key={`${k}`}>{k}</option>;
                  })}
                </select>
                <input
                  type="number"
                  className="h-14 grow rounded-md bg-gray-100 px-6 text-right outline-none focus:bg-gray-200"
                  value={inputValue}
                  placeholder="enter an amount to swap"
                  onChange={handleAmount}
                  required
                />
              </div>
              <div className="relative my-2 flex w-full items-center rounded-md bg-gray-100 focus-within:bg-gray-200">
                <select
                  className="absolute h-14 grow rounded-md bg-transparent pl-6 pr-12 outline-none "
                  value={feeAsset.symbol}
                  onChange={(e) => handleAssetChange(e, setFeeAsset)}
                >
                  {Object.entries(assets).map(([k], i) => {
                    return <option key={`2-${k}`}>{k}</option>;
                  })}
                </select>
                <input
                  type="number"
                  className="h-14 flex-1 grow rounded-md bg-gray-100 px-6 text-right outline-none focus:bg-gray-200"
                  value={
                    fees
                      ? Number(fees?.gasCostInBaseToken?.toExact()).toFixed(5)
                      : ""
                  }
                  placeholder="choose your fee asset"
                  disabled
                />
              </div>

              <div className="relative my-2 flex w-full items-center rounded-md bg-gray-100 focus-within:bg-gray-200">
                <select
                  className="absolute h-14 grow rounded-md bg-transparent pl-6 pr-12 outline-none "
                  value={toAsset.symbol}
                  onChange={(e) => handleAssetChange(e, setToAsset)}
                >
                  {Object.entries(assets).map(([k], i) => {
                    return <option key={`3-${k}`}>{k}</option>;
                  })}
                </select>
                <input
                  type="number"
                  className="h-14 flex-1 grow rounded-md bg-gray-100 px-6 text-right outline-none focus:bg-gray-200"
                  value={
                    trade
                      ? Number(trade?.outputAmount?.toExact()).toFixed(5)
                      : ""
                  }
                  placeholder="you recieve 0.00"
                  disabled
                />
              </div>
              <TransactionCard
                fees={fees as never}
                trade={trade}
                inputValue={inputValue}
              />

              <div className="my-2 flex w-full items-center">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                  className="my-2 w-full rounded-md bg-indigo-600 py-4 font-medium text-white hover:bg-indigo-700"
                  onClick={swap}
                >
                  <div className=" flex w-full items-center justify-center">
                    <p className="mx-2 text-gray-300">
                      {allowance?.smartWalletAllowances.needsApproval
                        ? "Approve Smart Router"
                        : transactionStatusDisplay}
                    </p>
                    <LoadingSpinner
                      opacity={
                        (txState !== ConfirmModalState.COMPLETED &&
                          txState !== ConfirmModalState.REVIEWING) ||
                        isFetching ||
                        isLoading
                          ? 1
                          : 0
                      }
                      size="24px"
                    />
                  </div>
                </button>
              </div>
              <p className="mt-3  overflow-hidden text-ellipsis font-medium text-gray-500">
                <span className="text-gray-700">{tx ?? ""}</span>
                <span>{formatBalance(balance.balance, asset)}</span>
              </p>
            </div>
            {/* <div className="w-[65%]">
              <SliderToggleButton />

              <div className="background my-2  h-[400px] overflow-y-scroll rounded-md bg-gray-200 px-3 text-sm text-gray-100">
                <div className="my-2 flex h-14  items-center overflow-ellipsis rounded-md bg-indigo-700 px-4 focus-within:bg-gray-200">
                  {
                    "0x115792089237316195423570985008687907853269984665640564039457584007913129639935n"
                  }
                </div>
                <div className="my-2 flex h-14 items-center overflow-ellipsis rounded-md bg-indigo-700 px-4 px-4 focus-within:bg-gray-200">
                  {
                    "0x115792089237316195423570985008687907853269984665640564039457584007913129639935n"
                  }
                </div>
                <div className="my-2 flex h-14  items-center overflow-ellipsis rounded-md bg-indigo-700 px-4 focus-within:bg-gray-200">
                  <span className="mx-2 overflow-ellipsis text-ellipsis">
                    {
                      "0x115792089237316195423570985008687907853269984665640564039457584007913129639935n"
                    }
                  </span>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
