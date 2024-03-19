<script setup lang="ts">
import type { Block } from '@polkadot/types/interfaces'
import { format, formatDistance } from 'date-fns'

const {
  block,
} = defineProps<{
  block: Block
}>()
</script>

<template>
  <CoverWrapper>
    <SearchInput />

    <section class="block card-shadow">
      <h2 text-2.25rem text-black font-900>
        <span class="text-gradient">
          Block #{{ block.header.number }}
        </span>

        <span class="producer-block">
          Producer:  JDInvestment
        </span>
      </h2>

      <dl class="details">
        <div>
          <dt>
            Block Hash:
          </dt>
          <dd>
            {{ block.hash }}
          </dd>
        </div>

        <div>
          <dt>
            Time:
          </dt>
          <dd font-bold>
            <span>
              {{ formatDistance(new Date("2024/3/4"), new Date(), { addSuffix: true }) }}
            </span>
            |
            <span>
              {{ format(new Date(), "yyyy MM-dd HH:mm:ss(O)") }}
            </span>
          </dd>
        </div>

        <div>
          <dt>
            Status:
          </dt>
          <dd>
            <span font-bold style="color: rgba(57, 192, 104, 1)">CONFIRMED</span>
            <span ml-1rem text-0.875rem>Confirmed by over 200 blocks</span>
          </dd>
        </div>

        <div>
          <dt>
            Confirmed SRs:
          </dt>
          <dd>
            <span font-bold>19</span>
          </dd>
        </div>

        <div>
          <dt>Parent Block Hash:</dt>
          <dd font-bold>
            {{ block.header.parentHash }}
          </dd>
        </div>
      </dl>
    </section>
  </CoverWrapper>
</template>

<style lang="scss" scoped>
.block {
  margin-top: -5rem;
  transform: translateY(8.75rem);

  background-color: rgba(255, 255, 255, 0.4);
  @apply px-2.625rem py-2.375rem rounded-2xl backdrop-blur-sm;
}
.chain-cloud {
  background-color: rgba(219, 226, 234, 0.644);
}
.producer-block {
  background: rgb(179, 179, 182);
  padding: 0.3125rem 0.9375rem;
  font-size: 1.0625rem;
  color: white;
  margin-left: 1.9375rem;
}
</style>
