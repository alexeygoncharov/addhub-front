<template>
  <div>
    <UIVBreadcrumbs
      v-if="item && category"
      :items="[
        { name: 'Главная', to: '/' },
        {
          ...(type === 'project'
            ? {
                name: category?.title || 'Каталог проектов',
                to: `/projects/${category.slug}`,
              }
            : {
                name: category?.title || 'Каталог услуг',
                to: `/services/${category.slug}`,
              }),
        },
        { name: item.title },
      ]"
    />
    <div v-if="isRevealed" class="modal-screen">
      <div class="modal-message">
        <div class="modal-wrapper-message">
          <div class="header">
            <div class="avatar">
              <img
                :src="`${baseUrl()}/${item?.createdBy.avatar}`"
                alt=""
                crossorigin="anonymous"
              />
            </div>
          </div>
          <div class="modal-wrapper__mainInput">
            <label class="bid-label">Текст сообщения</label>
            <textarea v-model="message.text"></textarea>
          </div>
          <div class="modal-wrapper__under">
            <button @click="cancel">Cancel</button>
            <button @click="confirm(item?.createdBy._id)">Send</button>
          </div>
        </div>
      </div>
    </div>
    <div class="freelancer-top _pb85">
      <div class="container">
        <div class="freelancer-top__nav">
          <button class="icon-btn">
            <span class="icon-btn__round">
              <img src="/img/share.svg" alt="" />
            </span>
            <span class="icon-btn__text"> Поделиться </span>
          </button>
          <button
            class="icon-btn favorite-btn2"
            :class="{
              _added: item && favorites.map((el) => el.id).includes(item?._id),
            }"
            @click="item && toggleFavorite(item?._id, type)"
          >
            <span class="icon-btn__round">
              <svg
                width="26"
                height="23"
                viewBox="0 0 26 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.0775 12.2216L13.4334 21.5L3.78929 12.2216C3.15317 11.6203 2.65211 10.8976 2.31765 10.0989C1.9832 9.30027 1.82261 8.443 1.84598 7.58109C1.86935 6.71918 2.07619 5.87131 2.45346 5.09087C2.83073 4.31043 3.37026 3.61432 4.03809 3.04638C4.70591 2.47844 5.48756 2.05098 6.33381 1.7909C7.18006 1.53083 8.07257 1.44378 8.95515 1.53524C9.83774 1.62669 10.6913 1.89467 11.462 2.32231C12.2327 2.74994 12.9039 3.32796 13.4334 4.01996C13.9652 3.33298 14.6372 2.76001 15.4074 2.33692C16.1776 1.91382 17.0294 1.64971 17.9095 1.56112C18.7896 1.47252 19.6791 1.56134 20.5222 1.82202C21.3653 2.0827 22.144 2.50963 22.8095 3.07609C23.475 3.64255 24.0129 4.33634 24.3897 5.11405C24.7664 5.89175 24.9739 6.73663 24.999 7.5958C25.0242 8.45497 24.8665 9.30993 24.5359 10.1072C24.2053 10.9044 23.7088 11.6268 23.0775 12.2291"
                  stroke="#222222"
                  stroke-width="1.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </span>
            <span class="icon-btn__text"> Сохранить </span>
          </button>
        </div>
      </div>

      <UIPageTop
        :items="type === 'service' ? (item as serviceItem) : undefined"
        :project-item="type === 'project' ? (item as projectItem) : undefined"
        :title="item?.title"
      />
    </div>

    <div class="freelancer _pt0 _overflow-unset">
      <div class="container">
        <div class="freelancer__grid">
          <div class="freelancer__col">
            <div class="freelancer__inner">
              <slot name="item-content"></slot>
            </div>
          </div>
          <div class="freelancer__col2">
            <div class="offer-req offer-req2">
              <div class="offer-req__price text28 medium-text">
                <b>₽ </b> {{ item?.price }}
              </div>
              <slot name="item-volume"></slot>
              <button
                class="offer-req__btn m-btn m-btn-blue m-btn-shadow"
                @click="createOrder()"
              >
                <span>{{
                  type === 'service'
                    ? `Заказать за ${item?.price} ₽`
                    : item &&
                        'bids' in item &&
                        item.bids.find((bid) => bid.user._id === user?._id)
                      ? 'Отклик оставлен'
                      : 'Откликнуться'
                }}</span>
              </button>
            </div>

            <div class="about-client">
              <div class="text20 text18-tablet medium-text">
                {{ type === 'service' ? `Об исполнителе` : 'О заказчике' }}
              </div>
              <div class="about-client__info">
                <div class="avatar">
                  <NuxtImg
                    v-if="item?.createdBy.avatar"
                    crossorigin="anonymous"
                    :src="baseUrl() + item?.createdBy.avatar"
                    alt=""
                  />
                  <Avatar v-else :size="80" :name="item?.createdBy.name" />
                  <span
                    v-if="item?.createdBy.online_status === 'online'"
                    class="service-card__user-online"
                  ></span>
                </div>
                <div class="about-client__content">
                  <div class="about-client__name text17 medium-text">
                    {{ item?.createdBy.name }}
                  </div>
                  <div class="about-client__category">
                    {{ item?.createdBy.active_role }}
                  </div>
                  <div class="about-client__rating">
                    <img src="/img/star.svg" alt="" />
                    <div class="about-client__rating-text">
                      <span>{{ item?.createdBy.rate }}</span>
                      <!-- (595 отзывов) -->
                    </div>
                  </div>
                </div>
              </div>
              <!-- <div class="about-client__items">
                <div class="about-client__item">
                  <div class="about-client__item-title">Город</div>
                  <div class="about-client__item-desc">{{item?.createdBy}}</div>
                </div>
                <div class="about-client__item">
                  <div class="about-client__item-title">Заказов</div>
                  <div class="about-client__item-desc">11-20</div>
                </div>
                <div class="about-client__item">
                  <div class="about-client__item-title">Отдел</div>
                  <div class="about-client__item-desc">UI/UX</div>
                </div>
              </div> -->

              <button
                v-if="isAuthenticated"
                class="about-client__btn m-btn m-btn-blue-outline"
                @click="reveal"
              >
                <span>{{
                  type === 'service' ? `Напишите мне` : 'Написать заказчику'
                }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <slot name="service-recommended"></slot>
  </div>
</template>
<script setup lang="ts">
import type { projectItem, serviceItem } from '~/stores/catalog/catalog.type';
const emits = defineEmits(['submit']);
const createOrder = () => {
  if (user.value) {
    if (
      props.type === 'project' &&
      !props.item?.bids.find((bid) => bid.user._id === user.value?._id)
    )
      emits('submit');
  } else {
    navigateTo('/login');
  }
};
const { favorites } = storeToRefs(useUserStore());
const { toggleFavorite } = useUserStore();
const messagesStore = useMessagesStore();
const { isAuthenticated } = useAuthStore();
const message = ref({
  text: '',
  recipient: '',
});

const { isRevealed, reveal, confirm, cancel, onConfirm } = useConfirmDialog();

onConfirm((userId: string) => {
  message.value.recipient = userId;
  messagesStore.createMessage(message.value).then(() => {
    message.value.text = '';
    useToast({ message: 'Сообщение отправлено', type: 'success' });
  });
});

const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const props = defineProps<
  | {
      item: serviceItem | undefined;
      type: 'service';
    }
  | {
      item: projectItem | undefined;
      type: 'project';
    }
>();
const commonStore = useCommonStore();
const route = useRoute();
const category = commonStore.categories?.find(
  (item) => item.slug === route.params.slug,
);
</script>
