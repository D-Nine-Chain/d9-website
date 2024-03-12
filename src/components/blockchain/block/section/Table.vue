<script setup lang="ts">
const products = [{
  hash: '1',
  block: '2',
  age: '3',
  trxType: '4',
  from: '4',
  to: '4',
  token: '4',
  result: '4',
}]
</script>

<template>
  <DataTable :value="products" :table-style="{ 'min-width': '50rem' }">
    <Column field="hash" header="Hash" />
    <Column field="block" header="Block" />
    <Column field="age" header="Age" />
    <Column field="trxType" header="Transaction Type" />
    <Column field="from" header="From" />
    <Column field="to" header="To" />
    <Column field="token" header="Token" />
    <Column field="result" header="Result" />
  </DataTable>
</template>

<style scoped>

</style>
