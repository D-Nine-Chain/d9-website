import type { WrappedBlock } from '~/types'

export const blocks = shallowReactive<WrappedBlock[]>([])
export const rawBlocks = toRaw(blocks)

export const paused = ref(true)
