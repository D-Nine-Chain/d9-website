<script setup lang="ts">
const route = useRoute('/block/[height]')

const { height } = route.params

const { block } = await getBlock(height) ?? {}
</script>

<template>
  <div pb-16>
    <template v-if="block">
      <BlockchainBlockHeader :block="block" />

      <div w-limited mt-36>
        <BlockchainBlockTable :extrinsics="block.extrinsics" />
      </div>
    </template>

    <Discarded v-else />
  </div>
</template>

<style scoped>

</style>
