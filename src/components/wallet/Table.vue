<script setup lang="ts">
import type { DataTablePageEvent } from 'primevue/datatable'
import { formatDistanceToNowStrict } from 'date-fns'
import { truncate, truncateAddress } from '~/utils'

const props = defineProps<{
  address: string
}>()

const limit = 10
const { result, loading, fetchMore } = useTransfers({
  token: 'D9',
  limit,
  offset: 0,
  orFromId: props.address,
  orToId: props.address,
})

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
      from: truncateAddress(transfer.from.id),
      to: truncateAddress(transfer.to.id),
      hash: truncate(transfer.extrinsicHash, 9, 6),
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

await until(loading).toBe(false)
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
      <Column field="block" header="Block" />
      <Column field="trxType" header="Transaction Type" />
      <Column field="from" header="From" />
      <Column field="to" header="To" />
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
