<template>
  <div v-if="pages.length > 1" class="pagination">
    <button type="button" class="pagination__btn _prev" @click="prevPage">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.8186 8.00232L10.1784 14.3445C10.3868 14.5522 10.7241 14.5518 10.9321 14.3434C11.14 14.1351 11.1395 13.7975 10.9311 13.5897L4.94983 7.62498L10.9313 1.6603C11.1396 1.45244 11.1402 1.11511 10.9324 0.906712C10.8281 0.802244 10.6915 0.75001 10.5548 0.75001C10.4186 0.75001 10.2825 0.801895 10.1784 0.905638L3.8186 7.24766C3.71824 7.34751 3.66193 7.4834 3.66193 7.62498C3.66193 7.76656 3.71841 7.90229 3.8186 8.00232Z"
          fill="#222222"
        />
      </svg>
    </button>

    <template v-for="(page, index) in pages" :key="index">
      <button
        v-if="page !== null"
        type="button"
        class="pagination__item"
        :class="{ _active: currentPage === page }"
        @click="goToPage(page)"
      >
        {{ page }}
      </button>

      <button v-else type="button" class="pagination__item" disabled>
        ...
      </button>
    </template>

    <button type="button" class="pagination__btn _next" @click="nextPage">
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M11.1813 7.24768L4.82149 0.90549C4.61312 0.697817 4.27576 0.698166 4.06774 0.906564C3.85988 1.11493 3.86042 1.45248 4.06882 1.66031L10.05 7.62502L4.0686 13.5897C3.86023 13.7976 3.85969 14.1349 4.06753 14.3433C4.17181 14.4478 4.30842 14.5 4.44503 14.5C4.5813 14.5 4.71737 14.4481 4.82147 14.3444L11.1813 8.00234C11.2816 7.90249 11.338 7.7666 11.338 7.62502C11.338 7.48344 11.2815 7.34771 11.1813 7.24768Z"
          fill="#222222"
        />
      </svg>
    </button>
  </div>

  <div v-if="totalItems > 0" class="pagination__text">
    <div class="text14">
      {{ pageRangeText }}
      доступно
    </div>
  </div>
  <div v-else class="pagination__text">
    <div class="text14">Нет публикаций для отображения</div>
  </div>
</template>

<script setup lang="ts">
import type { CatalogStores } from '~/stores/catalog/catalog.type';
const props = defineProps({
  totalItems: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
  totalPages: {
    type: Number,
    required: true,
  },
});
const currentPage = defineModel<number>({ required: true });
const pages = computed(() => {
  const pages = [];
  if (props.totalItems <= props.itemsPerPage) {
    // Если всего элементов меньше или равно количеству на странице, показываем только одну страницу.
    return [1];
  }

  const totalPagesArg = props.totalPages;
  const currentPageArg = currentPage.value;
  const wingSize = 2; // Количество страниц вокруг текущей страницы

  // Добавляем первую страницу и "..."
  pages.push(1);
  if (currentPageArg > wingSize + 2) {
    pages.push(null); // null означает "..."
  }

  // Добавляем страницы вокруг текущей страницы
  const startPage = Math.max(2, currentPageArg - wingSize);
  const endPage = Math.min(totalPagesArg - 1, currentPageArg + wingSize);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Добавляем последнюю страницу и "..."
  if (currentPageArg < totalPagesArg - wingSize - 1) {
    pages.push(null); // null означает "..."
  }
  if (totalPagesArg > 1) {
    // Добавляем последнюю страницу, если она не единственная
    pages.push(totalPagesArg);
  }

  return pages;
});
const pageRangeText = computed(() => {
  if (props.totalItems === 0) {
    return `0 – 0 из 0 публикаций`;
  }
  const startItem = Math.min(
    (currentPage.value - 1) * props.itemsPerPage + 1,
    props.totalItems,
  );
  const endItem = Math.min(
    startItem + props.itemsPerPage - 1,
    props.totalItems,
  );
  return `${startItem} – ${endItem} из ${pluralize(props.totalItems, 'публикация', 'публикации', 'публикаций')}`;
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value = currentPage.value - 1;
  }
};
const nextPage = () => {
  if (currentPage.value < props.totalPages) {
    currentPage.value = currentPage.value + 1;
  }
};
const goToPage = (pageNumber: number) => {
  if (pageNumber && pageNumber >= 1 && pageNumber <= props.totalPages) {
    currentPage.value = pageNumber;
  }
};
</script>
