<template>
  <div class="footer-top">
    <div class="footer-top__links">
      <nuxtLink to="/conditions" class="footer-top__link"
        ><span>Условия использования</span></nuxtLink
      >
      <nuxtLink to="/conditions" class="footer-top__link"
        ><span>Политика конфиденциальности</span></nuxtLink
      >
      <nuxtLink to="/conditions" class="footer-top__link"
        ><span>Карта сайта</span></nuxtLink
      >
    </div>

    <div class="footer-socials _flex">
      <div class="footer-socials__title text17 medium-text">
        Следите за нами
      </div>
      <div class="footer-socials__items _flex">
        <a class="footer-socials__item">
          <NuxtImg src="/img/fb.svg" alt="" />
        </a>
        <a class="footer-socials__item">
          <NuxtImg src="/img/twitter.svg" alt="" />
        </a>
        <a class="footer-socials__item">
          <NuxtImg src="/img/ig.svg" alt="" />
        </a>
        <a class="footer-socials__item">
          <NuxtImg src="/img/linkedin.svg" alt="" />
        </a>
      </div>
    </div>
  </div>
</template>
