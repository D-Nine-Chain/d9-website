<script setup lang="ts">
import { formatDistance } from 'date-fns'

const products = [{
  amount: '1,234,134,123',
  result: true,
  age: new Date(),
  from: 'awefawef...awefawef',
  to: 'awefawef...awefawef',
  hash: 'awefawef...awefawef',
  block: '4',
}]
</script>

<template>
  <section>
    <DataTable :value="products" :table-style="{ 'min-width': '50rem' }">
      <Column field="amount" header="Amount">
        <template #body="slotProps">
          <span font-bold text-gradient>
            {{ slotProps.data.amount }}
          </span>
        </template>
      </Column>
      <Column field="result" header="Result">
        <template #body="{ data: { result } }">
          <img>
          {{ result }}
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
