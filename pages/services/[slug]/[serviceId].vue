<template>
  <ModulesItem :item="item" type="service">
    <template #item-content>
      <div class="stat">
        <UIStatCard
          v-if="item"
          :icon="'/img/stat-icon12.svg'"
          :title="'Время выполнения'"
          :value="pluralize(item.delivery_time, 'день', 'дня', 'дней')"
        />

        <!-- <UIStatCard
          v-if="item"
          :icon="'/img/stat-icon13.svg'"
          :title="'Параметр'"
          value="Профессиональный"
        /> -->
        <UIStatCard
          v-if="item"
          :icon="'/img/stat-icon14.svg'"
          :title="'Город'"
          :value="item?.address.city.title"
        />
      </div>
      <div class="gallery">
        <div class="gallery__big">
          <div class="swiper mySwiper2">
            <Swiper
              :modules="[SwiperPagination, SwiperNavigation]"
              :slides-per-view="'auto'"
              :navigation="{
                prevEl: '.gallery__big .swiper-button-prev',
                nextEl: '.gallery__big .swiper-button-next',
              }"
              @swiper="onSwiper"
              @slide-change="
                (e) => {
                  activeSlide = e.activeIndex;
                }
              "
            >
              <SwiperSlide
                v-for="(image, index) of item?.photos"
                :key="index"
                class="swiper-slide"
              >
                <a class="gallery__img">
                  <NuxtImg
                    crossorigin="anonymous"
                    :src="baseUrl() + image"
                    alt="Галерея"
                    @click="() => (enabledViewer = true)"
                  />
                </a>
              </SwiperSlide>
            </Swiper>
          </div>
          <div class="swiper-button swiper-button-prev">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.98242 9.20279L11.6142 16.8134C11.8642 17.0626 12.269 17.0622 12.5187 16.8121C12.7681 16.5621 12.7674 16.157 12.5174 15.9076L5.3399 8.74998L12.5176 1.59236C12.7677 1.34293 12.7683 0.938134 12.5189 0.688057C12.3938 0.562696 12.2298 0.500015 12.0659 0.500015C11.9024 0.500015 11.7391 0.562277 11.6142 0.686768L3.98242 8.2972C3.86199 8.41701 3.79441 8.58008 3.79441 8.74998C3.79441 8.91987 3.86219 9.08275 3.98242 9.20279Z"
                fill="#051036"
              />
            </svg>
          </div>
          <div class="swiper-button swiper-button-next">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.0176 8.29721L5.38582 0.686587C5.13578 0.437381 4.73095 0.4378 4.48132 0.687877C4.23189 0.937921 4.23254 1.34298 4.48261 1.59238L11.6601 8.75002L4.48236 15.9076C4.23231 16.1571 4.23167 16.5619 4.48107 16.8119C4.6062 16.9373 4.77014 17 4.93407 17C5.09759 17 5.26088 16.9377 5.38579 16.8132L13.0176 9.2028C13.138 9.08299 13.2056 8.91992 13.2056 8.75002C13.2056 8.58013 13.1378 8.41725 13.0176 8.29721Z"
                fill="#051036"
              />
            </svg>
          </div>
        </div>
        <div class="gallery__small">
          <div thumbsSlider class="swiper mySwiper">
            <div class="swiper-wrapper">
              <div
                v-for="(image, i) in item?.photos"
                :key="i"
                class="swiper-slide"
                style="cursor: pointer"
                @click="thisSwiper.slideTo(i)"
              >
                <div class="gallery__img">
                  <NuxtImg
                    crossorigin="anonymous"
                    :src="baseUrl() + image"
                    alt="Галерея"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <UIImageViewer
          v-if="item && enabledViewer"
          v-model="enabledViewer"
          :images="item.photos"
          :active="activeSlide"
        />
      </div>

      <div class="about-freelancer">
        <div class="text20 medium-text">Об услуге</div>
        <div class="text">
          <p>{{ item?.description }}</p>
        </div>
      </div>

      <div class="service-info">
        <div class="service-info__col">
          <div class="service-info__title">Категория</div>
          <nuxtLink
            :to="`/services/${category?.slug}`"
            class="service-info__desc"
            >{{ category?.title }}</nuxtLink
          >
        </div>
        <!-- <div class="service-info__col">
                  <div class="service-info__title">Инструменты</div>
                  <div class="service-info__desc">
                    Adobe XD, Figma, <br />
                    Adobe Photoshop
                  </div>
                </div>
                <div class="service-info__col">
                  <div class="service-info__title">Устройства</div>
                  <div class="service-info__desc">Mobile, Desktop</div>
                </div> -->
      </div>

      <div class="article-item article-reviews">
        <div class="text20 medium-text">0 отзывов</div>

        <div class="review-rating">
          <div class="review-stat">
            <div class="review-stat__num">0.00</div>
            <div class="review-stat__info">
              <div class="review-stat__type text17 medium-text">
                Нет отзывов
              </div>
              <div class="review-stat__count text15">0 отзывов</div>
            </div>
          </div>
          <div class="review-rating__balls">
            <div v-for="i in 5" :key="i" class="ball">
              <div class="ball__type">
                {{ pluralize(6 - i, 'звезда', 'звезды', 'звезд') }}
              </div>
              <div class="ball__progress">
                <span style="width: 0%"></span>
              </div>
              <div class="ball__count">0</div>
            </div>
          </div>
        </div>

        <!-- <div class="article-reviews__items">
                  <div class="review-card2">
                    <div class="review-card2__top">
                      <div class="avatar">
                        <span>СВ</span>
                      </div>
                      <div class="review-card2__content">
                        <div class="review-card2__name text15 medium-text">
                          Светлана Василенко
                        </div>
                        <div class="review-card2__info _flex">
                          <div class="service-card__reviews _flex">
                            <img src="/img/star.svg" alt="" />
                            <div class="service-card__reviews-text">
                              <span class="text15 medium-text">4.82 </span>
                            </div>
                          </div>
                          <div class="review-card2__time">
                            <span class="_view1 text14 light-text gray-text">
                              Опубликовано 2 месяца назад
                            </span>
                            <span class="_view2 text14 light-text gray-text">
                              2 месяца
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="review-card2__text">
                      <div class="text15 light-text">
                        Существует множество вариаций отрывков Lorem Ipsum, но
                        большинство из них претерпело изменения в той или иной
                        форме из-за привнесенного юмора или случайных слов,
                        которые не выглядят даже немного правдоподобно. Если вы
                        собираетесь использовать отрывок из Lorem Ipsum, вам
                        нужно быть уверенным, что в середине текста не спрятано
                        ничего смущающего.
                      </div>
                    </div>

                    <div class="feedback-buttons">
                      <button class="feedback-buttons__item">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.72413 1.06256C6.83113 0.821812 7.06988 0.666656 7.33334 0.666656C8.04058 0.666656 8.71886 0.947608 9.21896 1.44771C9.71905 1.9478 10 2.62608 10 3.33332V5.33332H13.1033C13.3918 5.33065 13.6774 5.39043 13.9407 5.50858C14.2052 5.6273 14.4407 5.8021 14.631 6.02088C14.8212 6.23966 14.9616 6.49719 15.0425 6.77562C15.1233 7.05405 15.1426 7.34672 15.0991 7.63337L14.1791 13.6333C14.1791 13.6335 14.1792 13.6331 14.1791 13.6333C14.1067 14.11 13.8644 14.545 13.497 14.8573C13.1305 15.1688 12.6641 15.3378 12.1832 15.3333H2.66667C2.13624 15.3333 1.62753 15.1226 1.25246 14.7475C0.877385 14.3725 0.666672 13.8638 0.666672 13.3333V8.66666C0.666672 8.13622 0.877385 7.62752 1.25246 7.25244C1.62753 6.87737 2.13624 6.66666 2.66667 6.66666H4.23342L6.72413 1.06256ZM4 7.99999H2.66667C2.48986 7.99999 2.32029 8.07023 2.19527 8.19525C2.07024 8.32028 2.00001 8.48984 2.00001 8.66666V13.3333C2.00001 13.5101 2.07024 13.6797 2.19527 13.8047C2.32029 13.9298 2.48986 14 2.66667 14H4V7.99999ZM5.33334 14H12.1942C12.355 14.0018 12.511 13.9455 12.6335 13.8414C12.756 13.7372 12.8368 13.5923 12.8609 13.4334L13.7809 7.43328C13.7809 7.43337 13.7809 7.43319 13.7809 7.43328C13.7953 7.33782 13.7889 7.24009 13.762 7.14736C13.7351 7.05455 13.6883 6.96871 13.6248 6.89578C13.5614 6.82286 13.4829 6.76459 13.3947 6.72502C13.3066 6.68545 13.2109 6.66552 13.1142 6.66661L13.1067 6.6667L9.33334 6.66666C8.96515 6.66666 8.66667 6.36818 8.66667 5.99999V3.33332C8.66667 2.9797 8.5262 2.64056 8.27615 2.39051C8.12425 2.23862 7.93948 2.12716 7.73856 2.06306L5.33334 7.4748V14Z"
                            fill="black"
                          />
                        </svg>
                        <span>Полезный</span>
                      </button>
                      <button class="feedback-buttons__item _dislike">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M6.72412 14.9374C6.83112 15.1782 7.06987 15.3333 7.33333 15.3333C8.04057 15.3333 8.71885 15.0524 9.21895 14.5523C9.71905 14.0522 10 13.3739 10 12.6667V10.6667H13.1033C13.3918 10.6693 13.6774 10.6096 13.9407 10.4914C14.2052 10.3727 14.4407 10.1979 14.631 9.97912C14.8212 9.76034 14.9616 9.50281 15.0425 9.22438C15.1233 8.94595 15.1426 8.65328 15.0991 8.36663L14.1791 2.36672C14.1791 2.36654 14.1792 2.3669 14.1791 2.36672C14.1067 1.89002 13.8644 1.455 13.497 1.14271C13.1305 0.831197 12.6641 0.662222 12.1832 0.666677H2.66666C2.13623 0.666677 1.62752 0.877392 1.25245 1.25246C0.877378 1.62754 0.666664 2.13624 0.666664 2.66668V7.33334C0.666664 7.86378 0.877378 8.37248 1.25245 8.74756C1.62752 9.12263 2.13623 9.33334 2.66666 9.33334H4.23342L6.72412 14.9374ZM4 8.00001H2.66666C2.48985 8.00001 2.32028 7.92977 2.19526 7.80475C2.07024 7.67972 2 7.51016 2 7.33334V2.66668C2 2.48987 2.07024 2.3203 2.19526 2.19527C2.32028 2.07025 2.48985 2.00001 2.66666 2.00001H4V8.00001ZM5.33333 2.00001H12.1942C12.355 1.99819 12.511 2.0545 12.6335 2.15863C12.756 2.26277 12.8368 2.40767 12.8609 2.56664L13.7809 8.56672C13.7809 8.56663 13.7809 8.56681 13.7809 8.56672C13.7953 8.66218 13.7889 8.75991 13.762 8.85264C13.735 8.94545 13.6882 9.03129 13.6248 9.10422C13.5614 9.17714 13.4829 9.23541 13.3947 9.27498C13.3066 9.31455 13.2108 9.33448 13.1142 9.33339L13.1067 9.3333L9.33333 9.33334C8.96514 9.33334 8.66666 9.63182 8.66666 10V12.6667C8.66666 13.0203 8.52619 13.3594 8.27614 13.6095C8.12424 13.7614 7.93947 13.8728 7.73855 13.9369L5.33333 8.5252V2.00001Z"
                            fill="#6B7177"
                          />
                        </svg>
                        <span>Бесполезный</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div class="article-reviews__nav">
                  <button class="m-btn m-btn-blue2">
                    <span>Показать еще</span>
                  </button>
                </div> -->
      </div>

      <form class="article-item review-form">
        <div class="review-form__top">
          <div class="text20 medium-text">Добавить отзыв</div>
          <div class="text15 text14-tablet light-text gray-text">
            Ваш электронный адрес не будет опубликован. Необходимые поля
            отмечены *
          </div>
        </div>

        <div class="review-form__rating">
          <div class="text16 medium-text">Ваша оценка оказанных услуг</div>
          <div class="rating">
            <div
              class="rating-input"
              data-total-rating="@@num"
              :data-rating-code="userRating"
            >
              <div
                v-for="i in 5"
                :key="i"
                class="rating-input__item"
                :data-rating-value="6 - i"
                @click="userRating = 6 - i"
              >
                <svg
                  width="16"
                  height="15"
                  viewBox="0 0 16 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14.4056 5.45593L14.4058 5.45594C14.5085 5.46524 14.596 5.53465 14.6283 5.63402L15.1038 5.4794L14.6282 5.6337C14.6608 5.73406 14.6307 5.84212 14.5526 5.91066L11.4354 8.64399L11.2115 8.84029L11.2774 9.13064L12.1965 13.1783C12.2198 13.2818 12.1797 13.3864 12.096 13.4469L12.0956 13.4472C12.0112 13.5084 11.8994 13.5132 11.8102 13.4599L8.25496 11.3337L7.99835 11.1803L7.74174 11.3337L4.18572 13.4599L4.18559 13.46C4.14437 13.4847 4.09873 13.4968 4.05299 13.4968C3.99937 13.4968 3.94683 13.4805 3.90167 13.4476L3.90067 13.4469C3.81696 13.3864 3.77686 13.2819 3.80017 13.1785C3.80018 13.1784 3.80019 13.1784 3.8002 13.1783L4.71922 9.13064L4.78515 8.84029L4.56128 8.64399L1.444 5.91058C1.44399 5.91057 1.44398 5.91056 1.44397 5.91055C1.36608 5.84222 1.33606 5.73399 1.36817 5.63455C1.40106 5.5349 1.48868 5.46552 1.59142 5.4559C1.59154 5.45588 1.59166 5.45587 1.59177 5.45586L5.71554 5.08154L6.01288 5.05455L6.13016 4.77999L7.75993 0.96436L7.76003 0.964121C7.801 0.868076 7.8939 0.806702 7.99833 0.806702C8.10241 0.806702 8.19587 0.867839 8.23766 0.965002C8.23768 0.965061 8.23771 0.96512 8.23773 0.965179L9.86716 4.77999L9.98443 5.05455L10.2818 5.08154L14.4056 5.45593Z"
                    fill="white"
                    stroke="#E1833F"
                  />
                </svg>
              </div>

              <input
                ref="ratingInput"
                class="rating-input__field"
                type="number"
                :value="userRating"
              />
            </div>
          </div>
        </div>

        <div class="review-form__fields">
          <fieldset class="fg _full">
            <label>Комментарий</label>
            <textarea></textarea>
          </fieldset>
          <fieldset class="fg">
            <label>Ваше имя</label>
            <input type="text" />
          </fieldset>
          <fieldset class="fg">
            <label>Email</label>
            <input type="email" placeholder="creative-layers088" />
          </fieldset>
          <div class="m-check _full">
            <input type="checkbox" />
            <label
              ><span
                >Сохранить мое имя, почту, и сайт в этом браузере для следующих
                комментариев</span
              ></label
            >
          </div>
        </div>

        <div class="review-form__nav">
          <button class="m-btn m-btn-blue">
            <span>Отправить</span>
          </button>
        </div>
      </form>
    </template>
    <!--  -->

    <template #item-volume>
      <div class="offer-req__text">
        <div class="offer-req__title">{{ item?.service_volume }}</div>
        <div class="offer-req__desc">
          {{ item?.service_volume_desc }}
        </div>
      </div>
      <div v-if="item" class="offer-req__duration">
        <img src="/img/clock.svg" alt="" />
        <span>{{ pluralize(item.delivery_time, 'день', 'дня', 'дней') }}</span>
      </div>
      <!-- <div class="offer-req__items">
                  <div class="offer-req__item">
                    <div class="offer-req__item-text">500 объявлений</div>
                  </div>
                  <div class="offer-req__item">
                    <div class="offer-req__item-text">Исходник</div>
                  </div>
                </div> -->
    </template>

    <template #service-recommended>
      <div class="services services2 m-section">
        <div class="container">
          <UISectionTop
            title="Вас также заинтересует"
            desc="Обеспечьте посетителю удобство работы в Интернете с помощью надежного UX-дизайна."
          />

          <ModulesProductSlider />
        </div>
      </div>
    </template>
  </ModulesItem>
</template>

<script setup lang="ts">
import type { Swiper } from 'swiper/types';
import type { serviceItem } from '~/stores/catalog/catalog.type';
const title = ref('');
const userRating = ref(0);
const commonStore = useCommonStore();
const route = useRoute();
const enabledViewer = ref(false);

let thisSwiper: Swiper;
const onSwiper = (swiper: Swiper) => {
  thisSwiper = swiper;
};
const category = commonStore.categories?.find(
  (item) => item.slug === route.params.slug,
);
const activeSlide = ref<number>(0);
const item = ref<serviceItem>();
const itemId = route.params.serviceId;
const { data } = await apiFetch<ApiResponse<serviceItem>>(
  `/api/services/${itemId}`,
);
if (process.client) {
  setTimeout(
    () =>
      apiFetch(`/api/views/service/${itemId}`, { options: { method: 'POST' } }),
    2000,
  );
}
const value = data.value;
if (value) {
  item.value = value.result;
  title.value = item.value?.title;
}
useHead({
  title,
});
</script>
