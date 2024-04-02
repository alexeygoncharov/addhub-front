<template>
  <div class="faq">
    <div class="container">
      <div class="faq__top">
        <div class="text32 text20-tablet medium-text">
          Часто задаваемые вопросы
        </div>
        <div class="text15 light-text">База ответов на популярные вопросы</div>
      </div>
      <div class="faq__items">
        <div
          v-for="(question, index) in questions"
          :key="question.title"
          :class="{ _active: activeSpoiler?.[index] }"
          class="qa-card spoiler"
        >
          <div
            class="qa-card__top spoiler__toggle"
            @click="toggleSpoiler(index)"
          >
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
    </div>
  </div>
</template>
<script setup lang="ts">
const questions = ref([
  {
    title: 'Какие способы оплаты поддерживаются?',
    answer:
      'Завтрашняя жизнь и теперь клиническая. Чистый амет тор, а не ци. Ему нужна, пусть это будет болезнь, теперь пусть это будет масса. Боюсь, выходных даже не будет пока, это тоже были выходные.',
  },
  {
    title: 'Могу ли я отменить в любое время?',
    answer:
      'Завтрашняя жизнь и теперь клиническая. Чистый амет тор, а не ци. Ему нужна, пусть это будет болезнь, теперь пусть это будет масса. Боюсь, выходных даже не будет пока, это тоже были выходные.',
  },
  {
    title: 'Как мне получить чек за покупку?',
    answer:
      'Завтрашняя жизнь и теперь клиническая. Чистый амет тор, а не ци. Ему нужна, пусть это будет болезнь, теперь пусть это будет масса. Боюсь, выходных даже не будет пока, это тоже были выходные.',
  },
  {
    title: 'Какая лицензия мне нужна?',
    answer:
      'Завтрашняя жизнь и теперь клиническая. Чистый амет тор, а не ци. Ему нужна, пусть это будет болезнь, теперь пусть это будет масса. Боюсь, выходных даже не будет пока, это тоже были выходные.',
  },
  {
    title: 'Как мне получить доступ к купленной теме?',
    answer:
      'Завтрашняя жизнь и теперь клиническая. Чистый амет тор, а не ци. Ему нужна, пусть это будет болезнь, теперь пусть это будет масса. Боюсь, выходных даже не будет пока, это тоже были выходные.',
  },
]);

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

  //   const spoiler = spoilerContent.value[i];
  //   if (!spoiler) return;
  //   const hiddenBlock = spoiler.querySelector('.spoiler__hidden');
  //   const wrap = spoiler.querySelector('.spoiler__wrap');
  //   if (!wrap) return;
  //   const wrapHeight = wrap.getBoundingClientRect().height;

  //   if (spoiler.classList.contains('_active')) {
  //     spoiler.classList.remove('_active');
  //     hiddenBlock.style.height = '0px';
  //   } else {
  //     spoiler.classList.add('_active');
  //     hiddenBlock.style.height = wrapHeight + 'px';
  //   }
};
</script>
