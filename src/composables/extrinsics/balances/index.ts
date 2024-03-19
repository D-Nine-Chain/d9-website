import type { AccountId, Block } from '@polkadot/types/interfaces'
import type { MaybeRefOrGetter } from '@vueuse/core'

export function useBalancesTransfer(block?: MaybeRefOrGetter<Block>) {
  const timestamp = useBlockTimestamp(block)

  const transfers = computed(() => {
    const _block = toValue(block)
    if (!_block)
      return []
    return _block.extrinsics.filter((extrinsic) => {
      const { section, method } = extrinsic.method
      return section === 'balances' && method === 'transfer'
    }).map((extrinsic) => {
      const { section, method, args } = extrinsic.method
      return {
        hash: extrinsic.hash.toHex(),
        blockHeight: _block.header.number.toNumber(),
        timestamp: toValue(timestamp),
        section,
        method,
        from: extrinsic.signer.toString(),
        to: (args[0] as AccountId).toString(),
        token: (args[1] as AccountId).toString(),
        // TODO:
        result: true,
      }
    })
  })

  return transfers
}
