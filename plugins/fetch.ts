import type { NitroFetchOptions } from 'nitropack';
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.apiBase;
  nuxtApp.provide(
    'fetch',
    (url: string, options: NitroFetchOptions<string>) => {
      const token = localStorage.getItem('token');
      if (token) {
        options.headers = {
          ...(options.headers || {}),
          Authorization: `Bearer ${token}`,
        };
      }
      return $fetch(baseUrl + url, options);
    },
  );
});
