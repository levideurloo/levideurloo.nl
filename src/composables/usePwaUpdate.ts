import { registerSW } from "virtual:pwa-register"
import { ref } from 'vue'

const needRefresh = ref(false)
const offlineReady = ref(false)

let updateServiceWorker: (reloadPage?: boolean) => Promise<void> = async () => {}
let initialised = false

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
