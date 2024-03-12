<script setup lang="ts">

</script>

<template>
  <section>
    <h1>
      <div inline-block rounded-full bg-white p-2 vertical-mid shadow-xl>
        <Image src="/imgs/d9-white-round.webp" rounded-full />
      </div>
      <span vertical-mid text-3.5rem text-brand font-bold>
        D9
      </span>
    </h1>

    <div mt-18 row>
      <TokensHeaderOverview flex-grow />

      <TokensHeaderBasicInfo ml-6 flex-grow />

      <TokensHeaderMore ml-6 flex-grow />
    </div>
  </section>
</template>

<style scoped lang="scss">
:deep(dl) {
  font-size: 14px;
  & > div {
    margin-top: 1.5rem;
    justify-content: space-between;
    & > dd {
      flex-grow: 0;
      min-width: unset;
    }
    & > dt {
      min-width: unset;
      flex-grow: 0;
      margin-right: 0;
    }
  }
}
</style>
