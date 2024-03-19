import { ApiPromise, WsProvider } from '@polkadot/api'

const endpoint = ref(import.meta.env.VITE_APP_RPC_ENDPOINT as string)

export const api = shallowRef<ApiPromise>()

export const registry = asyncComputed(() => api.value?.registry)

export function useD9Api() {
  watch(endpoint, async (ep) => {
    console.info('endpoint', ep)
    const wsProvider = new WsProvider(ep, 5000)
    const _api = await ApiPromise.create({
      provider: wsProvider,
    })
    await _api.isReady
    api.value = _api
  }, { immediate: true })

  watch(api, (api, oldOne, cleanup) => {
    cleanup(async () => {
      await api?.disconnect()
    })
  }, { deep: false })

  return {}
}
