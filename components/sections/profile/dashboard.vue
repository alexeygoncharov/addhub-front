<template>
  <div class="admin-top">
    <div class="text32 medium-text">Панель управления</div>
  </div>

  <div class="finance-stat grid-col4">
    <div class="stat-card3">
      <div class="stat-card3__content">
        <div class="stat-card3__title">Услуг предложено</div>
        <div class="stat-card3__num">25</div>
        <div class="stat-card3__desc"><span>10</span> новых предложений</div>
      </div>
      <div class="stat-card3__img">
        <img src="/img/stat-icon15.svg" alt="" />
      </div>
    </div>

    <div class="stat-card3">
      <div class="stat-card3__content">
        <div class="stat-card3__title">Завершено проектов</div>
        <div class="stat-card3__num">1292</div>
        <div class="stat-card3__desc"><span>80+</span> новых завершено</div>
      </div>
      <div class="stat-card3__img">
        <img src="/img/stat-icon16.svg" alt="" />
      </div>
    </div>

    <div class="stat-card3">
      <div class="stat-card3__content">
        <div class="stat-card3__title">Заявок в очереди</div>
        <div class="stat-card3__num">182</div>
        <div class="stat-card3__desc"><span>35+</span> новых заявок</div>
      </div>
      <div class="stat-card3__img">
        <img src="/img/stat-icon17.svg" alt="" />
      </div>
    </div>

    <div class="stat-card3">
      <div class="stat-card3__content">
        <div class="stat-card3__title">Всего отзывов</div>
        <div class="stat-card3__num">22,786</div>
        <div class="stat-card3__desc"><span>290+</span> новых отзывов</div>
      </div>
      <div class="stat-card3__img">
        <img src="/img/stat-icon18.svg" alt="" />
      </div>
    </div>
  </div>

  <div class="dashboard">
    <slot></slot>
    <div class="dashboard-card">
      <div class="dashboard-card__top _type2">
        <div class="dashboard-card__title text17 medium-text">
          Мои популярные услуги
        </div>
        <a href="" class="dashboard-card__link">
          <span>Смотреть все</span>
        </a>
      </div>
      <div class="dashboard-card__bottom">
        <div class="dashboard-card__services">
          <div class="service-card3">
            <div class="service-card__img">
              <img src="/img/service.webp" alt="" />
            </div>
            <div class="service-card__content">
              <a href="" class="service-card__title text15 medium-text">
                Создаю современные сайты в Figma или Adobe xd.
              </a>
              <div class="service-card__bottom _flex">
                <div class="service-card__reviews _flex">
                  <img src="/img/star.svg" alt="" />
                  <div class="service-card__reviews-text">
                    <span class="text15 medium-text">4.82 </span>
                    <span class="text14 gray-text"> 94 отзыва</span>
                  </div>
                </div>

                <div class="service-card__price">
                  <span class="text14 gray-text">от </span>
                  <span class="text17 medium-text"> 983 ₽</span>
                </div>
              </div>
            </div>
          </div>

          <div class="service-card3">
            <div class="service-card__img">
              <img src="/img/service2.webp" alt="" />
            </div>
            <div class="service-card__content">
              <a href="" class="service-card__title text15 medium-text">
                Я создам современную иллюстрацию плоского дизайна
              </a>
              <div class="service-card__bottom _flex">
                <div class="service-card__reviews _flex">
                  <img src="/img/star.svg" alt="" />
                  <div class="service-card__reviews-text">
                    <span class="text15 medium-text">4.82 </span>
                    <span class="text14 gray-text"> 94 отзыва</span>
                  </div>
                </div>

                <div class="service-card__price">
                  <span class="text14 gray-text">от </span>
                  <span class="text17 medium-text"> 983 ₽</span>
                </div>
              </div>
            </div>
          </div>

          <div class="service-card3">
            <div class="service-card__img">
              <img src="/img/service3.webp" alt="" />
            </div>
            <div class="service-card__content">
              <a href="" class="service-card__title text15 medium-text">
                Я создам полностью адаптивный дизайн с использованием HTML, CSS,
                начальной загрузки и JavaScript.
              </a>
              <div class="service-card__bottom _flex">
                <div class="service-card__reviews _flex">
                  <img src="/img/star.svg" alt="" />
                  <div class="service-card__reviews-text">
                    <span class="text15 medium-text">4.82 </span>
                    <span class="text14 gray-text"> 94 отзыва</span>
                  </div>
                </div>

                <div class="service-card__price">
                  <span class="text14 gray-text">от </span>
                  <span class="text17 medium-text"> 983 ₽</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-card">
      <div class="dashboard-card__top _type2">
        <div class="dashboard-card__title text17 medium-text">
          Недавние покупки
        </div>
        <a href="" class="dashboard-card__link">
          <span>Смотреть все</span>
        </a>
      </div>
      <div class="dashboard-card__bottom">
        <div class="dashboard-card__buys">
          <div class="buy-card">
            <div class="avatar">
              <img src="/img/avatar21.webp" alt="" />
            </div>
            <div class="buy-card__content">
              <div class="buy-card__title">
                <a href="">
                  Базовый. <span>совершил покупку</span> Я разберусь с вашим
                  товаром. Описание и активы.
                </a>
              </div>
              <div class="buy-card__bottom">
                <div class="buy-card__date">Февраль 26, 2023</div>
                <div class="buy-card__price">₽983</div>
              </div>
            </div>
          </div>

          <div class="buy-card">
            <div class="avatar">
              <img src="/img/avatar22.webp" alt="" />
            </div>
            <div class="buy-card__content">
              <div class="buy-card__title">
                <a href="">
                  Базовый. <span>совершил покупку</span> Я разберусь с вашим
                  товаром. Описание и активы.
                </a>
              </div>
              <div class="buy-card__bottom">
                <div class="buy-card__date">Февраль 26, 2023</div>
                <div class="buy-card__price">₽983</div>
              </div>
            </div>
          </div>

          <div class="buy-card">
            <div class="avatar">
              <img src="/img/avatar23.webp" alt="" />
            </div>
            <div class="buy-card__content">
              <div class="buy-card__title">
                <a href="">
                  Базовый. <span>совершил покупку</span> Я разберусь с вашим
                  товаром. Описание и активы.
                </a>
              </div>
              <div class="buy-card__bottom">
                <div class="buy-card__date">Февраль 26, 2023</div>
                <div class="buy-card__price">₽983</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="dashboard-card">
      <div class="dashboard-card__top">
        <div class="dashboard-card__title text17 medium-text">
          Крайняя активность
        </div>
      </div>
      <div class="dashboard-card__bottom">
        <div class="activity">
          <div class="activity-item">
            <div class="activity-item__time">08:42</div>
            <div class="activity-item__text">
              Покупка по Али Прайс <br />
              Шум продукта развивается в умных часах
            </div>
          </div>
          <div class="activity-item _red">
            <div class="activity-item__time">14:37</div>
            <div class="activity-item__text">
              Внесите депозит на сумму 700 <br />
              долларов США на счет TFN.
            </div>
          </div>
          <div class="activity-item _blue">
            <div class="activity-item__time">16:50</div>
            <div class="activity-item__text">
              Наташе Кэри понравилась продукция Разрешите пользователям ставить
              лайк продуктам в вашем магазине WooCommerce.
            </div>
          </div>
          <div class="activity-item _orange">
            <div class="activity-item__time">21:03</div>
            <div class="activity-item__text">
              Любимый продукт <br />
              У Эстер Джеймс есть любимый продукт.
            </div>
          </div>
          <div class="activity-item _purple">
            <div class="activity-item__time">23:07</div>
            <div class="activity-item__text">
              Сегодняшние предложения от Digitech Предложение действительно при
              заказе на сумму 500 рупий или выше только для выбранных продуктов.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
