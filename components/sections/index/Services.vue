<template>
  <div class="services m-section">
    <div class="container">
      <UISectionTop
        title="Популярные услуги"
        desc="Самые просматриваемые и продаваемые услуги за все время"
        :link="{ text: 'Все услуги', path: '/services/all' }"
      />
      <ModulesProductSlider />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCatalogServicesStore } from '~/stores/catalog/services';

const catalogStore = useCatalogServicesStore();
catalogStore.fetchPopular();
</script>
