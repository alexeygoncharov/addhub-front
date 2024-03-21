import { jwtDecode } from 'jwt-decode';
import authService from '~/services/auth';

interface userData {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  role: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null) as Ref<string | null>;
  const isLoading = ref(true);
  const isAuthenticated = computed(() => !!token.value);

  async function login(email: string, password: string, rememberMe: boolean) {
    try {
      const data = await authService.login(useNuxtApp().$fetch, {
        email,
        password,
      });
      // console.log(data);

      saveToken(data.result, rememberMe);
      // console.log('Вход прошёл успешно');
    } catch (error) {
      console.error('Ошибка при входе в систему');
      throw error;
    }
  }

  async function register(userData: userData) {
    try {
      await authService.register(useNuxtApp().$fetch, userData);
      // console.log('Регистрация прошла успешно');
    } catch (error) {
      // console.error('Ошибка при регистрации');
    }
  }

  function logout() {
    token.value = null;
    localStorage.removeItem('authToken');
    sessionStorage.removeItem('authToken');
  }

  function saveToken(tokenArg: string, rememberMe: boolean) {
    token.value = tokenArg;
    if (rememberMe) {
      localStorage.setItem('authToken', tokenArg);
    } else {
      sessionStorage.setItem('authToken', tokenArg);
    }
  }

  function loadToken() {
    if (process.client) {
      const tokenValue =
        localStorage.getItem('authToken') ||
        sessionStorage.getItem('authToken');
      if (tokenValue && isTokenValid(tokenValue)) {
        token.value = tokenValue;
      }
      isLoading.value = false;
    }
  }

  function isTokenValid(token: string) {
    if (!token) return false;

    try {
      const decoded = jwtDecode(token);
      const now = Date.now().valueOf() / 1000;
      if (!decoded.exp || decoded.exp < now) {
        // console.log(`Токен истек`);
        return false;
      }

      if (decoded.nbf && decoded.nbf > now) {
        // console.log(`Токен еще не активен`);
        return false;
      }
    } catch (error) {
      // console.error(`Ошибка при декодировании токена: ${error}`);
      return false;
    }

    return true;
  }

  return {
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    saveToken,
    loadToken,
    isTokenValid,
  };
});
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}
