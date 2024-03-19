<script setup lang="ts">
// import { useToast } from 'primevue/usetoast'
import { useBalancesTransferEvents } from '~/composables/extrinsics/balances'

// const toast = useToast()
const route = useRoute('/block/[height]/')

const { height } = route.params

const { state: block, error } = await useBlock(height)

const transfers = useBalancesTransferEvents(block)

watch(error, (err) => {
  // err && toast.add({ severity: 'error', summary: 'Error', detail: err?.toString(), life: 3500 })
  err && console.warn(err)
})
</script>

<template>
  <div pb-16>
    <template v-if="block">
      <BlockchainBlockHeader :block="block" />

      <div w-limited mt-36>
        <BlockchainBlockTable :transfers="transfers" />
      </div>
    </template>

    <Discarded v-else />
  </div>
</template>

<style scoped>

</style>
