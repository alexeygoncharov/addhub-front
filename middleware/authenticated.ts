export default defineNuxtRouteMiddleware((from) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    return navigateTo('/login?from=' + from.path);
  }
});
