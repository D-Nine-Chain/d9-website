import type { ApiPromise } from '@polkadot/api'

export const api = shallowRef<ApiPromise>()

export const registry = asyncComputed(() => api.value?.registry)
