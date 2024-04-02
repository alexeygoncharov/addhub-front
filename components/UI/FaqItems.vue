<template>
  <div class="faq__items">
    <div
      v-for="(question, index) in questions"
      :key="question.title"
      :class="{ _active: activeSpoiler?.[index] }"
      class="qa-card spoiler"
    >
      <div class="qa-card__top spoiler__toggle" @click="toggleSpoiler(index)">
        <div class="qa-card__title">{{ question.title }}</div>
        <div class="qa-card__btn">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 7H16V9H0V7Z" fill="#222222" />
            <path
              class="_hide"
              d="M7 16L7 8.74224e-08L9 0L9 16H7Z"
              fill="#222222"
            />
          </svg>
        </div>
      </div>

      <div
        ref="spoilerContent"
        class="qa-card__bottom spoiler__hidden"
        :style="{ height: activeSpoiler?.[index] ? heightCalc(index) : 0 }"
      >
        <div class="spoiler__wrap">
          <div class="text">
            <p>
              {{ question.answer }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ questions: { title: string; answer: string }[] }>();
const heightCalc = (i: number) => {
  const spoiler = spoilerContent.value[i];
  const wrap = spoiler?.querySelector('.spoiler__wrap');
  return wrap?.getBoundingClientRect().height + 'px';
};
const spoilerContent = ref<HTMLDivElement[] | []>([]);
const activeSpoiler = ref<{ [key: number]: boolean | undefined }>({});
const toggleSpoiler = (i: number) => {
  activeSpoiler.value[i] = activeSpoiler.value[i]
    ? !activeSpoiler.value[i]
    : true;
};
</script>

<style scoped></style>
