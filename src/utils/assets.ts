// Afbeeldingen in de CMS-data staan als relatief pad (bijv.
// "img/portfolio/x.webp"). Zolang de nieuwe site niet zelf die assets host,
// lossen we ze op tegen de bekende bron. Aanpasbaar via VITE_ASSET_BASE_URL
// zodra de Laravel-API eigen (absolute) asset-URL's teruggeeft.
const ASSET_BASE = import.meta.env.VITE_ASSET_BASE_URL ?? 'https://levideurloo.nl'

export function resolveAssetUrl(path: string | undefined): string | undefined {
  if (!path) return undefined
  if (/^https?:\/\//.test(path)) return path
  return `${ASSET_BASE.replace(/\/$/, '')}/${path.replace(/^\.?\//, '')}`
}
