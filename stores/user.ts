import { acceptHMRUpdate, defineStore } from 'pinia';
import { useProtectedApi } from '../composables/useProtectedApi';
import type { Bid, User } from './../stores/catalog/catalog.type';

export const useUserStore = defineStore('user', () => {
  const favorites = ref<string[]>([]);
  const user = ref<User>();
  const myBid = ref<Bid>();

  async function getMyUser() {
    const { data } = await apiFetch<ApiResponse<User>>(`/api/users/me/`, {
      options: {},
      needToken: true,
    });
    const value = data.value;
    if (value) {
      user.value = value.result;
    }
    return user.value;
  }

  /// Добавить запрос в отлик
  async function getMyBid(id: string) {
    const { data } = await apiFetch<ApiResponse<Bid>>(
      `/api/users/my_bid/${id}`,
      {
        options: {},
        needToken: true,
      },
    );
    const value = data.value;
    if (value) {
      myBid.value = value.result;
    }
    return myBid.value;
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
  return { favorites, toggleFavorite, getFavorites, getMyUser, user, getMyBid };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
