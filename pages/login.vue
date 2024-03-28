<template>
  <UIVBreadcrumbs
    :items="[{ name: 'Главная', to: '/' }, { name: 'Вход в личный кабинет' }]"
  />
  <SectionsLogin />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'redirect-if-authenticated',
});
useHead({
  title: 'Авторизация',
});
</script>
