import { jwtDecode } from 'jwt-decode';

interface userData {
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  repeatPassword: string;
  role: string;
}
interface regResponse {
  email: string;
  roles: string[];
  accessToken: string;
  activeRole: string;
  _id: string;
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null) as Ref<string | null>;
  const isLoading = ref(false);
  const isAuthenticated = computed(() => !!useCookie('authToken').value);
  async function login(email: string, password: string, rememberMe: boolean) {
    const { data, error } = await apiFetch<ApiResponse<string>>(
      '/api/auth/login',
      {
        options: { method: 'POST', body: { email, password } },
      },
    );
    const value = data.value;
    if (value && !error.value) {
      saveToken(value.result, rememberMe);
      return 'success';
    } else if (error.value?.statusCode === 500) {
      useToast({ message: 'Неверный логин или пароль', type: 'error' });
    } else {
      useToast({ message: 'Непредвиденная ошибка', type: 'error' });
    }
  }

  async function register(userData: userData) {
    const { data, error } = await apiFetch<ApiResponse<regResponse>>(
      '/api/auth/register',
      {
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
      },
    );
    const value = data.value;
    if (value && !error.value) {
      saveToken(value.result.accessToken, true);
      return value;
    }
    if (error.value) {
      if (error.value.data.message === 'Email already exists') {
        return useToast({
          message: 'Пользователь с таким email уже существует',
          type: 'error',
        });
      } else if (error.value.data.message === 'User name already exists') {
        return useToast({
          message: 'Пользователь с таким логином уже существует',
          type: 'error',
        });
      }
      useToast({
        message: 'Непредвиденная ошибка ' + error.value.data.message,
        type: 'error',
      });
    }
  }

  function logout() {
    token.value = null;
    useCookie('authToken').value = null;
    useSessionStorage('authToken', '').value = null;
    const userStore = useUserStore();
    userStore.user = undefined;
  }

  async function saveToken(tokenArg: string, rememberMe: boolean) {
    token.value = tokenArg;
    if (rememberMe) {
      useCookie('authToken', {
        maxAge: 60 * 60 * 24 * 7,
      }).value = tokenArg;
    } else {
      useSessionStorage('authToken', '').value = tokenArg;
    }
    await nextTick();
    const authStore = useAuthStore();
    const userStore = useUserStore();
    authStore.loadToken();
    if (authStore.token) {
      userStore.getMyUser();
    }
  }

  function loadToken() {
    const tokenValue = useCookie('authToken');
    if (tokenValue.value && isTokenValid(tokenValue)) {
      token.value = tokenValue.value;
    }
    isLoading.value = false;
  }

  function isTokenValid(token: Ref<string | null | undefined>) {
    if (!token.value) return false;

    try {
      const decoded = jwtDecode(token.value);
      const now = Date.now().valueOf() / 1000;
      if (!decoded.exp || decoded.exp < now) {
        // console.log(`Токен истек`);
        token.value = null;
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
