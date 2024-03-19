<script setup lang="ts">
import { formatDistanceStrict } from 'date-fns'

const items = asyncComputed(() => Promise.all(blocks.slice(0, 4).map(async block => ({
  height: block.header.number,
  reward: 0,
  hash: block.hash.toHex(),
  time: (await block.api.query.timestamp.now()).toNumber(),
}))), [])
</script>

<template>
  <CoverWrapper>
    <SearchInput />

    <section class="block">
      <h2 text-1.125rem text-black font-900>
        {{ $t('page.blockchain.header-blocks.title') }}
      </h2>

      <div class="item-wrapper" mt-8>
        <ProgressSpinner
          v-if="items.length === 0"
          col-span-4 my-8 size-12 stroke-width="6"
          aria-label="Block loading ProgressSpinner"
        />
        <router-link
          v-for="item in items"
          v-else :key="item.hash" :to="{ name: '/block/[height]/', params: { height: item.height.toString() } }"
          class="item"
          px-6 py-4 animated animated-flip-in-x
        >
          <p w-full row items-center font-bold>
            <span grow overflow-hidden text-ellipsis>
              # {{ item.height }}
            </span>

            <button class="chain-cloud" px-2 py-1 text-.6rem>
              {{ $t('page.blockchain.header-blocks.item.chain-cloud') }}
            </button>
          </p>

          <p mt-1 text-.8rem text-gray-4>
            {{ formatDistanceStrict(
              item.time,
              new Date(),
              { addSuffix: true },
            ) }}
          </p>

          <p mt-3 font-bold>
            <span>
              {{ $t('page.blockchain.header-blocks.item.reward') }}</span>
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
  @apply shadow-sm px-2.375rem py-2rem rounded-2xl mt-3.75rem;
}

.item-wrapper {
  @apply grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid gap-8;

  .item {
    @apply rounded-2xl bg-white;

    .chain-cloud {
      background-color: rgba(219, 226, 234, 0.644);
      @apply shrink-0 rounded;
    }
  }
}
</style>
