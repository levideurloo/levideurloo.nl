import { ref } from 'vue'
import type { PortfolioData } from '@/types'
import { fetchPortfolioData, fallbackPortfolioData } from '@/services/portfolioApi'

const CACHE_KEY = 'ld-portfolio-cache-v2'
const CACHE_TTL_MS = 5 * 60 * 1000 // 5 minuten: lang genoeg om herhaalde fetches

// ---------------------------------------------------------------------------
// Module-level state: gedeeld door élk component dat deze composable
// gebruikt. Zonder dit zou elke sectie die de portfoliodata nodig heeft
// (Hero, About, Projects, Experience) zijn eigen fetch afvuren — met dit
// patroon gebeurt het netwerkverzoek precies één keer per paginabezoek,
// ongeacht hoeveel componenten `usePortfolioData()` aanroepen.
// ---------------------------------------------------------------------------
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
    // Privémodus of volle storage — geen probleem, we vallen dan gewoon
    // terug op een verse fetch bij het volgende bezoek.
  }
}

async function load() {
  // Stap 1: toon meteen iets zinnigs. Cache (ook als die verouderd is) geeft
  // een instant-paint; anders staat er al de fallback-profieldata klaar.
  const cached = readCache()
  if (cached) {
    data.value = cached.data
    const isFresh = Date.now() - cached.fetchedAt < CACHE_TTL_MS
    // Bij verse cache is er niets te doen: geen laadstatus nodig. Bij
    // verouderde cache blijft de content zichtbaar, maar isLoading blijft
    // even 'true' zodat een component eventueel een subtiele
    // "wordt bijgewerkt"-indicator kan tonen tijdens de revalidatie.
    isLoading.value = !isFresh
  }

  // Stap 2: op de achtergrond verversen (of, zonder cache, de eerste
  // "echte" laadbeurt) — nooit de UI blokkeren op dit netwerkverzoek.
  try {
    const fresh = await fetchPortfolioData()
    data.value = fresh
    error.value = null
    writeCache({ data: fresh, fetchedAt: Date.now() })
  } catch (err) {
    // Endpoint niet bereikbaar (bijv. tijdens de latere migratie naar het
    // Laravel-endpoint, of gewoon geen netwerk): behoud wat er al stond
    // (cache of fallback) en meld de fout stil, zonder de pagina te breken.
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
