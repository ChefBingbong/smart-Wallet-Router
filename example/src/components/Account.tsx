import { useEffect, useRef, useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { MdContentCopy } from "react-icons/md";
import { getSmartWallet } from "../lib/smartWallet";
import Transfer from "./Transfer";
import History from "./History";

function Account() {
  const acc = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector(),
  });
  const { disconnect } = useDisconnect({
    onSuccess: () => {
      setSmartWalletAddress("");
    },
  });
  const [walletConnecting, setWalletConnecting] = useState(
    acc.address ? true : false,
  );
  useEffect(() => {
    if (acc.address) {
      setSmartWalletAddress("");
      setWalletConnecting(true);
    }
  }, [acc.address]);

  return (
    <div className="grid h-screen place-items-center">
      {!acc.address ? (
        <button
          className="rounded-md bg-indigo-600 px-10 py-4 font-medium text-white hover:bg-indigo-700"
          onClick={() => connect()}
        >
          {walletConnecting ? "Connecting..." : "Connect Wallet"}
        </button>
      ) : (
        <div className="w-[1000px]">
          <div>
            <span className="font-medium text-gray-700">Send any asset to</span>
            <div className="mt-1 flex">
              <span className="flex h-14 grow items-center justify-between rounded-md bg-gray-100 px-6">
                {acc.address}
                <MdContentCopy
                  className="ml-2 hover:cursor-pointer"
                  onClick={async () => {
                    await navigator.clipboard.writeText(acc?.address as string);
                  }}
                />
              </span>
              <button
                className="ml-2 rounded-md bg-indigo-600 px-10 py-4 font-medium text-white hover:bg-indigo-700"
                onClick={() => disconnect()}
              >
                Disconnect
              </button>
            </div>
          </div>
          <div className="mt-8">
            <Transfer signerAddress={acc.address} />
          </div>
          <div className="mt-8">
            <History signerAddress={acc.address} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Account;
