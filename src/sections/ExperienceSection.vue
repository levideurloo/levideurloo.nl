<script setup lang="ts">
import SectionHeading from '@/components/SectionHeading.vue'
import TimelineItem from '@/components/TimelineItem.vue'
import SkillBars from '@/components/SkillBars.vue'
import CertificateList from '@/components/CertificateList.vue'
import TagChip from '@/components/TagChip.vue'
import { usePortfolioData } from '@/composables/usePortfolioData'

const { data } = usePortfolioData()
</script>

<template>
  <section id="experience" class="section-py px-6 sm:px-10 lg:px-24">
    <div class="mx-auto max-w-3xl">
      <SectionHeading eyebrow="Route tot nu toe" title="Ervaringen en " accent="opleidingen" />

      <div>
        <h3 class="mb-6 text-sm font-semibold uppercase tracking-wide" style="color: var(--text-muted)">
          Werkervaring &amp; stages
        </h3>
        <TimelineItem
          v-for="(entry, index) in data.experience"
          :key="entry.id"
          :entry="entry"
          :is-last="index === data.experience.length - 1"
        />
      </div>

      <div class="mt-16">
        <h3 class="mb-6 text-sm font-semibold uppercase tracking-wide" style="color: var(--text-muted)">
          Ervaring met talen
        </h3>
        <SkillBars :skills="data.skills" />
      </div>

      <div class="mt-16">
        <h3 class="mb-4 text-sm font-semibold uppercase tracking-wide" style="color: var(--text-muted)">
          Kennisgebieden
        </h3>
        <div class="flex flex-wrap gap-2">
          <TagChip v-for="item in data.knowledge" :key="item" :label="item" />
        </div>
      </div>

      <div class="mt-16">
        <h3 class="mb-6 text-sm font-semibold uppercase tracking-wide" style="color: var(--text-muted)">
          Opleidingen &amp; certificaten
        </h3>
        <CertificateList :certificates="data.certificates" />
      </div>
    </div>
  </section>
</template>
