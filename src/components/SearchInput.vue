<script setup lang="ts">
const router = useRouter()
const query = ref('')
function submit() {
  if (!query.value)
    return

  // check if block number
  try {
    const blockNumber = Number.parseInt(query.value)
    if (!Number.isNaN(blockNumber) && Number.isSafeInteger(blockNumber) && Number.isFinite(blockNumber)) {
      router.push({ name: '/block/[height]/', params: { height: blockNumber } })
      return
    }
  }
  catch {}

  // check if extrinsic hash
  if (query.value.startsWith('0x')) {
    // Search transfer extrinsic hash
    router.push({ name: '/indexer/search/transfer/[extrinsicHash]', params: { extrinsicHash: query.value } })
  }
  else {
    // search user
    router.push({ name: '/wallet/[address]', params: { address: query.value } })
  }
}
</script>

<template>
  <div class="search-bar b-1 b-[rgba(200,202,206,1)]">
    <div i-carbon-search mr-3 color-brand />

    <input v-model="query" grow :placeholder="$t('page.search.hint')" @keyup.enter="submit">
  </div>
</template>

<style scoped>
.search-bar {
  @apply mx-auto max-w-838px row items-center rounded-full bg-white px-4 py-2 transition-all;
  &:focus-within {
    @apply shadow-xl b-brand;
  }

  input {
    outline: none;
  }
}
</style>
