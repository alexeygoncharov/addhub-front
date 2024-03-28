<template>
  <div class="page-top">
    <div class="container">
      <div class="page-top__inner">
        <div class="page-top__text">
          <h1 v-if="!title" class="text32 medium-text">Поиск услуг</h1>
          <h1 v-else class="text32 medium-text">{{ title }}</h1>
          <div v-if="!items" class="page-top__desc text15">
            Вам доступно более 500 000 предложений
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
            <!-- <div class="page-top__item">
              <img src="/img/copy.svg" alt="" />
              <span>{{ items }}</span>
            </div> -->
            <!-- <div class="page-top__item">
              <img src="/img/eye.svg" alt="" />
              <span>{{ items.v }}</span>
            </div> -->
          </div>
        </div>
        <div v-if="hasSearch" class="page-search page-search2">
          <NuxtImg src="/img/search.svg" alt="" class="page-search__icon" />
          <div class="page-search__field fg">
            <input type="text" placeholder="Найти услугу" />
          </div>
          <div v-if="hasSelect" class="category-select">
            <!-- <UIVSelect
              :options="select.options"
              :placeholder="select.placeholder"
            /> -->
          </div>
          <button class="page-search__btn m-btn m-btn-blue">
            <span>Найти</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { serviceItem } from '~/stores/catalog/catalog.type';
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
});
const select = ref({
  placeholder: 'Выберите категорию',
  options: [
    { value: 'option1', text: 'Услуги' },
    { value: 'option2', text: 'Проекты' },
    { value: 'option3', text: 'Вакансии' },
    { value: 'option4', text: 'Фрилансеры' },
  ],
});
</script>
