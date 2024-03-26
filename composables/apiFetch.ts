import type { UseFetchOptions } from '#app';
type apiFetchParams<T> = {
  handler?: (data: T | null) => void;
  options?: UseFetchOptions<T>;
  needToken?: boolean;
};

export default async function <T>(
  endpoint: string,
  { handler, options, needToken }: apiFetchParams<T>,
) {
  if (needToken && process.client) {
    const token = localStorage.getItem('token');
    if (token && options) {
      options.headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
      };
    }
  }
  const baseUrl = useRuntimeConfig().public.apiBase;
  const key =
    endpoint + ((options?.query && JSON.stringify(options?.query)) || '');
  handler && !options?.method && handler(useNuxtData<T>(key).data.value);
  clearNuxtData(key);
  await useFetch(endpoint, {
    key,
    baseURL: baseUrl,
    onResponse({ response }) {
      handler && handler(response._data);
    },
    ...options,
  });
}
