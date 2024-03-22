<script setup lang="ts">
import MeterGroup from 'primevue/metergroup'

const { totalVotes } = useD9VotingRefs()

const { timeLeftFormatted, remainingPercentage } = useD9SessionRefs()

const value = computed(() => [{ label: '', value: remainingPercentage.value * 100, color: 'green', icon: '' }])
</script>

<template>
  <section class="card-shadow" rounded-2xl p-8>
    <h2 text-black font-900>
      {{ $t('page.blockchain.votes.title') }}
    </h2>
    <div mt-1rem col items-center lg:mx-3.75rem lg:mt-2.3125rem lg:row>
      <img w-6.25rem shrink-0 object-contain src="/imgs/blockchain-vote-left.webp" alt="Blockchain Votes left icon">

      <dl mx-1.625rem grow lt-lg="text-center mt-8">
        <dt style="color: rgba(96, 199, 222, 1)">
          {{ $t('page.blockchain.votes.subtitle') }}
        </dt>
        <dd mt-1.4375rem text-1.6875rem font-bold animated animated-flip-in-x>
          <span vertical-mid>
            {{ $n(totalVotes) }}
          </span>
          <!-- TODO: -->
          <!-- <span vertical-mid text-1rem style="color: rgba(29, 188, 89, 1)">+161,783</span> -->
        </dd>
      </dl>

      <dl shrink-0 text-center>
        <dt animated animated-flip-in-x>
          <span text-gradient sm:vertical-mid>
            {{ $t('page.blockchain.votes.next-round') }}
          </span>

          <span inline-block text-3.375rem font-ds-digii md:ml-1.875rem sm:vertical-mid style="width: 8ch">
            {{ timeLeftFormatted }}
          </span>
        </dt>

        <MeterGroup lg:min-w-24rem :value="value" />
      </dl>
    </div>
  </section>
</template>

<style scoped lang='scss'>
:deep(.p-metergroup) {
  .p-metergroup-labels {
    display: none;
  }
  .p-metergroup-meters {
    height: auto;
    background: transparent;
    border: 1px solid rgb(74, 145, 240);
    padding: 0.375rem;
    border-radius: 1rem;
    .p-metergroup-meter {
      background: var(--gradient) !important;
      height: 0.6875rem;
    }
  }
}
</style>
