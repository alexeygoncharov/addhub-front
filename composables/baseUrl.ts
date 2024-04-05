export default function () {
  const baseUrl = useRuntimeConfig().public.apiBase;
  return baseUrl + '/';
}

export function getPublicMedia(filename: string) {
  const baseUrl = useRuntimeConfig().public.apiBase;
  const publicUrl = `${baseUrl}${filename}`;
  return publicUrl;
}

export function getAvatarUrl(name?: string) {
  if (name) return getPublicMedia(name.replace('/files', 'files'));
}
