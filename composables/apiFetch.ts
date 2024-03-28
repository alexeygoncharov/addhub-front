import type { UseFetchOptions } from '#app';
type apiFetchParams<T> = {
  options?: UseFetchOptions<T>;
  needToken?: boolean;
};

export default async function <T>(
  endpoint: string,
  { options, needToken }: apiFetchParams<T> | undefined = {},
  ignore?: boolean,
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
  startLoading();
  const { data, error } = await useFetch(endpoint, {
    key,
    baseURL: baseUrl,
    watch: ignore && false,
    ...options,
  });
  stopLoading();
  return data as Ref<T>;
}
