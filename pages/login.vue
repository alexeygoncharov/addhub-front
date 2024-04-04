<template>
  <UIVBreadcrumbs
    :items="[{ name: 'Главная', to: '/' }, { name: 'Вход в личный кабинет' }]"
  />
  <SectionsAuth :type="'login'" @submit="handleSubmit">
    <template #fields="{ meta }">
      <fieldset class="fg _small">
        <label>Email адрес</label>
        <Field
          v-model="email"
          rules="required|email"
          name="email"
          type="email"
          placeholder="hello@mail.com"
        />
        <ErrorMessage name="email" class="error-message" />
      </fieldset>
      <fieldset class="fg _small">
        <label>Пароль</label>
        <Field
          v-model="password"
          :rules="{ required: true, min: 8 }"
          name="password"
          type="password"
          placeholder="•••••••"
        />
        <ErrorMessage name="password" class="error-message" />
      </fieldset>
      <div class="auth-form__wrap">
        <div class="m-check">
          <input v-model="rememberMe" type="checkbox" />
          <label><span>Запомнить меня</span></label>
        </div>
        <a href="" class="auth-form__link">Забыли пароль?</a>
      </div>
      <UIVButton
        :disabled="!meta.valid"
        color="blue"
        :is-shadow="true"
        type="submit"
      >
        Войти
      </UIVButton>
    </template>
  </SectionsAuth>
</template>

<script setup lang="ts">
import { useValidation } from '~/composables/useValidation.js';
definePageMeta({
  middleware: 'redirect-if-authenticated',
});
useHead({
  title: 'Авторизация',
});
const { login: authLogin } = useAuthStore();
const email = ref('');
const password = ref('');
const rememberMe = ref(true);

useValidation();

const login = async () => {
  const result = await authLogin(email.value, password.value, rememberMe.value);
  if (result === 'success') {
    navigateTo('/');
  }
};
const handleSubmit = () => {
  login();
};
</script>
