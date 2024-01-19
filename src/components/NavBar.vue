<script setup lang="ts">
import type { RouteNamedMap } from 'vue-router/auto/routes'

const routes: { path: keyof RouteNamedMap, name: string }[] = [{
  path: '/',
  name: 'Home',
}, {
  path: '/blockchain',
  name: 'Blockchain',
}, {
  path: '/tokens',
  name: 'Tokens',
}]
const { dark } = definePropsRefs<{
  dark: boolean
}>()
</script>

<template>
  <nav
    class="top-[var(--nav-translate-y)] h-[var(--nav-height)]"
    :class="dark ? ['dark-mode text-black'] : ['text-white bg-[rgba(1,21,63,0.3)] backdrop-blur-xl']"
    sticky z-100 col items-stretch justify-end transition-top
  >
    <div w-limited mb-10px h-42px w-full row items-center>
      <img src="/imgs/logo.png" alt="D9 Network Logo" h-full translate-y--1 lt-md:h-38px>

      <div flex-grow />

      <ul h-full row items-center font-bold lt-md:hidden>
        <!-- eslint-disable-next-line vue/no-template-shadow -->
        <li v-for="route, index in routes" :key="index">
          <router-link active-class="active" :to="{ path: route.path }">
            {{ route.name }}
          </router-link>
        </li>
      </ul>

      <button class="primary" ml-8 shrink-0>
        Log in
      </button>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
ul {
  li {
    transition: all 0.4s ease-out;
    @apply px-4 h-full hover:cursor-pointer hover:text-gray-200 text-gray-400 col align-central;

    .active {
      @apply text-gray-100 font-bold;
    }
  }
}

.dark-mode {
  ul {
    li {
      @apply text-gray-500;
      .active {
        @apply text-gray-800 font-bold;
      }
    }
  }
}
</style>
