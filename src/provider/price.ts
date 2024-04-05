import { getViemClient } from "./client";
import { chainlinkOracleABI } from "../../abis/ChainLinkOracleAbi";
import { chainlinkOracleBNB, chainlinkOracleCAKE } from "../constants/chainLinkOracle";
import { ChainId } from "@pancakeswap/chains";
import { formatUnits } from "viem";
import tryParseAmount from "../utils/tryParseAmount";
import { Currency, Price } from "@pancakeswap/sdk";

export const getBNBPriceFromOracle = async () => {
      const data = await getViemClient({ chainId: ChainId.BSC }).readContract({
            abi: chainlinkOracleABI,
            address: chainlinkOracleBNB[ChainId.BSC],
            functionName: "latestAnswer",
      });

      return formatUnits(data, 8);
};

export const getCakePriceFromOracle = async () => {
      const data = await getViemClient({ chainId: ChainId.BSC }).readContract({
            abi: chainlinkOracleABI,
            address: chainlinkOracleCAKE[ChainId.BSC],
            functionName: "latestAnswer",
      });

      return formatUnits(data, 8);
};

export const getTokenPriceByNumber = (baseCurrency: Currency, quoteCurrency: Currency, price: number) => {
      const quoteAmount = tryParseAmount(String(price), baseCurrency);
      const baseAmount = tryParseAmount("1", quoteCurrency);
      if (!baseAmount || !quoteAmount) {
            return undefined;
      }

      return new Price({ baseAmount, quoteAmount });
};
