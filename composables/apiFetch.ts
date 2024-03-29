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
  if (needToken) {
    console.log('endpoint = ', endpoint, 'needToken = ', needToken);
    const token = useCookie('authToken');
    console.log('options = ', options);
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
    watch: ignore && false,
    ...options,
  });
  stopLoading();
  return { data, error } as {
    data: Ref<T | null | undefined>;
    error: Ref<FetchError | null>;
  };
}
