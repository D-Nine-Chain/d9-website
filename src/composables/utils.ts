import type { ApiDecoration } from '@polkadot/api/types'
import type { Compact, U64 } from '@polkadot/types'
import type { Block, BlockNumber, CodeHash } from '@polkadot/types/interfaces'
import type { IU8a } from '@polkadot/types/types'
import type { MaybeRefOrGetter } from '@vueuse/core'
import type { WrappedBlock } from '~/types'
import { getBlockByHeight, getExtrinsicFromBlock } from '~/utils/block'

/**
 * Get network fee from event
 * extrinsic -> transaction fee
 */
export function useNetworkFeeByEventRecord(block: MaybeRefOrGetter<WrappedBlock | undefined>, recordHash: MaybeRefOrGetter<IU8a | string | undefined>) {
  const extrinsic = useExtrinsicByEventRecord(block, recordHash)
  const networkFee = useNetworkFee(block, computed(() => extrinsic.value?.hash))
  watchEffect(() => {
    toValue(recordHash)
    toValue(block)
    networkFee.execute()
  })
  return networkFee
}

export function useExtrinsicByEventRecord(block: MaybeRefOrGetter<WrappedBlock | undefined>, recordHash: MaybeRefOrGetter<IU8a | string | undefined>) {
  const event = useEventRecord(block, recordHash)
  const extrinsicIndex = computed(() => event.value?.phase.isApplyExtrinsic ? event.value?.phase.asApplyExtrinsic.toNumber() : undefined)
  const extrinsic = computed(() => toValue(block)?.extrinsics.at(toValue(extrinsicIndex)!))
  return extrinsic
}

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
  const state = useAsyncState(() => getBlockByHeight(toValue(height)), undefined, { resetOnExecute: true })
  watch(() => toValue(height), async (cur, pre) => {
    if (cur === pre)
      return
    toValue(height)
    await state.execute().catch(console.warn)
  })
  return state
}

export function useExtrinsic(block: MaybeRefOrGetter<WrappedBlock | undefined>, hash: MaybeRefOrGetter<string | undefined>) {
  return computed(() => {
    return getExtrinsicFromBlock(toValue(block), toValue(hash))
  })
}

export function useEventRecord(block: MaybeRefOrGetter<WrappedBlock | undefined>, hash: MaybeRefOrGetter<IU8a | string | undefined>) {
  const event = useEventFromApiByHash(
    computed(() => toValue(block)?.api),
    computed(() => toValue(hash)),
  )
  return event
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

export function useEventsFromApi(api: MaybeRefOrGetter<ApiDecoration<'promise'> | undefined>) {
  return asyncComputed(async () => {
    const events = await toValue(api)?.query.system.events()
    return events
  }, undefined)
}

export function useEventFromApiByHash(api: MaybeRefOrGetter<ApiDecoration<'promise'> | undefined>, hash: MaybeRefOrGetter<IU8a | string | undefined>) {
  const events = useEventsFromApi(api)
  const event = computed(() => events.value?.find(event => event.hash.eq(toValue(hash))))
  // watchEffect(() => {
  //   console.info('events', toValue(events), 'hash', toValue(hash), 'found', event.value)
  // })
  return event
}
