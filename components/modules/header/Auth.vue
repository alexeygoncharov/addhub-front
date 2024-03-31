<template>
  <OnClickOutside class="header-action" @trigger="activeSearch = false">
    <div class="header-action__wrapper">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск по услугам"
        @focus="activeSearch = true"
        class="header-action__search-input"
        @input="updateItems"
      />
      <div
        v-if="searchQuery && activeSearch"
        class="header-action__search-list"
      >
        <NuxtLink
          v-for="item in items"
          :key="item._id"
          :to="`/services/${item.category.slug}/${item._id}`"
          class="header-action__search-item"
          @click="() => (searchQuery = '')"
        >
          <p>{{ item.title }}</p>
          <p>{{ item.price }}</p>
        </NuxtLink>
      </div>
    </div>
  </OnClickOutside>
  <div v-if="isAuthenticated && !isLoading" class="header-action2">
    <a href="" class="header-action2__btn">
      <NuxtImg src="/img/notification.svg" alt="" />
      <span class="header-action2__btn-pin"></span>
    </a>
    <a href="" class="header-action2__btn _mess">
      <NuxtImg src="/img/message.svg" alt="" />
      <span class="header-action2__btn-pin"></span>
    </a>
    <a href="" class="header-action2__user avatar">
      <NuxtImg src="/img/avatar10.webp" alt="" />
    </a>
    <button class="burger" @click="toggleMenu">
      <NuxtImg src="/img/burger.svg" alt="" class="_view1" />
      <NuxtImg src="/img/burger2.svg" alt="" class="_view2" />
    </button>
  </div>
  <div v-else class="header-action2">
    <NuxtLink to="/login" class="header-action__login">
      <span>Войти</span>
    </NuxtLink>
    <UIVButton path="/reg" color="blue" class="header-action__btn">
      Зарегистрироваться
    </UIVButton>
  </div>
</template>

<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';
const commonStore = useCommonStore();
const authStore = useAuthStore();
const searchQuery = ref('');
const activeSearch = ref(false);
const mobMenu = defineModel<boolean>({ required: true });
const toggleMenu = () => {
  mobMenu.value = !mobMenu.value;
};
const { isAuthenticated, isLoading } = storeToRefs(authStore);
const { logout } = authStore;
const items = ref<servicesItem[]>([]);
const updateItems = async () => {
  const data = await $fetch<ApiListResponse<servicesItem[]>>('/api/services/', {
    baseURL: baseUrl(),
    query: {
      limit: 10,
      search: searchQuery.value,
    },
  });
  if (data.result) {
    items.value = data.result;
  }
};
</script>
