// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  app: {
    head: {
      htmlAttrs: { 'data-theme': 'dark' },
      title: 'Apartments With A Pool | Casa Bamboo | Croatia',
      meta: [
        { name: 'description', content: 'Casa Bamboo Apartments are in the southern part of Istria, with a pool, garden, and barbecue, in a quiet area (sea 5 m).' },
        { property: 'og:title', content: 'Apartments With A Pool | Casa Bamboo | Croatia' },
        { property: 'og:description', content: 'Casa Bamboo Apartments are in the southern part of Istria, with a pool, garden, and barbecue, in a quiet area (sea 5 m).' },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&display=swap' },
      ],
    },
  },
  css: ['~/assets/css/main.css'],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
})
