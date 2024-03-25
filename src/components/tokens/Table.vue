<script setup lang="ts">
import { formatDistanceToNowStrict } from 'date-fns'
import type { DataTablePageEvent } from 'primevue/datatable'
import { truncate, truncateAddress } from '~/utils'

const limit = 10

const { result, loading, fetchMore } = useTransfers({ token: 'D9', limit, offset: 0 })

const items = computed(() => {
  return result.value?.transfers.map((transfer) => {
    return {
      amount: transfer.amount,
      result: true,
      age: transfer.timestamp,
      from: truncateAddress(transfer.from.id),
      to: truncateAddress(transfer.to.id),
      hash: truncate(transfer.extrinsicHash, 9, 6),
      token: transfer.token,
      block: transfer.blockNumber,
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
      <Column field="hash" header="Hash" />
      <Column field="block" header="Block" />
      <Column field="from" header="From" />
      <Column field="to" header="To" />
      <Column field="amount" header="Amount" :body-style="{ textAlign: 'end' }">
        <template #body="{ data: { amount, token } }">
          <span font-bold text-gradient>
            {{ formatTokenAmount(amount, token) }} {{ token }}
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
