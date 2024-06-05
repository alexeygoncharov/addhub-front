<template>
  <div class="admin-top">
    <div class="text32 medium-text">Мой профиль</div>
  </div>

  <div class="profile-item">
    <div class="profile-item__top">
      <div class="text17 medium-text">Настройки профиля</div>
      <div class="text17">
        {{
          ` - (Вы ${userStore.user?.active_role == 'buyer' ? 'заказчик' : 'фрилансер'})`
        }}
      </div>
    </div>
    <div id="form" class="profile-item__bottom">
      <form class="photo-field">
        <div class="avatar">
          <img
            v-if="form.avatar"
            crossorigin="anonymous"
            :src="getAvatarUrl(form.avatar.url)"
            alt=""
          />
          <div v-else>
            <Avatar :size="80" :name="form.name" />
          </div>
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

      <Form class="profile-item__grid">
        <fieldset class="fg">
          <label>Имя пользователя</label>
          <Field
            id="name"
            v-model="form.name"
            rules="required|alpha|max:14"
            name="name"
            type="name"
          />
          <ErrorMessage name="name" class="error-message" />
        </fieldset>
        <fieldset class="fg small">
          <label>Email</label>
          <Field
            v-model="form.email"
            rules="required|email"
            name="email"
            type="email"
            placeholder="hello@mail.com"
          />
          <ErrorMessage name="email" class="error-message" />
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

        <fieldset v-if="commonStore.countries" class="fg">
          <label>Страна</label>
          <UIVSelectSearch
            v-model="form.address.country"
            :items="
              commonStore.countries.map((item) => {
                return { title: item.title, value: item._id };
              })
            "
          />
        </fieldset>

        <fieldset v-if="commonStore.cities" class="fg">
          <label>Город</label>
          <UIVSelectSearch
            v-model="form.address.city"
            :items="
              commonStore.cities.map((item) => ({
                title: item.title,
                value: item._id,
              }))
            "
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
      </Form>

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
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useUserStore } from '../../../stores/user';
import { useProfileStore } from '../../../stores/profile';
import { useCommonStore } from '../../../stores/common';
import { useValidation } from '~/composables/useValidation';

useValidation();
const commonStore = useCommonStore();
const profileStore = useProfileStore();
const userStore = useUserStore();
if (!userStore.user) {
  throw navigateTo('/login');
}
const search = ref('');
const { open, onChange } = useFileDialog({
  accept: '.jpg, .png', // Set to accept only image files
  // directory: true, // Select directories instead of files if set true
  multiple: false,
});

const validateFiles = (files: any) => {
  const file = files[0];
  const fileExtension = file.name.split('.').pop().toLowerCase().trim();
  if (fileExtension !== 'jpg' && fileExtension !== 'png') {
    return false;
  }
  return true;
};

onChange((files) => {
  if (files && files.length > 0) {
    if (!validateFiles(files))
      return useToast({
        message: 'Файл должен быть в формате .jpg или .png',
        type: 'error',
      });
    const formData = new FormData();
    formData.append('file', files[0]);
    commonStore.uploadFile(formData).then((file?: uploadFileResponse) => {
      if (file) {
        form.value.avatar = file;
        formData.delete('file');
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

const form = ref({
  avatar: userStore.user?.avatar,
  name: userStore.user?.name,
  email: userStore.user?.email,
  phone_number: userStore.user?.phone_number,
  address: {
    city: userStore.user?.address?.city?._id || '',
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
    address: {
      city: form.value?.address.city,
      country: form.value?.address.country,
    },
    about_me: form.value?.about_me,
  };
  await profileStore.editProfile(data);
}
</script>
