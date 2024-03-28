<template>
  <div>
    <UIVBreadcrumbs
      :items="[{ name: 'Главная', to: '/' }, { name: 'Каталог исполнителей' }]"
    />
    <UIPageTop />
    <ModulesCatalog :store="catalogStore">
      <template #items>
        <div class="freelancers-items">
          <ModulesCardsFreelance
            v-for="item in catalogStore.items"
            :key="item._id"
            :data="item"
          />
        </div>
      </template>
      <template v-if="catalogStore.totalItems" #count>{{
        pluralize(catalogStore.totalItems, 'проект', 'проекта', 'проектов')
      }}</template>
    </ModulesCatalog>
  </div>
</template>

<script setup lang="ts">
import { useCatalogFreelancersStore } from '~/stores/catalog/freelancers';
const catalogStore = useCatalogFreelancersStore();
</script>
