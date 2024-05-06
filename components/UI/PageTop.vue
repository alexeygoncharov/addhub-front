<template>
  <div class="page-top" :class="{ 'contacts-top': contacts }">
    <div class="container">
      <div class="page-top__inner">
        <div class="page-top__text">
          <h1 v-if="title" class="text32 medium-text">{{ title }}</h1>
          <div v-if="description" class="page-top__desc text15">
            {{ description }}
          </div>
          <div v-if="items" class="page-top__items _gap10">
            <div class="page-top__user">
              <div class="avatar">
                <img
                  v-if="items.createdBy.avatar"
                  :src="baseUrl() + items.createdBy.avatar"
                  alt=""
                  crossorigin="anonymous"
                />
                <div v-else>
                  <Avatar :size="80" :name="items.createdBy.name" />
                </div>
                <span
                  v-if="items.createdBy.online_status === 'online'"
                  class="service-card__user-online"
                ></span>
              </div>
              <div class="page-top__user-name">{{ items.createdBy.name }}</div>
            </div>
            <div class="page-top__item _review">
              <img src="/img/star.svg" alt="" />
              <span>
                <b>{{ items.createdBy.rate }} </b>&nbsp;
                {{ pluralize(0, 'отзыв', 'отзыва', 'отзывов') }}
              </span>
            </div>
            <div class="page-top__item">
              <img src="/img/copy.svg" alt="" />
              <span>{{ items.orders }}</span>
            </div>
            <div class="page-top__item">
              <img src="/img/eye.svg" alt="" />
              <span>{{ items.views }}</span>
            </div>
          </div>
          <div v-if="currentItem" class="page-top__items _gap10">
            <div class="page-top__item">
              <img src="/img/marker.svg" alt="" />
              <span>{{ currentItem.address.city.title }}</span>
            </div>
            <div class="page-top__item">
              <img src="/img/calendar.svg" alt="" />
              <span class="_view1">{{
                new Date(currentItem.createdAt).toISOString().split('T')[0]
              }}</span>
              <!-- <span class="_view2">Декабрь 2, 2024</span> -->
            </div>
            <div class="page-top__item">
              <img src="/img/eye.svg" alt="" />
              <span>{{ currentItem.views }}</span>
            </div>
          </div>
        </div>
        <form v-if="help" class="blog-field fg">
          <input type="text" placeholder="Поиск по базе ответов..." />
          <button class="blog-field__btn hover-fill-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.1163 1.60938C4.98403 1.60938 1.61792 4.97548 1.61792 9.10776C1.61792 13.24 4.98403 16.6127 9.1163 16.6127C10.8813 16.6127 12.5046 15.9941 13.7875 14.9671L16.9109 18.0889C17.0685 18.24 17.279 18.3233 17.4974 18.3211C17.7157 18.3189 17.9245 18.2312 18.079 18.0769C18.2335 17.9227 18.3214 17.714 18.3239 17.4957C18.3265 17.2774 18.2434 17.0667 18.0925 16.9089L14.9692 13.7856C15.997 12.5006 16.6163 10.8748 16.6163 9.10776C16.6163 4.97548 13.2486 1.60938 9.1163 1.60938ZM9.1163 3.27607C12.3478 3.27607 14.948 5.87623 14.948 9.10776C14.948 12.3393 12.3478 14.946 9.1163 14.946C5.88476 14.946 3.28459 12.3393 3.28459 9.10776C3.28459 5.87623 5.88476 3.27607 9.1163 3.27607Z"
                fill="#041E42"
              />
            </svg>
          </button>
        </form>
        <div v-if="hasSearch" class="page-search page-search2">
          <NuxtImg src="/img/search.svg" alt="" class="page-search__icon" />
          <div class="page-search__field fg">
            <input v-model="search" type="text" placeholder="Найти услугу" />
          </div>
          <div v-if="hasSelect" class="category-select">
            <!-- <UIVSelect
              :options="select.options"
              :placeholder="select.placeholder"
            /> -->
          </div>
          <button
            class="page-search__btn m-btn m-btn-blue"
            @click="emits('submit')"
          >
            <span>Найти</span>
          </button>
        </div>
        <div v-if="button" class="page-top__nav">
          <button class="m-btn m-btn-blue">
            <nuxtLink :to="button.link"
              ><span>{{ button.text }}</span></nuxtLink
            >
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { projectItem } from '~/stores/catalog/catalog.type';
const props = defineProps({
  button: {
    type: Object as PropType<{ text: string; link: string }>,
    default: undefined,
  },
  hasSelect: {
    type: Boolean,
    default: false,
  },
  hasSearch: {
    type: Boolean,
    default: false,
  },
  items: {
    type: Object as PropType<serviceItem>,
    default: undefined,
  },
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
  contacts: {
    type: Boolean,
    default: false,
  },
  currentItem: {
    type: Object as PropType<projectItem>,
    default: undefined,
  },
  help: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['submit']);
const search = defineModel<string>();
// const select = ref({
//   placeholder: 'Выберите категорию',
//   options: [
//     { value: 'option1', text: 'Услуги' },
//     { value: 'option2', text: 'Проекты' },
//     { value: 'option3', text: 'Вакансии' },
//     { value: 'option4', text: 'Фрилансеры' },
//   ],
// });
</script>
