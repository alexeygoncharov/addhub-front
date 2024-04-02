<template>
  <UIVBreadcrumbs
    :items="[{ name: 'Главная', to: '/' }, { name: 'Стать продавцом' }]"
  />

  <UIPageTop
    :button="
      auth
        ? { text: 'Перейти в профиль', link: '/profile' }
        : { text: 'Стать продавцом', link: '/reg' }
    "
    title="Получите возможности с addhub.io"
    description=" Обеспечьте посетителю удобство работы в Интернете с помощью
            надежного UX-дизайна."
  />

  <div class="seller _tabs-parent">
    <div class="container">
      <div class="seller__grid">
        <div class="seller__tabs">
          <div
            class="seller__tab _tab"
            :class="{ _active: active === 0 }"
            @click="active = 0"
          >
            <span>Заказчику</span>
          </div>
          <div
            class="seller__tab _tab"
            :class="{ _active: active === 1 }"
            @click="active = 1"
          >
            <span>Исполнителю</span>
          </div>
        </div>
        <div class="seller__content">
          <div class="tab-content _tab1" :class="{ _active: active === 0 }">
            <div class="text">
              <h3>Заказчику</h3>
              <p>
                Добро пожаловать на нашу платформу – ваш надежный партнер в мире
                качественных услуг. Мы предлагаем вам уникальную возможность
                выбора из широкого спектра профессиональных исполнителей,
                готовых воплотить ваши идеи в реальность. Наша платформа
                гарантирует безопасность и прозрачность всех сделок, обеспечивая
                вам спокойствие и уверенность в каждом этапе работы. Выбирая
                нас, вы выбираете качество, надежность и высокий уровень
                сервиса. Мы заботимся о каждом клиенте и стремимся предоставить
                лучший опыт сотрудничества.
              </p>
            </div>
            <div class="seller__nav">
              <button class="m-btn m-btn-blue-outline">
                <span>Приступить</span>
              </button>
            </div>
          </div>
          <div class="tab-content _tab2" :class="{ _active: active === 1 }">
            <div class="text">
              <h3>Исполнителю</h3>
              <p>
                Добро пожаловать на нашу платформу – ваш надежный партнер в мире
                качественных услуг. Мы предлагаем вам уникальную возможность
                выбора из широкого спектра профессиональных исполнителей,
                готовых воплотить ваши идеи в реальность. Наша платформа
                гарантирует безопасность и прозрачность всех сделок, обеспечивая
                вам спокойствие и уверенность в каждом этапе работы. Выбирая
                нас, вы выбираете качество, надежность и высокий уровень
                сервиса. Мы заботимся о каждом клиенте и стремимся предоставить
                лучший опыт сотрудничества.
              </p>
            </div>
            <div class="seller__nav">
              <button class="m-btn m-btn-blue-outline">
                <span>Приступить</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="advantages advantages-seller m-section">
    <div class="container">
      <div class="advantages__top">
        <div class="text32 medium-text">Как это работает</div>
        <div class="text15 light-text">
          Самые просматриваемые и самые продаваемые услуги за все время
        </div>
      </div>
      <div class="advantages__grid grid-col4 grid-tablet2 grid-mob-full">
        <div class="advantage-card">
          <div class="advantage-card__icon">
            <img src="/img/advantage-icon3.svg" alt="" />
          </div>
          <div class="advantage-card__info">
            <div class="advantage-card__title text20 medium-text">
              Опубликуйте проект
            </div>
            <div class="advantage-card__desc text15 light-text">
              Опубликовать проект бесплатно и легко. Просто заполните название,
              описание.
            </div>
          </div>
        </div>

        <div class="advantage-card">
          <div class="advantage-card__icon">
            <img src="/img/advantage-icon4.svg" alt="" />
          </div>
          <div class="advantage-card__info">
            <div class="advantage-card__title text20 medium-text">
              Выберите исполнителя
            </div>
            <div class="advantage-card__desc text15 light-text">
              Опубликовать вакансию бесплатно и легко. Просто заполните
              название, описание.
            </div>
          </div>
        </div>

        <div class="advantage-card">
          <div class="advantage-card__icon">
            <img src="/img/advantage-icon5.svg" alt="" />
          </div>
          <div class="advantage-card__info">
            <div class="advantage-card__title text20 medium-text">
              Оплачивайте безопасно
            </div>
            <div class="advantage-card__desc text15 light-text">
              Опубликовать вакансию бесплатно и легко. Просто заполните
              название, описание.
            </div>
          </div>
        </div>

        <div class="advantage-card">
          <div class="advantage-card__icon">
            <img src="/img/advantage-icon6.svg" alt="" />
          </div>
          <div class="advantage-card__info">
            <div class="advantage-card__title text20 medium-text">
              Мы на связи 24/7
            </div>
            <div class="advantage-card__desc text15 light-text">
              Опубликовать вакансию бесплатно и легко. Просто заполните
              название, описание.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="advantages2 cut-section">
    <div class="container">
      <div class="advantages2__inner">
        <div class="advantages2__content">
          <div class="advantages2__top">
            <div class="text32 medium-text">
              Все фрилансеры мира на вашем рабочем столе
            </div>
          </div>
          <div class="advantages2__items">
            <div class="advantage-card">
              <div class="advantage-card__icon">
                <img src="/img/advantage-icon2.svg" alt="" />
              </div>
              <div class="advantage-card__info">
                <div class="advantage-card__title text20 medium-text">
                  Гарантия качества
                </div>
                <div class="advantage-card__desc text15 light-text">
                  Проверьте портфолио любого исполнителя, отзывы <br />
                  клиентов и подтверждение личности.
                </div>
              </div>
            </div>

            <div class="advantage-card">
              <div class="advantage-card__icon">
                <img src="/img/advantage-icon7.svg" alt="" />
              </div>
              <div class="advantage-card__info">
                <div class="advantage-card__title text20 medium-text">
                  Бесплатно, пока не найдете исполнителя
                </div>
                <div class="advantage-card__desc text15 light-text">
                  Проведите собеседование с потенциальным кандидатом, подходящим
                  для вашей работы, договоритесь о стоимости и платите только за
                  ту работу, которую вы одобрите.
                </div>
              </div>
            </div>

            <div class="advantage-card">
              <div class="advantage-card__icon">
                <img src="/img/advantage-icon.svg" alt="" />
              </div>
              <div class="advantage-card__info">
                <div class="advantage-card__title text20 medium-text">
                  Безопасно и надежно
                </div>
                <div class="advantage-card__desc text15 light-text">
                  Сосредоточьтесь на своей работе, зная, что мы помогаем
                  защитить ваши данные и конфиденциальность. Мы здесь с
                  круглосуточной поддержкой, если вам это нужно.
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="advantages2__img _scale-img">
          <img src="/img/man4.webp" alt="" />
        </div>
      </div>
    </div>
  </div>

  <div class="advantage-nums">
    <div class="container">
      <div class="advantage-nums__inner">
        <div class="advantage-nums__items">
          <div class="advantage-stat">
            <div class="advantage-stat__title text38 medium-text">20K</div>
            <div class="advantage-stat__desc text15">Всего исполнителей</div>
          </div>
          <div class="advantage-stat">
            <div class="advantage-stat__title text38 medium-text">32K</div>
            <div class="advantage-stat__desc text15">Положительных отзывов</div>
          </div>
          <div class="advantage-stat">
            <div class="advantage-stat__title text38 medium-text">90K</div>
            <div class="advantage-stat__desc text15">Заявок получено</div>
          </div>
          <div class="advantage-stat">
            <div class="advantage-stat__title text38 medium-text">15K</div>
            <div class="advantage-stat__desc text15">Проектов завершено</div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <SectionsCommonFaq :questions="questions" />
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const auth = storeToRefs(authStore).isAuthenticated;
const active = ref(0);
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
</script>

<style scoped></style>
