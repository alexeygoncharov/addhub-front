<template>
  <UIVBreadcrumbs
    :items="[{ name: 'Главная', to: '/' }, { name: 'Вход в личный кабинет' }]"
  />
  <SectionsAuth :type="'reg'" @submit="register">
    <template #fields="{ meta }">
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
        />
        <ErrorMessage name="username" class="error-message" />
      </fieldset>
      <fieldset class="fg _small">
        <label>Имя</label>
        <Field
          v-model.trim="regDetails.name"
          rules="required|alpha|required|max:14"
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
          rules="required|alpha|max:14"
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
</script>
