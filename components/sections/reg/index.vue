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
              <input
                type="checkbox"
                :value="'seller'"
                :disabled="sellerIsChecked"
                @click="handleCheckboxChange('seller')"
              />
            </div>
            <div class="role-ratio">
              <span>Фрилансер</span>
              <input
                type="checkbox"
                :value="'freelancer'"
                :disabled="freelancerIsChecked"
                @click="handleCheckboxChange('freelancer')"
              />
            </div>
          </div>
          <fieldset class="fg _small">
            <label>Логин</label>
            <Field
              v-model="regDetails.username"
              rules="required|alpha_dash"
              name="username"
              type="text"
              placeholder="freelancer777"
            />
            <ErrorMessage name="username" class="error-message" />
          </fieldset>
          <fieldset class="fg _small">
            <label>Имя</label>
            <Field
              v-model="regDetails.name"
              rules="required|alpha"
              name="name"
              type="text"
              placeholder="Александр"
            />
            <ErrorMessage name="name" class="error-message" />
          </fieldset>
          <fieldset class="fg _small">
            <label>Фамилия</label>
            <Field
              v-model="regDetails.surname"
              rules="required|alpha"
              name="surname"
              type="text"
              placeholder="Поташов"
            />
            <ErrorMessage name="surname" class="error-message" />
          </fieldset>
          <fieldset class="fg _small">
            <label>Email адрес</label>
            <Field
              v-model="regDetails.email"
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
              v-model="regDetails.password"
              rules="required|min:8"
              name="password"
              type="password"
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
              type="password"
              placeholder="•••••••"
            />
            <ErrorMessage name="repeatPassword" class="error-message" />
          </fieldset>
          <UIVButton
            :disabled="!meta.valid"
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
import { useAuthStore } from '~/stores/auth';
import { useValidation } from '~/composables/useValidation';

const freelancerIsChecked = ref(false);
const sellerIsChecked = ref(false);
const regDetails = ref({
  username: '',
  name: '',
  surname: '',
  email: '',
  password: '',
  repeatPassword: '',
  role: '',
});

const handleCheckboxChange = (role: string) => {
  if (role === 'freelancer') {
    sellerIsChecked.value = !sellerIsChecked.value;
    regDetails.value.role = role;
  } else if (role === 'seller') {
    freelancerIsChecked.value = !freelancerIsChecked.value;
    regDetails.value.role = role;
  }
};

useValidation();
const { register: authRegister } = useAuthStore();

const register = async () => {
  await authRegister(regDetails.value);
  await navigateTo('/login');
  useToast({
    message: 'Регистрация прошла успешно',
    type: 'success',
  });
};
const handleSubmit = () => {
  register();
};
</script>
-
