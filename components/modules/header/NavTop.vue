<template>
  <ul class="master-nav">
    <li v-for="(item, idx) in list" :key="idx">
      <NuxtLink :to="`${item.path}`" class="master-nav__item">
        <span class="master-nav__title"> {{ item.title }} </span>
        <svg
          v-if="item.isHaveSubmenu"
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.71054 1.3562H0.289397C0.0328609 1.3562 -0.0978274 1.66598 0.0861043 1.84991L2.79668 4.56049C2.90801 4.67181 3.09194 4.67181 3.20331 4.56049L5.91389 1.84991C6.09777 1.66598 5.96708 1.3562 5.71054 1.3562Z"
            fill="#222222"
          />
        </svg>
      </NuxtLink>
      <ul v-if="item.isHaveSubmenu" class="master-nav__submenu">
        <li v-for="category of commonStore.categories" :key="category._id">
          <nuxtLink :to="`${item.path}/${category.slug}`">{{
            category.title
          }}</nuxtLink>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script setup lang="ts">
const commonStore = useCommonStore();
const list = ref([
  { title: 'Услуги', isHaveSubmenu: true, path: '/services' },
  { title: 'Биржа', isHaveSubmenu: true, path: '/projects' },
  {
    title: 'О нас',
    isHaveSubmenu: false,
    path: '/about',
  },
  {
    title: 'Контакты',
    isHaveSubmenu: false,
    path: '/contacts',
  },
]);
</script>
