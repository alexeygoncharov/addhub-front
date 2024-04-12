export default defineNuxtRouteMiddleware(() => {
  const authStore = useAuthStore();
  if (authStore.isAuthenticated) {
    const route = useRoute();
    const from = route.query.from as string;
    return navigateTo(from || '/');
  }
});
