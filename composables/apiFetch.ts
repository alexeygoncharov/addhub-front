import type { UseFetchOptions } from '#app';
import type { FetchError } from 'ofetch';
type apiFetchParams<T> = {
  options?: UseFetchOptions<T>;
  needToken?: boolean;
};

export default async function <T>(
  endpoint: string,
  { options, needToken }: apiFetchParams<T> | undefined = {},
) {
  if (needToken) {
    const token = useCookie('authToken');
    if (token && options) {
      options.headers = {
        ...(options.headers || {}),
        Authorization: `Bearer ${token.value}`,
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
    watch: false,
    ...options,
  });
  stopLoading();
  return { data, error } as {
    data: Ref<T | null | undefined>;
    error: Ref<FetchError | null>;
  };
}
