<template>
  <ModulesProfileTop>Редактирование услуги </ModulesProfileTop>

  <div class="profile-item">
    <form
      v-if="form"
      id="create-item-form"
      name="create-item-form"
      class="profile-item__bottom _pt0"
      @submit="
        (e) => {
          e.preventDefault();
          editItem();
        }
      "
    >
      <div class="profile-item__grid">
        <fieldset class="fg _full">
          <label>Заголовок услуги</label>
          <input
            v-model="form.title"
            required
            type="text"
            placeholder="Заголовок"
          />
        </fieldset>
        <fieldset class="fg _full">
          <label>
            <label>Описание</label>
          </label>
          <textarea
            v-model="form.description"
            required
            placeholder="Текст описания"
          ></textarea>
        </fieldset>
        <fieldset class="fg">
          <label>Категория</label>
          <UIVSelect
            :initial-current-text="{
              value: form.category,
              text: commonStore.categories?.find((item) => {
                if (form && item._id === form.category) return item;
              })?.title,
            }"
            :options="
              commonStore.categories?.map((item) => {
                return { text: item.title, value: item._id };
              })
            "
            :placeholder="'Выберите категорию'"
            @input="
              (category) => {
                if (!form) return;
                form.category = category;
                errors.splice(errors.indexOf('category'), 1);
              }
            "
          />
          <p v-if="errors.includes('category')" class="fg__error">
            Обязательное поле
          </p>
        </fieldset>

        <fieldset class="fg">
          <label>Срок</label>
          <input
            v-model="form.delivery_time"
            required
            type="number"
            placeholder="Кол-во дней"
          />
        </fieldset>

        <fieldset class="fg">
          <label>Цена</label>
          <input v-model="form.price" required type="text" placeholder="руб." />
        </fieldset>

        <fieldset class="fg">
          <label>Объём услуги(заголовок)</label>
          <input
            v-model="form.service_volume"
            type="text"
            required
            placeholder="Заголовок"
          />
        </fieldset>
        <fieldset class="fg">
          <label>Объём услуги(описание)</label>
          <input
            v-model="form.service_volume_desc"
            type="text"
            required
            placeholder="Описание"
          />
        </fieldset>
        <fieldset v-if="commonStore.countries" class="fg">
          <label>Страна</label>
          <UIVSelectSearch
            v-model="form.country"
            :items="
              commonStore.countries.map((item) => {
                return {
                  title: item.title,
                  value: item._id,
                };
              })
            "
          />
          <p v-if="errors.includes('country')" class="fg__error">
            Обязательное поле
          </p>
        </fieldset>
        <fieldset v-if="commonStore.cities" class="fg">
          <label>Город</label>
          <UIVSelectSearch
            v-model="form.city"
            :items="
              commonStore.cities.map((item) => {
                return { title: item.title, value: item._id };
              })
            "
          />
          <p v-if="errors.includes('city')" class="fg__error">
            Обязательное поле
          </p>
        </fieldset>
      </div>
    </form>
    <div class="profile-item__nav">
      <button
        type="submit"
        form="create-item-form"
        class="profile-item__btn m-btn m-btn-blue m-btn-shadow"
      >
        <span>Сохранить</span>
      </button>
    </div>
  </div>

  <ModulesProfileCreateItemDropZone
    v-if="editableItem"
    v-model="editableItem.photos"
    :upload-path="'/api/files/single'"
    @changed="editItem('image')"
  />

  <div class="profile-item__nav">
    <button
      v-if="editableItem?.status === 'approved' && editableItem?.photos.length"
      class="profile-item__btn m-btn m-btn-blue m-btn-shadow"
      @click="switchPublish"
    >
      <span>Опубликовать</span>
    </button>
    <button
      v-else-if="editableItem?.status === 'pending'"
      class="profile-item__btn m-btn m-btn-blue m-btn-shadow"
      disabled
    >
      <span>На проверке</span>
    </button>
    <button
      v-else-if="editableItem?.status === 'published'"
      class="profile-item__btn m-btn m-btn-blue m-btn-shadow"
      @click="switchPublish"
    >
      <span>Снять с публикации</span>
    </button>
    <NuxtLink
      v-if="editableItem?.status === 'published'"
      :to="`/services/${commonStore.categories?.find((item) => item._id === editableItem?.category)?.slug}/${editableItem._id}`"
      class="m-btn m-btn-shadow"
    >
      <span>Посмотреть на сайте</span>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});
const route = useRoute();
const form = ref<ItemForm>();
const commonStore = useCommonStore();
const id = route.params.id;

const editableItem = ref<serviceItem>();
const errors = ref<string[]>([]);

const switchPublish = async () => {
  if (!editableItem.value) return;
  const { data, error } = await apiFetch(
    `/api/services/${editableItem.value.status === 'published' ? 'stop' : 'publish'}/${editableItem.value._id}`,
    { needToken: true, options: { method: 'PUT' } },
  );
  if (!error.value) {
    editableItem.value.status =
      editableItem.value.status === 'approved' ? 'published' : 'approved';
    useToast({
      message:
        editableItem.value.status === 'published'
          ? 'Успешно опубликовано'
          : 'Успешно снято с публикации',
      type: 'success',
    });
  }
};

if (!route.params.id) {
  throw createError({ statusCode: 404 });
}
const fetchItem = async () => {
  const { data, error } = await apiFetch<ApiResponse<serviceItem>>(
    `/api/services/${id}`,
    {
      needToken: true,
    },
  );
  const value = data.value;
  if (value) {
    editableItem.value = value.result;
    form.value = {
      city: value.result.address.city._id,
      country: value.result.address.country._id,
      category: value.result.category,
      title: value.result.title,
      description: value.result.description,
      price: value.result.price.toString(),
      delivery_time: value.result.delivery_time.toString(),
      ...('service_volume_desc' in value.result &&
        'service_volume' in value.result && {
          service_volume_desc: value.result.service_volume_desc,
          service_volume: value.result.service_volume,
        }),
      ...(('photos' in value.result && { photos: value.result.photos }) ||
        ('files' in value.result && { files: value.result.files })),
    } as ItemForm;
  }
};

fetchItem();

const editItem = async (fileType?: 'file' | 'image') => {
  if (!editableItem.value || !form.value) return;
  validateItem(form.value, errors);

  const payload = {
    title: form.value.title,
    description: form.value.description,
    price: form.value.price,
    city: form.value.city,
    country: form.value.country,
    category: form.value.category,
    service_volume_desc: form.value.service_volume_desc,
    service_volume: form.value.service_volume,
    delivery_time: form.value.delivery_time,
  };

  if (errors.value.length) return;
  const body = !fileType
    ? { ...payload }
    : fileType === 'file' && 'files' in editableItem.value
      ? { files: editableItem.value?.files }
      : { photos: editableItem.value?.photos };
  const { data, error } = await apiFetch<ApiResponse<serviceItem>>(
    `/api/services/${id}`,
    {
      options: { method: 'PUT', body },
      needToken: true,
    },
  );
  const value = data.value;
  if (value && !fileType) {
    editableItem.value = value.result;
    useToast({ message: 'Изменения сохранены', type: 'success' });
  }
};
</script>

<style scoped lang="scss"></style>
