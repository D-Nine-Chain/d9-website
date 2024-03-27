<script setup lang="ts">
import { reserves } from '~/composables/d9-network/contracts/market-maker'

const { result: transfers } = useTransfers({ token: 'D9', limit: 1, offset: 0 })

const { result, loading } = useTrade24H()

const trade24H = computed(() => result.value?.trade24H.at(0))
</script>

<template>
  <div rounded-xl px-2.25rem py-1.625rem card-shadow>
    <h2 mb-4 text-1.125rem font-bold>
      More
    </h2>

    <dl class="details">
      <div class="hidden!">
        <dd>
          Holders:
        </dd>
        <dt>
          232,960
        </dt>
      </div>

      <div>
        <dd>
          Total Transfer Count:
        </dd>
        <dt>
          <Skeleton v-if="loading" class="w-4rem!" />
          <template v-else>
            {{ $n(transfers?.transfersConnection.totalCount ?? 0) }}
          </template>
        </dt>
      </div>

      <div>
        <dd>
          Transfers (24h):
        </dd>
        <dt>
          <Skeleton v-if="loading" class="w-4rem!" />
          <template v-else>
            <span>
              {{ $n(trade24H?.tradeCount24H ?? 0) }}
            </span>
            <span>({{ $n((trade24H?.percentageChange24H ?? 0) / 100, { style: 'percent' }) }})</span>
          </template>
        </dt>
      </div>

      <div>
        <dd>
          Trading Volume (24h):
        </dd>
        <dt>
          <Skeleton v-if="loading" class="w-4rem!" />
          <template v-else>
            <span>{{ $n(
              trade24H ? Number(trade24H.tradingVolume24H) : 0,
              { currency: 'USD', notation: 'standard', style: 'currency' },
            ) }}</span>
            <span />
          </template>
          <!-- <span>(-15.18%)</span> -->
          <!-- <span>(-)</span> -->
        </dt>
      </div>

      <div>
        <dd>
          Liquidity:
        </dd>
        <dt>
          <span>{{ $n(reserves.usdt.toNumber() * 2, { currency: 'USD', notation: 'standard', style: 'currency' }) }}</span>
          <!-- <span>(-15.18%)</span> -->
          <span />
        </dt>
      </div>
    </dl>
  </div>
</template>

<style scoped lang="scss">
dl {
  & > div {
    & > dt {
      span:last-child {
        color: rgb(223, 0, 0);
        margin-left: 0.2rem;
      }
    }
  }
}
</style>
