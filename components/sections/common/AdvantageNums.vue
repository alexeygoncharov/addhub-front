<template>
  <div class="advantage-nums">
    <div class="container">
      <div class="advantage-nums__inner">
        <div class="advantage-nums__items">
          <div
            class="advantage-stat"
            v-for="(advantage, i) in advantageList"
            :key="i"
          >
            <div class="advantage-stat__title text38 medium-text">
              {{ advantage.title }}
            </div>
            <div class="advantage-stat__desc text15">{{ advantage.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      advantageList: [
        {
          title: '20K',
          desc: 'Всего исполнителей',
        },
        {
          title: '32K',
          desc: 'Положительных отзывов',
        },
        {
          title: '90K',
          desc: 'Заявок получено',
        },
        {
          title: '15K',
          desc: 'Проектов завершено',
        },
      ],
    };
  },
};
</script>
