<template>
  <div class="admin-top">
    <div class="text32 medium-text">Уведомления</div>
  </div>

  <div class="notifications">
    <div class="notifications__items">
      <div class="notifications__nav">
        <button class="notifications__btn">
          <svg
            width="20"
            height="22"
            viewBox="0 0 20 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.4433 6.98753C15.3658 6.90942 15.2736 6.84742 15.1721 6.80512C15.0705 6.76281 14.9616 6.74103 14.8516 6.74103C14.7416 6.74103 14.6327 6.76281 14.5311 6.80512C14.4296 6.84742 14.3374 6.90942 14.2599 6.98753L8.0516 13.2042L5.44327 10.5875C5.36283 10.5098 5.26788 10.4487 5.16384 10.4077C5.05979 10.3667 4.94869 10.3466 4.83687 10.3486C4.72505 10.3505 4.61471 10.3744 4.51215 10.419C4.40958 10.4636 4.3168 10.5279 4.2391 10.6084C4.1614 10.6888 4.10031 10.7837 4.0593 10.8878C4.0183 10.9918 3.99819 11.1029 4.00013 11.2148C4.00206 11.3266 4.026 11.4369 4.07058 11.5395C4.11516 11.642 4.1795 11.7348 4.25994 11.8125L7.45994 15.0125C7.53741 15.0906 7.62957 15.1526 7.73112 15.1949C7.83267 15.2372 7.94159 15.259 8.0516 15.259C8.16161 15.259 8.27053 15.2372 8.37208 15.1949C8.47363 15.1526 8.5658 15.0906 8.64327 15.0125L15.4433 8.21253C15.5279 8.13449 15.5954 8.03978 15.6415 7.93437C15.6877 7.82895 15.7115 7.71511 15.7115 7.60003C15.7115 7.48494 15.6877 7.3711 15.6415 7.26569C15.5954 7.16027 15.5279 7.06556 15.4433 6.98753Z"
              fill="#5E67FF"
            />
          </svg>
          <span>Отметить все прочитанным</span>
        </button>
      </div>

      <a v-for="i in 4" :key="i" href="" class="notification-item">
        <div class="avatar">
          <img
            :src="`/img/notification-icon${i + 1 > 1 && i + 1}.svg`"
            alt=""
          />
        </div>
        <div class="notification-item__title">
          <div class="text15 text14-tablet">Ваше резюме обновлено</div>
        </div>
      </a>
    </div>

    <div class="pagination">
      <a href="" class="pagination__btn _prev">
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
      </a>

      <a href="" class="pagination__item">1</a>
      <a href="" class="pagination__item _active">2</a>
      <a href="" class="pagination__item">3</a>
      <a href="" class="pagination__item _hide-mob">4</a>
      <a href="" class="pagination__item _hide-tablet">5</a>
      <a href="" class="pagination__item">...</a>
      <a href="" class="pagination__item">20</a>

      <a href="" class="pagination__btn _next">
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
      </a>
    </div>

    <div class="pagination__text">
      <div class="text14">1 – 20 of 300+ публикаций доступно</div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile',
});
</script>

<style scoped></style>
