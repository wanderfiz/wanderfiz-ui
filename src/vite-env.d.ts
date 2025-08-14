/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string
  readonly VITE_LOG_LEVEL?: string
  readonly NODE_ENV?: string
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}