<script setup lang="ts">
const route = useRoute('/block/[height]/')

const height = computed(() => route.params.height)

const { state: block, error, isLoading } = useBlock(height)

watch(error, (err) => {
  // err && toast.add({ severity: 'error', summary: 'Error', detail: err?.toString(), life: 3500 })
  err && console.warn(err)
})
</script>

<template>
  <div pb-16>
    <Loading v-if="isLoading" my-20 />

    <template v-else-if="block">
      <BlockchainBlockHeader :block />

      <div w-limited mt-36>
        <BlockchainBlockTable :block />
      </div>
    </template>

    <Discarded v-else />
  </div>
</template>

<style scoped>

</style>
