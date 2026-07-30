import { ref } from 'vue'
import type { PortfolioData } from '@/types'
import { fetchPortfolioData, fallbackPortfolioData } from '@/services/portfolioApi'

const CACHE_KEY = 'ld-portfolio-cache-v2'
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 min

const data = ref<PortfolioData>(fallbackPortfolioData)
const isLoading = ref(true)
const error = ref<string | null>(null)
let fetchPromise: Promise<void> | null = null

interface CacheEntry {
  data: PortfolioData
  fetchedAt: number
}

function readCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as CacheEntry
  } catch {
    return null
  }
}

function writeCache(entry: CacheEntry) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry))
  } catch {
    //
  }
}

async function load() {
  const cached = readCache()
  if (cached) {
    data.value = cached.data
    const isFresh = Date.now() - cached.fetchedAt < CACHE_TTL_MS
    isLoading.value = !isFresh
  }

  try {
    const fresh = await fetchPortfolioData()
    data.value = fresh
    error.value = null
    writeCache({ data: fresh, fetchedAt: Date.now() })
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Onbekende fout bij het ophalen van portfoliodata.'
  } finally {
    isLoading.value = false
  }
}

export function usePortfolioData() {
  if (!fetchPromise) {
    fetchPromise = load()
  }

  return { data, isLoading, error }
}
