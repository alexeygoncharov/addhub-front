<template>
  <div>
    <UIVBreadcrumbs
      :items="[{ name: 'Главная', to: '/' }, { name: 'Каталог проектов' }]"
    />
    <UIPageTop :has-search="true" />
    <ModulesCatalog :store="catalogStore">
      <template #items>
        <div class="projects-items">
          <ModulesCardsProjects
            v-for="item in catalogStore.items"
            :key="item._id"
            :data="item"
          />
        </div>
      </template>
      <template #count> {{ catalogStore.totalItems }} проектов</template>
    </ModulesCatalog>
  </div>
</template>

<script setup lang="ts">
import { useCatalogProjectsStore } from '~/stores/catalog/projects';
const catalogStore = useCatalogProjectsStore();
</script>
