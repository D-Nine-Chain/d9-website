import { ContractPromise } from '@polkadot/api-contract'
import type { u128 } from '@polkadot/types'
import type { MaybeRefOrGetter } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import { Contracts } from '~/config/contracts'
import { getGasLimits } from '~/utils/contracts'

export async function getBalance(address: string) {
  if (!api.value)
    return null
  console.info('get usdt balance', address)
  const contract = new ContractPromise(api.value!, Contracts.D9_USDT.abi, Contracts.D9_USDT.address)
  const { result, output } = await contract.query['psp22::balanceOf'](address, {
    gasLimit: getGasLimits().readLimit,
  }, address)
  if (result.isOk) {
    const ok = (output?.toJSON() as any)?.ok
    if (!ok)
      return null
    const balance = ok as u128
    return new BigNumber(balance.toString())
  }
  else { throw result.asErr }
}

export function useBalance(address: MaybeRefOrGetter<string>) {
  const state = useAsyncState<BigNumber | null>(async () => await getBalance(toValue(address)), null, {
    resetOnExecute: false,
  })

  watch(api, (api) => {
    api && state.execute()
  })

  watch(() => address, (address) => {
    address && state.execute()
  })

  useIntervalFn(state.execute, 5000)

  return state
}
