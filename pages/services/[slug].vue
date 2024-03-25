<template>
  <div>
    <UIVBreadcrumbs
      :items="[{ name: 'Главная', to: '/' }, { name: 'Каталог услуг' }]"
    />
    <UIPageTop :has-search="true" :has-select="true" />
    <!-- <ModulesCatalogPopular /> -->
    <ModulesCatalog :store="catalogStore">
      <template #items>
        <div
          v-if="catalogStore.items?.length"
          class="services-items grid-col3 grid-tablet2 grid-mob-full"
        >
          <ModulesCardsServices
            v-for="item in catalogStore.items"
            :key="item._id"
            :data="item"
          />
        </div>
        <div
          v-else-if="!catalogStore.empty"
          class="services-items grid-col3 grid-tablet2 grid-mob-full"
        >
          <ModulesCardsServices v-for="i in 10" :key="i" />
        </div>
      </template>
      <template #count> {{ catalogStore.totalItems }} проектов</template>
    </ModulesCatalog>
  </div>
</template>

<script setup lang="ts">
import { useCatalogServicesStore } from '~/stores/catalog/services';
const catalogStore = useCatalogServicesStore();
</script>

<style lang="scss">
@import '/assets/style/pages/r-catalog-services';
</style>
