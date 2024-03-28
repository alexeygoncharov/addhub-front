<template>
  <div class="modal-project">
    <div class="modal-wrapper">
      <div class="header">
        <div class="avatar">
          <img
            :src="`${$config.public.apiBase}/${data?.createdBy.avatar}`"
            alt=""
            crossorigin="anonymous"
          />
          <span
            v-if="data?.createdBy.online_status === 'online'"
            class="modal-card__user-online"
          ></span>
        </div>
        <div class="modal-project__price">100</div>
      </div>
      <div class="modal-wrapper__text">
        <div class="text15">
          {{ data?.description }}
        </div>
      </div>
      <div class="modal-wrapper__maininput">
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
import { useProjectStore } from './../../stores/catalog/projects';
import { useBidsStore } from './../../stores/catalog/bids';
import { useUserStore } from '~/stores/user';
import type { projectsItem, Bid } from '~/stores/catalog/catalog.type';
const userStore = useUserStore();
const projectStore = useProjectStore();
const route = useRoute();
const price = ref<number>(0);
const term = ref<number>(0);
const description = ref<string>();
const bidsStore = useBidsStore();
const bid = ref<Bid>();

async function createBid() {
  await bidsStore
    .createBid(route.params._id as string, price.value, term.value)
    .then(async (res) => {
      await refreshNuxtData();
      res();
    });
}

const { data } = await useAsyncData<projectsItem>(
  'project',
  async (): Promise<projectsItem> => {
    try {
      return await projectStore.fetchProject(route.params._id as string);
    } catch (e) {
      throw e;
    }
  },
);

// TODO ддоработать запрос на бке
bid.value = data.value?.bids.find((bid) => {
  if (bid.user === userStore.user?._id) return bid;
});
</script>
