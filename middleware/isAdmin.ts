export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();
  if (
    userStore.user?.active_role !== 'moderator' &&
    userStore.user?.active_role !== 'admin'
  ) {
    return navigateTo('/login?from=' + from.path);
  }
});
