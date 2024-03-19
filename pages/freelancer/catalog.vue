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
            :data="item"
          />
        </div>
      </template>
      <template #count> {{ catalogStore.totalItems }} проектов</template>
    </ModulesCatalog>
  </div>
</template>

<script setup lang="ts">
import { useCatalogFreelancersStore } from '~/stores/catalog/freelancers';

const catalogStore = useCatalogFreelancersStore()();
</script>
