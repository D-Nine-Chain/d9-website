<script setup lang="ts">

</script>

<template>
  <section flex items-center justify-center md:row lt-md:flex-col-reverse>
    <div shrink-0 grow-10 md:w-1>
      <h1 class="text-gradient" text-12 font-900 xl:text-13>
        {{ $t('page.home.header.about') }}
      </h1>
      <div class="divider" mt-8 h-1 w-20 />
      <p mt-6 max-w-500px prose lt-lg:text-.8rem>
        {{ $t('page.home.header.p') }}
      </p>
      <div mt-6 row>
        <button grow class="primary">
          {{ $t('page.home.header.open-app') }}
        </button>

        <button ml-8 grow class="primary with-border" text="Download">
          {{ $t('page.home.header.download') }}
        </button>
      </div>
    </div>
    <div shrink-0 grow-14 md:w-1>
      <img mx-auto max-w-200 w-full src="/imgs/home-header-img.png" alt="Homepage header img">
    </div>
  </section>
</template>

<style scoped>
</style>
