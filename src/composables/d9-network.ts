import type { Header } from '@polkadot/types/interfaces'
import type { WrappedBlock } from '~/types'

export const blocks = shallowReactive<WrappedBlock[]>([])

const queue: Header[] = []

export function useD9NetworkWacher() {
  watch(api, async (api, _oldValue, onCleanup) => {
    console.info('d9Api', 'changes', api?.genesisHash.toHex(), 'old one', _oldValue?.genesisHash.toHex())
    if (api) {
      const unsub = await api.rpc.chain.subscribeNewHeads(async (lastHeader) => {
      // blockHeaders.unshift(lastHeader)
        queue.push(lastHeader)
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

  function processQueue() {
    let stopped = false
    const fn = async () => {
      // eslint-disable-next-line no-unmodified-loop-condition
      while (!stopped) {
        if (queue.length > 0 && api.value) {
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
        else {
          await new Promise(resolve => setTimeout(resolve, 500))
        }
      }
    }
    fn().catch(console.error)
    return () => stopped = true
  }

  onBeforeMount(() => {
    const stop = processQueue()
    return stop
  })

  return {}
}
