<template>
  <div class="footer-middle">
    <div class="footer-nav spoiler">
      <div class="footer-nav__top spoiler__toggle">
        <div class="text17 medium-text">О нас</div>
      </div>
      <div class="footer-nav__hidden spoiler__hidden">
        <div class="spoiler__wrap">
          <div class="footer-nav__links">
            <nuxtLink to="/conditions" class="footer-nav__link"
              ><span>Карьера</span></nuxtLink
            >
            <nuxtLink to="/conditions" class="footer-nav__link"
              ><span>Пресса и новости</span></nuxtLink
            >
            <nuxtLink to="/conditions" class="footer-nav__link"
              ><span>Партнерские отношения</span></nuxtLink
            >
            <nuxtLink to="/conditions" class="footer-nav__link"
              ><span>Политика конфиденциальности</span></nuxtLink
            >
            <nuxtLink to="/conditions" class="footer-nav__link"
              ><span>Условия использования</span></nuxtLink
            >
            <nuxtLink to="/conditions" class="footer-nav__link"
              ><span>Связи с инвесторами</span></nuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="footer-nav spoiler">
      <div class="footer-nav__top spoiler__toggle">
        <div class="text17 medium-text">Категории</div>
      </div>
      <div class="footer-nav__hidden spoiler__hidden">
        <div class="spoiler__wrap">
          <div class="footer-nav__links">
            <nuxtLink
              v-for="category of commonStore.categories"
              :key="category._id"
              :to="`/services/${category.slug}`"
              class="footer-nav__link"
              ><span>{{ category.title }}</span></nuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="footer-nav spoiler">
      <div class="footer-nav__top spoiler__toggle">
        <div class="text17 medium-text">Поддержка</div>
      </div>
      <div class="footer-nav__hidden spoiler__hidden">
        <div class="spoiler__wrap">
          <div class="footer-nav__links">
            <nuxtLink to="/conditions" class="footer-nav__link"
              ><span>Помощь и поддержка</span></nuxtLink
            >
            <nuxtLink to="/conditions" class="footer-nav__link"
              ><span>Доверие и безопасность</span></nuxtLink
            >
            <nuxtLink to="/conditions" class="footer-nav__link"
              ><span>Продажа на addhub</span></nuxtLink
            >
            <nuxtLink to="/conditions" class="footer-nav__link"
              ><span>Покупка на addhub</span></nuxtLink
            >
          </div>
        </div>
      </div>
    </div>
    <div class="footer-middle__group">
      <div class="footer-subscribe">
        <div class="text17 text15-tablet medium-text">Подписка</div>
        <form action="" class="subscribe-form">
          <fieldset class="subscribe-form__field fg">
            <input type="text" placeholder="Ваш e-mail" />
          </fieldset>
          <button class="subscribe-form__btn m-btn m-btn-gray">
            <span>Отправить</span>
          </button>
        </form>
      </div>
      <!-- <div class="footer-app">
        <div class="text17 text15-tablet medium-text">Приложения</div>
        <div class="footer-app__links">
          <a
            href="https://delicate-gaufre-39d364.netlify.app/conditions"
            class="footer-app__link"
          >
            <NuxtImg src="/img/apple.svg" alt="" />
            <span>iOS</span>
          </a>
          <a
            href="https://delicate-gaufre-39d364.netlify.app/conditions"
            class="footer-app__link"
          >
            <NuxtImg src="/img/android.svg" alt="" />
            <span>Android</span>
          </a>
        </div>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
const commonStore = useCommonStore();
</script>
