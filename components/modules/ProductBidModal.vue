<template>
  <div class="modal-bid__bg">
    <OnClickOutside @trigger="showBid = false">
      <form
        class="modal-wrapper"
        @submit="
          (e) => {
            e.preventDefault();
            createBid();
          }
        "
      >
        <div class="header">
          <div class="title text20 medium-text">Ваш отклик</div>
          <img
            src="/img/cross.svg"
            alt="close"
            class="modal-wrapper__close"
            @click="showBid = false"
          />
        </div>

        <div class="modal-wrapper__mainInput">
          <label class="bid-label">Текст отклика</label>
          <textarea v-model="description" />
        </div>
        <div class="modal-wrapper__inputs">
          <div class="modal-wrapper__input">
            <label class="bid-label">Стоимость (руб)</label>
            <input v-model="price" required type="text" />
          </div>
          <div class="modal-wrapper__input">
            <label class="bid-label">Срок (в днях)</label>
            <input v-model="term" required name="term" type="text" />
          </div>
        </div>
        <div class="modal-wrapper__under">
          <div class="send-button">
            <button :disabled="!price || !term" type="submit">
              Предложить услугу
            </button>
          </div>
        </div>
      </form></OnClickOutside
    >
  </div>
</template>

<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';
import type { projectsItem } from '~/stores/catalog/catalog.type';
const showBid = defineModel<boolean>({ required: true });
const bidsStore = useBidsStore();
const item = defineModel<projectsItem>('item');
const price = ref<number>();
const term = ref<number>();
const description = ref<string>();
const emit = defineEmits(['newBid']);
const props = defineProps<{ id: string }>();
async function createBid() {
  if (!price.value || !term.value || !description.value) return;
  showBid.value = false;
  const data = await bidsStore.createBid(
    props.id as string,
    price.value,
    term.value,
    description.value,
  );
  if (data) {
    item.value?.bids.push(data);
    emit('newBid');
  } else {
    useToast({
      message: 'Произошла ошибка при создании отклика',
      type: 'error',
    });
  }
}
</script>

<style scoped></style>
