import type { apiFetch } from '#imports';

import type { userData } from '~/types/user.type';

export default {
  login<T>(
    thisFetch: typeof apiFetch,
    { email, password }: { email: string; password: string },
  ): Promise<ApiResponse<T>> {
    return new Promise((resolve) => {
      thisFetch<ApiResponse<T>>('/api/auth/login', {
        options: { method: 'POST', body: { email, password } },
        handler: (data) => {
          if (data) resolve(data);
        },
      });
    });
  },
  register(
    thisFetch: typeof apiFetch,
    userData: userData,
  ): Promise<ApiResponse<undefined>> {
    return new Promise((resolve) => {
      thisFetch<ApiResponse<undefined>>('/api/auth/register', {
        options: {
          method: 'POST',
          body: {
            user_name: userData.username,
            surname: userData.surname,
            name: userData.name,
            email: userData.email,
            password: userData.password,
            repeat_password: userData.repeatPassword,
            role: userData.role,
          },
        },
        handler: (data) => {
          if (data) resolve(data);
        },
      });
    });
  },
};
