<script setup lang="ts">
import AuroraBackground from '@/components/AuroraBackground.vue'
import NavRail from '@/components/NavRail.vue'
import LoadingBar from '@/components/LoadingBar.vue'
import HeroSection from '@/sections/HeroSection.vue'
import AboutSection from '@/sections/AboutSection.vue'
import ProjectsSection from '@/sections/ProjectsSection.vue'
import ExperienceSection from '@/sections/ExperienceSection.vue'
import ContactSection from '@/sections/ContactSection.vue'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { usePortfolioData } from '@/composables/usePortfolioData'
import type { NavItem } from '@/types'
import PwaUpdateToast from "@/components/PwaUpdateToast.vue";

const isProd = import.meta.env.NODE_ENV === 'production';

const navItems: NavItem[] = [
  { id: 'home', label: 'Voorpagina', icon: 'home' },
  { id: 'about', label: 'Over mij', icon: 'user' },
  { id: 'experience', label: 'Ervaringen en opleidingen', icon: 'graduation' },
  { id: 'portfolio', label: 'Mijn portfolio', icon: 'briefcase' },
  { id: 'contact', label: 'Contact opnemen', icon: 'mail' },
]

const { activeId } = useScrollSpy(navItems.map((item) => item.id))
const { data } = usePortfolioData()
</script>

<template>
  <a href="#main-content" class="skip-link">Naar boven</a>
  <LoadingBar />

  <AuroraBackground />
  <NavRail :items="navItems" :active-id="activeId" />
  <PwaUpdateToast v-if="isProd"/>

  <main id="main-content" class="relative">
    <HeroSection />
    <AboutSection />
    <ExperienceSection />
    <ProjectsSection />
    <ContactSection />
  </main>

  <footer class="px-6 pb-28 pt-4 text-center text-xs sm:px-10 lg:px-24 lg:pb-10" style="color: var(--text-muted)">
    © {{ new Date().getFullYear() }} {{ data.profile.name }} — Alle rechten voorbehouden.
  </footer>
</template>
