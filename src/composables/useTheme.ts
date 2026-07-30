import { ref, watch, onMounted } from 'vue'
import type { Theme } from '@/types'

const STORAGE_KEY = 'ld-theme'

// Module-level state zodat elk component dezelfde bron van waarheid deelt,
// zonder dat we een aparte store-library nodig hebben.
const theme = ref<Theme>('dark')

function applyTheme(value: Theme) {
  document.documentElement.classList.toggle('dark', value === 'dark')
  document.documentElement.setAttribute('data-theme', value)
}

export function useTheme() {
  onMounted(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Theme | null
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    theme.value = stored ?? (prefersDark ? 'dark' : 'light')
    applyTheme(theme.value)

    // Volg systeemwijzigingen alleen als de gebruiker zelf nog geen keuze maakte
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem(STORAGE_KEY)) {
        theme.value = e.matches ? 'dark' : 'light'
      }
    }
    media.addEventListener('change', onChange)
  })

  watch(theme, (value) => {
    applyTheme(value)
    localStorage.setItem(STORAGE_KEY, value)
  })

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  function setTheme(value: Theme) {
    theme.value = value
  }

  return { theme, toggleTheme, setTheme }
}
