<template>
  <Form v-slot="{ meta }" class="profile-item" @submit="submitPassword">
    <div class="profile-item__top">
      <div class="text17 medium-text">Сменить пароль</div>
    </div>
    <div class="profile-item__bottom">
      <div class="profile-item__grid _type2">
        <fieldset class="fg">
          <label>Старый пароль</label>
          <input
            v-model="passwordForm.old_password"
            type="password"
            placeholder="********"
          />
        </fieldset>
        <fieldset class="fg">
          <label>Новый пароль</label>

          <Field
            v-model.trim="passwordForm.new_password"
            rules="required|min:8"
            name="password"
            type="password"
            autocomplete="new-password"
            placeholder="•••••••"
          />
          <ErrorMessage name="password" class="error-message" />
        </fieldset>
        <fieldset class="fg">
          <label>Повторить пароль</label>
          <Field
            v-model.trim="passwordForm.repeat_new_password"
            rules="required|min:8"
            name="repeat_new_password"
            type="repeat_new_password"
            autocomplete="repeat_new_password"
            placeholder="•••••••"
          />
        </fieldset>
      </div>

      <div class="profile-item__nav">
        <button
          type="submit"
          class="profile-item__btn m-btn m-btn-blue m-btn-shadow"
          :disabled="!meta.valid"
        >
          <span>Сохранить</span>
        </button>
      </div>
    </div>
  </Form>
</template>

<script setup lang="ts">
const profileStore = useProfileStore();

const passwordForm = ref({
  old_password: '',
  new_password: '',
  repeat_new_password: '',
});

async function submitPassword() {
  const data = {
    old_password: passwordForm.value.old_password,
    new_password: passwordForm.value.new_password,
    repeat_new_password: passwordForm.value.repeat_new_password,
  };
  await profileStore.changePassword(data).then(() => {
    passwordForm.value.new_password = '';
    passwordForm.value.old_password = '';
    passwordForm.value.repeat_new_password = '';
  });
}
</script>
