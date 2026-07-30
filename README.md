# Levi Deurloo — Portfolio (v2)

Nieuwe versie van [levideurloo.nl](https://levideurloo.nl), gebouwd met Vue 3, Vite,
TypeScript, Tailwind CSS en SCSS. Aurora-thema (teal → violet → magenta) met een
dark- en light-modus, geïnspireerd op de bestaande site maar rustiger en
professioneler uitgewerkt.

## Snel starten

```bash
npm install
npm run dev
```

Open daarna `http://localhost:5173`.

## Build voor productie

```bash
npm run build
npm run preview   # lokaal de productiebuild bekijken
```

De output komt in `dist/` — dat kun je uploaden naar je hosting.

## Projectstructuur

```
src/
├── assets/scss/       Design tokens, thema (dark/light), aurora-animatie
├── components/        Herbruikbare UI (NavRail, ProjectCard, ThemeToggle, …)
├── sections/           De vijf pagina-secties (Home, Over mij, Portfolio, …)
├── composables/        useTheme, useScrollSpy, usePortfolioData (data-fetching)
├── services/            portfolioApi.ts — fetch + normalisatie van /index.json
├── data/                projects.ts en experience.ts — fallback-/seeddata,
│                        gebruikt zolang het endpoint niet reageert
└── types/               Gedeelde TypeScript-types
```

## PWA (installeerbaar + offline)

De site is een volwaardige PWA via `vite-plugin-pwa`:

- **Installeerbaar** — "Toevoegen aan beginscherm" op mobiel, of het install-icoon in de adresbalk op desktop (Chrome/Edge). Manifest en iconen staan in `public/icons/` en worden geconfigureerd in `vite.config.ts`.
- **Offline-proof** — de service worker cachet de volledige app-shell bij het eerste bezoek; daarna werkt de site (inclusief navigatie tussen secties) ook zonder internetverbinding.
- **Automatische updates** — bij een nieuwe build verschijnt een klein "Nieuwe versie beschikbaar"-toastje onderin (`PwaUpdateToast.vue`) in plaats van dat bezoekers vastzitten op een verouderde cache.
- **Iconen** — gegenereerd met `public/icons/generate_icons.py` (Pillow), inclusief maskable-varianten met correcte safe-zone. Wil je een eigen logo/avatar gebruiken in plaats van het "LD"-monogram, vervang dan `icon-source.svg` en de PNG's in `public/icons/`, of pas het script aan.
- **Testen:** `npm run build && npm run preview` — installatie en offline-gedrag werken alleen in een productiebuild (of met `devOptions.enabled` in dev, al staat dat al aan in `vite.config.ts`).

> Let op: als je later een custom domein/HTTPS gebruikt, is dat een vereiste voor service workers (localhost werkt altijd, ook zonder HTTPS).

## Databron (index.json → later Laravel API)

De content (profiel, projecten, ervaring) komt niet meer uit statische bestanden, maar wordt live opgehaald:

- **Nu:** `https://levideurloo.nl/index.json` (of relatief `/index.json` als de nieuwe site op hetzelfde domein draait — de standaardinstelling).
- **Later:** een Laravel REST API-endpoint. Pas dan alleen `.env` aan (zie `.env.example`):
  ```
  VITE_API_BASE_URL=https://api.levideurloo.nl
  VITE_API_PATH=/api/portfolio
  ```
  Geeft die endpoint andere veldnamen terug? Pas dan **alleen** de normalize-functies in `src/services/portfolioApi.ts` aan — components blijven ongewijzigd, die kennen alleen de nette interne types uit `src/types/index.ts`.

**Hoe dit efficiënt blijft:**
- `src/composables/usePortfolioData.ts` houdt de data in module-level state: ongeacht hoeveel secties de composable aanroepen, er wordt maar **één** netwerkverzoek per paginabezoek gedaan.
- **Stale-while-revalidate:** het laatste resultaat wordt in `localStorage` gecachet. Bij een herbezoek verschijnt de pagina meteen (uit cache), terwijl er op de achtergrond stilletjes ververst wordt — geen laadspinner die de content blokkeert.
- **Nooit een lege pagina:** zolang er nog niets is opgehaald (of het endpoint faalt), toont de site de data uit `src/data/*.ts` als fallback. Die bestanden zijn dus niet meer de "echte" content, maar het vangnet.
- **Offline:** de service worker (zie hieronder, PWA) cachet ook de API-response zelf (`NetworkFirst`), dus een terugkerende bezoeker ziet altijd iets zinnigs, ook zonder verbinding.
- Een dunne, altijd-zichtbare voortgangsbalk bovenin (`LoadingBar.vue`) laat zien wanneer er op de achtergrond ververst wordt, zonder de layout te verschuiven.

> **CORS:** als je tijdens ontwikkeling met een cross-origin `VITE_API_BASE_URL` werkt (bijv. lokaal draaien tegen de live site), moet die server CORS-headers voor jouw origin toestaan. Draait alles straks op hetzelfde domein (zoals bij de Laravel-migratie te verwachten is), dan speelt dit niet.

## Wat aan te passen

1. **`/index.json` zelf (of straks de Laravel-API)** — dit is nu de bron van
   waarheid voor profiel, projecten en ervaring. Controleer of de
   veldnamen matchen met wat `src/services/portfolioApi.ts` verwacht (zie
   `RawPortfolioResponse` in `src/types/index.ts`); zo niet, pas de
   normalize-functies aan.
2. **`src/data/projects.ts`** en **`src/data/experience.ts`** — dit is nu
   uitsluitend fallback-/seeddata (getoond als het endpoint niet
   bereikbaar is). Zet er gerust representatieve inhoud in, maar dit is
   niet meer wat bezoekers standaard te zien krijgen.
3. **`src/sections/ContactSection.vue`** — het formulier toont nu alleen een
   lokale bevestiging. Koppel `handleSubmit` aan een echt endpoint (bijv. een
   Laravel API-route, Formspree, of een e-maildienst) zodat berichten ook
   daadwerkelijk aankomen.
4. **Avatar** — in de hero staat nu een monogram op basis van `profile.name`
   in plaats van een foto. Vervang dit gerust door een eigen portretfoto in
   `HeroSection.vue`.

## Thema-systeem

- Kleuren en typografie staan als tokens in `src/assets/scss/_theme.scss`
  (CSS custom properties) en `tailwind.config.ts`.
- `useTheme()` (in `src/composables/useTheme.ts`) regelt dark/light: onthoudt
  de keuze in `localStorage` en volgt anders de systeeminstelling.
- Een inline script in `index.html` zet het thema al vóór de Vue-app laadt,
  zodat er geen flits van het verkeerde thema is.

## Techniek

- **Vue 3** (`<script setup>`, Composition API)
- **Vite** als build-tool
- **TypeScript** (strict mode)
- **Tailwind CSS** voor utility-classes, **SCSS** voor tokens/thema/animaties
- Geen extra state-library nodig — thema-state leeft in een module-level
  `ref()` in de composable
- Fonts: Space Grotesk (display), Inter (body), JetBrains Mono (labels/tags),
  geladen via Google Fonts in `index.html`
