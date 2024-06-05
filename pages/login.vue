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
        <a class="auth-form__link" @click="reveal">Забыли пароль?</a>
      </div>
      <div v-if="isRevealed" class="modal-screen">
        <div class="modal-wrapper">
          <OnClickOutside @trigger="cancel">
            <div class="header">
              <div class="title text20 medium-text">Восстановление пароля</div>
              <img
                src="/img/cross.svg"
                alt="close"
                class="modal-wrapper__close"
                @click="cancel"
              />
            </div>
            <div class="modal-wrapper__mainInput">
              <label class="bid-label">Введите email:</label>
              <Field v-model="email" name="description" rules="required" />
              <ErrorMessage name="email" class="error-message" />
            </div>
            <div class="modal-wrapper__under">
              <UIVButton
                :disabled="!email.length"
                color="blue"
                :is-shadow="true"
                type="submit"
                @click="confirm"
              >
                Восстановить пароль
              </UIVButton>
            </div>
          </OnClickOutside>
        </div>
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
import { useConfirmDialog } from '@vueuse/core';
import { useValidation } from '~/composables/useValidation.js';

const { isRevealed, reveal, confirm, cancel, onReveal, onConfirm, onCancel } =
  useConfirmDialog();
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
