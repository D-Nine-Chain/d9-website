/* eslint-disable ts/no-use-before-define */
import { ApiPromise, WsProvider } from '@polkadot/api'
import type { Header } from '@polkadot/types/interfaces'
import type { UserModule, WrappedBlock } from '~/types'

const queue: Header[] = []
const endpoint = ref(import.meta.env.VITE_APP_RPC_ENDPOINT as string)

export const install: UserModule = ({ isClient }) => {
  if (!isClient)
    return
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

  watch(api, async (api, _oldValue, onCleanup) => {
    console.info('d9Api', 'changes', api?.genesisHash.toHex(), 'old one', _oldValue?.genesisHash.toHex())
    if (api) {
      const unsub = await api.rpc.chain.subscribeNewHeads(async (lastHeader) => {
        // blockHeaders.unshift(lastHeader)
        queue.push(lastHeader)
        queue.length > import.meta.env.VITE_APP_QUEUE_BUFFER && queue.shift()
        // ;(blockHeaders.length > import.meta.env.VITE_APP_KEEP_BLOCK) && blockHeaders.pop()
      })
      onCleanup(() => {
        unsub()
      })
    }
    if (_oldValue) {
      if (!api || (api && !_oldValue.genesisHash.eq(api.genesisHash))) {
        queue.splice(0, queue.length)
        blocks.splice(0, queue.length)
      }
    }
  }, { immediate: true })

  async function processQueue() {
    while (true) {
      if (paused.value || !queue.length || !api.value) {
        await new Promise(resolve => setTimeout(resolve, 500))
      }
      else {
        console.info('process queue', 'length', queue.length, 'blocks', 'length', blocks.length)
        const header = queue.shift()
        if (!header)
          continue
        try {
          const block = (await api.value.rpc.chain.getBlock(header.hash)).block
          const apiAt = (await api.value.at(block.hash))
          blocks.unshift(Object.assign(block, {
            api: apiAt,
          }) satisfies WrappedBlock)
          ;(blocks.length > import.meta.env.VITE_APP_KEEP_BLOCK) && blocks.pop()
        }
        catch (err) {
          console.error('get block info failed.', err)
        }
      }
    }
  }

  processQueue()
}

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
