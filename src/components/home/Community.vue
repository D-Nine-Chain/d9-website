<script setup lang="ts">

</script>

<template>
  <section>
    <h2 text-center text-4xl font-bold>
      {{ $t('page.home.community.t') }}
    </h2>

    <div class="divider" mx-auto mt-6 h-1 w-16 />

    <div class="time-line" mt-4rem lt-lg:pl-12>
      <div v-for="i in 10" :key="i">
        <h3 class="text-gradient" text-3xl font-bold>
          2017
        </h3>
        <div class="divider" mt-3 h-1 w-16 />
        <p mt-4 text-gray-4 prose>
          The origin of the community can be traced back to 2017,
          when a group of elites who silently paid attention to the commercial application of blockchain technology communicated through the air on the network. With an ambitious vision,
          they hope to use the potential of blockchain technology to create a brand new business model,
          in order to promote revolutionary changes in business forms and break the expanding global capital monopoly pattern.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.time-line {
  @apply relative lg:pb-150px;
  & > div {
    width: 45%;
    @apply lt-lg:w-100% pb-10 lg:max-w-570px;
  }
  & > div:nth-child(even) {
    @apply lg:mt--150px lg:float-right;
  }

  &::before {
    content: '';
    background-image: linear-gradient(
      rgba(179, 179, 179, 0.582) 50%,
      rgba(255, 255, 255, 0) 0%
    );
    background-position: right;
    background-size: 5px 15px;
    background-repeat: repeat-y;
    width: 2px;
    left: 0;
    top: 0;
    bottom: 2.5rem;
    position: absolute;

    @apply lg:bottom-2rem lg:left-[calc(50%_-_1px)];
  }
}
</style>
