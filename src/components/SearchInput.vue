<script setup lang="ts">
const router = useRouter()
const query = ref('')
function submit() {
  router.push({ name: '/wallet/[address]', params: { address: query.value } })
}
</script>

<template>
  <div class="search-bar b-1 b-[rgba(200,202,206,1)]">
    <div i-carbon-search mr-3 color-brand />

    <!-- <input v-model="query" grow placeholder="Search by Token / Account / Contract / Hash / Block"> -->
    <input v-model="query" grow placeholder="Search by Account addres" @keyup.enter="submit">
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
