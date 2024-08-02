// plugins/auth-sync.ts

export default defineNuxtPlugin(() => {
    const authStore = useAuthStore();
    const route = useRoute();
  
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key !== 'isAuth') return;
  
      const isAuthenticated = event.newValue === 'true';
  
      if (isAuthenticated) {
        authStore.loadToken();
  

        const redirectPath = route.query.from as string;
        navigateTo(redirectPath || '/');
      } else {
        authStore.logout();
      }
    };
  
    if (process.client) {
      window.addEventListener('storage', handleStorageChange);
    }
  });
  