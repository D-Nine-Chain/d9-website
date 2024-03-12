<script setup lang="ts">
const products = [{
  name: '1',
  ranking: '2',
  votes: '3',
  percentage: '4',
  productivity: '4',
  RD: '4',
  PAR: '4',
  myVotes: '4',
}]
</script>

<template>
  <section>
    <DataTable :value="products" :table-style="{ 'min-width': '50rem' }">
      <Column field="name" header="Name" />
      <Column field="ranking" header="Ranking" />
      <Column field="votes" header="Real-Time Votes" />
      <Column field="percentage" header="Percentage" />
      <Column field="productivity" header="Productivity" />
      <Column field="RD" header="Reward Distribution" />
      <Column field="PAR" header="APR" />
      <Column field="myVotes" header="My Votes" />
    </DataTable>
  </section>
</template>

<style scoped>

</style>
