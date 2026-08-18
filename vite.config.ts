import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, Plugin} from 'vite'
import vue, {Api} from '@vitejs/plugin-vue'
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '')
  const apiPath = env.VITE_API_PATH || '/index.json'

  return {
    plugins:[
      vue(),
      //@ts-ignore
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: false,
        manifest: {
          id: '/',
          name: 'Levi Deurloo — Web app developer',
          short_name: 'Levi Deurloo',
          description: "Portfolio van Levi Deurloo, web app developer. Projecten in Vue, Laravel en API's.",
          start_url: 'https://levideurloo.nl/',
          scope: 'https://levideurloo.nl/',
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
        workbox:{
          globPatterns: ['**/*.{js,css,html,svg,png,woff2,webp}'],

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
          enabled: true
        }
      })
    ],
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
