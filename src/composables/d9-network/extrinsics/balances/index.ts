import type { GenericExtrinsic, u128 } from '@polkadot/types'
import type { AccountId32, Header } from '@polkadot/types/interfaces'
import type { FrameSystemPhase } from '@polkadot/types/lookup'
import type { AnyTuple, IU8a } from '@polkadot/types/types'
import type { MaybeRefOrGetter } from '@vueuse/core'
import type { WrappedBlock } from '~/types'

export interface BalancesTransferEvent {
  header: Header
  phase: FrameSystemPhase
  extrinsic: GenericExtrinsic<AnyTuple>
  eventRecordHash: IU8a
  timestamp?: number
  from: AccountId32
  to: AccountId32
  amount: u128
  success: boolean
}

export function useBalancesTransferEvents(block: MaybeRefOrGetter<WrappedBlock | undefined>) {
  const timestamp = useBlockTimestampFromApi(computed(() => toValue(block)?.api))
  const transfers = asyncComputed(async () => {
    if (!timestamp.value)
      return undefined
    const _block = toValue(block)
    const api = _block?.api
    if (!_block || !api)
      return []
    const events = await api.query.system.events()
    const transfers: BalancesTransferEvent[] = []

    const extrinsic = events.filter(({ phase }) => phase.isApplyExtrinsic).map(({ phase }) => {
      const extrinsicIdx = phase.asApplyExtrinsic.toNumber()
      return _block.extrinsics[extrinsicIdx]
    }).at(0)
    if (!extrinsic)
      return []

    for await (const event of events) {
      if (api.events.balances.Transfer.is(event.event)) {
        const [from, to, amount] = event.event.data
        // TODO: check if succeed
        transfers.push({
          header: _block.header,
          phase: event.phase,
          extrinsic,
          eventRecordHash: event.hash,
          timestamp: toValue(timestamp),
          from,
          to,
          amount,
          success: true,
        })
      }
    }
    return transfers
  }, undefined)

  const state = useAsyncState(until(transfers).not.toBeUndefined(), undefined)
  watch(() => toValue(block), () => state.execute())
  return state
}
