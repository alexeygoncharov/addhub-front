<template>
  <UIVBreadcrumbs
    :items="[{ name: 'Главная', to: '/' }, { name: 'Вход в личный кабинет' }]"
  />
  <SectionsAuth :type="'reg'" @submit="register">
    <template #fields>
      <fieldset class="fg _small">
        <div class="auth-form__roles">
          <div class="filter-check m-radio">
            <Field
              v-model="regDetails.role"
              rules="role"
              type="radio"
              name="role"
              :value="'buyer'"
            />
            <label class="role-label">Заказчик</label>
          </div>
          <div class="filter-check m-radio">
            <Field
              v-model="regDetails.role"
              rules="role"
              name="role"
              type="radio"
              :value="'seller'"
            />
            <label class="role-label">Исполнитель</label>
          </div>
        </div>
        <ErrorMessage name="role" class="error-message" />
      </fieldset>
      <fieldset class="fg _small">
        <label>Логин</label>

        <Field
          v-slot="{ field, setValue }"
          v-model.trim="regDetails.username"
          rules="required|alpha_dash|username"
          name="username"
        >
          <input
            v-bind="field"
            type="text"
            autocomplete="username"
            placeholder="freelancer777"
            @focusout="setValue(field.value.trim())"
          />
        </Field>
        <ErrorMessage name="username" class="error-message" />
      </fieldset>
      <fieldset class="fg _small">
        <label>Имя</label>

        <Field
          v-slot="{ field, setValue }"
          v-model.trim="regDetails.name"
          rules="required|alpha|required|max:14"
          name="name"
        >
          <input
            v-bind="field"
            type="text"
            autocomplete="first-name"
            placeholder="Александр"
            @focusout="setValue(field.value.trim())"
          />
        </Field>
        <ErrorMessage name="name" class="error-message" />
      </fieldset>
      <fieldset class="fg _small">
        <label>Фамилия</label>

        <Field
          v-slot="{ field, setValue }"
          v-model.trim="regDetails.surname"
          rules="required|alpha|max:14"
          name="surname"
        >
          <input
            v-bind="field"
            type="text"
            autocomplete="last-name"
            placeholder="Поташов"
            @focusout="setValue(field.value.trim())"
          />
        </Field>
        <ErrorMessage name="surname" class="error-message" />
      </fieldset>
      <fieldset class="fg _small">
        <label>Email адрес</label>

        <Field
          v-slot="{ field, setValue }"
          v-model.trim="regDetails.email"
          rules="required|emailFetch"
          name="email"
        >
          <input
            v-bind="field"
            autocomplete="email"
            type="email"
            placeholder="hello@mail.com"
            @focusout="setValue(field.value.trim())"
          />
        </Field>
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
      <UIVButton color="blue" :is-shadow="true" type="submit">
        Создать аккаунт
      </UIVButton>
      <NuxtTurnstile v-model="captchaToken" />

      <Field
        v-model="captchaToken"
        name="captchaToken"
        rules="captcha"
        type="hidden"
      />
      <ErrorMessage name="captchaToken" class="error-message" />
    </template>
  </SectionsAuth>
</template>

<script setup lang="ts">
import { useValidation } from '~/composables/useValidation';
const authStore = useAuthStore();
definePageMeta({
  middleware: 'redirect-if-authenticated',
});
useHead({
  title: 'Регистрация',
});

const captchaToken = ref('');

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
  await authRegister(regDetails.value, captchaToken.value);
};
</script>
