<template>
  <ModulesProfileTop>{{
    user?.active_role === 'buyer' ? `Новый проект` : `Новая услуга`
  }}</ModulesProfileTop>

  <div class="profile-item">
    <form
      id="create-item-form"
      name="create-item-form"
      class="profile-item__bottom _pt0"
      @submit="
        (e) => {
          e.preventDefault();
          createItem();
        }
      "
    >
      <div class="profile-item__grid">
        <fieldset class="fg _full">
          <label
            >Заголовок
            {{ user?.active_role === 'buyer' ? 'проекта' : 'услуги' }}</label
          >

          <input
            v-model.trim="form.title"
            required
            maxlength="100"
            name="title"
          />
        </fieldset>
        <fieldset class="fg _full">
          <label>
            <label>Описание</label>
          </label>
          <textarea
            v-model.trim="form.description"
            minlength="10"
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
                if (item._id === form.category) return item;
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
                form.category = category;
                errors.splice(errors.indexOf('category'), 1);
              }
            "
          />
          <p v-if="errors.includes('category')" class="fg__error">
            Обязательное поле
          </p>
        </fieldset>

        <!-- <fieldset class="fg">
          <label>Подкатегория</label>
        </fieldset> -->

        <fieldset class="fg">
          <label>Срок</label>
          <input
            v-model.trim.number="form.delivery_time"
            required
            maxlength="3"
            type="number"
            placeholder="Кол-во дней"
            @keypress="
              (event: KeyboardEvent) =>
                isNaN(parseInt(event.key)) ? event.preventDefault() : null
            "
            @paste="handleNumPaste"
          />
        </fieldset>

        <fieldset class="fg">
          <label>Цена</label>
          <input
            v-model.trim.number="form.price"
            required
            type="text"
            :maxlength="7"
            placeholder="₽"
            @keypress="
              (event: KeyboardEvent) =>
                isNaN(parseInt(event.key)) ? event.preventDefault() : null
            "
            @paste="handleNumPaste"
          />
        </fieldset>

        <fieldset
          v-if="user?.active_role === 'seller' || user?.active_role === 'admin'"
          class="fg"
        >
          <label>Объём услуги(заголовок)</label>
          <input
            v-model.trim="form.service_volume"
            type="text"
            required
            placeholder="Заголовок"
          />
        </fieldset>
        <fieldset
          v-if="user?.active_role === 'seller' || user?.active_role === 'admin'"
          class="fg"
        >
          <label>Объём услуги(описание)</label>
          <input
            v-model.trim="form.service_volume_desc"
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
                return { title: item.title, value: item._id };
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
                .filter((item) => item.country === form.country)
                .map((item) => ({
                  title: item.title,
                  value: item._id,
                }))
            "
          />
          <p v-if="errors.includes('city')" class="fg__error">
            Обязательное поле
          </p>
        </fieldset>
      </div>
    </form>
  </div>
  <div v-if="type === 'project'" class="profile-item">
    <div class="profile-item__top">
      <div class="text17 medium-text">Загрузить файлы</div>
    </div>
    <div class="profile-item__bottom">
      <div class="project-files">
        <div class="project-files__items">
          <nuxtLink
            v-for="(file, index) of 'files' in form
              ? form?.files
              : form?.photos"
            :key="index"
            target="_blank"
            :to="baseUrl() + file.url"
            class="file-item"
          >
            <div class="file-item__title">{{ getFileName(file.url) }}</div>
            <div class="file-item__format">
              {{ getFileExtension(file.url) }}
            </div>
            <div class="file-item__delete">
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
    v-else-if="'photos' in form && form.photos"
    v-model="form.photos"
    :upload-path="'/api/files/single'"
    can-zero
  />
  <p v-if="errors.includes('photos')" class="fg__error">
    Изображение обязательно
  </p>
  <div class="profile-item__nav">
    <button
      type="submit"
      form="create-item-form"
      class="profile-item__btn m-btn m-btn-blue m-btn-shadow"
    >
      <span>Создать</span>
    </button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});

useValidation();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const type = (user.value?.active_role === 'buyer' ? 'project' : 'service') as
  | 'project'
  | 'service';
const form = ref<ItemForm>({
  title: '',
  description: '',
  price: '',
  city: '',
  country: '',
  category: '',
  service_volume_desc: '',
  service_volume: '',
  delivery_time: '',
  ...(type === 'project'
    ? { files: [] as uploadFileResponse[] }
    : { photos: [] as uploadFileResponse[] }),
});
function checkFile(file: File) {
  if (file.size > 5 * 1024 * 1024) {
    return false;
  }
  return true;
}
if ('photos' in form.value)
  watch(form.value.photos, () => {
    errors.value.splice(errors.value.indexOf('category'), 1);
  });
const uploadFile = async (event: Event) => {
  if (
    !('files' in form.value) ||
    !event.target ||
    form.value.files.length === 10
  )
    return;
  let files = (event.target as HTMLInputElement).files as unknown as File[];
  if (!files?.length) return;
  if (files.length + form.value.files.length > 10) {
    files = Array.from(files).slice(0, 10 - form.value.files.length);
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
    if (!error.value && form.value && 'files' in form.value && data.value) {
      form.value?.files.push(data.value?.result);
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

const commonStore = useCommonStore();
const errors = ref<string[]>([]);
const createItem = async () => {
  validateItem(form.value, errors);
  if (errors.value.length) return;
  const body = form.value;
  const { data, error } = await apiFetch<
    ApiResponse<projectItem | serviceItem>
  >(`/api/${user.value?.active_role === 'buyer' ? 'projects' : 'services'}`, {
    options: { method: 'POST', body },
    needToken: true,
  });
  const value = data.value;
  if (value) {
    navigateTo(
      `/profile/items/${value.result._id}/edit?type=${user.value?.active_role === 'buyer' ? 'project' : 'service'}`,
    );
  } else {
    useToast({ message: 'Произошла ошибка', type: 'error' });
  }
};
</script>

<style scoped lang="scss"></style>
