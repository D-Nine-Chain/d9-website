<script setup lang="ts">
import type { Extrinsic } from '@polkadot/types/interfaces'
import { formatDistanceToNowStrict } from 'date-fns'
import type { UnwrapRef } from 'vue'
import type { useBalancesTransferEvents } from '~/composables/d9-network/extrinsics/balances'
import { truncate, truncateAddress } from '~/utils'

const props = defineProps<{
  transfers: UnwrapRef<ReturnType<typeof useBalancesTransferEvents>>
}>()
</script>

<template>
  <section>
    <DataTable :value="props.transfers" :table-style="{ 'min-width': '50rem' }">
      <Column field="hash" header="Hash">
        <template #body="{ data: { extrinsic, header } }">
          <router-link
            font-bold text-gradient :to="{
              name: '/block/[height]/trx/[hash]',
              params: {
                hash: (extrinsic as Extrinsic).hash.toHex(),
                height: header.number.toNumber(),
              },
            }"
          >
            {{ truncate((extrinsic as Extrinsic).hash.toHex()) }}
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
      <Column field="amount" header="Token" />
      <Column field="result" header="Result">
        <template #body>
          <img m-auto size-5 src="/imgs/success-fill.webp" alt="Transaction Success">
        </template>
      </Column>

      <template #empty>
        <DataTableEmpty />
      </template>
    </DataTable>
  </section>
</template>

<style scoped>

</style>
~/composables/d9-network/extrinsics/balances
