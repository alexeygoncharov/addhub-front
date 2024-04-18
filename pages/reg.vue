<template>
  <UIVBreadcrumbs
    :items="[{ name: 'Главная', to: '/' }, { name: 'Вход в личный кабинет' }]"
  />
  <SectionsAuth :type="'reg'" @submit="handleSubmit">
    <template #fields="{ meta, setFieldError }">
      <div class="auth-form__roles">
        <div class="filter-check m-radio">
          <input
            v-model="regDetails.role"
            type="radio"
            name="time"
            :value="'buyer'"
          />
          <label class="role-label">Заказчик</label>
        </div>
        <div class="filter-check m-radio">
          <input
            v-model="regDetails.role"
            name="time"
            type="radio"
            :value="'seller'"
          />
          <label class="role-label">Исполнитель</label>
        </div>
      </div>
      <fieldset class="fg _small">
        <label>Логин</label>
        <Field
          v-model.trim="regDetails.username"
          rules="required|alpha_dash|username"
          name="username"
          type="text"
          autocomplete="username"
          placeholder="freelancer777"
          @update:model-value="updateAccess(false, 'username', setFieldError)"
          @blur="updateAccess(true, 'username', setFieldError)"
        />
        <ErrorMessage name="username" class="error-message" />
      </fieldset>
      <fieldset class="fg _small">
        <label>Имя</label>
        <Field
          v-model.trim="regDetails.name"
          rules="required|alpha"
          name="name"
          type="text"
          autocomplete="first-name"
          placeholder="Александр"
        />
        <ErrorMessage name="name" class="error-message" />
      </fieldset>
      <fieldset class="fg _small">
        <label>Фамилия</label>
        <Field
          v-model.trim="regDetails.surname"
          rules="required|alpha"
          name="surname"
          type="text"
          autocomplete="last-name"
          placeholder="Поташов"
        />
        <ErrorMessage name="surname" class="error-message" />
      </fieldset>
      <fieldset class="fg _small">
        <label>Email адрес</label>
        <Field
          v-model.trim="regDetails.email"
          rules="required|emailFetch"
          name="email"
          autocomplete="email"
          type="email"
          placeholder="hello@mail.com"
        />
        <ErrorMessage name="email" class="error-message" />
      </fieldset>
      <fieldset class="fg _small">
        <label>Пароль</label>
        <Field
          v-model="regDetails.password"
          rules="required|min:8"
          name="password"
          type="password"
          autocomplete="new-password"
          placeholder="•••••••"
        />
        <ErrorMessage name="password" class="error-message" />
      </fieldset>
      <fieldset class="fg _small">
        <label>Повторите пароль</label>
        <Field
          v-model="regDetails.repeatPassword"
          rules="required|confirmed:@password"
          name="repeatPassword"
          autocomplete="new-password"
          type="password"
          placeholder="•••••••"
        />
        <ErrorMessage name="repeatPassword" class="error-message" />
      </fieldset>
      <UIVButton
        :disabled="!meta.valid || !regDetails.role"
        color="blue"
        :is-shadow="true"
        type="submit"
      >
        Создать аккаунт
      </UIVButton></template
    >
  </SectionsAuth>
</template>

<script setup lang="ts">
import type { FormActions } from 'vee-validate';
import {
  email,
  // eslint-disable-next-line camelcase
  alpha_dash,
} from '@vee-validate/rules';
import { useValidation } from '~/composables/useValidation';
definePageMeta({
  middleware: 'redirect-if-authenticated',
});
useHead({
  title: 'Регистрация',
});

const focusChanged = ref(false);

const timeoutId = ref();

const regDetails = ref({
  username: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  repeatPassword: '',
  role: '',
});

const checkValue = async (
  setFieldError: (field: string, message: string | undefined) => void,
  path: string,
  valid: Ref<boolean>,
  type: 'username' | 'email',
) => {
  const { data, error } = await apiFetch(path, {
    options: {
      body:
        type === 'username'
          ? { user_name: regDetails.value.username }
          : { email: regDetails.value.email },
      method: 'POST',
    },
  });

  if (!error.value) {
    valid.value = true;
    if (type === 'username') setFieldError('username', undefined);
    else {
      setFieldError('email', undefined);
    }
  } else {
    valid.value = false;

    if (type === 'username')
      setFieldError('username', 'Данный логин уже занят');
    else {
      setFieldError('email', 'Данный email уже зарегистрирован');
    }
  }
};
const updateAccess = (
  focus: boolean,
  type: 'username' | 'email',
  setFieldError: (field: string, message: string | undefined) => void,
) => {
  // if (timeoutId.value) clearTimeout(timeoutId.value);
  // if (!focus) focusChanged.value = false;
  // if (focusChanged.value) return;
  // usernameAccess.value = false;
  // emailAccess.value = false;
  // if (
  //   type === 'email' &&
  //   (!regDetails.value.email || !email(regDetails.value.email))
  // )
  //   return;
  // if (
  //   type === 'username' &&
  //   (!regDetails.value.username ||
  //     !alpha_dash(regDetails.value.username, { locale: 'ru' }))
  // )
  //   return;
  // if (focus) {
  //   checkValue(
  //     setFieldError,
  //     type === 'username'
  //       ? '/api/auth/check_username'
  //       : '/api/auth/check_email',
  //     type === 'username' ? usernameAccess : emailAccess,
  //     type,
  //   );
  // } else {
  //   timeoutId.value = setTimeout(() => {
  //     checkValue(
  //       setFieldError,
  //       type === 'username'
  //         ? '/api/auth/check_username'
  //         : '/api/auth/check_email',
  //       type === 'username' ? usernameAccess : emailAccess,
  //       type,
  //     );
  //     focusChanged.value = true;
  //   }, 1500);
  // }
};
// if (role === 'freelancer') {
// } else if (role === 'seller') {

useValidation();
const { register: authRegister } = useAuthStore();

const register = async () => {
  const result = await authRegister(regDetails.value);
  if (result) {
    await navigateTo('/');
    useToast({
      message: 'Регистрация прошла успешно',
      type: 'success',
    });
  }
};
const handleSubmit = (
  values: Record<string, any>,
  actions: FormActions<typeof values>,
) => {
  // if (!usernameAccess.value) {
  //   actions.setFieldError('username', 'Данный логин уже занят');
  // } else if (!emailAccess.value) {
  //   actions.setFieldError('email', 'Данный email уже зарегистрирован');
  // } else {
  register();
  // }
};
</script>
