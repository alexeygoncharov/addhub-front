import { acceptHMRUpdate, defineStore } from 'pinia';
import type { User } from './../stores/catalog/catalog.type';

export const useUserStore = defineStore('user', () => {
  const favorites = ref<{ id: string; type: 'project' | 'service' }[]>([]);
  const user = ref<Profile>();
  const myBid = ref<Bid>();
  const selectedCurrency = ref(useCookie('selectedCurrency').value || 'RUB');
  watch(selectedCurrency, () => {
    useCookie('selectedCurrency').value = selectedCurrency.value;
  });
  async function getMyUser() {
    const { data } = await apiFetch<ApiResponse<Profile>>(`/api/users/me/`, {
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
    const data = useCookie<typeof favorites.value>('favorites');
    if (!data.value) return;

    favorites.value = data.value;
  };
  const toggleFavorite = (id: string, type: 'project' | 'service') => {
    const index = favorites.value.map((el) => el.id).indexOf(id);
    const favoritesStorage = useCookie<typeof favorites.value>('favorites');
    if (index > -1) {
      favorites.value.splice(index, 1);
      favoritesStorage.value = favorites.value;
    } else {
      favorites.value.push({ id, type });
      favoritesStorage.value = favorites.value;
    }
  };
  // getFavorites();
  return {
    favorites,
    toggleFavorite,
    getFavorites,
    getMyUser,
    user,
    getMyBid,
    selectedCurrency,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
