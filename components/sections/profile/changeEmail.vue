<template>
  <Form v-slot="{ meta }" class="profile-item" @submit="submitPassword">
    <div class="profile-item__top">
      <div class="text17 medium-text">Сменить email</div>
    </div>
    <div class="profile-item__bottom">
      <fieldset class="fg small">
        <label>Email</label>

        <Field
          v-slot="{ field, setValue }"
          v-model.trim="form.email"
          name="email"
          rules="required|email"
        >
          <input
            v-bind="field"
            type="email"
            placeholder="hello@mail.com"
            @focusout="setValue(field.value.trim())"
          />
        </Field>
        <ErrorMessage name="email" class="error-message" />
      </fieldset>
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
const userStore = useUserStore();
const form = ref({
  email: userStore.user?.email ? userStore.user?.email : '',
});

async function submitPassword() {
  const data = {
    new_email: form.value.email,
  };
  await profileStore.updateEmail(data);
}
</script>
