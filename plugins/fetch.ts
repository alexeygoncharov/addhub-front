import type { NitroFetchOptions } from 'nitropack';
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  nuxtApp.provide(
    'fetch',
    (url: string, options: NitroFetchOptions<string>) => {
      const token = localStorage.getItem('authToken');
      if (token) {
        //  console.log('options = ',options, 'url = ', url)
        //          options.headers = {
        //  ...(options.headers || {}),
        //  Authorization: `Bearer ${token}`,
        //};
      }
      return $fetch(baseUrl + url, options);
    },
  );
});
