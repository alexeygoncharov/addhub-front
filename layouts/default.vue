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

<script>
import { useCommonStore } from '~/stores/common';

export default {
  setup() {
    const commonStore = useCommonStore();
    return { commonStore };
  },
  created() {
    this.commonStore.fetchCategories();
    // this.commonStore.fetchCities();
  },
};
</script>
