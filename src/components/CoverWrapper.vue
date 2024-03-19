<script setup lang="ts">

</script>

<template>
  <div class="header pt-[var(--content-padding-top)]">
    <div w-limited>
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  background-image: url(/imgs/cover.webp);
  background-position: top;
  background-size: cover;
  margin-top: calc(var(--nav-height) * -1);
  @apply min-h-40vh pb-10;
}
</style>
