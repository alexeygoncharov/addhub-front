<template>
  <div class="main cut-section">
    <div class="container">
      <div class="main__inner">
        <div class="main__content">
          <div class="main__text">
            <h1 class="text45 medium-text">
              Безупречные услуги от лучших фрилансеров для вашего бизнеса
            </h1>
            <div class="text15">
              Работайте с талантливыми людьми по самой доступной цене, чтобы
              максимально эффективно использовать свое время и деньги.
            </div>
          </div>

          <div class="main-offer">
            <div class="main-offer__img _scale-img">
              <NuxtImg src="/img/man.webp" preload class="_view1" alt="" />
              <NuxtImg src="/img/man2.webp" preload class="_view2" alt="" />
            </div>
            <UIMainAdvantages />
          </div>

          <div class="main__nav">
            <UIVButton path="/projects/all" color="blue">
              Найти работу
            </UIVButton>
            <UIVButton
              color="white"
              :path="isAuthenticated ? '/profile/items/create' : '/login'"
            >
              Разместить заказ
            </UIVButton>
          </div>

          <div class="main-partners">
            <div class="main-partners__title text15 text12-tablet medium-text">
              Нам доверяют
            </div>
            <div class="main-partners__items">
              <div class="main-partners__item">
                <NuxtImg src="/img/partner.webp" alt="" />
              </div>
              <div class="main-partners__item">
                <NuxtImg src="/img/partner2.webp" alt="" />
              </div>
              <div class="main-partners__item">
                <NuxtImg src="/img/partner3.webp" alt="" />
              </div>
              <div class="main-partners__item">
                <NuxtImg src="/img/partner4.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
</script>
