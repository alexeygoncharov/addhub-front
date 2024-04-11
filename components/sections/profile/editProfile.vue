<template>
  <ModulesProfileTop>Мой профиль</ModulesProfileTop>

  <div class="profile-item">
    <div class="profile-item__top">
      <div class="text17 medium-text">Настройки профиля</div>
    </div>
    <div id="form" class="profile-item__bottom">
      <form class="photo-field">
        <div class="avatar">
          <img
            v-if="form.avatar"
            crossorigin="anonymous"
            :src="getAvatarUrl(form.avatar)"
            alt=""
          />
          <Avatar v-else :size="80" :name="form.name" />
        </div>
        <div class="photo-field__content">
          <div class="photo-field__action">
            <button
              class="photo-field__btn photo-field__delete m-btn"
              type="submit"
              @click.prevent="deleteAvatar"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.1638 5.95719H14.3932V4.125C14.3932 3.98825 14.3388 3.8571 14.2421 3.7604C14.1454 3.6637 14.0143 3.60938 13.8775 3.60938H8.12316C7.98641 3.60938 7.85526 3.6637 7.75856 3.7604C7.66186 3.8571 7.60754 3.98825 7.60754 4.125V5.95719H4.83691C4.70016 5.95719 4.56901 6.01151 4.47231 6.10821C4.37561 6.20491 4.32129 6.33606 4.32129 6.47281C4.32129 6.60956 4.37561 6.74072 4.47231 6.83741C4.56901 6.93411 4.70016 6.98844 4.83691 6.98844H5.50035V16.5C5.50126 16.9999 5.70049 17.479 6.05431 17.8322C6.40813 18.1854 6.88762 18.3837 7.38754 18.3837H14.6407C15.1358 18.3765 15.6083 18.175 15.9562 17.8226C16.3041 17.4702 16.4995 16.9952 16.5004 16.5V6.98844H17.15C17.2868 6.99026 17.4187 6.93768 17.5167 6.84228C17.6146 6.74687 17.6707 6.61644 17.6725 6.47969C17.6744 6.34294 17.6218 6.21106 17.5264 6.11307C17.431 6.01508 17.3005 5.95901 17.1638 5.95719ZM8.63879 4.64062H13.3619V5.95719H8.63879V4.64062ZM15.4691 16.5C15.4682 16.7264 15.3776 16.9432 15.2172 17.103C15.0568 17.2628 14.8396 17.3525 14.6132 17.3525H7.37379C7.14977 17.3489 6.93608 17.2576 6.77862 17.0982C6.62116 16.9388 6.53247 16.724 6.5316 16.5V6.98844H15.4691V16.5Z"
                  fill="#222222"
                ></path>
              </svg>
            </button>
            <button class="photo-field__btn m-btn" @click.prevent="open()">
              <span>Загрузить изображение</span>
            </button>
          </div>
          <div class="photo-field__desc">
            <div class="text15">
              Максимальный размер файла — 1 МБ, минимальный размер: 330x300.
              Подходящие файлы — .jpg и .png.
            </div>
          </div>
        </div>
      </form>

      <div class="profile-item__grid">
        <fieldset class="fg">
          <label>Имя пользователя</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            placeholder="Александра"
          />
        </fieldset>
        <fieldset class="fg">
          <label>Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            placeholder="mail@mail"
          />
        </fieldset>
        <fieldset class="fg">
          <label>Телефон</label>
          <input
            id="phone_number"
            v-model="form.phone_number"
            type="text"
            placeholder="+ 7"
          />
        </fieldset>
        <fieldset class="fg">
          <label>Слоган</label>
          <input
            id="slogan"
            v-model="form.slogan"
            type="text"
            placeholder="Продавала песок на пляже — покупали"
          />
        </fieldset>
        <fieldset class="fg">
          <label>Пол</label>
          <UIVSelect
            :initial-current-text="{
              value: userStore.user?.gender,
              text: genders.options.find((item) => {
                if (item.value === userStore.user?.gender) return item;
              })?.text,
            }"
            :options="genders.options"
            :placeholder="genders.placeholder"
            @input="(gender) => (form.gender = gender)"
          />
        </fieldset>

        <fieldset class="fg">
          <label>Страна</label>
          <UIVSelect
            :initial-current-text="{
              value: userStore.user?.address?.country?._id,
              text: userStore.user?.address?.country?.title,
            }"
            :options="countries"
            :placeholder="'Выберите страну'"
            @input="(country) => (form.country = country)"
          />
        </fieldset>

        <fieldset class="fg">
          <label>Город</label>
          <UIVSelect
            :initial-current-text="{
              value: userStore.user?.address?.city?._id,
              text: userStore.user?.address?.city?.title,
            }"
            :options="cities"
            :placeholder="'Выберите город'"
            @input="(city) => (form.city = city)"
          />
        </fieldset>

        <fieldset class="fg _full">
          <label>Расскажите о себе</label>
          <textarea
            id="about_me"
            v-model="form.about_me"
            placeholder="Описание"
          ></textarea>
        </fieldset>
      </div>

      <div class="profile-item__nav">
        <button
          class="profile-item__btn m-btn m-btn-blue m-btn-shadow"
          type="submit"
          @click="submitProfile"
        >
          <span>Сохранить</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFileDialog } from '@vueuse/core';
import { useUserStore } from '../../../stores/user';
import { useProfileStore } from '../../../stores/profile';
import { useCommonStore } from '../../../stores/common';
const commonStore = useCommonStore();
const profileStore = useProfileStore();
const { open, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
  // directory: true, // Select directories instead of files if set true
  multiple: false,
});

const deleteAvatar = () => {
  if (form.value.avatar) commonStore.deleteFile(form.value.avatar);
  // await refreshNuxtData();
};

onChange((files) => {
  if (files) {
    const formData = new FormData();
    formData.append('file', files[0]);
    commonStore.uploadFile(formData).then((filename: string) => {
      form.value.avatar = filename;
      formData.delete('file');
      formData.append('avatar', filename);
      profileStore.editProfile({ avatar: filename });
    });
  }
});

const cities = commonStore.cities?.map((item) => {
  return { text: item.title, value: item._id };
});
const countries = commonStore.countries?.map((item) => {
  return { text: item.title, value: item._id };
});

const genders = ref({
  placeholder: 'Выберите пол',
  options: [
    { value: 'male', text: 'Мужской' },
    { value: 'female', text: 'Женский' },
  ],
});

const userStore = useUserStore();
const form = ref({
  avatar: userStore.user?.avatar,
  name: userStore.user?.name,
  email: userStore.user?.email,
  user_name: userStore.user?.user_name,
  phone_number: userStore.user?.phone_number,
  slogan: userStore.user?.slogan,
  gender: userStore.user?.gender,
  country: userStore.user?.address?.country?.title,
  city: userStore.user?.address?.city?.title,
  about_me: userStore.user?.about_me,
});

async function submitProfile() {
  const data = {
    avatar: form.value?.avatar,
    name: form.value?.name,
    email: form.value?.email,
    user_name: form.value?.user_name,
    phone_number: form.value?.phone_number,
    slogan: form.value?.slogan,
    gender: form.value?.gender,
    country: form.value?.country,
    city: form.value?.city,
    about_me: form.value?.about_me,
  };
  await profileStore.editProfile(data);
}
</script>
