<template>
  <UIVBreadcrumbs
    :items="[{ name: 'Главная', to: '/' }, { name: 'Вход в личный кабинет' }]"
  />
  <SectionsReg />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'redirect-if-authenticated',
});
useHead({
  title: 'Регистрация',
});
</script>
