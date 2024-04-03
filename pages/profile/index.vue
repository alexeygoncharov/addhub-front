<template>
  <div class="admin-top">
    <div class="text32 medium-text">Мой профиль</div>
  </div>

  <div class="profile-item">
    <div class="profile-item__top">
      <div class="text17 medium-text">Настройки профиля</div>
    </div>
    <form id="form" class="profile-item__bottom">
      <div class="photo-field">
        <div class="avatar">
          <!-- <img src="img/avatar13.webp" alt="" />-->
        </div>
        <div class="photo-field__content">
          <div class="photo-field__action">
            <button class="photo-field__btn photo-field__delete m-btn">
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
            <button class="photo-field__btn m-btn">
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
      </div>

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
            :initial-current-text="{ value: form.gender, text: form.gender }"
            :options="genders.options"
            :placeholder="genders.placeholder"
            @input="(gender) => (form.gender = gender)"
          />
        </fieldset>

        <fieldset class="fg">
          <label>Страна</label>
          <div class="m-select _not-select" data-placeholder="Выбрать">
            <input id="gender" class="m-select__field" type="hidden" />
            <div class="m-select__toggle">
              <span class="m-select__current">Выбрать</span>
              <svg
                width="9"
                height="6"
                viewBox="0 0 9 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.07671 5.33928L8.86404 1.55188C8.9517 1.46428 9 1.34735 9 1.22266C9 1.09798 8.9517 0.981043 8.86404 0.893445L8.58519 0.614529C8.40349 0.433037 8.10818 0.433037 7.92675 0.614529L4.74638 3.7949L1.56248 0.611C1.47482 0.523402 1.35795 0.475036 1.23333 0.475036C1.10858 0.475036 0.991712 0.523402 0.903975 0.611L0.625198 0.889915C0.537531 0.977582 0.489235 1.09445 0.489235 1.21913C0.489235 1.34382 0.537531 1.46075 0.625198 1.54835L4.41599 5.33928C4.50393 5.42709 4.62135 5.47531 4.74617 5.47504C4.87148 5.47531 4.98883 5.42709 5.07671 5.33928Z"
                  fill="#041E42"
                ></path>
              </svg>
            </div>
            <div class="m-select__dropdown">
              <div class="m-select__option" data-value="Страна 1">
                <span>Страна 1</span>
              </div>
              <div class="m-select__option" data-value="Страна 2">
                <span>Страна 2</span>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset class="fg">
          <label>Город</label>
          <UIVSelect
            :initial-current-text="{ value: form.gender, text: form.gender }"
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
          @click.prevent="submitProfile"
        >
          <span>Сохранить</span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/user';
import { useProfileStore } from '../../stores/profile';
import { useCommonStore } from '../../stores/common';
import _id from '../bid/[_id].vue';
definePageMeta({
  layout: 'admin',
});
const commonStore = useCommonStore();
const profileStore = useProfileStore();
const cities = commonStore.cities?.map((item) => {
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
  avatar: '',
  name: userStore.user?.name,
  email: userStore.user?.email,
  user_name: userStore.user?.user_name,
  phone_number: userStore.user?.phone_number,
  profession: userStore.user?.profession,
  slogan: userStore.user?.slogan,
  gender: userStore.user?.gender,
  city: userStore.user?.address?.city?.title,
  about_me: userStore.user?.about_me,
});

async function submitProfile() {
  const formData = new FormData();
  if (form.value.name) formData.append('name', form.value.name);
  if (form.value.email) formData.append('email', form.value.email);
  if (form.value.user_name) formData.append('user_name', form.value.user_name);
  if (form.value.phone_number)
    formData.append('phone_number', form.value.phone_number);
  if (form.value.slogan) formData.append('slogan', form.value.slogan);
  if (form.value.gender) formData.append('gender', form.value.gender);
  if (form.value.city) formData.append('city', form.value.city);
  if (form.value.about_me) formData.append('about_me', form.value.about_me);
  await profileStore.editProfile(formData);
}
</script>
