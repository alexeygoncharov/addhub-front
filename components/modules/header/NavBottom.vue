<template>
  <div class="header-bottom">
    <ul class="master-nav">
      <li
        v-for="category of commonStore.categories.slice(0, 7)"
        :key="category.id"
      >
        <NuxtLink :to="`/service/${category.slug}`" class="master-nav__item">
          <span class="master-nav__title">{{ category.title }}</span>
        </NuxtLink>
      </li>
      <li>
        <a class="master-nav__item">
          <span class="master-nav__title">Ещё</span>
          <svg
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
        </a>
        <ul class="master-nav__submenu">
          <li
            v-for="category of commonStore.categories.slice(7)"
            :key="category.id"
          >
            <nuxt-link :to="`service/${category.slug}`">{{
              category.title
            }}</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { useCommonStore } from '~/stores/common.js';

export default {
  setup() {
    const commonStore = useCommonStore();
    return { commonStore };
  },
  data() {
    return {
      list: [
        { title: 'Разработка и ИТ', isHaveSubmenu: false },
        { title: 'Дизайн и творчество', isHaveSubmenu: false },
        { title: 'Цифровой маркетинг', isHaveSubmenu: false },
        { title: 'Копирайтинг и перевод', isHaveSubmenu: false },
        { title: 'Музыка и аудио', isHaveSubmenu: false },
        { title: 'Видео и анимация', isHaveSubmenu: false },
        { title: 'Копирайтинг и перевод', isHaveSubmenu: false },
        { title: 'Еще', isHaveSubmenu: true },
      ],
    };
  },
};
</script>
