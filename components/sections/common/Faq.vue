<template>
  <div class="faq">
    <div class="container">
      <div class="faq__top">
        <div class="text32 text20-tablet medium-text">
          Часто задаваемые вопросы
        </div>
        <div class="text15 light-text">База ответов на популярные вопросы</div>
      </div>
      <UIFaqItems :questions="questions" />
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ questions: { title: string; answer: string }[] }>();
</script>

<style scoped></style>
