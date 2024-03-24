export const useUserStore = defineStore('user', () => {
  const favorites = ref<string[]>([]);

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
  return { favorites, toggleFavorite, getFavorites };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot));
}
