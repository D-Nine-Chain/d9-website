<script setup lang="ts">
import { fixupAddress } from '~/utils'

const route = useRoute('/wallet/[address]')
const router = useRouter()
const address = computed(() => {
  const addr = route.params.address
  return fixupAddress(addr) ?? ''
})

if (!address.value)
  router.replace('/')
</script>

<template>
  <div pb-16>
    <WalletHeader :address />

    <div w-limited mt-10>
      <WalletTable :address />
    </div>
  </div>
</template>

<style scoped>

</style>
