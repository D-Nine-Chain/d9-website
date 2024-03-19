import type { U64 } from '@polkadot/types'
import type { Block } from '@polkadot/types/interfaces'
import type { MaybeRefOrGetter } from '@vueuse/core'

export function useBlockTimestamp(block?: MaybeRefOrGetter<Block>) {
  const timestamp = computed(() => {
    if (!toValue(block))
      return undefined
    const timestampExtrinsic = toValue(block)!.extrinsics.find((extrinsic) => {
      return extrinsic.method.section === 'timestamp' && extrinsic.method.method === 'set'
    })
    if (timestampExtrinsic) {
      const timestamp = (timestampExtrinsic.method.args[0] as U64).toNumber()
      return timestamp
    }
    else {
      return undefined
    }
  })

  return timestamp
}
