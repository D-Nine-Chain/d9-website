import type { u64 } from '@polkadot/types'
import type { AccountId } from '@polkadot/types/interfaces'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'

export interface NodeMetadata { name: string, node: string, votes: number, sharingPercent: number, indexOflastPercentChange: number }

export const useD9VotingStore = defineStore('d9-voting', () => {
  const totalVotes = ref(0)
  const candidates = shallowReactive<NodeMetadata[]>([])
  const loading = ref(false)
  const error = ref<string>()

  const { state, execute } = useAsyncState(async () => await (api.value?.rpc as any)?.voting.getSortedCandidates(), undefined)
  watch(api, () => execute())

  watch(state, async (state: any[]) => {
    if (!state)
      return
    loading.value = true
    try {
      const _candidates = state.map(([node, votes]: any) => ({ node, votes })) as { node: AccountId, votes: u64 }[]
      totalVotes.value = _candidates.reduce((prev, cur) => {
        return prev + cur.votes.toNumber()
      }, 0)

      const _metadata = await Promise.all(
        state.map(([node, votes]: [AccountId, u64]) => api.value?.query.d9NodeVoting
          .nodeMetadata(node)
          .then((result: any) => result.unwrapOr(undefined))
          .then(struct => ({
            node: node.toHex(),
            votes: votes.toNumber(),
            name: struct?.name.isUtf8 ? struct?.name.toUtf8() : struct?.name.toString(),
            sharingPercent: struct?.sharingPercent.toNumber(),
            indexOfLastPercentChange: struct?.indexOfLastPercentChange.toNumber(),
            // TODO:
            productivity: '-',
            RD: '-',
            PAR: '-',
            myVotes: '-',
          }) as unknown as NodeMetadata)),
      )

      candidates.splice(0, candidates.length)
      candidates.push(..._metadata.filter(value => !!value?.name) as any)
    }
    catch (err: any) {
      error.value = typeof err === 'string' ? err : (err.message ?? err.toString())
    }
    finally {
      loading.value = false
    }
  })

  return {
    totalVotes,
    candidates,
    loading,
    error,
  }
})

export const useD9VotingRefs = () => storeToRefs(useD9VotingStore())

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useD9VotingStore as any, import.meta.hot))
