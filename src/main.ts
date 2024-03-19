import { ViteSSG } from 'vite-ssg'
import { setupLayouts } from 'virtual:generated-layouts'
import PrimeVue from 'primevue/config'

import { routes } from 'vue-router/auto-routes'
import App from './App.vue'
import type { UserModule } from './types'

import './interfaces/augment-api'
import './interfaces/augment-types'
import '@polkadot/types/lookup'

import '@unocss/reset/tailwind-compat.css'
import './styles/main.scss'
import 'uno.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: setupLayouts(routes),
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    Object.values(import.meta.glob<{ install: UserModule }>('./modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    ctx.app.use(PrimeVue, {
    })
  },
)
