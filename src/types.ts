import type { ApiDecoration } from '@polkadot/api/types'
import type { Block } from '@polkadot/types/interfaces'
import type { ViteSSGContext } from 'vite-ssg'

export type UserModule = (ctx: ViteSSGContext) => void

export type WrappedBlock = Block & {
  api: ApiDecoration<'promise'>
}

export type Token = 'D9' | 'USDT'
