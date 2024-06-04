<template>
  <div class="modal-bid__bg">
    <OnClickOutside @trigger="showBid = false">
      <Form
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

        <div class="modal-wrapper__list">
          <OnClickOutside @trigger="activeChoice = false">
            <label class="bid-label">Предложенная услуга</label>
            <div
              class="modal-wrapper__choose"
              @click="activeChoice = !activeChoice"
            >
              {{ chosenService ? chosenService.title : 'Выберите услугу' }}
            </div>
            <div v-if="activeChoice" class="header-action__search-list">
              <div
                v-for="service in items"
                :key="service._id"
                class="header-action__search-item"
                @click="
                  () => {
                    chosenService = service;
                    activeChoice = false;
                  }
                "
              >
                <div class="header-action__search-item-img">
                  <NuxtImg
                    :src="baseUrl() + service.photos[0].url"
                    crossorigin="anonymous"
                    alt="preview"
                  />
                  <p>{{ service.title }}</p>
                </div>
                <p>{{ service.price }} руб.</p>
              </div>
              <p v-if="!items?.length" class="header-action__search-item">
                У вас нет услуг
              </p>
            </div>
          </OnClickOutside>
        </div>

        <div class="modal-wrapper__mainInput">
          <label class="bid-label">Текст отклика</label>
          <Field
            v-if="!editableData"
            v-model="description"
            as="textarea"
            name="description"
            rules="required"
          />
          <Field
            v-else
            v-model="editableData.description"
            as="textarea"
            name="description"
            rules="required"
          />
          <ErrorMessage name="description" class="error-message" />
        </div>
        <div class="modal-wrapper__inputs">
          <div class="modal-wrapper__input">
            <label class="bid-label">Стоимость (руб)</label>
            <Field
              v-if="!editableData"
              v-model="price"
              rules="required"
              name="price"
            />
            <Field
              v-else
              v-model="editableData.price"
              required
              name="price"
              rules="required"
            />
            <ErrorMessage name="price" class="error-message" />
          </div>
          <div class="modal-wrapper__input">
            <label class="bid-label">Срок (в днях)</label>
            <Field
              v-if="!editableData"
              v-model="term"
              rules="required"
              name="term"
            />
            <Field
              v-else
              v-model="editableData.term"
              required
              name="term"
              rules="required"
            />
            <ErrorMessage name="term" class="error-message" />
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
      </Form></OnClickOutside
    >
  </div>
</template>

<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';
import { Field, Form, ErrorMessage } from 'vee-validate';
import type { projectsItem } from '~/stores/catalog/catalog.type';
useValidation();
const showBid = defineModel<boolean>({ required: true });
const bidsStore = useBidsStore();
const item = defineModel<projectsItem | projectItem>('item', {
  default: undefined,
});
const price = ref<number>();
const chosenService = ref<servicesItem>();
const term = ref<number>();
const description = ref<string>();
const emit = defineEmits(['newBid', 'updateBid']);
const editableData = defineModel<Bid>('editable', { default: undefined });
const props = defineProps<{ id: string }>();
const activeChoice = ref(false);
const items = ref<servicesItem[]>();
const updateServices = async () => {
  const { data, error } = await apiFetch<ApiResponse<servicesItem[]>>(
    '/api/services/my_select',
    {
      needToken: true,
    },
  );
  if (data.value) {
    items.value = data.value.result;
  }
};
updateServices();
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
    ...(chosenService.value && { service: chosenService.value._id }),
  });
  if (result) {
    emit('updateBid');
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
