<template>
  <div class="filter">
    <div class="filter__top">
      <div class="text20 medium-text">Фильтры</div>
      <button class="filter__close _toggle-filter" @click="show = false">
        <NuxtImg src="/img/burger2.svg" alt="" />
      </button>
    </div>
    <div class="filter__items">
      <template
        v-for="(filterItem, key, index) in store.initialFilters"
        :key="key"
      >
        <ModulesCatalogFilterPrice v-if="key === 'price'" :store="store" />

        <ModulesCatalogFilterGroup
          v-else-if="filterItem && 'list' in filterItem"
          :filter="filterItem"
          :store="store"
          :filter-key="key"
          :index="index"
        />
      </template>
      <div v-if="store.filters.createdBy" class="filter-group spoiler">
        <div class="filter-group__top text20 medium-text">
          Выбранный пользователь
        </div>
        <div class="filter-group__bottom filter-group__chip">
          {{ chooseUser }}
          <button
            class="filter-group__chip-close"
            @click="store.resetFilters()"
          >
            <img
              src="/img/cross.svg"
              alt="close"
              @click="delete store.filters.createdBy"
            />
          </button>
        </div>
      </div>
      <button class="m-btn m-btn-blue-outline" @click="store.resetFilters()">
        Сбросить фильтры
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CatalogStores } from '~/stores/catalog/catalog.type';
const show = defineModel<boolean>('show', { required: true });
watch(show, (value) => {
  if (value) {
    document.body.classList.add('open-filter');
    document.body.classList.add('fixed-body');
  } else {
    document.body.classList.remove('open-filter');
    document.body.classList.remove('fixed-body');
  }
});
const props = defineProps({
  store: {
    type: Object as PropType<CatalogStores>,
    required: true,
  },
});
const store = props.store;
const chooseUser = ref<string>();
const updateUser = async () => {
  const { data } = await apiFetch<ApiResponse<string>>(
    `/api/users/username/${props.store.filters.createdBy}`,
  );
  if (data.value) {
    chooseUser.value = data.value.result;
  }
};

watch(
  () => props.store.filters.createdBy,
  () => {
    if (props.store.filters.createdBy) {
      updateUser();
    }
  },
  { immediate: true },
);
</script>
