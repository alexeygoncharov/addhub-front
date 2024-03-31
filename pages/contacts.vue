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
              <div class="stat-card">
                <div class="stat-card__icon">
                  <img src="/img/stat-icon4.svg" alt="" />
                </div>
                <div class="stat-card__content">
                  <div class="stat-card__title text17 medium-text">
                    Telegram
                  </div>
                  <div class="stat-card__desc text15 light-text">
                    <a href="">@addhub</a>
                  </div>
                </div>
              </div>

              <div class="stat-card">
                <div class="stat-card__icon">
                  <img src="/img/stat-icon5.svg" alt="" />
                </div>
                <div class="stat-card__content">
                  <div class="stat-card__title text17 medium-text">Email</div>
                  <div class="stat-card__desc text15 light-text">
                    <a href="">hello@worker.com</a>
                  </div>
                </div>
              </div>
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
                <input type="email" placeholder="alexander.orlovsky@mail..." />
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

  <SectionsCommonQuestions />
</template>
