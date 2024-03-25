import { Abi } from '@polkadot/api-contract'
import type { Compact, GenericExtrinsic, Option, u128, u64 } from '@polkadot/types'
import type { Block, BlockNumber, Header, MultiAddress } from '@polkadot/types/interfaces'
import type { AnyTuple, Codec, IU8a } from '@polkadot/types/types'
import { compactAddLength } from '@polkadot/util'
import { encodeAddress } from '@polkadot/util-crypto'
import type { MaybeRefOrGetter } from '@vueuse/core'
import { Contracts } from '~/config/contracts'
import type { Token, WrappedBlock } from '~/types'

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

export async function getD9TransferEvents(block: MaybeRefOrGetter<WrappedBlock>) {
  const _block = toValue(block)
  const events = await _block.api.query.system.events()
  const transfers: BalancesTransferEvent[] = []
  const timestamp = await _block.api.query.timestamp.now()
  const extrinsic = events.filter(({ phase }) => phase.isApplyExtrinsic).map(({ phase }) => {
    const extrinsicIdx = phase.asApplyExtrinsic.toNumber()
    return _block.extrinsics[extrinsicIdx]
  }).at(0)
  if (!extrinsic)
    return []
  for await (const event of events) {
    if (api.value?.events.balances.Transfer.is(event.event)) {
      const [from, to, amount] = event.event.data
      // TODO: check if succeed
      transfers.push({
        header: _block.header,
        extrinsic,
        eventRecordHash: event.hash,
        timestamp: timestamp.toNumber(),
        from: from.toString(),
        to: to.toString(),
        token: 'D9',
        amount: amount.toBigInt(),
        success: true,
      })
    }
  }
  return transfers
}

export async function getUSDTTransferEvents(block: MaybeRefOrGetter<WrappedBlock>) {
  const _block = toValue(block)
  const events = await _block.api.query.system.events()
  const transfers: BalancesTransferEvent[] = []
  const timestamp = await _block.api.query.timestamp.now()
  for await (const extrinsic of _block.extrinsics) {
    const idx = _block.extrinsics.findIndex(_ => _.hash.eq(extrinsic.hash))
    const decoded = decodeUSDTContractMessage(extrinsic)
    if (!decoded)
      continue
    const { message, args } = decoded
    if (message.selector.eq('0xdb20f9f5')) {
      const [to, value] = args as [Uint8Array, u128, Uint8Array]
      const event = events.find(
        event => event.phase.isApplyExtrinsic
        && event.phase.asApplyExtrinsic.eq(idx)
        && event.event.method === 'Called'
        && event.event.section === 'contracts',
      )
      if (!event)
        continue
      transfers.push({
        header: _block.header,
        timestamp: timestamp.toNumber(),
        extrinsic,
        eventRecordHash: event.hash,
        from: extrinsic.signer.toString(),
        to: encodeAddress(to, 9),
        token: 'USDT',
        amount: value.toBigInt(),
        success: true,
      })
    }
  }
  return transfers
}

export function decodeUSDTContractMessage(extrinsic?: GenericExtrinsic<AnyTuple>) {
  if (!extrinsic)
    return undefined
  const { section, method, args } = extrinsic.method
  if (section === 'contracts' && method === 'call') {
    const [dest, ,,,data] = args as [MultiAddress, Compact<u128>, Compact<u64>, Option<Codec>, Uint8Array]
    try {
      if (dest.eq(Contracts.D9_USDT.address)) {
        const contract = new Abi(Contracts.D9_USDT.abi)
        const decoded = contract.decodeMessage(compactAddLength(data))
        return decoded
      }
    }
    catch (err) {
      console.warn(err)
    }
  }
  return undefined
}

export async function getBlockByHeight(height: string | number | Compact<BlockNumber> | undefined): Promise<WrappedBlock | undefined> {
  try {
    if (!height)
      return undefined
    const _height = height.toString()
    const _api = api.value
    const cached = rawBlocks.find(block => block.header.number.toNumber() === Number(height))
    if (cached)
      return cached
    if (!_api)
      return undefined
    const blockHash = await _api.rpc.chain.getBlockHash(+_height)
    if (blockHash.isEmpty)
      return undefined
    const signedBlock = await _api.rpc.chain.getBlock(blockHash)
    if (signedBlock.isEmpty)
      return undefined
    const found = Object.assign(signedBlock.block, {
      api: await _api.at(blockHash),
    })
    const idx = rawBlocks.findIndex(block =>
      found.header.number.toNumber() < block.header.number.toNumber(),
    )
    if (idx !== -1)
      rawBlocks.splice(idx, 0, found)
    else
      rawBlocks.unshift(found)
    return found
  }
  catch (err) {
    console.warn('getBlockByHeight', 'err', err)
    return undefined
  }
}

/**
 * Get extrinsic from block
 * @param block block
 * @param hash hex hash
 */
export function getExtrinsicFromBlock(block?: Block, hash?: string) {
  if (!block || !hash)
    return undefined
  let _extrinsic: GenericExtrinsic<AnyTuple> | undefined
  for (const extrinsic of block.extrinsics) {
    if (extrinsic.hash.toHex() === hash)
      _extrinsic = extrinsic
  }
  return _extrinsic
}

/**
 * Get extrinsic from cached blocks
 * @param hash hex hash
 * @deprecated
 */
export function getExtrinsicByHash(hash: string) {
  // get from exists block
  let _extrinsic: GenericExtrinsic<AnyTuple> | undefined
  for (const block of blocks)
    _extrinsic = getExtrinsicFromBlock(block, hash)

  return _extrinsic
}
