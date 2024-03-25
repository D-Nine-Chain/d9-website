<script setup lang="ts">

</script>

<template>
  <section>
    <h2 text-center text-4xl font-bold>
      {{ $t('page.home.community.t') }}
    </h2>

    <div class="divider" mx-auto mt-6 h-1 w-16 />

    <div class="time-line" mt-4rem lt-lg:pl-12>
      <div>
        <h3 class="text-gradient" text-3xl font-bold>
          May 2017
        </h3>
        <div class="divider" mt-3 h-1 w-16 />
        <p mt-4 text-gray-4 prose>
          In May 2017, some community members began to try to use smart contracts to participate in the application of business processes in the Ethereum network. This initiative became a first in the blockchain world and brought more exposure and support to the community.
        </p>
      </div>

      <div>
        <h3 class="text-gradient" text-3xl font-bold>
          Apr 2018
        </h3>
        <div class="divider" mt-3 h-1 w-16 />
        <p mt-4 text-gray-4 prose>
          In April 2018, some members of the community began to plan and try to build a faster and more efficient independent network to build a stronger commercial ecological application platform. This marks a long-term plan for the community to promote the commercial application of blockchain technology.
        </p>
      </div>

      <div>
        <h3 class="text-gradient" text-3xl font-bold>
          Oct 2018
        </h3>
        <div class="divider" mt-3 h-1 w-16 />
        <p mt-4 text-gray-4 prose>
          In October 2018, the community launched a blockchain system supported by DAG technology. To build a fully decentralized commercial ecological application platform, it realizes the security of commercial data, the value-added, distribution and transaction of various types of commercial assets, and the differentiation and tokenization of consumption value-added products.
        </p>
      </div>

      <div>
        <h3 class="text-gradient" text-3xl font-bold>
          Oct 2018
        </h3>
        <div class="divider" mt-3 h-1 w-16 />
        <p mt-4 text-gray-4 prose>
          With the passing of time, more and more elites in the business field, technical experts and ordinary users have joined this community, making it gradually grow in size. In September 2019, the number of community members was considerable, and the potential and influence of the community began to show.
        </p>
      </div>

      <div>
        <h3 class="text-gradient" text-3xl font-bold>
          June 2022
        </h3>
        <div class="divider" mt-3 h-1 w-16 />
        <p mt-4 text-gray-4 prose>
          In June 2020, some members of the community decided to set their sights on the Trom network and set out to create a larger game business ecosystem: D-Nine World. This initiative further enriches and diversities the community's portfolio of projects.
        </p>
      </div>

      <div>
        <h3 class="text-gradient" text-3xl font-bold>
          Feb 2021
        </h3>
        <div class="divider" mt-3 h-1 w-16 />
        <p mt-4 text-gray-4 prose>
          By February 2021, all members of the community began to promote the D9 project, which marked the gradual formation of a new consensus in the community, known as the D9 community. The formation of this consensus further strengthened the cohesion and collaboration of the community.
        </p>
      </div>

      <div>
        <h3 class="text-gradient" text-3xl font-bold>
          May 2022
        </h3>
        <div class="divider" mt-3 h-1 w-16 />
        <p mt-4 text-gray-4 prose>
          In May 2022, D9 community members made a more complete commercial technology application plan, which took a bigger step towards realizing their dream. The technical development work of D9 independent public chain was also officially launched, which is an important milestone in the development of the community.
        </p>
      </div>

      <div>
        <h3 class="text-gradient" text-3xl font-bold>
          Apr 2023
        </h3>
        <div class="divider" mt-3 h-1 w-16 />
        <p mt-4 text-gray-4 prose>
          In April 2023, after a long period of technical development and testing, version 1.0 of D9 independent public chain was finally completed and entered the stage of community internal testing and adjustment. This is a huge breakthrough for the community and lays a solid foundation for future development.
        </p>
      </div>

      <div>
        <h3 class="text-gradient" text-3xl font-bold>
          Dec 2023
        </h3>
        <div class="divider" mt-3 h-1 w-16 />
        <p mt-4 text-gray-4 prose>
          Finally, in December 2023, the D9 independent public chain was verified by various tests and fully open sourced, and officially went online. This moment represents the result of the community's long-term efforts and struggles, and also marks the community's entry into a new stage, which will continue to promote the innovation and application of blockchain technology in the commercial field.
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.time-line {
  @apply relative lg:pb-40px;
  & > div {
    width: 45%;
    @apply lt-lg:w-100% pb-10 lg:max-w-570px;
  }
  & > div:nth-child(even) {
    @apply lg:mt--130px lg:float-right;
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
