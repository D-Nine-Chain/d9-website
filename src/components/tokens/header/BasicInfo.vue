<script setup lang="ts">
import { format } from 'date-fns'
</script>

<template>
  <div rounded-xl px-2.25rem py-1.625rem card-shadow>
    <h2 mb-4 text-1.125rem font-bold>
      Basic Info
    </h2>

    <dl class="details">
      <div>
        <dd>
          Contract:
        </dd>
        <dt>
          TAFjULxi\gT4qWk6UZwjqwZXTSaGaqnVp4
        </dt>
      </div>

      <div>
        <dd>
          Issuer:
        </dd>
        <dt>
          TRxvWuBAkQgV2xCfVfkykYBzKe4vs4Kgsh
        </dt>
      </div>

      <div>
        <dd>
          Issuing Time:
        </dd>
        <dt>
          {{ format(new Date(), "yyyy MM-dd HH:mm:ss(O)") }}
        </dt>
      </div>

      <div>
        <dd>
          Decimal:
        </dd>
        <dt>
          18
        </dt>
      </div>

      <div>
        <dd>
          Links:
        </dd>
        <dt>
          Ofhcial Website White Paper
        </dt>
      </div>
    </dl>
  </div>
</template>

<style scoped>

</style>
