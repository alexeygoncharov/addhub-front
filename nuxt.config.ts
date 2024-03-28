// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  app: {
    head: {
      script: [{ src: '/scripts/01_main.js', type: 'module' }], // убрать
    },
  },
  modules: [
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    '@pinia/nuxt',
    '@nuxt/image',
    '@vee-validate/nuxt',
    'nuxt-swiper',
  ],
  css: ['~/assets/styles/style.scss'],
  runtimeConfig: {
    public: {
      apiBase: 'https://hub.rdcd.ru',
    },
  },
  plugins: [
    '~/plugins/fetch.ts',
    '~/plugins/toast.ts',
    '~/plugins/auth-init.ts',
  ],
  typescript: {
    strict: true,
  },
});
