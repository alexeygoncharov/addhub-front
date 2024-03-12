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
              <NuxtImg class="_view1" src="man.webp" alt="" />
              <NuxtImg class="_view2" src="man2.webp" alt="" />
            </div>
            <UIMainAdvantages />
          </div>

          <div class="main__nav">
            <UIVButton path="/project/catalog" color="blue">
              Найти работу
            </UIVButton>
            <UIVButton color="white"> Разместить заказ </UIVButton>
          </div>

          <div class="main-partners">
            <div class="main-partners__title text15 text12-tablet medium-text">
              Нам доверяют
            </div>
            <div class="main-partners__items">
              <div class="main-partners__item">
                <NuxtImg src="partner.webp" alt="" />
              </div>
              <div class="main-partners__item">
                <NuxtImg src="partner2.webp" alt="" />
              </div>
              <div class="main-partners__item">
                <NuxtImg src="partner3.webp" alt="" />
              </div>
              <div class="main-partners__item">
                <NuxtImg src="partner4.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
