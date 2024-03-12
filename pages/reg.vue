<template>
  <UIVBreadcrumbs
    :items="[{ name: 'Главная', to: '/' }, { name: 'Вход в личный кабинет' }]"
  />
  <SectionsReg />
</template>

<script setup>
definePageMeta({
  middleware: 'redirect-if-authenticated',
});
</script>
