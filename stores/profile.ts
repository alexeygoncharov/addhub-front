import { acceptHMRUpdate, defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', () => {
  const favorites = ref<string[]>([]);
  const profile = ref<Profile>();
  async function editProfile(formData: FormData) {
    const { data } = await apiFetch<ApiResponse<Profile>>(`/api/users/me/`, {
      options: {
        method: 'PUT',
        body: {
          formData,
        },
      },
      needToken: true,
    });
    const value = data.value;
    if (value) {
      profile.value = value.result;
    }
  }
  // getFavorites();
  return {
    favorites,
    editProfile,
    profile,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}
