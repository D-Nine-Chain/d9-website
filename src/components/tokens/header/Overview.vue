<script setup lang="ts">
import BigNumber from 'bignumber.js'
import { reserves } from '~/composables/d9-network/contracts/market-maker'

const { state: totalIssuance, execute } = useAsyncState(async () => await api.value?.query.balances.totalIssuance().then(result => new BigNumber(result.toHex())), new BigNumber(0))
const totalIssuanceBN = useTokenAmount(totalIssuance, 'D9')
const { n } = useI18n()

const totalIssuanceFormatted = computed(() => n(totalIssuanceBN.value.toNumber(), { maximumFractionDigits: 0 }))

watch(api, (api) => {
  if (api)
    execute()
})

const value = computed(() => reserves.usdt.div(reserves.d9).toNumber())
</script>

<template>
  <div rounded-xl px-2.25rem py-1.625rem card-shadow>
    <h2 mb-4 text-1.125rem font-bold>
      Overview
    </h2>
    <p font-bold text-gradient>
      {{ '≈' }} {{ $n(value, { currency: 'USD', notation: 'standard', style: 'currency' }) }}
    </p>

    <dl class="details" mt-1.875rem>
      <div>
        <dd>
          Total Supply:
        </dd>
        <dt>
          {{ totalIssuanceFormatted }}
        </dt>
      </div>

      <div class="!hidden">
        <dd>
          Circulating Supply:
        </dd>
        <dt>
          912,323.12123123
        </dt>
      </div>

      <div class="!hidden">
        <dd>
          Total Market Cap:
        </dd>
        <dt>
          $34.123
        </dt>
      </div>

      <div class="!hidden">
        <dd>
          Circulating Market Cap:
        </dd>
        <dt>
          $123123.4314
        </dt>
      </div>
    </dl>
  </div>
</template>

<style scoped>

</style>
