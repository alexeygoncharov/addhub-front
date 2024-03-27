import { useApi } from '#imports';

export const useUserStore = defineStore('user', () => {
  const apiFetch = useApi();
  const user = ref(null)

  async function getMyUser() {
    try {
      const { result } = await apiFetch<{ result: any; status: any }>(
        `/api/users/me`,
      );
      user.value = result
      return result;
    } catch (error) {
      console.error('Пользователь не авторизован');
      throw error;
    }
  }

  return {
    getMyUser,
    user
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
