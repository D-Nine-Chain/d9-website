import { ApiPromise, WsProvider } from '@polkadot/api'

export const endpoint = ref(import.meta.env.VITE_APP_RPC_ENDPOINT as string)

export const d9Api = shallowRef<ApiPromise>()

watch(endpoint, async (ep) => {
  const wsProvider = new WsProvider(ep)
  d9Api.value = await ApiPromise.create({ provider: wsProvider })
}, { immediate: true })

watch(d9Api, (api, oldOne, cleanup) => {
  cleanup(async () => {
    await api?.disconnect()
  })
})
