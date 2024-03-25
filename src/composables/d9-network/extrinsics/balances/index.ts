import type { GenericExtrinsic } from '@polkadot/types'
import type { Header } from '@polkadot/types/interfaces'
import type { AnyTuple, IU8a } from '@polkadot/types/types'
import type { MaybeRefOrGetter } from '@vueuse/core'
import type { Token, WrappedBlock } from '~/types'
import { getD9TransferEvents, getUSDTTransferEvents } from '~/utils/block'

export interface BalancesTransferEvent {
  header: Header
  extrinsic: GenericExtrinsic<AnyTuple>
  eventRecordHash: IU8a
  timestamp?: number
  from: string
  to: string
  amount: bigint
  token: Token
  success: boolean
}

export function useBalancesTransferEvents(block: MaybeRefOrGetter<WrappedBlock | undefined>) {
  const transfers = asyncComputed(async () => {
    const _block = toValue(block)
    const _api = _block?.api
    if (!_block || !_api)
      return undefined
    const transfers: BalancesTransferEvent[] = []
    const usdtTransfers = await getUSDTTransferEvents(_block)
    transfers.push(...usdtTransfers)
    const d9Transfers = await getD9TransferEvents(_block)
    transfers.push(...d9Transfers)
    return transfers
  }, undefined)

  const state = useAsyncState(until(transfers).not.toBeUndefined(), undefined)
  watch(() => toValue(block), (cur, pre) => {
    if (cur && !cur.hash.eq(pre?.hash))
      state.execute()
  }, { deep: false })
  return state
}
