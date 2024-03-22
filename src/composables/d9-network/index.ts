import type { Header } from '@polkadot/types/interfaces'
import { isClient } from '@vueuse/core'
import type { WrappedBlock } from '~/types'

export const blocks = shallowReactive<WrappedBlock[]>([])

const queue: Header[] = []

export const paused = ref(true)
const stopped = false

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
  if (!isClient)
    return
  while (true) {
    if (stopped || paused.value || !queue.length || !api.value) {
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
