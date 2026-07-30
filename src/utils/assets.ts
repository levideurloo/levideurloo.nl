const ASSET_BASE = import.meta.env.VITE_ASSET_BASE_URL ?? ''

export function resolveAssetUrl(path: string | undefined): string | undefined {
  if (!path) return undefined
  if (/^https?:\/\//.test(path)) return path
  return `${ASSET_BASE.replace(/\/$/, '')}/${path.replace(/^\.?\//, '')}`
}
