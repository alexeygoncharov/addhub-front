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
const bid = computed(() => {
  return data.value?.bids.find((bid) => {
    return bid.user === userStore.user?._id;
  });
});

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
    // try {
    return await projectStore.fetchProject(route.params._id as string);
    // } catch (e) {
    //   throw e;
    // }
  },
);

// TODO доработать запрос на бке
</script>
<style lang="scss">
.modal-screen {
  inset: 0;
  z-index: 10000;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  background: rgba(0 0 0 / 60%);
  -webkit-overflow-scrolling: touch;
}

.modal-project {
  position: relative;
  inset: 0;
  margin: 50px auto;
  background-color: #fff;
  border-radius: 0 0 12px 12px;
}

input {
  width: 100%;
  height: 40px;
  padding: 0 15px;
  margin: 0;
  border: 2px solid #ccc;
  border-radius: 4px;
}

.modal-wrapper {
  position: relative;
  inset: 0;
  z-index: 1111;
  max-width: 750px;
  max-height: 600px;
  margin: auto;
  overflow: auto;
  border-radius: 0 0 12px 12px;

  &__status {
    position: relative;
    display: flex;
    align-items: center;
  }

  &__text {
    max-width: 33.75em;
    margin: 20px 0;
    font-weight: 300;
  }

  .send-button {
    display: flex;
    flex-direction: row-reverse;
    width: 100%;
    margin: 50px 0;
  }

  button {
    width: 150px;
    height: 40px;
    color: #e8e8e8;
    background-color: rgba($color: #7464de, $alpha: 100%);
    border-radius: 4px;
  }

  &__mainInput {
    width: 100%;
    margin: 20px 0;
  }

  textarea {
    box-sizing: border-box;
    width: 100%;
    height: 150px;
    padding: 12px 20px;
    margin: 20px 0;
    font-weight: 300;
    resize: none;
    border: 2px solid #ccc;
    border-radius: 4px;
  }

  &__inputs {
    display: flex;
    flex-direction: row;
    gap: 40px;
  }

  &__input {
    width: 100%;
  }

  &__under {
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-between;
  }

  .header {
    display: flex;
    flex-direction: row;

    &__props {
      display: flex;
      flex-direction: row;
      margin-top: 0.87;
    }

    &__prop {
      display: flex;
      align-items: center;
      padding-right: 0.125em;
      margin-right: 0.625em;
      color: #6b7177;
      border-right: 1px solid #e9e9e9;
    }
  }

  .modal-card__user-online {
    top: 0.25em;
    right: 0.25em;
    width: 0.5625em;
    height: 0.5625em;
    border-width: 1px;
  }

  .wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;

    .title {
      margin: 5px;
      font-weight: 500;
    }
  }

  .avatar {
    position: relative;
    width: 3.625em;
    height: 3.625em;
    margin-right: 1.25em;
  }
}
</style>
