<script setup lang="ts">
const route = useRoute('/block/[height]')

const { height } = route.params
</script>

<template>
  <div pb-16>
    <BlockchainBlockHeader :height="height" />

    <div w-limited mt-36>
      <BlockchainBlockTable />
    </div>
    <!-- <div w-limited mt-8>
      <BlockchainVotes />
    </div>
  -->
  </div>
</template>

<style scoped>

</style>
