import { acceptHMRUpdate, defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', () => {
  const favorites = ref<string[]>([]);
  const profile = ref<Profile>();
  interface changePassword {
    oldPassord: string;
    newPassword: string;
    repeatPassword: string;
  }

  async function editProfile(formData: FormData) {
    const { data } = await apiFetch<ApiResponse<Profile>>(`/api/users/me/`, {
      options: {
        method: 'PUT',
        body: formData,
      },
      needToken: true,
    });
    const value = data.value;
    if (value) {
      profile.value = value.result;
    }
  }

  async function changePassword(form: changePassword) {
    const { data } = await apiFetch<ApiResponse<any>>(
      `/api/users/change_password`,
      {
        options: {
          method: 'PUT',
          body: form,
        },
        needToken: true,
      },
    );
    const value = data.value;
  }

  // getFavorites();
  return {
    favorites,
    changePassword,
    editProfile,
    profile,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}
