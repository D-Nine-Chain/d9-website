import type { WrappedBlock } from '~/types'

export const blocks = shallowReactive<WrappedBlock[]>([])

export const paused = ref(true)
