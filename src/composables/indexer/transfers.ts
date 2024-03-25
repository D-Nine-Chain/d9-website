import { useQuery } from '@vue/apollo-composable'
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
  $fromId: String
  $toId: String
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
            id_eq: $toId
          },
          OR: {
            from: {
              id_eq: $fromId
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

  transfersConnection(orderBy: timestamp_DESC) {
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

export function useTransfers(params: MaybeRefOrGetter<{ token?: Token, limit: number, offset: number }>) {
  return useQuery<{ transfers: TransferRecord[], transfersConnection: TransfersConnection }>(QUERY, params)
}
