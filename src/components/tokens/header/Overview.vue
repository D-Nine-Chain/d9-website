<script setup lang="ts">
import BigNumber from 'bignumber.js'

const { state: totalIssuance, execute } = useAsyncState(async () => await api.value?.query.balances.totalIssuance().then(result => new BigNumber(result.toHex())), new BigNumber(0))
const totalIssuanceBN = useD9TokenAmount(totalIssuance)
const { n } = useI18n()

const totalIssuanceFormatted = computed(() => n(totalIssuanceBN.value.toNumber(), { maximumFractionDigits: 0 }))

watchEffect(() => {
  toValue(api)
  execute()
})
</script>

<template>
  <div rounded-xl px-2.25rem py-1.625rem card-shadow>
    <h2 mb-4 text-1.125rem font-bold>
      Overview
    </h2>
    <p font-bold text-gradient>
      {{ '<' }} $0.000001
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

      <div>
        <dd>
          Circulating Supply:
        </dd>
        <dt>
          912,323.12123123
        </dt>
      </div>

      <div>
        <dd>
          Total Market Cap:
        </dd>
        <dt>
          $34.123
        </dt>
      </div>

      <div>
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
