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
                <img src="/img/avatar.webp" alt="" />
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
          <div v-if="projectItem" class="page-top__items _gap10">
            <div class="page-top__item">
              <img src="/img/marker.svg" alt="" />
              <span>{{ projectItem.address.city.title }}</span>
            </div>
            <div class="page-top__item">
              <img src="/img/calendar.svg" alt="" />
              <span class="_view1">{{
                new Date(projectItem.createdAt).toISOString().split('T')[0]
              }}</span>
              <!-- <span class="_view2">Декабрь 2, 2023</span> -->
            </div>
            <div class="page-top__item">
              <img src="/img/eye.svg" alt="" />
              <span>{{ projectItem.views }}</span>
            </div>
          </div>
        </div>
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
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { projectsItem } from '~/stores/catalog/catalog.type';
const props = defineProps({
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
  projectItem: {
    type: Object as PropType<projectsItem>,
    default: undefined,
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
