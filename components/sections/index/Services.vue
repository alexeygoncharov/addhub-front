<template>
  <div class="services m-section">
    <div class="container">
      <UISectionTop
        title="Популярные услуги"
        desc="Самые просматриваемые и продаваемые услуги за все время"
        :link="{ text: 'Все услуги', path: '/service/catalog' }"
      />
      <ModulesProductSlider />
    </div>
  </div>
</template>

<script>
import { useCatalogServicesStore } from '~/stores/catalog/services.js';

export default {
  setup() {
    const catalogStore = useCatalogServicesStore();
    return { catalogStore };
  },
  mounted() {
    this.catalogStore.fetchItems();
  },
};
</script>
