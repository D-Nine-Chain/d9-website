<script setup lang="ts">
import { formatDistance } from 'date-fns'

const items = [{
  height: '56261540',
  time: new Date(),
  reward: 172,
}, {
  height: '56261540',
  time: new Date(),
  reward: 172,
}, {
  height: '56261540',
  time: new Date(),
  reward: 172,
}, {
  height: '56261540',
  time: new Date(),
  reward: 172,
}]
</script>

<template>
  <CoverWrapper>
    <SearchInput />

    <section class="block">
      <h2 text-black font-900>
        Block
      </h2>

      <div class="item-wrapper" mt-8>
        <router-link
          v-for="item, index in items"
          :key="index"
          :to="{ name: '/block/[height]', params: { height: 233 } }" class="item"
          px-6 py-4
        >
          <p w-full row items-center font-bold>
            <span grow overflow-hidden text-ellipsis>
              #{{ item.height }}
            </span>

            <button class="chain-cloud" px-2 py-1 text-.6rem>
              CHAIN CLOUD
            </button>
          </p>

          <p mt-1 text-.8rem text-gray-4>
            {{ formatDistance(
              item.time,
              new Date(),
              { addSuffix: true },
            ) }}
          </p>

          <p mt-3 font-bold>
            <span>Reward</span>
            <span ml-2 text-brand>{{ item.reward }} D9</span>
          </p>
        </router-link>
      </div>
    </section>
  </CoverWrapper>
</template>

<style lang="scss" scoped>
.block {
  background-color: rgba(255, 255, 255, 0.4);
  @apply shadow-sm p-8 rounded-2xl mt-3.75rem;
}
.item-wrapper {
  @apply grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] grid gap-8;

  .item {
    @apply rounded-xl bg-white;
    .chain-cloud {
      background-color: rgba(219, 226, 234, 0.644);
      @apply shrink-0 rounded;
    }
  }
}
</style>
