<script setup lang="ts">
import { formatDistanceToNowStrict } from 'date-fns'
import { useBalancesTransferEvents } from '~/composables/d9-network/extrinsics/balances'
import type { WrappedBlock } from '~/types'
import { truncate, truncateAddress } from '~/utils'

const props = defineProps<{
  block: WrappedBlock
}>()
const { state: transfers, isLoading } = useBalancesTransferEvents(computed(() => props.block))
</script>

<template>
  <section>
    <DataTable :value="transfers ?? []" :loading="isLoading" :table-style="{ 'min-width': '80rem' }">
      <Column field="hash" header="Hash">
        <template #body="{ data: { eventRecordHash, header } }">
          <router-link
            font-bold text-gradient :to="{
              name: '/block/[height]/event-record/[hash]/',
              params: {
                hash: eventRecordHash.toHex(),
                height: header.number.toNumber(),
              },
            }"
          >
            {{ truncate(eventRecordHash.toHex()) }}
          </router-link>
        </template>
      </Column>
      <Column header="Block">
        <template #body="{ data: { header } }">
          {{ header.number }}
        </template>
      </Column>
      <Column field="timestamp" header="Age">
        <template #body="{ data: { timestamp } }">
          {{ formatDistanceToNowStrict(timestamp, { addSuffix: true }) }}
        </template>
      </Column>
      <Column header="Transaction Type">
        <template #body>
          Transfer
        </template>
      </Column><Column field="from" header="From">
        <template #body="{ data: { from } }">
          {{ truncateAddress(from) }}
        </template>
      </Column>
      <Column field="to" header="To">
        <template #body="{ data: { to } }">
          {{ truncateAddress(to) }}
        </template>
      </Column>
      <Column field="amount" header="Token">
        <template #body="{ data: { amount, token } }">
          {{ formatTokenAmount(amount, token) }} {{ token }}
        </template>
      </Column>
      <Column field="result" header="Result">
        <template #body>
          <img m-auto size-5 src="/imgs/success-fill.webp" alt="Transaction Success">
        </template>
      </Column>

      <template #empty>
        <DataTableEmpty />
      </template>

      <template #loading>
        <Loading />
      </template>
    </DataTable>
  </section>
</template>

<style scoped>

</style>
~/composables/d9-network/extrinsics/balances
