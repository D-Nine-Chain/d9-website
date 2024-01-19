<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
isDark.value = false
preferredDark.value = false
</script>

<template>
  <div w-limited>
    <HomeSectionHeader min-h-50vh />

    <HomeSectionCommunity mt-20 min-h-50vh />

    <HomeSectionHighlight mt-20 min-h-50vh />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
