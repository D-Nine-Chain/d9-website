<script setup lang="ts">
import { formatDistance } from 'date-fns'
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
      <Column field="amount" header="Amount">
        <template #body="slotProps">
          <span font-bold text-gradient>
            {{ formatTokenAmount(slotProps.data.amount, 'D9') }}
          </span>
        </template>
      </Column>
      <Column field="result" header="Result">
        <template #body>
          <img>
        </template>
      </Column>
      <Column field="age" header="Age">
        <template #body="{ data: { age } }">
          <p font-bold>
            {{ formatDistance(
              age,
              new Date(),
              { addSuffix: true },
            ) }}
          </p>
        </template>
      </Column>
      <Column field="from" header="From" />
      <Column field="to" header="To" />
      <Column field="hash" header="Hash" />
      <Column field="block" header="Block" />
    </DataTable>
  </section>
</template>

<style scoped>

</style>
