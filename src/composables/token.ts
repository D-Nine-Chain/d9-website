import type { MaybeRefOrGetter } from '@vueuse/core'
import BigNumber from 'bignumber.js'
import type { Token } from '~/types'

export function _formatTokenAmount(amount: any, decimals: number) {
  const divisor = new BigNumber(10).pow(decimals)
  if (!amount || !amount.toString)
    return new BigNumber(0)
  const _amount = amount.toString()
  // console.info(
  //   'format token amount',
  //   amount.toString(),
  //   '_amount',
  //   _amount,
  //   'decimals',
  //   decimals,
  //   'result',
  //   new BigNumber(_amount).dividedBy(divisor).toString(),
  // )
  return new BigNumber(_amount).dividedBy(divisor)
}

export const TokenFormatMap = {
  D9: {
    decimals: undefined,
    display: 5,
    name: 'D9',
  },
  USDT: {
    decimals: 2,
    display: 2,
    name: 'USDT',
  },
} as const

export function useTokenAmount(amount: MaybeRefOrGetter<any>, token: MaybeRefOrGetter<Token>) {
  return computed(() => {
    let decimals = TokenFormatMap[toValue(token)].decimals ?? 0
    if (token === 'D9')
      decimals = registry.value?.chainDecimals?.[0] ?? 0
    return _formatTokenAmount(toValue(amount), decimals)
  })
}

export function useFormatTokenAmount(amount: MaybeRefOrGetter<any>, token: MaybeRefOrGetter<Token>, _display?: MaybeRefOrGetter<number>) {
  return computed(() => formatTokenAmount(amount, token, _display))
}

export function formatTokenAmount(amount: MaybeRefOrGetter<any>, token: MaybeRefOrGetter<Token>, _display?: MaybeRefOrGetter<number>) {
  const display = _display ?? TokenFormatMap[toValue(token)].display
  return reduceTokenAmount(toValue(amount), toValue(token)).toFixed(toValue(display))
}

export function reduceTokenAmount(amount: any, token: Token) {
  let decimals = TokenFormatMap[toValue(token)].decimals ?? 0
  if (token === 'D9')
    decimals = registry.value?.chainDecimals?.[0] ?? 0
  return _formatTokenAmount(toValue(amount), decimals)
}
