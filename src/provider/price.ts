
import { getViemClient } from "./client"
import {chainlinkOracleABI} from '../../abis/ChainLinkOracleAbi'
import { chainlinkOracleBNB, chainlinkOracleCAKE } from "../constants/chainLinkOracle"
import { ChainId } from "@pancakeswap/chains"
import { formatUnits } from "viem"

export const getBNBPriceFromOracle = async () => {
      const data = await getViemClient({ chainId: ChainId.BSC }).readContract({
        abi: chainlinkOracleABI,
        address: chainlinkOracleBNB[ChainId.BSC],
        functionName: 'latestAnswer',
      })
    
      return formatUnits(data, 8)
    }

    export const getCakePriceFromOracle = async () => {
      const data = await getViemClient({ chainId: ChainId.BSC }).readContract({
        abi: chainlinkOracleABI,
        address: chainlinkOracleCAKE[ChainId.BSC],
        functionName: 'latestAnswer',
      })
    
      return formatUnits(data, 8)
    }