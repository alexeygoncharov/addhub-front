<template>
  <div class="modal-bid__bg">
    <OnClickOutside @trigger="showBid = false">
      <form
        class="modal-wrapper"
        @submit="
          (e) => {
            e.preventDefault();
            editableData ? updateBid() : createBid();
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
          <textarea v-if="!editableData" v-model="description" />
          <textarea v-else v-model="editableData.description" />
        </div>
        <div class="modal-wrapper__inputs">
          <div class="modal-wrapper__input">
            <label class="bid-label">Стоимость (руб)</label>
            <input v-if="!editableData" v-model="price" required type="text" />
            <input v-else v-model="editableData.price" required type="text" />
          </div>
          <div class="modal-wrapper__input">
            <label class="bid-label">Срок (в днях)</label>
            <input
              v-if="!editableData"
              v-model="term"
              required
              name="term"
              type="text"
            />
            <input
              v-else
              v-model="editableData.term"
              required
              name="term"
              type="text"
            />
          </div>
        </div>
        <div class="modal-wrapper__under">
          <div class="send-button">
            <button
              :disabled="
                !editable ? !price || !term : !editable.price || !editable.term
              "
              type="submit"
            >
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
const item = defineModel<projectsItem>('item', { default: undefined });
const price = ref<number>();
const term = ref<number>();
const description = ref<string>();
const emit = defineEmits(['newBid', 'submit']);
const editableData = defineModel<Bid>('editable', { default: undefined });
const props = defineProps<{ id: string }>();
async function updateBid() {
  if (
    !editableData.value.price ||
    !editableData.value.term ||
    !editableData.value
  )
    return;
  showBid.value = false;
  const data = editableData.value;
  const result = await bidsStore.updateBid(data.project_id._id, data._id, {
    price: data.price,
    term: data.term,
    description: data.description || '',
  });
  if (result) {
    emit('submit');
  }
}
async function createBid() {
  if (!price.value || !term.value) return;
  showBid.value = false;
  const data = await bidsStore.createBid(
    props.id as string,
    price.value,
    term.value,
    description.value || '',
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
