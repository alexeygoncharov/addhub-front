<template>
  <div class="services m-section">
    <div class="container">
      <UISectionTop
        title="Популярные услуги"
        desc="Самые просматриваемые и продаваемые услуги за все время"
        :link="{ text: 'Все услуги', path: '/service/all' }"
      />
      <ModulesProductSlider />
    </div>
  </div>
</template>

<script setup>
import { useCatalogServicesStore } from '~/stores/catalog/services.ts';

const catalogStore = useCatalogServicesStore()();
catalogStore.fetchItems();
</script>
