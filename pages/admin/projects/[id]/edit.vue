<template>
  <ModulesProfileTop> Редактирование проекта </ModulesProfileTop>

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
          <label>Заголовок проекта</label>
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
            @change="form.city = ''"
          />
          <p v-if="errors.includes('country')" class="fg__error">
            Обязательное поле
          </p>
        </fieldset>
        <fieldset v-if="commonStore.cities" class="fg">
          <label>Город</label>
          <UIVSelectSearch
            v-model="form.city"
            :disabled="!form.country"
            :items="
              commonStore.cities
                .filter((item) => item.country === form?.country)
                .map((item) => ({ title: item.title, value: item._id }))
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
  <div v-if="editableItem && 'files' in editableItem" class="profile-item">
    <div class="profile-item__top">
      <div class="text17 medium-text">Загрузить файлы</div>
    </div>
    <div class="profile-item__bottom">
      <div class="project-files">
        <div class="project-files__items">
          <nuxtLink
            v-for="(file, index) of editableItem?.files"
            :key="index"
            target="_blank"
            :to="baseUrl() + file.url"
            class="file-item"
          >
            <div class="file-item__title">{{ getFileName(file.url) }}</div>
            <div class="file-item__format">
              {{ getFileExtension(file.url) }}
            </div>
            <div
              class="file-item__delete"
              @click.prevent="deleteFile(file.url, index)"
            >
              <svg
                width="9"
                height="9"
                viewBox="0 0 9 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="9.0011"
                  y="8.30872"
                  width="0.979191"
                  height="11.7503"
                  rx="0.489596"
                  transform="rotate(135 9.0011 8.30872)"
                  fill="#D0D0D0"
                />
                <rect
                  x="8.30872"
                  width="0.979191"
                  height="11.7503"
                  rx="0.489596"
                  transform="rotate(45 8.30872 0)"
                  fill="#D0D0D0"
                />
              </svg>
            </div>
          </nuxtLink>
          <div class="file-input">
            <input type="file" multiple @change="uploadFile" />
            <div class="file-input__wrap">
              <div class="file-input__title">Загрузить файлы</div>
            </div>
          </div>
        </div>
        <div class="project-files__hint">
          <div class="text15">Максимальный размер: 5 мб</div>
        </div>
      </div>
    </div>
  </div>
  <ModulesProfileCreateItemDropZone
    v-else-if="editableItem"
    v-model="editableItem.photos"
    :upload-path="'/api/files/single'"
    @changed="editItem('image')"
  />

  <div class="profile-item__nav">
    <button
      v-if="editableItem?.status === 'approved'"
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
      :to="`/projects/${commonStore.categories?.find((item) => item._id === editableItem?.category)?.slug}/${editableItem._id}`"
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

const editableItem = ref<projectItem | serviceItem>();
const errors = ref<string[]>([]);

const switchPublish = async () => {
  if (!editableItem.value) return;
  const { data, error } = await apiFetch(
    `/api/projects/${editableItem.value.status === 'published' ? 'stop' : 'publish'}/${editableItem.value._id}`,
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

const deleteFile = async (file: string, index: number) => {
  const { data, error } = await apiFetch<{ status: number }>(
    '/api/files/single',
    {
      options: { method: 'DELETE', body: { filePath: file } },
      needToken: true,
    },
  );
  if (!error.value && editableItem.value && 'files' in editableItem.value) {
    editableItem.value?.files.splice(index, 1);
    editItem('file');
  }
};
function checkFile(file: File) {
  if (file.size > 5 * 1024 * 1024) {
    return false;
  }
  return true;
}
const uploadFile = async (event: Event) => {
  if (
    !editableItem.value ||
    !('files' in editableItem.value) ||
    !event.target ||
    editableItem.value.files.length === 10
  )
    return;
  let files = (event.target as HTMLInputElement).files as unknown as File[];
  if (!files?.length) return;
  if (files.length + editableItem.value.files.length > 10) {
    files = Array.from(files).slice(0, 10 - editableItem.value.files.length);
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!checkFile) {
      return useToast({
        message: 'Размер файла не должен превышать 5 мб',
        type: 'error',
      });
    }
    const formData = new FormData();
    formData.append('file', file);
    const { data, error } = await apiFetch<ApiResponse<uploadFileResponse>>(
      '/api/files/single',
      {
        options: { method: 'POST', body: formData },
        needToken: true,
      },
    );
    if (
      !error.value &&
      editableItem.value &&
      'files' in editableItem.value &&
      data.value
    ) {
      editableItem.value?.files.push(data.value?.result);
      editItem('file');
    }
  }
};
function getFileExtension(filename: string) {
  // Разбиваем строку с именем файла по точке
  const parts = filename.split('.');
  // Возвращаем последний элемент массива (расширение файла)
  return parts[parts.length - 1];
}
function getFileName(filename: string) {
  // Разбиваем строку с именем файла по точке
  const parts = filename.split('.');
  const ext = parts[parts.length - 2].split('/');
  // Возвращаем предпоследний элемент массива (называние файла)
  return ext[ext.length - 1];
}
if (!route.params.id) {
  throw createError({ statusCode: 404 });
}
const fetchItem = async () => {
  const { data, error } = await apiFetch<
    ApiResponse<projectItem | serviceItem>
  >(`/api/projects/${id}`, {
    needToken: true,
  });
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
      files: 'files' in value.result && value.result.files,
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
  const { data, error } = await apiFetch<
    ApiResponse<projectItem | serviceItem>
  >(`/api/projects/${id}`, {
    options: { method: 'PUT', body },
    needToken: true,
  });
  const value = data.value;
  if (value && !fileType) {
    editableItem.value = value.result;
    useToast({ message: 'Изменения сохранены', type: 'success' });
  }
};
</script>

<style scoped lang="scss"></style>
