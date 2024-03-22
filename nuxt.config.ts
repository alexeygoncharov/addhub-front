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
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/global.scss";',
        },
      },
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
  css: ['~/assets/style/style.scss'],
  runtimeConfig: {
    public: {
      apiBase: process.env.BASE_URL,
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
