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
    text: 'Data Loading...',
    ease: 'expo.out',
  })
})
</script>

<template>
  <Card mx-auto max-w-90 min-w-70>
    <template #content>
      <div col items-center justify-center>
        <ProgressSpinner
          col-span-4 my-8 size-12 stroke-width="6"
          aria-label="Loading ProgressSpinner"
        />

        <p ref="ele" font-bold tracking-wide />
      </div>
    </template>
  </Card>
</template>

<style scoped>

</style>
