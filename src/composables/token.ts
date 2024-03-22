import type { MaybeRefOrGetter } from '@vueuse/core'
import BigNumber from 'bignumber.js'

export function formatTokenAmount(amount: any, decimals: number) {
  const divisor = new BigNumber(10).pow(decimals)
  if (!amount || !amount.toString)
    return new BigNumber(0)
  const _amount = amount.toString()
  console.info('format token amount', amount.toString(), decimals, new BigNumber(_amount).dividedBy(divisor).toString())
  return new BigNumber(_amount).dividedBy(divisor)
}

export function useD9TokenAmount(amount: MaybeRefOrGetter<any>) {
  return computed(() => {
    return formatTokenAmount(toValue(amount), registry.value?.chainDecimals?.[0] ?? 0)
  })
}

export function useFormatD9TokenAmount(amount: MaybeRefOrGetter<any>, display = 5) {
  return computed(() => {
    return formatTokenAmount(toValue(amount), registry.value?.chainDecimals?.[0] ?? 0).toFixed(display)
  })
}
