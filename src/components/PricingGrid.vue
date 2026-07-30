<script setup lang="ts">
import type { PricingTier } from '@/types'

defineProps<{ tiers: PricingTier[] }>()
</script>

<template>
  <div class="grid gap-5 sm:grid-cols-2">
    <div
      v-for="tier in tiers"
      :key="tier.id"
      class="relative flex flex-col gap-4 rounded-2xl p-6"
      :class="tier.primary ? 'shadow-glow' : 'card-surface'"
      :style="
        tier.primary
          ? 'background: linear-gradient(155deg, var(--accent-teal), var(--accent-violet), var(--accent-pink)); color: #fff;'
          : ''
      "
    >
      <span v-if="tier.primary" class="eyebrow" style="color: rgba(255,255,255,.85)">Aanbevolen</span>
      <h3 class="text-lg font-semibold" :style="tier.primary ? '' : 'color: var(--text-primary)'">
        {{ tier.title }}
      </h3>
      <div>
        <span class="text-2xl font-bold" :style="tier.primary ? '' : 'color: var(--text-primary)'">{{ tier.subtitle }}</span>
        <span class="ml-1 text-sm" :style="tier.primary ? 'color: rgba(255,255,255,.8)' : 'color: var(--text-secondary)'">
          {{ tier.caption }}
        </span>
      </div>
      <a
        :href="tier.link"
        class="btn mt-auto"
        :class="tier.primary ? '' : 'btn-ghost'"
        :style="tier.primary ? 'background:#fff; color:#14121C;' : ''"
      >
        {{ tier.cta }}
      </a>
    </div>
  </div>
</template>
