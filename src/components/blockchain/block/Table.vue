<script setup lang="ts">
import { formatDistanceToNowStrict } from 'date-fns'
import type { UnwrapRef } from 'vue'
import type { useBalancesTransfer } from '~/composables/extrinsics/balances'
import { truncateAddress } from '~/utils'

const props = defineProps<{
  transfers: UnwrapRef<ReturnType<typeof useBalancesTransfer>>
}>()

watch(() => props.transfers, (transfers) => {
  console.info('transfers', transfers)
}, { immediate: true })
</script>

<template>
  <section>
    <DataTable :value="$props.transfers" :table-style="{ 'min-width': '50rem' }">
      <Column field="hash" header="Hash">
        <template #body="{ data: { hash } }">
          <router-link
            font-bold text-gradient :to="{
              name: '/block/trx/[hash]',
              params: {
                hash,
              },
            }"
          >
            {{ truncateAddress(hash) }}
          </router-link>
        </template>
      </Column>
      <Column field="blockHeight" header="Block" />
      <Column field="timestamp" header="Age">
        <template #body="{ data: { timestamp } }">
          {{ formatDistanceToNowStrict(timestamp, { addSuffix: true }) }}
        </template>
      </Column>
      <Column field="method" header="Transaction Type" />
      <Column field="from" header="From">
        <template #body="{ data: { from } }">
          {{ truncateAddress(from) }}
        </template>
      </Column>
      <Column field="to" header="To">
        <template #body="{ data: { to } }">
          {{ truncateAddress(to) }}
        </template>
      </Column>
      <Column field="token" header="Token" />
      <Column field="result" header="Result">
        <template #body>
          <img m-auto size-5 src="/imgs/success-fill.webp" alt="Transaction Success">
        </template>
      </Column>
    </DataTable>
  </section>
</template>

<style scoped>

</style>GenericExtrinsic, , Vecimport { AnyTuple } from '@polkadot/types/types';
