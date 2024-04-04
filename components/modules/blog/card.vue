<template>
  <div class="blog-card3">
    <a href="" class="blog-card3__img _scale-img">
      <img src="/img/blog8.webp" alt="" />
    </a>
    <div class="blog-card3__content">
      <div class="blog-card3__text">
        <div class="blog-card3__type">Бизнес</div>
        <a href="" class="blog-card3__title text28 medium-text">
          Начни онлайн-бизнес и работай не выходя из дома
        </a>
        <div class="blog-card3__desc text15 light-text">
          Многие пакеты настольных издательских систем и редакторы веб-страниц
          теперь используют Lorem Ipsum в качестве текста модели по умолчанию, а
          поиск по запросу «lorem ipsum» позволит обнаружить многие веб-сайты,
          которые все еще находятся в зачаточном состоянии.
        </div>
      </div>
      <a href="" class="blog-card3__user">
        <div class="avatar">
          <img src="/img/avatar6.webp" alt="" />
        </div>
        <div class="blog-card3__user-info">
          <div class="blog-card3__user-title">Александр Сидоров</div>
          <div class="blog-card3__user-desc">Декабрь 2, 2023</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  item: any;
}>();
</script>

<style scoped></style>
