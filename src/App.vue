<script setup lang="ts">
import '~/composables/d9-network'

useHead({
  title: 'D9 Network',
  meta: [
    {
      name: 'description',
      content: 'D9 Network',
    },
    {
      name: 'theme-color',
      content: () => '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/webp',
      href: () => '/d9-blue-round.webp',
    },
  ],
})
const { y } = useWindowScroll()
const navOffsetY = computed(() => `${y.value > 60 ? 60 : 0}px`)

onErrorCaptured((err) => {
  console.warn('error captured', err)
})
</script>

<template>
  <div class="router-root">
    <RouterView />
  </div>
</template>

<style lang="scss">
html {
  --background: rgb(249, 250, 252);
  --brand: rgb(0, 102, 255);
  --token-usdt: #1ba27a;
  --content-max-width: 1266px;
  --content-x-padding: 2rem;
  --nav-height: calc(60px + 62px);
  --content-padding-top: calc(var(--nav-height) + 82px);
  --nav-translate-y: calc(v-bind('navOffsetY') * -1);
  --home-background: rgb(1, 21, 63);
  --gradient: linear-gradient(90deg, rgb(0, 90, 216) 0%, rgb(4, 165, 252) 100%);
  --card-shadow: 0px 0px 20px -6px rgba(197, 204, 215, 1);

  @media (max-width: 960px) {
    --nav-height: 60px;
    --nav-translate-y: 0.5rem;
    --content-x-padding: 1rem;
  }
}
</style>
