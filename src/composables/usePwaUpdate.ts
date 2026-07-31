import { ref } from 'vue'
import { registerSW } from 'virtual:pwa-register'

const needRefresh = ref(false)
const offlineReady = ref(false)

let updateServiceWorker: (reloadPage?: boolean) => Promise<void> = async () => {}
let initialised = false

let isProd = import.meta.env.NODE_ENV === 'production';

export function usePwaUpdate() {
  if (!initialised && isProd) {
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
