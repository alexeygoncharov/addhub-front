<template>
  <UIVBreadcrumbs :items="[{ name: 'Главная', to: '/' }, { name: 'О нас' }]" />

  <UIPageTop :title="'О бирже Addhub'" />
  <SectionsCommonOffer
    :link="{ text: 'Приступить к работе', path: '/freelancers/all' }"
    :img-list="['offer3.jpg', 'offer4.webp']"
    is-transparent
  />

  <SectionsCommonAdvantageNums img="man3.webp" />

  <SectionsCommonAdvantages2 img="man4.webp" />

  <div class="find-talent2 cut-section">
    <div class="container">
      <div class="find-talent2__grid">
        <div class="find-talent2__col1">
          <div class="find-talent2__info">
            <div class="text32 medium-text">
              Найдите таланты, необходимые для роста вашего бизнеса.
            </div>
            <div class="text15 text14-tablet light-text">
              Для клиента очень важно следить за обучением клиента, но это
              происходит одновременно.
            </div>
          </div>
          <div class="find-talent2__nav">
            <a href="" class="m-btn m-btn-blue">
              <span>Приступить к работе</span>
            </a>
          </div>
        </div>
        <div class="find-talent2__col2">
          <div class="find-talent2__items">
            <div class="stat-card2">
              <div class="stat-card2__inner">
                <div class="stat-card2__title text45 medium-text">4.9/5</div>
                <div class="stat-card2__desc">
                  <div class="text15 light-text">
                    Клиенты оценивают профессионалов на Addhub
                  </div>
                </div>
              </div>
            </div>

            <div class="stat-card2 _type2">
              <div class="stat-card2__inner">
                <div class="stat-card2__title text45 medium-text">Премия</div>
                <div class="stat-card2__desc">
                  <div class="text15 light-text">
                    Награда G2 за лучшее программное обеспечение 2021 года
                  </div>
                </div>
              </div>
            </div>

            <div class="stat-card2">
              <div class="stat-card2__inner">
                <div class="stat-card2__title text45 medium-text">96%</div>
                <div class="stat-card2__desc">
                  <div class="text15 light-text">
                    95% клиентов довольны, обращаясь к своим фрилансерам
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <SectionsCommonReviews title="Отзывы пользователей" />

  <div class="task cut-section">
    <div class="container">
      <div class="task__inner">
        <div class="task__top">
          <div class="text32 medium-text">У вас есть срочная задача?</div>
          <div class="text15 text14-tablet light-text">
            Самые просматриваемые и самые продаваемые услуги за все время
          </div>
        </div>
        <div class="task__steps grid-col3">
          <div class="advantage-card">
            <div class="advantage-card__icon">
              <img src="/img/advantage-icon3.svg" alt="" />
            </div>
            <div class="advantage-card__info">
              <div class="advantage-card__title text20 medium-text">
                Опубликуйте задание
              </div>
              <div class="advantage-card__desc text15 light-text">
                Опубликовать проект бесплатно и легко. Просто заполните
                название, описание.
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
        </div>
      </div>
    </div>
    <div class="task__img">
      <img src="/img/task.jpg" alt="" />
    </div>
  </div>
  <SectionsCommonFaq :questions="questions" />
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
</script>
