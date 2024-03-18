import type { ApiDecoration } from '@polkadot/api/types'
import type { Block, Header } from '@polkadot/types/interfaces'

let keepRunning = true

export const blockHeaders = shallowReactive([] as Header[])

// queue for get block details
const queue = shallowReactive([] as Header[])

export const blocks = shallowReactive([] as { block: Block, api: ApiDecoration<'promise'> }[])

watch(d9Api, async (d9Api, _oldValue, onCleanup) => {
  console.info('d9Api', 'changes', d9Api?.genesisHash.toHex())
  if (d9Api) {
    const unsub = await d9Api.rpc.chain.subscribeNewHeads(async (lastHeader) => {
      blockHeaders.unshift(lastHeader)
      queue.push(lastHeader)
      blockHeaders.length > 1000 && blockHeaders.pop()
    })
    onCleanup(() => {
      unsub()
    })
  }
  else {
    blockHeaders.splice(0, blockHeaders.length)
  }
}, { immediate: true })

async function processQueue() {
  // eslint-disable-next-line no-unmodified-loop-condition
  while (keepRunning) {
    if (queue.length > 0 && d9Api.value) {
      console.info('process queue', 'length', queue.length)
      const header = queue.shift()
      if (!header)
        continue
      try {
        const block = (await d9Api.value.rpc.chain.getBlock(header.hash)).block
        const api = (await d9Api.value.at(block.hash))
        blocks.unshift({
          block,
          api,
        })
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

processQueue().catch(console.error)

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    // 在模块即将被替换时，设置控制标志为 false
    keepRunning = false
  })
}
