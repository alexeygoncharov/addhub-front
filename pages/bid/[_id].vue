<template>
  <div class="modal-project">
    <div class="modal-wrapper">
      <div class="header">
        <div class="avatar">
          <img
            :src="`${baseUrl()}/${data?.createdBy.avatar}`"
            alt=""
            crossorigin="anonymous"
          />
          <span
            v-if="data?.createdBy.online_status === 'online'"
            class="modal-card__user-online"
          ></span>
        </div>
        <div class="wraper">
          <div class="title text20 medium-text">
            {{ data?.title }}
          </div>
          <div class="header__props">
            <div class="header__prop">
              <NuxtImg src="/img/prop-icon.svg" alt="" />
              <span>{{ data?.address.city.title }}</span>
            </div>
            <div class="header__prop">
              <NuxtImg src="/img/prop-icon2.svg" alt="" />
              <span>{{ data?.createdAt }}</span>
              <!-- Использование метода для форматирования даты -->
            </div>
            <div class="header__prop">
              <NuxtImg src="/img/prop-icon3.svg" alt="" />
              <span>{{ data?.bids.length }} отклик</span>
            </div>
          </div>
        </div>
        <div class="modal-project__price">100</div>
      </div>
      <div class="modal-wrapper__text">
        <div class="text15">
          {{ data?.description }}
        </div>
      </div>
      <div class="modal-wrapper__mainInput">
        <span>Текст отклика</span>
        <textarea v-model="description" />
      </div>
      <div class="modal-wrapper__inputs">
        <div class="modal-wrapper__input">
          <span>Стоимость (руб)</span>
          <input v-model="price" type="text" />
        </div>
        <div class="modal-wrapper__input">
          <span>Срок (в днях)</span>
          <input v-model="term" type="text" />
        </div>
      </div>
      <div class="modal-wrapper__under">
        <div class="send-button">
          <button v-if="!bid" @click="createBid">Предложить услугу</button>
        </div>
        <div class="modal-wrapper__status">
          <span>Статус: {{ bid?.status }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { projectsItem, Bid } from '~/stores/catalog/catalog.type';
const userStore = useUserStore();
const projectStore = useProjectStore();
const bidsStore = useBidsStore();
const route = useRoute();
const price = ref<number>(0);
const term = ref<number>(0);
const description = ref<string>();
// TODO доработать запрос на бке
const bid = computed(() => {
  return data.value?.bids.find((bid) => {
    return bid.user === userStore.user?._id;
  });
});

async function createBid() {
  await bidsStore
    .createBid(route.params._id as string, price.value, term.value)
    .then(async () => {
      await refreshNuxtData();
    });
}

const { data } = await useAsyncData<projectsItem | undefined>(
  'project',
  async (): Promise<projectsItem | undefined> => {
    return await projectStore.fetchProject(route.params._id as string);
  },
);
</script>
