/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_CONTRACT_USDT: string
  readonly VITE_APP_CONTRACT_MM: string
  readonly VITE_APP_QUEUE_BUFFER: number
  readonly VITE_APP_KEEP_BLOCK: number
  readonly VITE_APP_INDEXER_HTTP: string
  readonly VITE_APP_INDEXER_WS: string
  readonly VITE_APP_RPC_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
