<template>
  <div class="chat _active">
    <button class="chat__back">
      <span>Назад</span>
    </button>
    <div class="chat__sidebar">
      <div class="chat-search fg">
        <input type="text" placeholder="Поиск" />
        <img src="/img/search2.svg" alt="" class="chat-search__icon" />
      </div>
      <SectionsMessagesChatItems></SectionsMessagesChatItems>
    </div>
    <SectionsMessagesChatContent></SectionsMessagesChatContent>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';

const debouncedFn = useDebounceFn(
  () => {
    // do something
  },
  1000,
  { maxWait: 5000 },
);
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
</script>
