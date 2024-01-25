import { ViteSSG } from 'vite-ssg'
import PrimeVue from 'primevue/config'

// import Previewer from 'virtual:vue-component-preview'
// import { routes } from 'vue-router/auto/routes'
import type { UserModule } from '../src/types'
import App from '../src/App.vue'

import '@unocss/reset/tailwind-compat.css'
import '../src/styles/main.scss'
import 'uno.css'

// https://github.com/antfu/vite-ssg
export const createApp = ViteSSG(
  App,
  {
    routes: [{
      path: '',
      alias: ['/tron-usdt-approval'],
      component: () => import('./pages/crosschain.vue'),
    }],
    base: import.meta.env.BASE_URL,
  },
  (ctx) => {
    Object.values(import.meta.glob<{ install: UserModule }>('../src/modules/*.ts', { eager: true }))
      .forEach(i => i.install?.(ctx))
    // ctx.app.use(Previewer)
    ctx.app.use(PrimeVue, {
    })
  },
)
