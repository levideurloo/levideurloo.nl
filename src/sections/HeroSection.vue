<script setup lang="ts">
import { computed } from 'vue'
import { usePortfolioData } from '@/composables/usePortfolioData'

const { data } = usePortfolioData()

const initials = computed(() =>
  data.value.profile.name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join(''),
)
</script>

<template>
  <section id="home" class="flex min-h-[92vh] items-center px-6 pt-24 sm:px-10 lg:px-24">
    <div class="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <p class="eyebrow mb-5">Portfolio — {{ data.profile.name }}</p>
        <h1 class="text-4xl font-bold leading-[1.08] sm:text-5xl lg:text-6xl">
          {{ data.profile.title }},
          <span class="text-gradient">{{ data.profile.tagline }}</span>
        </h1>
        <p class="mt-6 max-w-xl text-lg leading-relaxed" style="color: var(--text-secondary)">
          Websites, webshops en maatwerk applicaties — gebouwd met Vue, Laravel en API's, met oog
          voor zowel de techniek als de gebruiker.
        </p>

        <div class="mt-9 flex flex-wrap items-center gap-4">
          <a href="/assets/CV_Levi_Deurloo_2026.pdf" class="btn btn-primary" target="_blank" download>Download mijn CV</a>
          <a href="#contact" class="btn btn-ghost">Neem contact op</a>
        </div>
      </div>

      <div class="relative mx-auto aspect-square w-full max-w-sm">
        <div
          class="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[var(--accent-teal)] via-[var(--accent-violet)] to-[var(--accent-pink)] opacity-90"
        />
        <div class="card-surface absolute inset-3 flex flex-col items-center justify-center gap-4 rounded-[1.75rem] p-8 text-center">
          <span
            class="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-[var(--accent-teal)] via-[var(--accent-violet)] to-[var(--accent-pink)] font-display text-3xl font-bold text-white"
          >
            {{ initials }}
          </span>
          <div>
            <p class="text-xl font-semibold" style="color: var(--text-primary)">{{ data.profile.name }}</p>
            <p class="text-sm" style="color: var(--text-secondary)">{{ data.profile.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
