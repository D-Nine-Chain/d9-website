<script lang=ts setup>
const loaded = computed(() => !!d9Api.value)
</script>

<template>
  <main text="gray-700 dark:gray-200">
    <NavBar dark />

    <RouterView v-slot="{ Component }">
      <Transition>
        <Suspense v-if="loaded">
          <component :is="Component" />

          <template #fallback>
            <div
              absolute
              inset-x-0
              m-auto
              my-8
            >
              <ProgressSpinner
                stroke-width="6"
                col-span-4 my-16 block size-12
                aria-label="Loading ProgressSpinner"
              />

              <p text-center font-bold tracking-wide>
                Component Loading...
              </p>
            </div>
          </template>
        </Suspense>

        <DappLoading v-else />
      </Transition>
    </RouterView>
  </main>
</template>

<style lang="scss" scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
