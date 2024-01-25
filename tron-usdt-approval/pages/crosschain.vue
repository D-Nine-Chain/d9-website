<script setup lang="ts">
useHead({
  title: 'D9 Network TRON-USDT Approval',
  meta: [
    {
      name: 'description',
      content: 'D9 Network TRON-USDT Approval. Swap TRON to USDT',
    },
  ],
})

const amount = ref<string>('')
const address = ref<string>('')
</script>

<template>
  <form class="wrapper" relative h-100vh w-100vw flex sm:align-central>
    <div absolute inset-0 z-0 backdrop-blur-lg />

    <img src="/imgs/big-logo.png" absolute bottom-10 max-w-16rem>

    <div lt-sm="h-full rounded-0 b-0" z-1 min-h-15rem w-full col b-1 rounded-2xl bg-white p-12 shadow-sm sm:max-w-30rem sm:min-w-25rem>
      <h1 text-center text-3xl font-bold>
        CROSSCHAIN BRIDGE
      </h1>

      <div mt-10 rounded-xl bg-gray-1 p-4>
        <label for="receiver">Receiver</label>
        <InputText v-model="address" name="receiver" placeholder="Input receiver" type="text" w-full bg-transparent text-xl font-bold shadow-none />
      </div>

      <div relative mt-8 row rounded-xl bg-gray-1 p-3>
        <div relative w-14 shrink-0 p-1>
          <img h-full w-full src="/imgs/tron.png" alt="">
          <img absolute bottom-0 right-0 w-6 src="/imgs/usdt.png" alt="">
        </div>
        <div ml-4 col grow items-end justify-between>
          <p text-sm text-gray>
            Balance: 123,321.00
          </p>
          <InputText
            v-model="amount" name="sendAmount" placeholder="Input amount" type="number" w-full bg-transparent text-end text-xl font-bold
            shadow-none
          />
        </div>

        <div
          class="bottom--51% left-50% translate-x--50%" absolute h-14 w-14 col align-central b-3 b-gray-1 rounded-xl
          bg-gray-2 shadow-lg
        >
          <!-- <div i-carbon-arrow-down text-2xl text-black /> -->

          <svg
            xmlns="http://www.w3.org/2000/svg" rotate="-90deg" text-2xl text-gray-5 width="32" height="32"
            viewBox="0 0 24 24"
          >
            <g
              fill="none" stroke="currentColor" stroke-dasharray="8" stroke-dashoffset="8" stroke-linecap="round"
              stroke-linejoin="round" stroke-width="2"
            >
              <path d="M12 12L17 7M12 12L17 17">
                <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="8;0" />
              </path>
              <path d="M6 12L11 7M6 12L11 17">
                <animate fill="freeze" attributeName="stroke-dashoffset" begin="0.3s" dur="0.3s" values="8;0" />
              </path>
            </g>
          </svg>
        </div>
      </div>

      <div mt-8 row rounded-xl bg-gray-1 p-3>
        <div relative w-14 shrink-0 p-1>
          <div h-full w-full rounded-full p-1.5 class="bg-[rgb(0,90,223)]">
            <img h-full w-full rounded-full src="/imgs/d9.png" alt="">
          </div>
          <img absolute bottom-0 right-0 w-6 src="/imgs/usdt.png" alt="">
        </div>
        <div ml-4 col grow items-end justify-between>
          <p text-sm text-gray>
            Balance: 123,321.00
          </p>
          <InputText
            v-model="amount" name="receiveAmount" placeholder="Input amount" type="number" w-full bg-transparent text-end text-xl font-bold
            shadow-none
          />
        </div>
      </div>

      <div mt-8 rounded-xl bg-gray-1 p-4>
        <p class="row justify-between">
          Exchange price <span>1:1</span>
        </p>
        <p class="row justify-between" mt-2>
          Fee <span>~ 0 USDT</span>
        </p>
      </div>

      <div mt-10>
        <Button w-full text-center>
          Submit
        </Button>
      </div>

      <div grow />
      <img src="/imgs/big-logo.png" max-w-16rem self-center sm:hidden>
    </div>
  </form>
</template>

<style scoped lang="scss">
.wrapper {
  background: url(/imgs/cover.png);
  background-size: cover;
  background-position: center;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type='number'] {
  -moz-appearance: textfield;
  appearance: textfield;
}
</style>
