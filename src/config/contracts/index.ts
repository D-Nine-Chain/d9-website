import { BN, BN_ONE } from '@polkadot/util'
import D9USDT from '~/assets/ABIs/d9-usdt.json'
import MarketMaker from '~/assets/ABIs/market-maker.json'

export const MAX_CALL_WEIGHT = new BN(5_000_000_000_000).isub(BN_ONE)
export const PROOFSIZE = new BN(119903836479112)
export const STORAGE_DEPOSIT_LIMIT = null

export const Contracts = {
  D9_USDT: {
    address: import.meta.env.VITE_APP_CONTRACT_USDT as string,
    abi: D9USDT,
  },
  MARKET_MAKER: {
    address: import.meta.env.VITE_APP_CONTRACT_MM as string,
    abi: MarketMaker,
  },
} as const
