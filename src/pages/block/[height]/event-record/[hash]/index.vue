<script setup lang="ts">
// event hash
const route = useRoute('/block/[height]/event-record/[hash]/')

const hash = computed(() => route.params.hash)
const blockHeight = computed(() => route.params.height)

const { state: block } = await useBlock(blockHeight)
const record = useEventRecord(block, hash)

await until(record).not.toBeUndefined()
</script>

<template>
  <div pb-16>
    <template v-if="block && record">
      <BlockchainBlockEventRecordHeader :extrinsic-hash="hash" :record :block />

      <div w-limited mt-76>
        <BlockchainBlockEventRecordOverview :record :block />
      </div>
    </template>

    <Discarded v-else />
  </div>
</template>

<style scoped lang="scss">
</style>
