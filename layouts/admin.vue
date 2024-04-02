<template>
  <div class="m-page admin-page">
    <div v-if="commonStore.categories" class="wrapper">
      <SectionsCommonHeaderAdmin />
      <main class="content">
        <slot></slot>
      </main>
      <SectionsCommonFooterAdmin />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'authenticated',
});

const commonStore = useCommonStore();
</script>
