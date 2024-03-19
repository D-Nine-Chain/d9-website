<script setup lang="ts">
import { useBalancesTransferEvents } from '~/composables/extrinsics/balances'

const route = useRoute('/block/[height]/')

const { height } = route.params

const { state: block } = await useBlock(height)

const transfers = useBalancesTransferEvents(block)
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
