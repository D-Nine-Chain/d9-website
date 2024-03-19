import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { animatedUno } from 'animated-unocss'

export default defineConfig({
  shortcuts: [
    ['col', 'flex flex-col'],
    ['row', 'flex flex-row'],
    ['w-limited', 'max-w-[var(--content-max-width)] px-[var(--content-x-padding)] mx-auto'],
    ['align-central', 'items-center justify-center'],
    [/^wh-(.*)$/, ([, c]) => `width-${c} height-${c}`],
  ],
  rules: [
    [/^text-gradient$/, ([,]) => ({
      'display': 'inline',
      'background': 'var(--gradient)',
      'background-clip': 'text',
      '-webkit-text-fill-color': 'transparent',
    })],
    [/^brand-gradient$/, () => ({
      'background-color': 'rgb(0, 94, 225)',
      'background-image': 'var(--gradient)',
    })],
    [/^card-shadow$/, () => ({
      'box-shadow': 'var(--card-shadow)',
    })],
  ],
  theme: {
    colors: {
      'bg': 'var(--home-background)',
      'brand-gradient': 'var(--gradient)',
      'brand': 'var(--brand)',
      't-usdt': 'var(--token-usdt)',
    },
    fontFamily: {
      'ds-digi': 'ds-digi',
      'ds-digii': 'ds-digii',
    },
  },
  presets: [
    presetWind(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      extraProperties: {
        'display': 'inline-block',
        'vertical-align': 'middle',
      },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'bunny',
      fonts: {
        sans: 'Satoshi',
        serif: 'Stardom',
        mono: 'JetBrains Mono',
      },
    }),
    animatedUno(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  safelist: 'prose m-auto text-left text-center flex grid'.split(' '),
})
