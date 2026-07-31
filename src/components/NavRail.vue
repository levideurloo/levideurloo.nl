<script setup lang="ts">
import { ref } from 'vue'
import NavIcon from './NavIcon.vue'
import ThemeToggle from './ThemeToggle.vue'
import type { NavItem } from '@/types'

const props = defineProps<{
  items: NavItem[]
  activeId: string
}>()

const emit = defineEmits<{ navigate: [id: string] }>()

const hoveredId = ref<string | null>(null)

function go(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  emit('navigate', id)
}
</script>

<template>
  <nav
    class="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-1 rounded-full p-2 shadow-glow lg:flex card-surface"
    aria-label="Navigation"
  >
    <div class="mb-1 flex flex-col items-center gap-1">
      <div v-for="item in props.items" :key="item.id" class="group relative">
        <button
          type="button"
          class="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-200"
          :class="
            item.id === props.activeId
              ? 'bg-gradient-to-br from-[var(--accent-teal)] via-[var(--accent-violet)] to-[var(--accent-pink)] text-white shadow-glow'
              : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--surface-raised)]'
          "
          :aria-current="item.id === props.activeId ? 'true' : undefined"
          :aria-label="item.label"
          @mouseenter="hoveredId = item.id"
          @mouseleave="hoveredId = null"
          @click="go(item.id)"
        >
          <NavIcon :icon="item.icon" class="h-5 w-5" />
        </button>

        <Transition
          enter-active-class="transition duration-150 ease-out"
          enter-from-class="opacity-0 translate-x-1"
          leave-active-class="transition duration-100 ease-in"
          leave-to-class="opacity-0 translate-x-1"
        >
          <span
            v-if="hoveredId === item.id"
            class="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium card-surface"
            style="color: var(--text-primary)"
          >
            {{ item.label }}
          </span>
        </Transition>
      </div>
    </div>

    <div class="h-px w-8" style="background: var(--border)" />
    <div class="mt-1">
      <ThemeToggle />
    </div>
  </nav>

  <!-- Mobiel: onderbalk -->
  <nav
    class="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-1 rounded-2xl px-2 py-2 shadow-glow card-surface lg:hidden"
    aria-label="Navigation"
  >
    <button
      v-for="item in props.items"
      :key="item.id"
      type="button"
      class="flex h-11 flex-1 items-center justify-center rounded-xl transition-colors"
      :class="
        item.id === props.activeId
          ? 'bg-gradient-to-br from-[var(--accent-teal)] via-[var(--accent-violet)] to-[var(--accent-pink)] text-white'
          : 'text-[var(--text-secondary)]'
      "
      :aria-current="item.id === props.activeId ? 'true' : undefined"
      :aria-label="item.label"
      @click="go(item.id)"
    >
      <NavIcon :icon="item.icon" class="h-5 w-5" />
    </button>
    <div class="pl-1">
      <ThemeToggle />
    </div>
  </nav>
</template>
