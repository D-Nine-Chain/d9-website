<script setup lang="ts">
import { format, formatDistance } from 'date-fns'
</script>

<template>
  <CoverWrapper>
    <SearchInput />

    <section class="block card-shadow">
      <h2 text-1.125rem text-black font-900>
        Transaction Details
      </h2>

      <dl class="details">
        <div>
          <dt>
            Hash:
          </dt>
          <dd>
            d3413738697968f512172994bb9cf4270c7915467e2346962078acfd3258943a
          </dd>
        </div>

        <div>
          <dt>
            Result:
          </dt>
          <dd class="text-#39C068" font-bold>
            SUCCESSFUL
          </dd>
        </div>

        <div>
          <dt>
            Status:
          </dt>
          <dd>
            <span class="text-#39C068" font-bold>
              CONFIRMED
            </span>
            <span ml-1rem>
              Confirmed by over 200 blocks
            </span>
          </dd>
        </div>

        <div>
          <dt>
            Confirmed SRs:
          </dt>
          <dd>
            <span font-bold>
              19
            </span>
            <span ml-1rem>
              Smart Consensus
              Valkyrie lnvestments
            </span>
          </dd>
        </div>

        <div>
          <dt>
            Block:
          </dt>
          <dd font-bold>
            123321
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
            Resources Consumed & Fee:
          </dt>
          <dd font-bold>
            4314.413412 D9
          </dd>
        </div>
      </dl>
    </section>
  </CoverWrapper>
</template>

<style scoped lang="scss">
.block {
  margin-top: -15.25rem;
  transform: translateY(19rem);

  background-color: rgba(255, 255, 255, 0.4);
  @apply px-2.625rem py-2.375rem rounded-2xl backdrop-blur-sm;
}
</style>
