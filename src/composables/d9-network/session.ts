import type { i64 } from '@polkadot/types'
import { acceptHMRUpdate, defineStore, storeToRefs } from 'pinia'
import { getBlockByHeight } from '~/utils/block'

export const useD9SessionStore = defineStore('d9-session', () => {
  const nextSession = ref(0)
  // in sec
  const timeLeft = ref(0)
  // one session per day
  const secPerSession = ref(24 * 60 * 60)

  useIntervalFn(async () => {
    const now = new Date()
    const nextSessionDate = nextSession.value
    timeLeft.value = (nextSessionDate - now.valueOf()) / 1000

    // if (timeLeft.value <= 0)
    //   await calc().catch(console.warn)
  }, 1000)

  watch(api, calc, { immediate: true })

  async function calc() {
    if (!api.value)
      return
    const header = await api.value.rpc.chain.getHeader()
    const sessionIndex = await api.value.query.session.currentIndex()
    console.info('current session index', sessionIndex.toNumber())
    const number = header.number.toNumber()
    const block = await getBlockByHeight(number)
    const timestampExtrinsic = block?.extrinsics.find(({ method: { section, method } }) => section === 'timestamp' && method === 'set')
    if (!timestampExtrinsic) {
      console.warn('no timestamp.set extrinsic found.')
      return
    }
    const [timestamp] = timestampExtrinsic!.method.args as [i64]

    // `3` sec a block
    const blocksPerSession = secPerSession.value / 3
    const blockInSession = number % blocksPerSession
    const _timeLeft = (blocksPerSession - blockInSession) * 3

    nextSession.value = timestamp.toNumber() + _timeLeft * 1000

    console.info('next session ', new Date(nextSession.value), 'time left seconds ', _timeLeft, 'block in session', blockInSession, 'blocks per session', blocksPerSession)
  }

  return {
    nextSession,
    // '00:00:00' style
    timeLeftFormatted: computed(() => formatDuration(timeLeft.value * 1000)),
    remainingPercentage: computed(() => 1 - (timeLeft.value / secPerSession.value)),
  }
})

export const useD9SessionRefs = () => storeToRefs(useD9SessionStore())

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useD9SessionStore as any, import.meta.hot))

function formatDuration(durationMs: number) {
  if (durationMs < 0)
    return '00:00:00'

  let remaining = durationMs
  // console.info('remaining', remaining)

  const hours = Math.floor(remaining / (1000 * 60 * 60))
  remaining -= hours * 1000 * 60 * 60

  const minutes = Math.floor(remaining / (1000 * 60))
  remaining -= minutes * 1000 * 60

  const seconds = Math.floor(remaining / 1000)

  const pad = (number: number) => number.toString().padStart(2, '0')

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}
