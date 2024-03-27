import type { NitroFetchOptions } from 'nitropack';
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  nuxtApp.provide(
    'fetch',
    (url: string, options) => {
      const token = localStorage.getItem('authToken');
      console.log('token = ', token)
      if (token) {
          console.log('options = ',options, 'url = ', url)
      }
      return $fetch(baseUrl + url, options);
    },
  );
});
