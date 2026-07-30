<script setup lang="ts">
import { usePwaUpdate } from '@/composables/usePwaUpdate'

const { needRefresh, offlineReady, reload, dismissOfflineReady } = usePwaUpdate()
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="opacity-0 translate-y-2"
    leave-active-class="transition duration-150 ease-in"
    leave-to-class="opacity-0 translate-y-2"
  >
    <div
      v-if="needRefresh || offlineReady"
      class="card-surface fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full px-5 py-3 text-sm shadow-glow lg:bottom-6"
      role="status"
    >
      <span v-if="needRefresh" style="color: var(--text-primary)">
        Nieuwe versie beschikbaar.
      </span>
      <span v-else style="color: var(--text-primary)"> Klaar voor offline gebruik. </span>

      <button v-if="needRefresh" type="button" class="btn btn-primary !px-4 !py-1.5 text-xs" @click="reload">
        Vernieuwen
      </button>
      <button
        v-else
        type="button"
        class="text-xs font-medium"
        style="color: var(--text-secondary)"
        aria-label="Melding sluiten"
        @click="dismissOfflineReady"
      >
        OK
      </button>
    </div>
  </Transition>
</template>
