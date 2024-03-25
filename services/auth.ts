import type { $Fetch } from 'nitropack';
import type { userData } from '~/types/user.type';
export default {
  async login(
    $fetch: $Fetch,
    { email, password }: { email: string; password: string },
  ) {
    const data = await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    });
    return data;
  },
  async register($fetch: $Fetch, userData: userData) {
    return await $fetch('/api/auth/register', {
      method: 'POST',
      body: {
        user_name: userData.username,
        surname: userData.surname,
        name: userData.name,
        email: userData.email,
        password: userData.password,
        repeat_password: userData.repeatPassword,
        role: 'seller',
      },
    });
  },
};
