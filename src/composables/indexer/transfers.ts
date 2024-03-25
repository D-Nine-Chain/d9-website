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
  }

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

}
`

export function useTransfers(params: MaybeRefOrGetter<{ token?: Token, orFromId?: string, orToId?: string, limit: number, offset: number }>, options?: OptionsParameter<any, any>) {
  return useQuery<{ transfers: TransferRecord[], transfersConnection: TransfersConnection }>(QUERY, params, {
    pollInterval: 5000,
    ...(options ?? {}),
  })
}
