// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  // app: {
  //   head: {
  //     script: [{ src: '/scripts/01_main.js', type: 'module' }], // убрать
  //   },
  // },
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
    storesDirs: ['stores'],
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vee-validate/nuxt',
    'nuxt-swiper',
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
});
