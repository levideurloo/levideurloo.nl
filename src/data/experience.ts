import type { ExperienceEntry, AboutFact } from '@/types'

// TODO: vul aan met je eigen werkervaring en opleidingen, chronologisch
// (nieuwste bovenaan werkt het prettigst voor een tijdlijn).
export const experience: ExperienceEntry[] = [
  {
    id: 'werk-1',
    type: 'work',
    title: 'Web app developer',
    organisation: 'Naam werkgever',
    period: '2023 — heden',
    description: 'Ontwikkeling van webapplicaties met Vue en Laravel, van API-ontwerp tot een afgeronde, gebruiksvriendelijke interface.',
    role: "",
    year: ""
  },
  {
    id: 'opleiding-1',
    type: 'education',
    title: 'Naam opleiding',
    organisation: 'Naam onderwijsinstelling',
    period: '2019 — 2023',
    description: 'Korte omschrijving van de opleiding en relevante specialisatie of afstudeerrichting.',
  },
]

export const aboutFacts: AboutFact[] = [
  { label: 'Leeftijd', value: '27 jaar' },
  { label: 'Geboorteland', value: 'Nederland' },
  { label: 'Woonplaats', value: 'Middelburg' },
  { label: 'E-mailadres', value: 'contact@levideurloo.nl' },
]
