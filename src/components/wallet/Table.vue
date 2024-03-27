<script setup lang="ts">
import type { DataTablePageEvent } from 'primevue/datatable'
import { formatDistanceToNowStrict } from 'date-fns'
import { truncate, truncateAddress } from '~/utils'

const props = defineProps<{
  address: string
}>()

const limit = 10
const { result, loading, fetchMore, refetch, restart } = useTransfers(computed(() => ({
  limit,
  offset: 0,
  orFromId: props.address,
  orToId: props.address,
})))

watch(() => props.address, () => {
  restart()
  refetch()?.catch(console.warn)
}, { flush: 'pre' })

watch(() => props.address, (address) => {
  if (address) {
    fetchMore({
      variables: {
        offset: 0,
        orFromId: props.address,
        orToId: props.address,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        return fetchMoreResult || prev
      },
    })
  }
})

const items = computed(() => {
  return result.value?.transfers.map((transfer) => {
    return {
      amount: transfer.amount,
      result: true,
      age: transfer.timestamp,
      from: transfer.from.id,
      to: transfer.to.id,
      hash: transfer.extrinsicHash,
      block: transfer.blockNumber,
      token: transfer.token,
      trxType: 'Transfer',
    }
  }) ?? []
})
const total = computed(() => result.value?.transfersConnection.totalCount ?? 0)
function onPage(event: DataTablePageEvent) {
  fetchMore({
    variables: {
      offset: limit * event.page,
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      return fetchMoreResult || prev
    },
  })
}
</script>

<template>
  <section>
    <DataTable
      :value="items"
      :table-style="{ 'min-width': '70rem' }"
      lazy
      paginator
      :total-records="total"
      :rows="limit"
      :loading
      @page="onPage($event)"
    >
      <Column field="hash" header="hash">
        <template #body="{ data: { hash, block } }">
          <RouterLink underline underline-1 underline-gray underline-dashed :to="{ name: '/block/[height]/extrinsic/[extrinsicHash]/', params: { height: block, extrinsicHash: hash } }">
            {{ truncate(hash, 9, 6) }}
          </RouterLink>
        </template>
      </Column>

      <Column field="block" header="Block">
        <template #body="{ data: { block } }">
          <RouterLink underline underline-1 underline-gray underline-dashed :to="{ name: '/block/[height]/', params: { height: block } }">
            {{ block }}
          </RouterLink>
        </template>
      </Column>

      <!-- <Column field="trxType" header="Transaction Type" /> -->

      <Column field="from" header="From">
        <template #body="{ data: { from } }">
          <RouterLink underline underline-1 underline-gray underline-dashed :to="{ name: '/wallet/[address]', params: { address: from } }">
            {{ truncateAddress(from) }}
          </RouterLink>
        </template>
      </Column>

      <Column field="to" header="to">
        <template #body="{ data: { to } }">
          <RouterLink underline underline-1 underline-gray underline-dashed :to="{ name: '/wallet/[address]', params: { address: to } }">
            {{ truncateAddress(to) }}
          </RouterLink>
        </template>
      </Column>

      <Column field="amount" header="Amount" :body-style="{ textAlign: 'end' }">
        <template #body="{ data: { amount, token } }">
          <span font-bold text-gradient>
            {{ formatTokenAmount(amount, token, 5) }} {{ token }}
          </span>
        </template>
      </Column>
      <Column field="age" header="Age" :body-style="{ textAlign: 'end' }">
        <template #body="{ data: { age } }">
          <p font-bold>
            {{ formatDistanceToNowStrict(
              age,
              { addSuffix: true },
            ) }}
          </p>
        </template>
      </Column>
      <Column field="result" header="Result">
        <template #body>
          <img w-20px src="/imgs/success-fill.webp">
        </template>
      </Column>
    </DataTable>
  </section>
</template>

<style scoped>

</style>
