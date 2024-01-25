import { acceptHMRUpdate, defineStore } from 'pinia'
import { ApiPromise, WsProvider } from '@polkadot/api'

// use provider by extension?
const _initial_ws_provider = new WsProvider(import.meta.env.VITE_APP_RPC_ENDPOINT)
export const useWalletStore = defineStore('wallet', () => {
  const provider = shallowRef(_initial_ws_provider)
  const api = computedAsync<ApiPromise | null>(async (onCancel) => {
    await dispose()
    const _api = await ApiPromise.create({
      provider: provider.value,
    })
    onCancel(async () => {
      _api.isConnected && await _api.disconnect()
    })
    return _api
  }, null)

  async function dispose() {
    api.value?.isConnected && await api.value.disconnect()
  }

  return {
    api,
    dispose,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useWalletStore as any, import.meta.hot))
