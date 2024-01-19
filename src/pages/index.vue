<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})
</script>

<template>
  <div w-limited>
    <HomeSectionHeader min-h-50vh />

    <HomeSectionCommunity mt-6 min-h-50vh />

    <HomeSectionHighlight mt-6 min-h-50vh />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
