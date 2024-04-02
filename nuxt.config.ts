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
    // '@nuxtjs/sitemap',
    // '@nuxtjs/robots',
  ],
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
    '/services': { redirect: '/services/all' },
  },
});
