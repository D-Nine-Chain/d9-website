import type { Compact, GenericExtrinsic } from '@polkadot/types'
import type { Block, BlockNumber } from '@polkadot/types/interfaces'
import type { AnyTuple } from '@polkadot/types/types'
import type { WrappedBlock } from '~/types'

export async function getBlockByHeight(height: string | number | Compact<BlockNumber> | undefined): Promise<WrappedBlock | undefined> {
  try {
    if (!height)
      return undefined
    const _height = height.toString()
    const _api = api.value
    const cached = blocks.find(block => block.header.number.toNumber() === Number(height))
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
    const idx = blocks.findIndex(block =>
      found.header.number.toNumber() < block.header.number.toNumber(),
    )
    if (idx !== -1)
      blocks.splice(idx, 0, found)
    else
      blocks.unshift(found)
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
