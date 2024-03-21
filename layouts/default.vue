<template>
  <div class="m-page">
    <div v-if="commonStore.categories" class="wrapper">
      <SectionsCommonHeader />
      <main class="content">
        <slot></slot>
      </main>
      <SectionsCommonFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '~/stores/common';

const commonStore = useCommonStore();

commonStore.fetchCategories();
commonStore.fetchCities();
</script>
