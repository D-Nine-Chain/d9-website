import type { ApiDecoration } from '@polkadot/api/types'
import type { Compact, U64 } from '@polkadot/types'
import type { Block, BlockNumber, CodeHash } from '@polkadot/types/interfaces'
import type { MaybeRefOrGetter } from '@vueuse/core'
import type { WrappedBlock } from '~/types'
import { getBlockByHeight, getExtrinsicFromBlock } from '~/utils/block'

export function useNetworkFee(block: MaybeRefOrGetter<WrappedBlock | undefined>, extrinsicHash: MaybeRefOrGetter<string | CodeHash | undefined>) {
  return useAsyncState(async () => {
    const _block = toValue(block)
    const hash = toValue(extrinsicHash)
    if (!_block || !hash)
      return undefined
    const extrinsicIdx = _block.extrinsics.findIndex(extrinsic => extrinsic.hash.eq(hash))
    const allEvents = await _block.api.query.system.events()
    const events = allEvents.filter(event => event.phase.isApplyExtrinsic && event.phase.asApplyExtrinsic.toNumber() === extrinsicIdx)
    const tfp = events
      .map(({ event }) => {
        if (_block.api.events.transactionPayment.TransactionFeePaid.is(event)) {
          const { who, actualFee } = event.data
          return { who, actualFee }
        }
        return undefined
      }).filter(value => !!value).at(0)
    return tfp
  }, undefined)
}

export function useBlock(height: MaybeRefOrGetter<string | number | Compact<BlockNumber> | undefined>) {
  return useAsyncState(() => getBlockByHeight(toValue(height)), undefined)
}

export function useExtrinsic(block: MaybeRefOrGetter<WrappedBlock | undefined>, hash: MaybeRefOrGetter<string | undefined>) {
  return computed(() => {
    return getExtrinsicFromBlock(toValue(block), toValue(hash))
  })
}
export function useBlockTimestamp(block: MaybeRefOrGetter<Block | undefined>) {
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

export function useBlockTimestampFromApi(api: MaybeRefOrGetter<ApiDecoration<'promise'> | undefined>) {
  return asyncComputed(async () => {
    const timestamp = await toValue(api)?.query.timestamp.now()
    return timestamp?.toNumber()
  }, undefined)
}

export function useEventsFromApi(api: MaybeRefOrGetter<ApiDecoration<'promise'>>) {
  return asyncComputed(async () => {
    const events = await toValue(api).query.system.events()
    return events
  }, undefined)
}
