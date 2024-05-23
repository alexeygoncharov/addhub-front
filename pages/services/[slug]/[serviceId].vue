<template>
  <ModulesItem :item="item" type="service" @submit="reveal">
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
          :title="'Страна, Город'"
          :value="`${item?.address.country.title}, ${item?.address.city.title}`"
        />
      </div>
      <div v-if="item?.photos.length" class="gallery">
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
                    :src="baseUrl() + image.url"
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
                    :src="baseUrl() + image.url"
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
          :images="item.photos.map((file) => file.url)"
          :active="activeSlide"
        />
      </div>

      <div v-if="isRevealed && item" class="modal-screen">
        <div class="modal-container">
          <div class="payment__inner">
            <h1 class="payment__title text28 medium-text">
              {{ item?.title }}
            </h1>
            <div class="pay-info2">
              <div class="pay-info__group">
                <div class="text20 text18-tablet medium-text">
                  Провайдер услуг
                </div>
                <div class="pay-info__title">Addhub.io</div>
                <br />
                <div class="pay-info__title">Исполнитель:</div>
                <div class="pay-info__desc">
                  {{ `${item?.createdBy.name} ${item?.createdBy.surname}` }}
                </div>
                <div class="pay-info__title">Время исполнения:</div>
                <div class="pay-info__desc">
                  {{ pluralize(item.delivery_time, 'день', 'дня', 'дней') }}
                </div>
                <div class="pay-info__title">Город:</div>
                <div class="pay-info__desc">
                  {{
                    `${item?.address.country.title}, ${item?.address.city.title}`
                  }}
                </div>
              </div>
              <!--<div class="pay-info__group">
                <div class="pay-info__title">Оплатить до:</div>
                <div class="pay-info__desc">03/10/2022</div>
              </div>-->
            </div>

            <div class="pay-table">
              <div class="pay-table__head">
                <div class="pay-table__col">
                  <div class="pay-table__th">Название</div>
                </div>
                <div class="pay-table__col">
                  <div class="pay-table__th">Стоимость</div>
                </div>
              </div>
              <div class="pay-table__rows">
                <div class="pay-table__row">
                  <div class="pay-table__td">Стандарт</div>
                  <div class="pay-table__td medium-text">
                    {{ item?.price }} ₽
                  </div>
                </div>
                <div class="pay-table__row">
                  <div class="pay-table__td2">Итого</div>
                  <div class="pay-table__td3">{{ item?.price }} ₽</div>
                </div>
              </div>
              <div class="pay-table__nav">
                <button class="m-btn m-btn-blue-outline" @click="cancel()">
                  <span>Отменить</span>
                </button>
                <button
                  class="m-btn m-btn-blue m-btn-shadow"
                  @click="createOrder()"
                >
                  <span>Перейти к оплате</span>
                </button>
              </div>
            </div>
          </div>
        </div>
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
        <div class="text20 medium-text">{{ `${item?.reviews} отзывов` }}</div>

        <div class="review-rating">
          <div class="review-stat">
            <div class="review-stat__num">{{ `${item?.rate}` }}</div>
            <div class="review-stat__info">
              <div
                v-if="!item?.reviews"
                class="review-stat__type text17 medium-text"
              >
                Нет отзывов
              </div>
              <div class="review-stat__count text15">
                {{ `${item?.reviews} отзывов` }}
              </div>
            </div>
          </div>
          <div class="review-rating__balls">
            <div
              v-for="[key, value] in Object.entries(item?.rateCounts ?? {})"
              :key="key"
              class="ball"
            >
              <div class="ball__type">
                {{ pluralize(parseInt(key), 'звезда', 'звезды', 'звезд') }}
              </div>
              <div class="ball__progress">
                <span style="width: 0%"></span>
              </div>
              <div class="ball__count">{{ value }}</div>
            </div>
          </div>
        </div>

        <div
          v-for="data in reviews"
          :key="data._id"
          class="article-reviews__items"
        >
          <div class="review-card2">
            <div class="review-card2__top">
              <div class="avatar">
                {{ baseUrl() + data?.sender?.avatar?.url }}
              </div>
              <div class="review-card2__content">
                <div class="review-card2__name text15 medium-text">
                  {{ `${data?.sender?.name} ${data?.sender?.surname}` }}
                </div>
                <div class="review-card2__info _flex">
                  <div class="service-card__reviews _flex">
                    <img src="/img/star.svg" alt="" />
                    <div class="service-card__reviews-text">
                      <span class="text15 medium-text">{{ data.rate }} </span>
                    </div>
                  </div>
                  <div class="review-card2__time">
                    <span class="_view1 text14 light-text gray-text">
                      {{ `Опубликовано ${$dayjs(data?.createdAt).fromNow()}` }}
                    </span>
                    <span class="_view2 text14 light-text gray-text">
                      {{ $dayjs(item?.createdAt).fromNow() }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="review-card2__text">
              <div class="text15 light-text">
                {{ data?.message }}
              </div>
            </div>
          </div>
        </div>
        <div class="article-reviews__nav">
          <button class="m-btn m-btn-blue2" @click="getMoreReviews()">
            <span>Показать еще</span>
          </button>
        </div>
      </div>

      <form class="article-item review-form">
        <div class="review-form__top">
          <div class="text20 medium-text">Добавить отзыв</div>
          <!-- <div class="text15 text14-tablet light-text gray-text">
            Ваш электронный адрес не будет опубликован. Необходимые поля
            отмечены *
          </div> -->
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
            <textarea v-model="review.message"></textarea>
          </fieldset>
          <!-- <fieldset class="fg">
            <label>Ваше имя</label>
            <input v-model="" type="text" />
          </fieldset>
          <fieldset class="fg">
            <label>Email</label>
            <input v-model="" type="email" placeholder="creative-layers088" />
          </fieldset>-->
          <!-- <div class="m-check _full">
            <input type="checkbox" />
            <label
              ><span
                >Сохранить мое имя, почту, и сайт в этом браузере для следующих
                комментариев</span
              ></label
            >
          </div> -->
        </div>

        <div class="review-form__nav">
          <button class="m-btn m-btn-blue" @click.prevent="createReview()">
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
const orderId = ref('');
const route = useRoute();
const router = useRouter();
const pageReviews = ref(1);
const review = ref({
  message: '',
});
interface reviewItem {
  _id: string;
  message: string;
  rate: number;
  service_id: serviceItem;
  recipient: string;
  sender: User;
  children: any[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
const reviews = ref<Array<reviewItem>>([]);
const enabledViewer = ref(false);
const { isRevealed, reveal, cancel } = useConfirmDialog();
let thisSwiper: Swiper;
const onSwiper = (swiper: Swiper) => {
  thisSwiper = swiper;
};
const userReview = ref({ isPurchased: false, review: null });

const category = commonStore.categories?.find(
  (item) => item.slug === route.params.slug,
);
const activeSlide = ref<number>(0);
const item = ref<serviceItem>();
const itemId = route.params.serviceId;
if (!category || !itemId) {
  throw showError({ statusCode: 404 });
}

const createReview = async () => {
  const { data, error } = await apiFetch<ApiResponse<reviewItem>>(
    '/api/reviews/',
    {
      options: {
        method: 'POST',
        body: {
          rate: userRating.value,
          message: review.value.message,
          service_id: itemId,
          recipient: item.value?.createdBy._id,
          // parent_id: 'any',
        },
      },
      needToken: true,
    },
  );
  const value = data.value;
  if (value) {
    reviews.value.push(value.result);
    review.value.message = '';
    userRating.value = 0;
  }

  if (error.value) {
    return useToast({ message: error.value.data.message, type: 'error' });
  }
};

const createOrder = async () => {
  const { data, error } = await apiFetch<ApiResponse<any>>('/api/orders', {
    options: {
      method: 'POST',
      body: { service: itemId, price: item.value?.price },
    },
    needToken: true,
  });
  if (data?.value?.result) {
    orderId.value = data?.value?.result?._id;
    router.push(`/payments/${orderId.value}?price=${item.value?.price}`);
  }
  if (error.value) {
    return useToast({ message: error.value.data.message, type: 'error' });
  }
};

if (process.client) {
  setTimeout(
    () =>
      apiFetch(`/api/views/service/${itemId}`, { options: { method: 'POST' } }),
    2000,
  );
}

const getMoreReviews = () => {
  pageReviews.value += 1;
  getListReviews();
};

const getListReviews = async () => {
  const { data, error } = await apiFetch<ApiResponse<any>>(
    `/api/reviews/service/${itemId}`,
    {
      needToken: true,
      options: {
        query: {
          service_id: itemId,
          limit: 10,
          offset: pageReviews.value,
        },
      },
    },
  );
  const value = data.value;
  if (value) {
    reviews.value.push(...value.result);
  }
  if (error.value) {
    return useToast({ message: error.value.data.message, type: 'error' });
  }
};

const updateReview = async () => {
  const { data } = await apiFetch<
    ApiResponse<{ isPurchased: boolean; review: any }>
  >(`/api/services/is_purchased_by_user/${itemId}`, {
    needToken: true,
  });
  const value = data.value;
  if (value) {
    userReview.value = value.result;
  }
};

const updateItem = async () => {
  const { data } = await apiFetch<ApiResponse<serviceItem>>(
    `/api/services/${itemId}`,
  );
  const value = data.value;
  if (value) {
    item.value = value.result;
    title.value = item.value?.title;
  } else {
    throw showError({ statusCode: 404 });
  }
};

getListReviews();
updateItem();
updateReview();
useHead({
  title,
});
</script>
