<template>
  <div class="page-top">
    <div class="container">
      <div class="page-top__inner">
        <div class="page-top__text">
          <h1 class="text32 medium-text">Поиск услуг</h1>
          <div class="page-top__desc text15">
            Вам доступно более 500 000 предложений
          </div>
        </div>
        <div v-if="hasSearch" class="page-search page-search2">
          <NuxtImg src="/img/search.svg" alt="" class="page-search__icon" />
          <div class="page-search__field fg">
            <input type="text" placeholder="Найти услугу" />
          </div>
          <div v-if="hasSelect" class="category-select">
            <UIVSelect
              :options="select.options"
              :placeholder="select.placeholder"
            />
          </div>
          <button class="page-search__btn m-btn m-btn-blue">
            <span>Найти</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hasSelect: {
      type: Boolean,
      default: false,
    },
    hasSearch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      select: {
        placeholder: 'Выберите категорию',
        options: [
          { value: 'option1', text: 'Услуги' },
          { value: 'option2', text: 'Проекты' },
          { value: 'option3', text: 'Вакансии' },
          { value: 'option4', text: 'Фрилансеры' },
        ],
      },
    };
  },
};
</script>
