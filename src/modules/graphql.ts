import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core'
import { RetryLink } from '@apollo/client/link/retry'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { getMainDefinition } from '@apollo/client/utilities'
import { provideApolloClient } from '@vue/apollo-composable'
import { createClient } from 'graphql-ws'
import type { UserModule } from '~/types'

export const install: UserModule = ({ app, isClient }) => {
  if (!isClient)
    return
  const wsLink = new GraphQLWsLink(createClient({
    url: import.meta.env.VITE_APP_INDEXER_WS!,
  }))

  const httpLink = createHttpLink({ uri: import.meta.env.VITE_APP_INDEXER_HTTP })

  const cache = new InMemoryCache()

  const link = new RetryLink().split(
    ({ query }) => {
      const definition = getMainDefinition(query)
      return (
        definition.kind === 'OperationDefinition'
        && definition.operation === 'subscription'
      )
    },
    wsLink,
    httpLink,
  )

  const apolloClient = new ApolloClient({
    cache,
    link,
  })

  app.use(() => {
    provideApolloClient(apolloClient)
  })
}
