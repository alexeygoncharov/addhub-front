// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/global.scss";',
        },
      },
    },
  },
  pinia: {
    storesDirs: ['stores/**/*'],
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vee-validate/nuxt',
    'nuxt-swiper',
    '@vueuse/nuxt',
    'dayjs-nuxt',
    // '@nuxtjs/sitemap',
    // '@nuxtjs/robots',
  ],
  dayjs: {
    defaultLocale: 'ru',
    locales: ['ru'],
    plugins: ['relativeTime'],
  },
  css: ['~/assets/style/style.scss'],
  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_URL,
    },
  },
  typescript: {
    strict: true,
  },
  routeRules: {
    '/projects': { redirect: '/projects/all' },
    // '/profile/messages': { ssr: false },
    '/services': { redirect: '/services/all' },
    '/profile': { redirect: '/profile/bids' },
    '/admin': { redirect: '/admin/orders' },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
    },
  },
});
