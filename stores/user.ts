import { useProtectedApi } from '../composables/useProtectedApi';
import type { User } from './../stores/catalog/catalog.type';

export const useUserStore = defineStore('user', () => {
  const apiFetch = useProtectedApi();
  const user = ref<User>();

  async function getMyUser() {
    try {
      const { result } = await apiFetch<{ result: User; status: number }>(
        `/api/users/me`,
      );
      user.value = result;
      return result;
    } catch (error) {
      console.error('Пользователь не авторизован');
      throw error;
    }
  }

  return {
    getMyUser,
    user,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
