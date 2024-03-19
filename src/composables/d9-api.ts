import { ApiPromise, WsProvider } from '@polkadot/api'

export const api = shallowRef<ApiPromise>()

export function useD9Api() {
  const endpoint = ref(import.meta.env.VITE_APP_RPC_ENDPOINT as string)

  watch(endpoint, async (ep) => {
    console.info('endpoint', ep)
    const wsProvider = new WsProvider(ep)
    const _api = await ApiPromise.create({ provider: wsProvider })
    await _api.isReady
    api.value = _api
  }, { immediate: true })

  watch(api, (api, oldOne, cleanup) => {
    cleanup(async () => {
      await api?.disconnect()
    })
  }, { deep: false })

  return {
    api,
    endpoint,
  }
}
