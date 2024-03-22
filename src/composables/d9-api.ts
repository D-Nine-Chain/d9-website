import { ApiPromise, WsProvider } from '@polkadot/api'
import { isClient } from '@vueuse/core'

const endpoint = ref(import.meta.env.VITE_APP_RPC_ENDPOINT as string)

export const api = shallowRef<ApiPromise>()

export const registry = asyncComputed(() => api.value?.registry)

const customRPC = {
  referral: {
    getAncestors: {
      description: 'get ancestors of a referral account',
      params: [
        {
          name: 'account',
          type: 'AccountId',
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true,
        },
      ],
      type: 'Vec<AccountId>',
    },
    getParent: {
      description: 'get parent of a referral account',
      params: [
        {
          name: 'account',
          type: 'AccountId',
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true,
        },
      ],
      type: 'AccountId',
    },
    getDirectReferralCount: {
      description: 'get direct referrals count of a referral account',
      params: [
        {
          name: 'account',
          type: 'AccountId',
        },
        {
          name: 'at',
          type: 'Hash',
          isOptional: true,
        },
      ],
      type: 'u32',
    },
  },
  voting: {
    getSortedCandidates: {
      description: 'get canidates sorted by votes',
      params: [

        {
          name: 'at',
          type: 'Hash',
          isOptional: true,
        },
      ],
      type: 'Vec<(AccountId, u64)>',
    },
  },
}

watch(endpoint, async (ep) => {
  if (!isClient)
    return
  console.info('endpoint', ep)
  const wsProvider = new WsProvider(ep, 5000)
  const _api = await ApiPromise.create({
    provider: wsProvider,
    rpc: customRPC,
  })
  await _api.isReady
  api.value = _api
}, { immediate: true })

watch(api, (api, oldOne, cleanup) => {
  cleanup(async () => {
    await api?.disconnect()
  })
}, { deep: false })
