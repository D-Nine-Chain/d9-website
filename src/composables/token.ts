import { UInt } from '@polkadot/types'
import type { MaybeRefOrGetter } from '@vueuse/core'
import BigNumber from 'bignumber.js'

export function formatTokenAmount(amount: any, decimals: number) {
  const divisor = new BigNumber(10).pow(decimals)
  let _amount = amount.toString()
  if (amount instanceof UInt)
    _amount = amount.toBigInt().toString()
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
