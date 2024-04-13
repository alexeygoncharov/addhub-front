<template>
  <div class="auth">
    <div class="container">
      <div class="auth__top">
        <div class="text32 medium-text">
          {{ !isLogin ? 'Создать аккаунт' : 'Вход в личный кабинет' }}
        </div>
        <div class="text15 text14-tablet light-text">
          Обеспечьте посетителю удобство работы в Интернете с помощью надежного
          UX-дизайна.
        </div>
      </div>
      <Form
        v-slot="{ meta, setFieldError }"
        class="auth-form"
        @submit="emits('submit')"
      >
        <div class="auth-form__top">
          <div class="auth-form__title text20 medium-text">
            {{
              isLogin ? 'Добро пожаловать!' : 'Регистрация нового пользователя'
            }}
          </div>
          <slot name="fields" :meta="meta" :set-field-error="setFieldError" />
          <div class="auth-form__desc text15">
            {{
              !isLogin ? 'Уже зарегистрированы?' : 'Еще не зарегистрированы?'
            }}
            <NuxtLink :to="isLogin ? '/reg' : '/login'">{{
              isLogin ? 'Создать аккаунт' : 'Авторизуйтесь'
            }}</NuxtLink>
          </div>
        </div>
        <div class="auth-form__fields"></div>

        <ModulesSignSocial />
      </Form>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ type: 'reg' | 'login' }>();
const emits = defineEmits(['submit']);
const isLogin = props.type === 'login';
useValidation();
</script>

<style scoped></style>
