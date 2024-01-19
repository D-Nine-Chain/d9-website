<script setup lang="ts">

</script>

<template>
  <div>
    <h2 text-center text-4xl font-bold>
      {{ $t('page.home.highlight.t') }}
    </h2>

    <div class="divider" mx-auto mt-6 h-1 w-16 />

    <div class="items" grid grid-cols-1 mx-auto mt-28 gap-30 lg:grid-cols-3 lt-lg:max-w-120 lg:gap-8>
      <div>
        <img class="translate-y--50%" h-9rem src="/imgs/home-highlights-1.png">
        <h3>
          {{ $t('page.home.highlight.item1.t') }}
        </h3>
        <div class="divider" />
        <p prose>
          {{ $t('page.home.highlight.item1.p') }}
        </p>
      </div>

      <div>
        <img class="translate-y--70%" h-8rem src="/imgs/home-highlights-2.png">
        <h3>
          {{ $t('page.home.highlight.item2.t') }}
        </h3>
        <div class="divider" />
        <p prose>
          {{ $t('page.home.highlight.item2.p') }}
        </p>
      </div>

      <div>
        <img class="translate-y--50%" h-8rem src="/imgs/home-highlights-3.png">
        <h3>{{ $t('page.home.highlight.item3.t') }}</h3>
        <div class="divider" />
        <p prose>
          {{ $t('page.home.highlight.item3.p') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style lang=scss scoped>
.items {
  @apply pb-3rem;

  & > div {
    @apply bg-[rgb(0,23,91)] rounded-2xl px-3.35rem relative pb-2.8rem lg:px-2rem lg:pb-1.5rem;

    & > img {
      @apply mx-auto absolute left-50% translate-x--50%;
    }
    & > h3 {
      @apply text-center text-xl font-bold mt-24 h-3.5rem col justify-center;
    }
    & > p {
      @apply mt-4;
    }
    .divider {
      @apply mx-auto mt-4 h-2px max-w-50 w-full;
    }
  }
}
</style>
