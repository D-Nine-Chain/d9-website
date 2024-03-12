<script setup lang="ts">

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
          TJ6yHGd7pRNUGCgijbnY7yjcqYvw996fZv
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
              43,532.233
            </p>
            <p mt-1 text-end font-bold>
              ≈ 328.20
            </p>
          </div>
        </div>

        <div class="sm:ml-8" row flex-grow items-center justify-between sm:max-w-28.75rem>
          <div row flex-shrink-1 flex-grow items-center justify-between>
            <div>
              <img inline size-2.5rem rounded-full shadow-md src="/imgs/usdt.png">
              <span relative top-.5 ml-4 inline font-bold>
                USDT
              </span>
            </div>

            <div>
              <p text-end text-t-usdt font-bold>
                43,532.233
              </p>
              <p mt-1 text-end font-bold>
                ≈ 328.20
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
