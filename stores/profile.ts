import { acceptHMRUpdate, defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', () => {
  const favorites = ref<string[]>([]);
  const profile = ref<Profile>();
  interface changePassword {
    oldPassord: string;
    newPassword: string;
    repeatPassword: string;
  }

  interface EditProfile {
    avatar?: string;
    name?: string;
    email?: string;
    user_name?: string;
    phone_number?: string;
    slogan?: string;
    gender?: string;
    country?: string;
    city?: string;
    about_me?: string;
  }

  async function editProfile(form: EditProfile) {
    const { data, error } = await apiFetch<ApiResponse<Profile>>(
      `/api/users/me/`,
      {
        options: {
          method: 'PUT',
          body: form,
        },
        needToken: true,
      },
    );
    if (data.value && !error.value) {
      const value = data.value;
      useToast({
        message: 'Данные успешно сохранены',
        type: 'success',
      });
      return value;
    } else {
      useToast({
        message: 'Ошибка при сохранении',
        type: 'error',
      });
    }
  }

  async function updateAvatar(filename: string) {
    const { data, error } = await apiFetch<ApiResponse<Profile>>(
      `/api/users/me/`,
      {
        options: {
          method: 'PUT',
          body: { avatar: filename },
        },
        needToken: true,
      },
    );
    if (data.value && !error.value) {
      const value = data.value;
      return value;
    }
  }

  async function changePassword(form: changePassword) {
    const { data, error } = await apiFetch<ApiResponse<any>>(
      `/api/users/change_password`,
      {
        options: {
          method: 'PUT',
          body: form,
        },
        needToken: true,
      },
    );
    if (data.value && !error.value) {
      const value = data.value;
      useToast({
        message: 'Новый пароль успешно сохранен',
        type: 'success',
      });
      return value;
    } else {
      useToast({
        message: 'Ошибка при сохранении',
        type: 'error',
      });
    }
  }

  // getFavorites();
  return {
    favorites,
    changePassword,
    editProfile,
    updateAvatar,
    profile,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}
