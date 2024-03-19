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
    <DataTable :value="products" :table-style="{ 'min-width': '60rem' }">
      <Column field="name" :header="$t('page.blockchain.blocks-table.col1')" />
      <Column field="ranking" :header="$t('page.blockchain.blocks-table.col2')" />
      <Column field="votes" :header="$t('page.blockchain.blocks-table.col3')" />
      <Column field="percentage" :header="$t('page.blockchain.blocks-table.col4')" />
      <Column field="productivity" :header="$t('page.blockchain.blocks-table.col5')" />
      <Column field="RD" :header="$t('page.blockchain.blocks-table.col6')" />
      <Column field="PAR" :header="$t('page.blockchain.blocks-table.col7')" />
      <Column field="myVotes" :header="$t('page.blockchain.blocks-table.col8')" />
    </DataTable>
  </section>
</template>

<style scoped>

</style>
