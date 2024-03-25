import type { FrameSystemAccountInfo } from '@polkadot/types/lookup'
import type { MaybeRefOrGetter } from '@vueuse/core'

export function useD9Account(address: MaybeRefOrGetter<string>) {
  const state = useAsyncState(async () => {
    console.info('get d9 balance', toValue(address))
    return api.value?.query.system.account(toValue(address)) as Promise<FrameSystemAccountInfo>
  }, undefined, { resetOnExecute: false })

  watch(api, (api) => {
    api && state.execute()
  })
  watch(() => address, (address) => {
    address && state.execute()
  })

  useIntervalFn(state.execute, 5000)

  return state
}
