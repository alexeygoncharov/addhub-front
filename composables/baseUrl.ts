export default function () {
  const baseUrl = useRuntimeConfig().public.apiBase;
  return baseUrl + '/';
}
