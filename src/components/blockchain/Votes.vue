<script setup lang="ts">
import MeterGroup from 'primevue/metergroup'

const value = ref([{ label: '', value: 15, color: 'green', icon: '' }])
</script>

<template>
  <section class="card-shadow" rounded-2xl p-8>
    <h2 text-black font-900>
      {{ $t('page.blockchain.votes.title') }}
    </h2>
    <div ml-3.75rem mt-0.625rem mt-2.3125rem row items-center>
      <img w-6.25rem shrink-0 object-contain src="/imgs/blockchain-vote-left.webp" alt="Blockchain Votes left icon">

      <dl ml-1.625rem grow>
        <dt style="color: rgba(96, 199, 222, 1)">
          {{ $t('page.blockchain.votes.subtitle') }}
        </dt>
        <dd mt-1.4375rem text-1.6875rem font-bold>
          <span vertical-mid>
            45,249,388,709
          </span>
          <span vertical-mid text-1rem style="color: rgba(29, 188, 89, 1)">+161,783</span>
        </dd>
      </dl>

      <dl shrink-0 text-center>
        <dt>
          <span vertical-mid text-gradient>
            {{ $t('page.blockchain.votes.next-round') }}
          </span>

          <span ml-1.875rem vertical-mid text-3.375rem font-ds-digii>
            00:00:09
          </span>
        </dt>

        <MeterGroup :value="value" />
      </dl>
    </div>
  </section>
</template>

<style scoped lang='scss'>
:deep(.p-metergroup) {
  min-width: 24rem;
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
