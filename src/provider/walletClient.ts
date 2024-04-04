import { ChainId } from "@pancakeswap/chains";
import { PublicClient, createPublicClient, http, Chain, Client, WalletClient, createWalletClient } from "viem";
import { CHAINS } from "./chains";
import { privateKeyToAccount } from "viem/accounts";

const account = "0x22a557c558a2fa235e7d67839b697fc2fb1b53c8705ada632c07dee1eac330a4";

const createClients = <TClient extends Client>(chains: Chain[]) => {
      return (type: "Wallet" | "Public"): Record<ChainId, TClient> => {
            return chains.reduce(
                  (prev, cur) => {
                        const clientConfig = { chain: cur, transport: http() };
                        const client =
                              type === "Wallet"
                                    ? createWalletClient({ ...clientConfig, account })
                                    : createPublicClient(clientConfig);
                        return {
                              ...prev,
                              [cur.id]: client,
                        };
                  },
                  {} as Record<ChainId, TClient>,
            );
      };
};

const publicClients = createClients<PublicClient>(CHAINS)("Public");
const walletClients = createClients<WalletClient>(CHAINS)("Wallet");

export const getPublicClient = ({ chainId }: { chainId?: ChainId }) => {
      return publicClients[chainId!];
};

export type Provider = ({ chainId }: { chainId?: ChainId }) => PublicClient;

export const getWalletClient = ({ chainId }: { chainId?: ChainId }) => {
      return walletClients[chainId!];
};

export const signer = privateKeyToAccount(account);
