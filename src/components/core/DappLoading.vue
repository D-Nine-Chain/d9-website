<script setup lang="ts">
import gsap from 'gsap'
import { TextPlugin } from 'gsap/TextPlugin'

gsap.registerPlugin(TextPlugin)

const ele = ref<HTMLElement>()

watch(ele, (ele) => {
  if (!ele)
    return
  gsap.to(ele, {
    duration: 2,
    text: 'D9 Network Connecting...',
    ease: 'expo.out',
  })
})
</script>

<template>
  <div fixed inset-0>
    <div class="size-100%" col items-center justify-center>
      <ProgressSpinner
        col-span-4 my-8 size-12 stroke-width="6"
        aria-label="Loading ProgressSpinner"
      />

      <p ref="ele" font-bold tracking-wide />
    </div>
  </div>
</template>

<style scoped>

</style>
