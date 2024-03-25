import type { WeightV2 } from '@polkadot/types/interfaces'
import { BN } from '@polkadot/util'
import { MAX_CALL_WEIGHT, PROOFSIZE } from '~/config/contracts'

export function getGasLimits() {
  return {
    writeLimit: api.value!.registry.createType('WeightV2', { refTime: new BN(50_000_000_000), proofSize: new BN(800_000) }) as WeightV2,
    readLimit: api.value!.registry.createType('WeightV2', { refTime: MAX_CALL_WEIGHT, proofSize: PROOFSIZE }) as WeightV2,
  }
}
