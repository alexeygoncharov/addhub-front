<template>
  <OnClickOutside class="header-action" @trigger="activeSearch = false">
    <div v-if="!profile" class="header-action__wrapper">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Поиск по услугам"
        class="header-action__search-input"
        @focus="activeSearch = true"
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
          <div class="header-action__search-item-img">
            <NuxtImg
              :src="baseUrl() + item.photos[0]"
              crossorigin="anonymous"
              alt="preview"
            />
            <p>{{ item.title }}</p>
          </div>
          <p>{{ item.price }}</p>
        </NuxtLink>
        <p v-if="!items.length" class="header-action__search-item">
          Ничего не найдено
        </p>
      </div>
    </div>
  </OnClickOutside>
  <div v-if="isAuthenticated && !isLoading" class="header-action2">
    <NuxtLink
      to="/profile/items/create"
      class="header-action__btn m-btn m-btn-blue-outline"
    >
      <span>{{
        user?.active_role === 'seller' ? 'Создать услугу' : 'Создать проект'
      }}</span>
    </NuxtLink>
    <!-- <div class="admin-header__type">
            <div class="m-switch">
              <input
                :checked="user?.active_role !== 'seller'"
                type="checkbox"
                disabled
              />
              <label></label>
              <div class="text14">
                <span class="_view1">Я фрилансер</span>
                <span class="_view2">Я заказчик</span>
              </div>
            </div>
          </div> -->
    <nuxtLink to="/profile/notifications" class="header-action2__btn">
      <NuxtImg src="/img/notification.svg" alt="" />
      <span class="header-action2__btn-pin"></span>
    </nuxtLink>
    <nuxtLink to="/profile/messages" class="header-action2__btn _mess">
      <NuxtImg src="/img/message.svg" alt="" />
      <span class="header-action2__btn-pin"></span>
    </nuxtLink>
    <nuxtLink to="/profile/saved" class="header-action2__btn _favorite">
      <img src="/img/favorite.svg" alt="" />
      <span v-if="favorites.length" class="header-action2__btn-pin"></span>
    </nuxtLink>
    <div class="header-action2__user">
      <nuxtLink to="/profile" class="avatar">
        <NuxtImg
          v-if="user?.avatar"
          preload
          crossorigin="anonymous"
          :src="baseUrl() + user?.avatar"
          alt="user avatar"
        />
        <Avatar v-else :size="80" :name="user?.name" />
      </nuxtLink>
      <ul class="master-nav__submenu">
        <li>
          <nuxt-link :to="`/profile`"> Личный кабинет </nuxt-link>
          <nuxt-link :to="`/profile`"> Мой профиль </nuxt-link>
          <nuxt-link @click="logout"> Выход </nuxt-link>
        </li>
      </ul>
    </div>
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
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const props = defineProps<{ profile?: boolean }>();
const searchQuery = ref('');
const activeSearch = ref(false);
const favorites = storeToRefs(userStore).favorites;
const mobMenu = defineModel<boolean>({ required: true });
const toggleMenu = () => {
  mobMenu.value = !mobMenu.value;
};
const { isAuthenticated, isLoading } = storeToRefs(authStore);
const { logout } = authStore;
const items = ref<servicesItem[]>([]);
const updateItems = async () => {
  const { data } = await apiFetch<ApiListResponse<servicesItem[]>>(
    '/api/services/',
    {
      options: {
        query: {
          limit: 10,
          search: searchQuery.value,
        },
      },
    },
  );
  if (data.value) {
    items.value = data.value.result;
  }
};
</script>
