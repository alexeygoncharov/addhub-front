<template>
  <ModulesProfileTop>Уведомления</ModulesProfileTop>

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

    <UIVPagination
      v-model="currentPage"
      :items-per-page="4"
      :total-items="16"
      :total-pages="4"
    />
  </div>
</template>

<script setup lang="ts">
const currentPage = ref(1);
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
const notifications = ref([]);
const updateNotifications = async () => {
  const { data } = await apiFetch<ApiListResponse<{}[]>>('/api/notifications', {
    needToken: true,
  });
  const value = data.value;
  if (value?.status === 200) {
    notifications.value = value.result;
  }
};
updateNotifications();
</script>

<style scoped></style>
