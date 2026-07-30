import type {
  Profile,
  ServiceItem,
  Testimonial,
  PricingTier,
  FunFact,
  Project,
  ExperienceEntry,
  SkillLevel,
  Certificate,
  ContactInfoItem,
  PortfolioData,
} from '@/types'
import { resolveAssetUrl } from '@/utils/assets'

// ---------------------------------------------------------------------------
// Fallback-content: getoond zolang het endpoint nog niet is opgehaald, en
// als het endpoint (tijdelijk) niet bereikbaar is. Rechtstreeks overgenomen
// uit de huidige /index.json, dus dit is geen placeholder-tekst maar een
// werkende momentopname van de echte content.
// ---------------------------------------------------------------------------

export const fallbackProfile: Profile = {
  name: 'Levi Deurloo',
  title: 'Web app developer',
  tagline: 'gedreven door precisie.',
  bioHtml:
    "'Ik ben een developer die van zijn hobby zijn werk heeft mogen maken — en dat zie je terug in hoe ik werk.'<br/><br/>Inmiddels heb ik meerdere jaren ervaring in het bouwen van webapplicaties en maatwerkoplossingen. Ik ben gespecialiseerd in het werken met Vue, Laravel en API's en vind het belangrijk dat techniek en gebruiksvriendelijkheid samenkomen.",
  facts: [
    { label: 'Leeftijd', value: '27 jaar' },
    { label: 'Geboorteland', value: 'Nederland' },
    { label: 'Woonplaats', value: 'Middelburg' },
    { label: 'E-mailadres', value: 'contact@levideurloo.nl' },
    { label: 'Telefoon', value: 'Dien een contactverzoek in' },
  ],
}

export const fallbackServices: ServiceItem[] = [
  {
    id: 'websites-webshops',
    title: 'Websites & webshops',
    description:
      'Het visitekaartje van uw bedrijf, of de plek waar u bezoekers meeneemt in spannende verhalen en blogs. Elke website, standaard of op maat, wordt afgestemd op uw wensen.',
    icon: 'cloud',
  },
  {
    id: 'maatwerk-applicaties',
    title: 'Maatwerk applicaties',
    description:
      'Interessant voor bedrijven, instanties, overheden en hobbyisten. Vaak gebouwd voor processen die nog niet bestaan, of specifiek toegesneden op een bedrijfsproces — een blijvende investering.',
    icon: 'pencil',
  },
  {
    id: 'mobiele-applicaties',
    title: 'Mobiele applicaties',
    description:
      'Gemaakt voor een specifiek probleem of ter verbetering en automatisering van een of meerdere systemen en processen, klaar voor de App Store of Play Store.',
    icon: 'laptop-phone',
  },
  {
    id: 'slimme-oplossingen',
    title: 'Slimme oplossingen',
    description:
      'Diensten die werk uit handen nemen of automatiseren. U ervaart vooral de positieve effecten, en bepaalt zelf in welke werkzaamheden dat gebeurt.',
    icon: 'flag',
  },
]

export const fallbackTestimonials: Testimonial[] = [
  {
    id: 'johan-visser',
    name: 'Johan Visser',
    company: 'PoesPasenSo.',
    quote:
      'Ik ben erg tevreden met de website die je voor mij gemaakt hebt. Ik kan zelf alles aanpassen en je keek kritisch mee naar het resultaat.',
    image: resolveAssetUrl('img/testimonials/no-img.webp'),
  },
  {
    id: 'jaap-van-distelman',
    name: 'Jaap van Distelman',
    company: 'Veilige winkelmomentjes',
    quote:
      'Erg vlot gedaan, onze klanten konden gelijk hun afspraken boeken. Eventuele problemen werden direct opgelost en het systeem was goed te begrijpen voor klanten van jong en oud!',
    image: resolveAssetUrl('img/testimonials/rd.webp'),
  },
]

export const fallbackPricing: PricingTier[] = [
  {
    id: 'losse-inzet',
    title: 'Losse inzet',
    subtitle: 'op aanvraag',
    caption: 'per uur',
    cta: 'Inhuren!',
    link: '/contact',
    primary: false,
  },
  {
    id: 'vaste-prijsafspraak',
    title: 'Vaste prijsafspraak',
    subtitle: 'op aanvraag',
    caption: 'eenmalig',
    cta: 'Offerte aanvragen',
    link: '/contact',
    primary: true,
  },
]

export const fallbackFunFacts: FunFact[] = [
  { id: 'tevreden-klanten', label: 'Tevreden klanten', value: '24', icon: 'heart' },
  { id: 'uren-ervaring', label: 'Uren ervaring', value: '♾', icon: 'alarm' },
  { id: 'it-diplomas', label: "IT Diploma's", value: '2', icon: 'star' },
]

