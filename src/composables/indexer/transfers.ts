import { useQuery } from '@vue/apollo-composable'
import type { OptionsParameter } from '@vue/apollo-composable/dist/useQuery.js'
import type { MaybeRefOrGetter } from '@vueuse/core'
import gql from 'graphql-tag'
import type { Token } from '~/types'

export interface TransferRecord {
  id: string
  timestamp: string
  fee: string
  token: Token
  blockNumber: number
  extrinsicHash: string
  amount: string
  from: {
    id: string
  }
  to: {
    id: string
  }
}

export interface TransfersConnection {
  totalCount: number
  pageInfo: {
    hasNextPage: boolean
    hasPreviousPage: boolean
    startCursor: string
    endCursor: string
  }
}

const CONNECTION = `
transfersConnection(
  orderBy: timestamp_DESC
  where: {
    token_eq: $token,
    AND: {
      to: {
        id_eq: $orToId
      },
      OR: {
        from: {
          id_eq: $orFromId
        }
      }
    }
  }
) {
  totalCount
  pageInfo {
    hasNextPage
    hasPreviousPage
    startCursor
    endCursor
  }
}
`
const QUERY_FIELDS = `
id
blockNumber
timestamp
extrinsicHash
fee
token
amount
to {
    id
}
from {
    id
}
`

const QUERY = gql`
query Transfers(
  $orFromId: String
  $orToId: String
  $token: Token
  $limit: Int = 10
  $offset: Int = 0
) {
  transfers(
      limit: $limit
      offset: $offset
      orderBy: timestamp_DESC
      where: {
        token_eq: $token,
        AND: {
          OR: {
            to: { id_eq: $orToId },
          },
          from: { id_eq: $orFromId }
        }
      }
  ) {
      ${QUERY_FIELDS}
  }
  ${CONNECTION}
}
`

const QUERY_BY_EXTRINSIC = gql`
query Transfers(
  $extrinsicHash: String
  $limit: Int = 10
  $offset: Int = 0
) {
  transfers(
      limit: $limit
      offset: $offset
      orderBy: timestamp_DESC
      where: {
        extrinsicHash_eq: $extrinsicHash
      }
  ) {
      ${QUERY_FIELDS}
  }
  transfersConnection(
    orderBy: timestamp_DESC
    where: {
      extrinsicHash_eq: $extrinsicHash
    }
  ) {
    totalCount
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
  }
}
`

export function useTransfers(params: MaybeRefOrGetter<{ token?: Token, orFromId?: string, orToId?: string, limit: number, offset: number }>, options?: OptionsParameter<any, any>) {
  return useQuery<{ transfers: TransferRecord[], transfersConnection: TransfersConnection }>(QUERY, params, {
    pollInterval: 30000,
    keepPreviousResult: false,
    ...(options ?? {}),
  })
}

export function useTransfersByExtrinsicHash(params: MaybeRefOrGetter<{ extrinsicHash: string, limit: number, offset: number }>, options?: OptionsParameter<any, any>) {
  return useQuery<{ transfers: TransferRecord[], transfersConnection: TransfersConnection }>(QUERY_BY_EXTRINSIC, params, {
    pollInterval: 30000,
    keepPreviousResult: false,
    ...(options ?? {}),
  })
}
