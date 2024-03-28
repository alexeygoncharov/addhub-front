import { useProtectedApi } from '../composables/useProtectedApi';
import type { User } from './../stores/catalog/catalog.type';

export const useUserStore = defineStore('user', () => {
  const favorites = ref<string[]>([]);
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

  const getFavorites = () => {
    if (process.client) {
      const data = localStorage.getItem('favorites');
      if (!data) return;
      favorites.value = JSON.parse(data);
    }
  };
  const toggleFavorite = (id: string) => {
    if (!process.client) return;
    const index = favorites.value.indexOf(id);
    if (index > -1) {
      favorites.value.splice(index, 1);
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    } else {
      favorites.value.push(id);
      localStorage.setItem('favorites', JSON.stringify(favorites.value));
    }
  };
  // getFavorites();
  return { favorites, toggleFavorite, getFavorites, getMyUser, user };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
