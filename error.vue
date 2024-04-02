<template>
  <NuxtLayout>
    <UIVBreadcrumbs
      :items="[{ name: 'Главная', to: '/' }, { name: 'Страница не найдена' }]"
    />

    <div class="error404">
      <div class="container">
        <div class="error404__inner">
          <img src="/img/404.svg" alt="" class="error404__img" />
          <div class="error404__text">
            <div class="text32 text20-tablet medium-text">
              Упс! Данной страницы не существует.
            </div>
            <div class="text15 text14-tablet light-text">
              Страница, которую вы ищете, недоступна. <br />
              Попробуйте выполнить поиск еще раз или воспользуйтесь кнопкой
              «Вернуться на главную».
            </div>
          </div>
          <div class="error404__nav">
            <nuxtLink to="/" class="m-btn m-btn-blue">
              <span>Вернуться на главную</span>
            </nuxtLink>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
// definePageMeta({ layout: 'default' });
</script>

<style scoped></style>
