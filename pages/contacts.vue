<template>
  <UIVBreadcrumbs
    :items="[{ name: 'Главная', to: '/' }, { name: 'Контакты' }]"
  />
  <UIPageTop
    title="Связаться с нами"
    description="Мы хотели бы поговорить о том, как мы можем вам помочь."
    contacts
  />

  <div class="contacts">
    <div class="container">
      <div class="contacts__grid">
        <div class="contacts__col">
          <div class="contacts-info">
            <div class="contacts-info__top">
              <div class="text20 medium-text">Остаемся на связи</div>
              <div class="text15 gray-text light-text">
                Актуальные контакты для связи с нами в рабочее время
              </div>
            </div>
            <div class="contacts-info__items">
              <UIStatCard
                icon="/img/stat-icon4.svg"
                title="Telegram"
                value="@addhub"
              />

              <UIStatCard
                icon="/img/stat-icon5.svg"
                title="Email"
                value="hello@worker"
              />
            </div>
          </div>
        </div>
        <div class="contacts__col2">
          <form action="" class="contacts-form">
            <div class="contacts-form__top">
              <div class="text20 medium-text">Расскажите о себе</div>
              <div class="text15 gray-text light-text">
                Если у вас есть вопросы или предложения, свяжитесь с нами.
              </div>
            </div>
            <div class="contacts-form__grid">
              <fieldset class="fg _small">
                <label>Ваше имя</label>
                <input type="text" placeholder="Александр Орловский" />
              </fieldset>
              <fieldset class="fg _small">
                <label>Email</label>
                <input type="email" placeholder="alexander.orl@mail..." />
              </fieldset>
              <fieldset class="fg _small _full">
                <label>Сообщение</label>
                <textarea placeholder="Текст сообщения"></textarea>
              </fieldset>
            </div>
            <div class="contacts-form__nav">
              <button class="m-btn m-btn-blue m-btn-shadow">
                <span>Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
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
