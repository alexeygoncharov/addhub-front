<template>
  <div class="admin-top">
    <div class="text32 medium-text">Мой профиль</div>
  </div>

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
              value: form.gender,
              text: genders.options.find((item) => {
                if (item.value === form.gender) return item;
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
              value: form.address.country,
              text: countries?.find((item) => {
                if (item.value === form.address.country) return item;
              })?.text,
            }"
            :options="countries"
            :placeholder="'Выберите страну'"
            @input="(country) => (form.address.country = country)"
          />
        </fieldset>

        <fieldset class="fg">
          <label>Город</label>
          <UIVSelect
            :initial-current-text="{
              value: form.address.city,
              text: cities?.find((item) => {
                if (item.value === form.address.city) return item;
              })?.text,
            }"
            :options="cities"
            :placeholder="'Выберите город'"
            @input="(city) => (form.address.city = city)"
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
const userStore = useUserStore();
const { open, onChange } = useFileDialog({
  accept: 'image/*', // Set to accept only image files
  // directory: true, // Select directories instead of files if set true
  multiple: false,
});

onChange((files) => {
  if (files) {
    const formData = new FormData();
    formData.append('file', files[0]);
    commonStore.uploadFile(formData).then((filename?: string) => {
      if (filename) {
        form.value.avatar = filename.replace('/files', 'files');
        formData.delete('file');
        formData.append('avatar', form.value.avatar);
        profileStore.updateAvatar(form.value.avatar).then(() => {
          if (userStore.user?.avatar !== undefined)
            userStore.user.avatar = form.value.avatar;
        });
      }
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

const form = ref({
  avatar: userStore.user?.avatar,
  name: userStore.user?.name,
  email: userStore.user?.email,
  phone_number: userStore.user?.phone_number,
  slogan: userStore.user?.slogan,
  gender: userStore.user?.gender,
  address: {
    city: userStore.user?.address?.city._id,
    country: userStore.user?.address?.country._id,
  },
  about_me: userStore.user?.about_me,
});

async function submitProfile() {
  const data = {
    avatar: form.value?.avatar,
    name: form.value?.name,
    email: form.value?.email,
    phone_number: form.value?.phone_number,
    slogan: form.value?.slogan,
    gender: form.value?.gender,
    address: {
      city: form.value?.address.city,
      country: form.value?.address.country,
    },
    about_me: form.value?.about_me,
  };
  await profileStore.editProfile(data);
}
</script>
