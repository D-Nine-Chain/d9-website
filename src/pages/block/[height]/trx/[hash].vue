<script setup lang="ts">
// extrinsic hash
const route = useRoute('/block/[height]/trx/[hash]')

const extrinsicHash = computed(() => route.params.hash)
const blockHeight = computed(() => route.params.height)

const { state: block } = await useBlock(blockHeight)
const extrinsic = useExtrinsic(block, extrinsicHash)
</script>

<template>
  <div pb-16>
    <template v-if="block && extrinsic">
      <BlockchainBlockTrxHeader :extrinsic :block />

      <div w-limited mt-76>
        <BlockchainBlockTrxOverview />
      </div>
    </template>

    <Discarded v-else />
  </div>
</template>

<style scoped lang="scss">
</style>
