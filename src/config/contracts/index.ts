import D9USDT from '~/assets/ABIs/d9-usdt.json'

export const Contracts = {
  D9_USDT: {
    address: import.meta.env.VITE_APP_CONTRACT_USDT as string,
    abi: D9USDT,
  },
} as const
