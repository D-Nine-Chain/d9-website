<script setup lang="ts">
const { candidates, loading } = useD9VotingRefs()
</script>

<template>
  <section>
    <DataTable scrollable scroll-height="700px" :loading :value="candidates" :table-style="{ 'min-width': '70rem' }">
      <Column field="name" :header="$t('page.blockchain.blocks-table.col1')" />
      <Column :header="$t('page.blockchain.blocks-table.col2')">
        <template #body="{ index }">
          {{ index + 1 }}
        </template>
      </Column>
      <Column field="votes" :header="$t('page.blockchain.blocks-table.col3')" />
      <Column :header="$t('page.blockchain.blocks-table.col4')">
        <template #body="{ data: { sharingPercent } }">
          {{ $n(sharingPercent / 100, { style: 'percent' }) }}
        </template>
      </Column>
      <Column field="productivity" :header="$t('page.blockchain.blocks-table.col5')" />
      <Column field="RD" :header="$t('page.blockchain.blocks-table.col6')" />
      <Column field="PAR" :header="$t('page.blockchain.blocks-table.col7')" />
      <Column field="myVotes" :header="$t('page.blockchain.blocks-table.col8')" />

      <template #loading>
        <Loading />
      </template>
      <template #empty>
        <DataTableEmpty />
      </template>
    </DataTable>
  </section>
</template>

<style scoped>

</style>
