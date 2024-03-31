<template>
  <div class="auth">
    <div class="container">
      <div class="auth__top">
        <div class="text32 medium-text">Создать аккаунт</div>
        <div class="text15 text14-tablet light-text">
          Обеспечьте посетителю удобство работы в Интернете с помощью надежного
          UX-дизайна.
        </div>
      </div>
      <Form v-slot="{ meta }" class="auth-form" @submit="handleSubmit">
        <div class="auth-form__top">
          <div class="auth-form__title text20 medium-text">
            Регистрация нового пользователя
          </div>
          <div class="auth-form__desc text15">
            Уже зарегистрированы?
            <NuxtLink to="/login">Авторизуйтесь</NuxtLink>
          </div>
        </div>
        <div class="auth-form__fields">
          <div class="auth-form__roles">
            <div class="role-ratio">
              <span> Заказчик</span>
              <input v-model="regDetails.role" type="radio" :value="'buyer'" />
            </div>
            <div class="role-ratio">
              <span>Фрилансер</span>
              <input v-model="regDetails.role" type="radio" :value="'seller'" />
            </div>
          </div>
          <fieldset class="fg _small">
            <label>Логин</label>
            <Field
              v-model.trim="regDetails.username"
              rules="required|alpha_dash"
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
              rules="required|email"
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
          </UIVButton>
        </div>

        <ModulesSignSocial />
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useValidation } from '~/composables/useValidation';

const regDetails = ref({
  username: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  repeatPassword: '',
  role: '',
});

// if (role === 'freelancer') {
// } else if (role === 'seller') {

useValidation();
const { register: authRegister } = useAuthStore();

const register = async () => {
  const result = await authRegister(regDetails.value);
  if (result) {
    await navigateTo('/login');
    useToast({
      message: 'Регистрация прошла успешно',
      type: 'success',
    });
  } else {
    useToast({
      message: 'Произошла ошибка при регистрации',
      type: 'error',
    });
  }
};
const handleSubmit = () => {
  register();
};
</script>
-
