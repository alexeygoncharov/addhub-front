<template>
  <UIModalWindow
    :show="confirmLogout"
    @submit="
      () => {
        closeConfirmLogout();
        useAuthStore().logout();
      }
    "
    @close="closeConfirmLogout"
  >
    <template #title>Подтвердите действие</template>
    <template #data>Вы уверены, что хотите выйти?</template>
    <template #button-text>Выйти</template>
  </UIModalWindow>
</template>

<script setup lang="ts"></script>
