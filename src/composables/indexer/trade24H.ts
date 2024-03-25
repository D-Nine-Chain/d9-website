import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'

const QUERY = gql`
query QueryTrade24H {
  trade24H {
    percentageChange24H
    tradeCount24H
    tradingVolume24H
  }
}
`

export function useTrade24H() {
  return useQuery<{ trade24H: {
    percentageChange24H: number
    tradeCount24H: number
    tradingVolume24H: string
  }[] }>(QUERY, null, {
    pollInterval: 30000,
  })
}
