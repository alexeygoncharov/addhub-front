<template>
  <Form class="recover-form" @submit="recoverPassword">
    <div class="recover-form__top">
      <div class="text17 medium-text">Восстановление пароля</div>
    </div>
    <div class="recover-form__bottom">
      <div class="recover-form__grid _type2">
        <fieldset class="fg">
          <label>Новый пароль</label>
          <Field
            v-model="form.new_password"
            rules="required|min:8"
            name="new_password"
            type="password"
            autocomplete="new-password"
            placeholder="•••••••"
          />
          <ErrorMessage name="new_password" class="error-message" />
        </fieldset>
        <fieldset class="fg">
          <label>Повторить пароль</label>
          <Field
            v-model="form.repeat_new_password"
            rules="required|min:8"
            name="repeat_new_password"
            type="password"
            autocomplete="repeat_new_password"
            placeholder="•••••••"
          />
          <ErrorMessage name="repeat_new_password" class="error-message" />
        </fieldset>
      </div>

      <div class="recover-form__nav">
        <button
          type="submit"
          class="recover-form__btn m-btn m-btn-blue m-btn-shadow"
        >
          <span>Сохранить</span>
        </button>
      </div>
    </div>
  </Form>
</template>

<script lang="ts" setup>
const route = useRoute();
const router = useRouter();
const form = ref({
  verificationToken: route.query?.verificationToken,
  email: route.query?.email,
  new_password: '',
  repeat_new_password: '',
});

useValidation();
const recoverPassword = async () => {
  const { data, error } = await apiFetch<ApiResponse<any>>(
    `/api/users/recover_password`,
    {
      options: {
        method: 'POST',
        body: form,
      },
      needToken: true,
    },
  );
  if (data?.value?.status) {
    form.value.verificationToken = '';
    form.value.email = '';
    form.value.new_password = '';
    form.value.repeat_new_password = '';
    router.push('/profile/settings');
  }
  if (error.value) {
    router.push('/');
    return useToast({ message: error.value.data.message, type: 'error' });
  }
};
</script>

<style></style>
