import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, Plugin} from 'vite'
import vue, {Api} from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiPath = env.VITE_API_PATH || '/index.json'

  let plugins: Plugin<Api>[]|[] = [];
  if(env.NODE_ENV === 'production') {
    plugins = [vue()]
  } else {
    plugins = [
        vue(),
        //@ts-ignore
      VitePWA({
      // Auto-refresh the service worker on new deploys instead of leaving
      // visitors stuck on a stale cached build.
      registerType: 'autoUpdate',
      injectRegister: false, // we register manually in main.ts to show an update toast
      manifest: {
        id: '/',
        name: 'Levi Deurloo — Web app developer',
        short_name: 'Levi Deurloo',
        description: "Portfolio van Levi Deurloo, web app developer. Projecten in Vue, Laravel en API's.",
        start_url: '/',
        scope: '/',
        display: 'standalone',
        orientation: 'portrait-primary',
        background_color: '#08090D',
        theme_color: '#08090D',
        lang: 'nl',
        categories: ['portfolio', 'business'],
        icons: [
          {src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any'},
          {src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any'},
          {src: '/icons/icon-maskable-192.png', sizes: '192x192', type: 'image/png', purpose: 'maskable'},
          {src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable'},
        ],
      },
      workbox: {
        // Precache the built app shell; any navigation while offline falls
        // back to the cached index.html since this is a single-page app.
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        navigateFallback: '/index.html',
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {maxEntries: 12, maxAgeSeconds: 60 * 60 * 24 * 365},
            },
          },
          {
            // De portfoliodata (profiel/projecten/ervaring). NetworkFirst:
            // probeer altijd verse data, maar val terug op de laatst
            // gecachte response zodra het endpoint offline of onbereikbaar
            // is. Dekt zowel het huidige /index.json als het latere
            // Laravel-endpoint, zolang het pad via VITE_API_PATH klopt.
            urlPattern: ({url}: { url: URL }) => url.pathname.endsWith(apiPath),
            handler: 'NetworkFirst',
            options: {
              cacheName: 'portfolio-data',
              networkTimeoutSeconds: 4,
              expiration: {maxEntries: 4, maxAgeSeconds: 60 * 60 * 24},
            },
          },
        ],
      },
      devOptions: {
        enabled: true, // laat de service worker ook in `npm run dev` draaien, handig om te testen
      }
    })
    ]
  }

  return {
    plugins,
    build:{
      rolldownOptions:{
        external: [
            'virtual:pwa-register'
        ]
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      port: 5173,
      open: true,
    },
  }
})
