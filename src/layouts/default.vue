<script lang=ts setup>
import { paused } from '~/composables/d9-network'

paused.value = false
const loaded = computed(() => !!api.value)
</script>

<template>
  <main text="gray-700 dark:gray-200">
    <NavBar dark />

    <RouterView v-slot="{ Component }">
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
    </RouterView>
  </main>
</template>
