<template>
  <div>
    <UIVBreadcrumbs
      :items="[{ name: 'Главная', to: '/' }, { name: 'Каталог проектов' }]"
    />
    <UIPageTop :has-search="true" />
    <ModulesCatalog :store="catalogStore">
      <template #items>
        <div class="project-items">
          <ModulesCardsProject
            :data="item"
            v-for="item in catalogStore.items"
          />
        </div>
      </template>
      <template #count> {{ catalogStore.totalItems }} проектов</template>
    </ModulesCatalog>
  </div>
</template>

<script>
import { useCatalogProjectsStore } from '~/stores/catalog/projects.js';

export default {
  setup() {
    const catalogStore = useCatalogProjectsStore()();
    return { catalogStore };
  },
};
</script>
