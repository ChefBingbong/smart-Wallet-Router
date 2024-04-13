"use-client";
import { defaultAbiCoder } from "@ethersproject/abi";
import {
  getWalletPermit2Address as getPermit2Address,
  getWalletPermit2Address,
} from "~/utils/getWalletPermit2Address";
import { type ChainId, type Currency, CurrencyAmount } from "@pancakeswap/sdk";
import { CopyIcon } from "@pancakeswap/uikit";
import { LoadingSpinner } from "@saas-ui/react";
import {
  RouterTradeType,
  SmartWalletRouter,
  getNonceHelperContract,
} from "@smart-wallet/router-sdk";
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
  REVIEWING = -1,
  APPROVING_TOKEN = 0,
  PERMITTING = 1,
  PENDING_CONFIRMATION = 2,
  SIGNED = 3,
  EXECUTING = 4,
  COMPLETED = 5,
  FAILED = 6,
}

const IndexPage = () => {
  const { chain: currenChain } = useNetwork();
  const chainId = useChainId() as ChainId;
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { switchNetwork } = useSwitchNetwork();

  const { signTypedDataAsync } = useSignTypedData();
  const { disconnect } = useDisconnect();

  const [txState, setTXState] = useState<ConfirmModalState>(
    ConfirmModalState.REVIEWING,
  );

  const [tx, setTx] = useState<TransactionReceipt | undefined>(undefined);
  const [inputValue, setInputValue] = useState("");
  const [asset, setAsset] = useState<Currency>(assetsBaseConfig.CAKE);
  const [toAsset, setToAsset] = useState<Currency>(assetsBaseConfig.BUSD);
  const [feeAsset, setFeeAsset] = useState<Currency>(assetsBaseConfig.CAKE);

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
        return `Swap ${asset.symbol} for ${toAsset.symbol}`;
      case ConfirmModalState.APPROVING_TOKEN:
        return `Approving Smart wallet for ${asset.symbol}`;
      case ConfirmModalState.PERMITTING:
        return `Permitting Relayer ${asset.symbol}`;
      case ConfirmModalState.PENDING_CONFIRMATION:
        return "Awaiting Confirmtion";
      case ConfirmModalState.EXECUTING:
        return "Executing Wallet Ops";
      case ConfirmModalState.COMPLETED:
        return "transaction Successful";
      case ConfirmModalState.FAILED:
        return "transaction Failed";
      default:
        return `Trade ${asset.symbol}`;
    }
  }, [txState, asset, toAsset]);

  const primaryColor = useMemo(() => {
    if (txState === ConfirmModalState.FAILED) return "bg-red-600";
    return "bg-indigo-600";
  });
  const secondaryColor = useMemo(() => {
    if (txState === ConfirmModalState.FAILED) return "bg-red-600";
    return "bg-indigo-600";
  });

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

  const handleAmount = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (txState === ConfirmModalState.COMPLETED) {
        setTXState(ConfirmModalState.REVIEWING);
      }
      setInputValue(e.target.value);
    },
    [txState],
  );

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
      {
        feeTokenAddress: feeAsset.wrapped.address,
        feeAmount: fees.gasCostInBaseToken,
      } as never,
    );
    return SmartWalletRouter.buildSmartWalletTrade(trade, options);
  }, [trade, address, chainId, allowance, smartWalletDetails, fees, feeAsset]);

  const swap = useCallback(async () => {
    setTx(undefined);
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
    setTXState(ConfirmModalState.PERMITTING);
    const permit2NonceContract = getNonceHelperContract(chainId);
    const nextNonce = await permit2NonceContract.read.nextNonce([address]);

    const { permit2MetaData } = swapCallParams;
    const permitTypedData = await permit2MetaData(nextNonce ?? 0);
    await signTypedDataAsync({
      account: address,
      domain: permitTypedData.domain,
      types: permitTypedData.types,
      message: permitTypedData.values,
      primaryType: "PermitWitnessTransferFrom",
    })
      .then(async (permittSig) => {
        setTXState(ConfirmModalState.PENDING_CONFIRMATION);
        const { domain, types, values } = swapCallParams.smartWalletDetails;
        const { userOps: permiUserOps } = SmartWalletRouter.appendPermit2UserOp(
          permittSig,
          address,
          fees?.gasCostInBaseToken.quotient,
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
            setTXState(ConfirmModalState.SIGNED);
            const signatureEncoded = defaultAbiCoder.encode(
              ["uint256", "bytes"],
              [chainId, signature],
            );

            const tradeEncoded = SmartWalletRouter.encodeSmartRouterTrade(
              [updatedOps, signatureEncoded],
              smartWalletDetails?.address,
            );

            await Promise.resolve(() =>
              setTimeout(() => setTXState(ConfirmModalState.EXECUTING), 500),
            );
            let response = null;
            if (
              SmartWalletRouter.tradeConfig.tradeType !==
                RouterTradeType.SmartWalletTrade ||
              SmartWalletRouter.tradeConfig.tradeType !==
                RouterTradeType.SmartWalletTradeWithPermit2
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
            console.log(response);
            setTx(response);
            setTXState(ConfirmModalState.COMPLETED);
            console.log(response);
            return response as TransactionReceipt;
          })
          .catch((err: unknown) => {
            console.log(err);
            setTXState(ConfirmModalState.FAILED);
            if (err instanceof UserRejectedRequestError) {
              throw new TransactionRejectedRpcError(
                Error("Transaction rejected"),
              );
            }
            throw new Error(`Swap Failed ${err as string}`);
          });
      })
      .catch(() => setTXState(ConfirmModalState.FAILED));
  }, [
    swapCallParams,
    address,
    signTypedDataAsync,
    chainId,
    allowance,
    smartWalletDetails,
    fees,
  ]);

  useEffect(() => {
    if (isConnected && currenChain?.id !== chainId) {
      switchNetwork?.(chainId);
    }

    if (txState === ConfirmModalState.FAILED) {
      setTx(undefined);
      const i = setTimeout(
        () => setTXState(ConfirmModalState.REVIEWING),
        40000,
      );
      return () => clearTimeout(i);
    }
  }, [isConnected, switchNetwork, currenChain, chainId, txState]);

  return (
    <div className="-m-[100px] flex grid h-screen items-center justify-center">
      {!address ? (
        // biome-ignore lint/a11y/useButtonType: <explanation>
        <button
          className={`rounded-md ${primaryColor} py-4 font-medium text-white hover:${secondaryColor}`}
          onClick={() => connect({ connector: connectors[0] })}
        >
          {!isConnected ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="mx-auto mt-[200px] w-[600px] items-center">
          <div className="">
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
                className={`ml-2 rounded-md ${primaryColor} px-4 py-4 font-medium text-white hover:${secondaryColor}`}
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
                tx={tx}
                txState={txState}
                asset={asset}
                toAsset={toAsset}
                fees={fees as never}
                trade={trade}
                inputValue={inputValue}
              />

              <div className="my-2 flex w-full items-center">
                {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
                <button
                  className={`my-2 w-full rounded-md ${primaryColor} py-4 font-medium text-white hover:${secondaryColor}`}
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndexPage;
