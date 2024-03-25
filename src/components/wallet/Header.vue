<script setup lang="ts">
import { reserves } from '~/composables/d9-network/contracts/market-maker'
import { useBalance as useUSDTBalance } from '~/composables/d9-network/contracts/usdt'

const props = defineProps<{
  address: string
}>()

const { address } = toRefs(props)

const { state: usdtBalanceState } = useUSDTBalance(address)
const usdtBalance = computed(() => reduceTokenAmount(usdtBalanceState, 'USDT').toNumber())

const { state: account } = useD9Account(address)
const d9Balance = computed(() => reduceTokenAmount(account.value?.data.free, 'D9').toNumber())

const d9AsUSDT = computed(() => {
  const u = reserves.usdt.div(reserves.d9).multipliedBy(d9Balance.value).toNumber()
  if (Number.isNaN(u))
    return 0
  // return reserves.usdt.div(reserves.d9).multipliedBy(d9Balance.value).toNumber()
  return u
})
</script>

<template>
  <CoverWrapper>
    <SearchInput />

    <section class="block card-shadow" mt-16>
      <h2 mb-1.75rem text-1.125rem text-black font-bold>
        Account
      </h2>

      <p block overflow-hidden text-ellipsis text-1.75rem font-bold>
        <span class="text-gradient">
          Dn{{ props.address }}
        </span>
      </p>

      <div mt-2.25rem col justify-between sm:row class="<md:flex-wrap">
        <div row flex-shrink-1 flex-grow items-center justify-between sm:max-w-28.75rem>
          <div>
            <img inline size-2.5rem rounded-full shadow-md src="/imgs/d9-white-round.webp">
            <span relative top-.5 ml-4 inline font-bold>D9</span>
          </div>

          <div>
            <p text-end text-brand font-bold>
              {{ $n(d9Balance ?? 0) }}
            </p>
            <p mt-1 text-end font-bold>
              ≈ {{ $n(d9AsUSDT ?? 0, { currency: 'USD', notation: 'standard', style: 'currency' }) }}
            </p>
          </div>
        </div>

        <div class="sm:ml-8" row flex-grow items-center justify-between sm:max-w-28.75rem>
          <div row flex-shrink-1 flex-grow items-center justify-between>
            <div>
              <img inline size-2.5rem rounded-full shadow-md src="/imgs/usdt.webp">
              <span relative top-.5 ml-4 inline font-bold>
                USDT
              </span>
            </div>

            <div>
              <p text-end text-t-usdt font-bold>
                {{ $n(usdtBalance ?? 0) }}
              </p>
              <p mt-1 text-end font-bold>
                ≈ {{ $n(usdtBalance ?? 0, { currency: 'USD', notation: 'standard', style: 'currency' }) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </CoverWrapper>
</template>

<style lang="scss" scoped>
.block {
  background-color: rgba(255, 255, 255, 0.4);
  @apply px-2.375rem py-2rem rounded-2xl backdrop-blur-sm;
}
</style>
