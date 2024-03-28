<script setup lang="ts">
import { formatDistanceToNowStrict } from 'date-fns'
import type { DataTablePageEvent } from 'primevue/datatable'
import { truncate, truncateAddress } from '~/utils'

const route = useRoute('/indexer/search/transfer/[extrinsicHash]')
const extrinsicHash = computed(() => route.params.extrinsicHash)
const limit = 10

const { result, loading, refetch } = useTransfersByExtrinsicHash({ extrinsicHash: extrinsicHash.value, limit, offset: 0 })

watch(extrinsicHash, () => {
  refetch({
    extrinsicHash: extrinsicHash.value,
    offset: 0,
  })
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
      token: transfer.token,
      block: transfer.blockNumber,
    }
  }) ?? []
})

const total = computed(() => result.value?.transfersConnection.totalCount ?? 0)
function onPage(event: DataTablePageEvent) {
  refetch({
    offset: limit * event.page,
  })
}
</script>

<template>
  <div pb-16>
    <div w-limited mt-12>
      <h1 block overflow-x-hidden text-ellipsis text-nowrap text-xl font-bold text-gradient md:text-2xl>
        {{ $t('page.search.header', { extrinsicHash }) }}
      </h1>
      <DataTable
        :value="items"
        :table-style="{ 'min-width': '70rem' }"
        lazy paginator mt-8
        :total-records="total"
        :rows="limit"
        :loading
        @page="onPage($event)"
      >
        <template #empty>
          <DataTableEmpty />
        </template>
        <template #loading>
          <Loading />
        </template>
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
              {{ formatTokenAmount(amount, token) }} {{ token }}
            </span>
          </template>
        </Column>
        <Column field="age" header="Age" :body-style="{ textAlign: 'end' }">
          <template #body="{ data: { age } }">
            <p>
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
    </div>
  </div>
</template>

<style scoped>

</style>
