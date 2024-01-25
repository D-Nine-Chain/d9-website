<script setup lang="ts">
// https://github.com/vueuse/head
useHead({
  title: 'D9 Network',
  meta: [
    {
      name: 'description',
      content: 'D9 Network',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})

// useWalletStore()

const { y } = useWindowScroll()
const navOffsetY = computed(() => {
  return `${y.value > 60 ? 60 : 0}px`
})
</script>

<template>
  <div class="router-root">
    <RouterView />
  </div>
</template>

<style lang="scss">
.router-root {
  --brand: rgb(0, 102, 255);
  --content-max-width: 1266px;
  --content-x-padding: 2rem;
  --nav-height: calc(60px + 62px);
  --content-padding-top: calc(var(--nav-height) + 82px);
  --nav-translate-y: calc(v-bind('navOffsetY') * -1);
  --home-background: rgb(1, 21, 63);
  --gradient: linear-gradient(90deg, rgb(0, 90, 216) 0%, rgb(4, 165, 252) 100%);

  @media (max-width: 960px) {
    --nav-height: 60px;
    --nav-translate-y: 0;
  }
}

.brand-gradient {
  background: rgb(0, 94, 225);
  background: var(--gradient);
}
</style>
