<script setup lang="ts">
import OverlayPanel from 'primevue/overlaypanel'
import type { RouteNamedMap } from 'vue-router/auto-routes'

const props = defineProps<{
  dark?: boolean
}>()
const routes: { path: keyof RouteNamedMap | { href: string }, name: string }[] = [{
  path: '/',
  name: 'Home',
}, {
  path: '/blockchain',
  name: 'Blockchain',
}, {
  path: '/tokens',
  name: 'Tokens',
}, {
  path: { href: 'https://cross-chain.d9network.com/' },
  name: 'Cross Chain',
}/** {  path: '/wallet',  name: 'Wallet',} */]
const { dark } = toRefs(props)
const op = ref()

const { y } = useWindowScroll()
</script>

<template>
  <nav
    class="sticky top-0 z-100 h-[var(--nav-height)] col items-stretch justify-end transition-all"
    :class="[
      ...(y > 50
        ? [dark ? 'bg-[rgba(255,255,255,0.91)] shadow-sm' : '']
        : []),
      ...(dark
        ? ['dark-mode text-black']
        : ['text-white !bg-[rgba(1,21,63,0.3)] backdrop-blur-xl']),
    ]"
  >
    <div w-limited mb-10px h-42px w-full row items-center class="mt-[var(--nav-translate-y)]">
      <img v-if="dark" src="/imgs/dark-logo.webp" alt="D9 Network Logo" h-full translate-y--1 lt-md:h-38px>
      <img v-else src="/imgs/light-logo.webp" alt="D9 Network Logo" h-full translate-y--1 lt-md:h-38px>

      <div flex-grow />

      <ul h-full row items-center lt-md:hidden>
        <!-- eslint-disable-next-line vue/no-template-shadow -->
        <li v-for="route, index in routes" :key="index">
          <template v-if="('string' !== typeof route.path)">
            <a :href="route.path.href" target="_blank">{{ route.name }}</a>
          </template>
          <router-link v-else custom :to="{ path: route.path }">
            <template #default="{ isActive, href, navigate }">
              <a :class="{ active: isActive }" :href @click="navigate">{{ route.name }}</a>
            </template>
          </router-link>
        </li>
      </ul>

      <div col cursor-pointer justify-center p-2 md:hidden @click="op?.toggle">
        <i i-carbon-menu />
      </div>

      <OverlayPanel ref="op" :pt="{ content: 'p-0' }">
        <div>
          <ul class="mobile">
            <!-- eslint-disable-next-line vue/no-template-shadow -->
            <li v-for="route, index in routes" :key="index" m-4 min-w-140px>
              <template v-if="('string' !== typeof route.path)">
                <a :href="route.path.href" target="_blank">{{ route.name }}</a>
              </template>
              <router-link v-else custom :to="{ path: route.path }">
                <template #default="{ isActive, href, navigate }">
                  <a
                    :class="{
                      'font-bold': isActive,
                    }" :href @click="navigate"
                  >{{ route.name }}</a>
                </template>
              </router-link>
            </li>
          </ul>
        </div>
      </OverlayPanel>

      <button class="primary" ml-8 hidden shrink-0 px-5 py-1.5 lg:px-7>
        Log in
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
ul:not(.mobile) {
  li {
    @apply h-full;
    a {
      transition: all 0.4s ease-out;
      @apply px-2 lg:px-6 xl:px-8 h-full hover:cursor-pointer hover:text-gray-200 text-gray-400 col align-central;
    }
    .active {
      @apply text-gray-100 font-bold;
    }
  }
}

.dark-mode {
  ul:not(.mobile) {
    li {
      a {
        @apply text-gray-500;
      }
      .active {
        @apply text-gray-800 font-bold;
      }
    }
  }
}
</style>
