import type { apiFetch } from '#imports';

import type { userData } from '~/types/user.type';

export default {
  async login<T>(
    thisFetch: typeof apiFetch,
    { email, password }: { email: string; password: string },
  ): Promise<ApiResponse<T> | undefined> {
    const data = await thisFetch<ApiResponse<T>>('/api/auth/login', {
      options: { method: 'POST', body: { email, password } },
    });
    const value = data.value;
    if (value) {
      return value;
    }
  },
  async register(
    thisFetch: typeof apiFetch,
    userData: userData,
  ): Promise<ApiResponse<undefined> | undefined> {
    const data = await thisFetch<ApiResponse<undefined>>('/api/auth/register', {
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
    });
    const value = data.value;
    if (value) {
      return value;
    }
  },
};
