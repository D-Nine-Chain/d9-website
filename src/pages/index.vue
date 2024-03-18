<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
const preferredDark = usePreferredDark()
preferredDark.value = false
</script>

<template>
  <div w-limited>
    <HomeHeader min-h-50vh />

    <HomeCommunity mt-20 min-h-50vh />

    <HomeHighlight mt-20 min-h-50vh />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
