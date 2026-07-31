<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import ServicesGrid from '@/components/ServicesGrid.vue'
import TestimonialsGrid from '@/components/TestimonialsGrid.vue'
import FunFactsStrip from '@/components/FunFactsStrip.vue'
import { usePortfolioData } from '@/composables/usePortfolioData'

const { data } = usePortfolioData()
</script>

<template>
  <section id="about" class="section-py px-6 sm:px-10 lg:px-24">
    <div class="mx-auto max-w-6xl">
      <SectionHeading eyebrow="Wie ik ben" title="Over " accent="mij" />

      <div class="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div
          class="card-surface relative overflow-hidden rounded-2xl p-8 text-base leading-relaxed"
          style="color: var(--text-primary)"
          v-html="data.profile.bioHtml"
        />

        <div v-if="data?.funFacts">
          <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div
              v-for="fact in data.profile.facts"
              :key="fact.label"
              class="rounded-xl p-4"
              style="border: 1px solid var(--border)"
            >
              <dt class="eyebrow mb-1">{{ fact.label }}</dt>
              <dd class="text-sm font-medium" style="color: var(--text-primary)">{{ fact.value }}</dd>
            </div>
          </dl>

          <div class="mt-8">
            <FunFactsStrip :facts="data.funFacts" />
          </div>
        </div>
      </div>

      <div class="mt-16">
        <h3 class="mb-6 text-xl font-semibold" style="color: var(--text-primary)">Wat ik zoal maak</h3>
        <ServicesGrid :services="data.services" />
      </div>

      <div class="mt-16" v-if="data?.testimonials">
        <h3 class="mb-6 text-xl font-semibold" style="color: var(--text-primary)">Wat klanten zeggen</h3>
        <TestimonialsGrid :testimonials="data.testimonials" />
      </div>
    </div>
  </section>
</template>
