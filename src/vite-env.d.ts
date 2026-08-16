/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
  /** Basis-URL van de API. Leeg = zelfde origin als de site. */
  readonly VITE_API_BASE_URL?: string
  /** Pad van het data-endpoint. Nu /index.json, later bijv. /api/portfolio. */
  readonly VITE_API_PATH?: string
  /** Basis-URL voor relatieve afbeeldingspaden uit de CMS-data (portfolio, certificaten). */
  readonly VITE_ASSET_BASE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}


