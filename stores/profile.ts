import { acceptHMRUpdate, defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', () => {
  const favorites = ref<string[]>([]);
  const profile = ref<Profile>();
  interface UpdateEmail {
    new_email: string;
  }

  interface EditProfile {
    avatar?: uploadFileResponse;
    name?: string;
    email?: string;
    user_name?: string;
    phone_number?: string;
    slogan?: string;
    gender?: string;
    address?: {
      city?: string;
      country?: string;
    };
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

  async function updateAvatar(file: uploadFileResponse) {
    const { data, error } = await apiFetch<ApiResponse<Profile>>(
      `/api/users/me/`,
      {
        options: {
          method: 'PUT',
          body: { avatar: file },
        },
        needToken: true,
      },
    );
    if (data.value && !error.value) {
      const value = data.value;
      return value;
    }
  }

  async function updateEmail(form: UpdateEmail) {
    const { data, error } = await apiFetch<ApiResponse<any>>(
      `/api/users/update_email`,
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
      console.log(error);
      useToast({
        message: error.value?.data?.message,
        type: 'error',
      });
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
    updateEmail,
    profile,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProfileStore, import.meta.hot));
}
