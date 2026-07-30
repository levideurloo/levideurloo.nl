import { ref } from 'vue'
import { registerSW } from 'virtual:pwa-register'

const needRefresh = ref(false)
const offlineReady = ref(false)

let updateServiceWorker: (reloadPage?: boolean) => Promise<void> = async () => {}
let initialised = false

/**
 * Registreert de service worker één keer en geeft reactieve state terug
 * zodat de UI een "nieuwe versie beschikbaar" / "klaar voor offline
 * gebruik" melding kan tonen — zonder dat de gebruiker dit ooit via de
 * devtools moet controleren.
 */
export function usePwaUpdate() {
  if (!initialised) {
    initialised = true
    updateServiceWorker = registerSW({
      immediate: true,
      onNeedRefresh() {
        needRefresh.value = true
      },
      onOfflineReady() {
        offlineReady.value = true
      },
    })
  }

  async function reload() {
    needRefresh.value = false
    await updateServiceWorker(true)
  }

  function dismissOfflineReady() {
    offlineReady.value = false
  }

  return { needRefresh, offlineReady, reload, dismissOfflineReady }
}
