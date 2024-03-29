import type { UseFetchOptions } from '#app';
import type { FetchError } from 'ofetch';
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
    const token = localStorage.getItem('authToken');
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
  return { data, error } as {
    data: Ref<T | null | undefined>;
    error: Ref<FetchError | null>;
  };
}
