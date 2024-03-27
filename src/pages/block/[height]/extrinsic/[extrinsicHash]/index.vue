<script setup lang="ts">
// only d9 transfer

const route = useRoute('/block/[height]/extrinsic/[extrinsicHash]/')

const extrinsicHash = computed(() => route.params.extrinsicHash)
const blockHeight = computed(() => route.params.height)

const { state: block, isLoading } = useBlock(blockHeight)

const { state: eventHash, isLoading: eventHashLoading, execute } = useAsyncState(async () => {
  if (!block.value)
    return
  const events = await block.value.api.query.system.events()
  const extrinsicIdx = block.value.extrinsics.findIndex(e => e.hash.eq(extrinsicHash.value))
  const extrinsicEvent = events.filter(e => e.phase.isApplyExtrinsic && e.phase.asApplyExtrinsic.eq(extrinsicIdx))
  const event = extrinsicEvent.find(({ event: { section, method } }) => {
    const key = `${section}:::${method}`
    if (key === 'balances:::Transfer')
      return true
    if (key === 'contracts:::Call')
      return true
    return false
  })
  return event?.hash
}, undefined, { resetOnExecute: true })

watch(block, () => {
  console.info('??')
  block.value && execute()
}, { immediate: true })

const record = useEventRecord(block, eventHash)
</script>

<template>
  <div pb-16>
    <Loading v-if="isLoading || eventHashLoading" class="my-20vh" />
    <template v-else-if="block && record">
      <BlockchainBlockEventRecordHeader :record :block />

      <div w-limited mt-76>
        <BlockchainBlockEventRecordOverview :record :block />
      </div>
    </template>

    <Discarded v-else />
  </div>
</template>

<style scoped>

</style>
