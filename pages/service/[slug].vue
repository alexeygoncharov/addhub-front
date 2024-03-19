<template>
  <div>
    <UIVBreadcrumbs
      :items="[{ name: 'Главная', to: '/' }, { name: 'Каталог услуг' }]"
    />
    <UIPageTop :has-search="true" :has-select="true" />
    <ModulesCatalog :store="catalogStore">
      <template #items>
        <div class="services-items grid-col3 grid-tablet2 grid-mob-full">
          <ModulesCardsService
            :data="item"
            v-for="item in catalogStore.items"
          />
        </div>
      </template>
      <template #count> {{ catalogStore.totalItems }} проектов</template>
    </ModulesCatalog>
  </div>
</template>

<script setup>
import { useCatalogServicesStore } from '~/stores/catalog/services.js';
const catalogStore = useCatalogServicesStore()();
const route = useRoute();
const categorySlug = Array.isArray(route.params.slug)
  ? route.params.slug[0]
  : route.params.slug;
const category = catalogStore.initialFilters.category.list.find(
  (el) => el.slug == categorySlug,
);
if (!(category || categorySlug === 'all')) {
  navigateTo('/service/all');
}
</script>