export const fallbackProjects: Project[] = [
  {
    id: '1',
    title: 'KiddoSpots',
    description:
      'Een mobiele applicatie voor ouders die op zoek zijn naar leuke plekken om met hun kinderen een dagje uit te zijn. Te downloaden via de App- of PlayStore.',
    categories: ['all', 'applicatie'],
    image: resolveAssetUrl('img/portfolio/kiddospots.webp'),
  },
  {
    id: '2',
    title: 'Veilig winkelen',
    description:
      'In de lockdown mocht er op afspraak gewinkeld worden. Via de website maakte je gemakkelijk een afspraak, en het personeel kreeg een pushbericht vanuit de bedrijfsapplicatie.',
    categories: ['all', 'website'],
    image: resolveAssetUrl('img/portfolio/timeslots.webp'),
  },
  {
    id: '3',
    title: 'Takeover-personeel',
    description: "Een op maat gemaakt systeem voor een uitzendbureau. Ook beschikbaar voor ZZP'ers om zichzelf beschikbaar te zetten.",
    categories: ['all', 'website'],
    image: resolveAssetUrl('img/portfolio/takeover.webp'),
  },
  {
    id: '4',
    title: 'Invoice Generator',
    description:
      'Gemaakt voor een opdrachtgever met een groot klantenbestand waar vaak facturen worden nagestuurd. Maakt binnen enkele klikken een PDF-factuur van de klantgegevens.',
    categories: ['all', 'applicatie'],
    image: resolveAssetUrl('img/portfolio/igenerator.webp'),
  },
  {
    id: '5',
    title: 'Motify',
    description:
      'Een applicatie voor de Hogeschool Zeeland: studeren in de juiste gemoedstoestand is het meest efficiënt. Stuurt op basis daarvan o.a. Philips Hue-verlichting en speakers aan.',
    categories: ['all', 'applicatie'],
    image: resolveAssetUrl('img/portfolio/motify.webp'),
  },
]

export const fallbackExperience: ExperienceEntry[] = [
  {
    id: 'webnl',
    organisation: 'WebNL Creative Studios',
    role: 'Back-end software ontwikkelaar',
    year: '2023',
    description:
      'Meegewerkt aan de back-end van onder andere jesus.net, visser-visser.nl, finestpetfoods.com en werkenbijhuisman.nl, vanuit een eigen CMS op basis van Laravel en Vue.',
  },
  {
    id: 'deurloo-technologies',
    organisation: 'Deurloo Technologies',
    role: 'Full-stack software ontwikkelaar',
    year: '2019',
    description:
      "Maatwerk applicaties gebouwd voor opstartende bedrijven en bestaande klanten, waaronder KiddoSpots (Laravel API + Vue), een reserveringsapp tijdens de coronaperiode, en een CMS voor klanten om zelf hun website aan te passen.",
  },
  {
    id: 'securancy',
    organisation: 'Securancy Intelligence',
    role: 'Afstudeerstage',
    year: '2017',
    description:
      'Waardevolle platformen ontworpen, gebouwd en geoptimaliseerd die alledaagse problemen en situaties aanpakken.',
  },
  {
    id: 'urban-heroes',
    organisation: 'Urban Heroes',
    role: 'MBO-stage',
    year: '2016',
    description: 'Internetbureau uit Zeeland, gevestigd in Middelburg, actief op de Zeeuwse markt.',
  },
]

export const fallbackSkills: SkillLevel[] = [
  { id: 'javascript', name: 'Javascript', percentage: 90, years: 5 },
  { id: 'typescript', name: 'TypeScript', percentage: 85, years: 4 },
  { id: 'swift', name: 'Swift', percentage: 60, years: 1 },
  { id: 'php', name: 'PHP', percentage: 78, years: 5 },
  { id: 'css', name: 'CSS/SASS/SCSS/Less', percentage: 100, years: 5 },
  { id: 'java-kotlin', name: 'Java/Kotlin', percentage: 65, years: 2 },
  { id: 'vue', name: 'Vue', percentage: 80, years: 4 },
]

export const fallbackKnowledge: string[] = [
  'Laravel',
  'Vue',
  'Symfony',
  'Agile',
  'Digital Design',
  'Social Media',
  'Time Management',
  'Communication',
  'Problem-Solving',
  'Dev-ops',
  'Social Networking',
  'Blockchain Development',
  'Object Oriented Programming',
  'Flexibility',
]

export const fallbackCertificates: Certificate[] = [
  { id: 'hz', title: 'HZ University of applied..', course: 'HBO-ICT', date: '2018 - 2021', logo: resolveAssetUrl('HZ.webp') },
  { id: 'scalda', title: 'Scalda', course: 'Applicatieontwikkelaar', date: '2015 - 2017', logo: resolveAssetUrl('scalda.webp') },
]

export const fallbackContactInfo: ContactInfoItem[] = [
  { id: 'location', text: 'Middelburg', icon: 'map-marker' },
  { id: 'phone', text: '(+31)6 20 21 69 17', icon: 'phone' },
  { id: 'email', text: 'contact@levideurloo.nl', icon: 'envelope' },
  { id: 'availability', text: 'Beschikbaar als Freelancer!', icon: 'checkmark-circle' },
]

export const fallbackPortfolioData: PortfolioData = {
  profile: fallbackProfile,
  services: fallbackServices,
  testimonials: fallbackTestimonials,
  pricing: fallbackPricing,
  funFacts: fallbackFunFacts,
  projects: fallbackProjects,
  experience: fallbackExperience,
  skills: fallbackSkills,
  knowledge: fallbackKnowledge,
  certificates: fallbackCertificates,
  contactInfo: fallbackContactInfo,
}
