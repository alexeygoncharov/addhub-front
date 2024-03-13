<template>
  <div :class="['offer', { offer_transparent: isTransparent }]">
    <div class="container">
      <div class="offer__inner">
        <div class="offer__media">
          <div class="offer__img _scale-img">
            <NuxtImg :src="'/img/' + imgList[0]" alt="" />
          </div>
          <div class="offer__img _type2 _scale-img">
            <NuxtImg :src="'/img/' + imgList[1]" alt="" />
          </div>

          <UIMainAdvantages />

          <div class="platform-workers">
            <div class="text15 medium-text">1M+ Специалистов</div>
            <div class="platform-workers__items">
              <div class="platform-workers__item avatar">
                <NuxtImg src="/img/avatar5.webp" alt="" />
              </div>
              <div class="platform-workers__item avatar">
                <NuxtImg src="/img/avatar6.webp" alt="" />
              </div>
              <div class="platform-workers__item avatar">
                <NuxtImg src="/img/avatar7.webp" alt="" />
              </div>
              <div class="platform-workers__item avatar">
                <NuxtImg src="/img/avatar8.webp" alt="" />
              </div>
              <div class="platform-workers__item avatar">
                <NuxtImg src="/img/avatar9.webp" alt="" />
              </div>
            </div>
          </div>
        </div>
        <div class="offer__content">
          <div class="offer__title text32 medium-text">
            Присоединяйтесь к лучшей торговой площадке заказчиков и исполнителей
          </div>
          <div class="offer__desc">
            <div class="text15">
              Чтобы получить заказ, фрилансерам остается только регулярно
              просматривать ленту проектов, отвечая на подходящие заказы. Если
              заказчик заинтересуется вашим предложением — он обязательно
              свяжется с вами и обсудит детали freelance сотрудничества.
            </div>
          </div>
          <div class="offer__list">
            <div class="offer__list-item">
              <div class="text15">
                Общайтесь с фрилансерами с подтвержденным опытом
              </div>
            </div>
            <div class="offer__list-item">
              <div class="text15">
                Получите подборку лучших специалистов от менеджера по работе с
                клиентами
              </div>
            </div>
            <div class="offer__list-item">
              <div class="text15">
                Непревзойденное качество удаленных, гибридных и гибких рабочих
                мест
              </div>
            </div>
          </div>
          <div class="offer__nav">
            <NuxtLink :to="link.path" class="m-btn m-btn-blue">
              <span>{{ link.text }}</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isTransparent: {
      type: Boolean,
      default: false,
    },
    link: {
      type: String,
      required: true,
    },
    imgList: {
      type: Array,
      required: true,
    },
  },
};
</script>
