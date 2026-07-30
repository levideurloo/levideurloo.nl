import type { Project } from '@/types'

// TODO: vervang dit door je eigen projecten. Dit zijn voorbeelden zodat de
// layout gevuld is — url/repoUrl zijn optioneel.
export const projects: Project[] = [
  {
    id: 'project-een',
    title: 'Voorbeeldproject — vul je titel in',
    description:
      'Korte, concrete omschrijving: welk probleem loste dit op, en wat was jouw rol daarin? Twee tot drie zinnen is genoeg.',
    tags: ['Vue 3', 'Laravel', 'REST API'],
    role: 'Full-stack developer',
    year: '2026',
    url: '',
    repoUrl: '',
  },
  {
    id: 'project-twee',
    title: 'Nog een project',
    description:
      'Beschrijf hier de context, de technische uitdaging en het resultaat. Cijfers of concrete impact maken dit sterker.',
    tags: ['TypeScript', 'Tailwind', 'PostgreSQL'],
    role: 'Web app developer',
    year: '2025',
    url: '',
    repoUrl: '',
  },
  {
    id: 'project-drie',
    title: 'Derde project',
    description:
      'Elk kaartje mag een ander accent krijgen: een live link, een broncode-link, of gewoon een korte case-omschrijving.',
    tags: ['Vue Router', 'Pinia', 'API-integraties'],
    role: 'Developer',
    year: '2025',
    url: '',
    repoUrl: '',
  },
]
