<template>
  <form class="profile-item">
    <div class="profile-item__top">
      <div class="text17 medium-text">Сменить пароль</div>
    </div>
    <div class="profile-item__bottom">
      <div class="profile-item__grid _type2">
        <fieldset class="fg">
          <label>Старый пароль</label>
          <input
            v-model="passwordForm.oldPassord"
            type="password"
            placeholder="********"
          />
        </fieldset>
        <fieldset class="fg">
          <label>Новый пароль</label>
          <input
            v-model="passwordForm.newPassword"
            type="password"
            placeholder="********"
          />
        </fieldset>
        <fieldset class="fg">
          <label>Повторить пароль</label>
          <input
            v-model="passwordForm.repeatPassword"
            type="password"
            placeholder="********"
          />
        </fieldset>
      </div>

      <div class="profile-item__nav">
        <button
          type="submit"
          class="profile-item__btn m-btn m-btn-blue m-btn-shadow"
          @click.prevent="submitPassword"
        >
          <span>Сохранить</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
const profileStore = useProfileStore();

const passwordForm = ref({
  oldPassord: '',
  newPassword: '',
  repeatPassword: '',
});

async function submitPassword() {
  const formData = new FormData();
  if (passwordForm.value.oldPassord)
    formData.append('old_password', passwordForm.value.oldPassord);
  if (passwordForm.value.newPassword)
    formData.append('new_password', passwordForm.value.newPassword);
  if (passwordForm.value.repeatPassword)
    formData.append('repeat_new_password', passwordForm.value.repeatPassword);

  await profileStore.changePassword(formData);
}
</script>
