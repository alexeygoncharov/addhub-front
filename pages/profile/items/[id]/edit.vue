<template>
  <ModulesProfileTop>{{
    user?.active_role === 'buyer'
      ? `Редактирование проекта`
      : `Редактирование услуги`
  }}</ModulesProfileTop>

  <div v-if="!fromCreate" class="profile-item">
    <form
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
          <label
            >Заголовок
            {{ user?.active_role === 'buyer' ? 'проекта' : 'услуги' }}</label
          >
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
                if (item._id === form.category) return item;
              })?.title,
            }"
            :options="
              commonStore.categories?.map((item) => {
                return { text: item.title, value: item._id };
              })
            "
            :placeholder="'Выберите категорию'"
            @input="(category) => (form.category = category)"
          />
        </fieldset>

        <!-- <fieldset class="fg">
            <label>Подкатегория</label>
          </fieldset> -->

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
          <input v-model="form.price" required type="text" placeholder="₽" />
        </fieldset>
        <fieldset class="fg">
          <label>Страна</label>
          <UIVSelect
            :initial-current-text="{
              value: form.country,
              text: commonStore.countries?.find((item) => {
                if (item._id === form.country) return item;
              })?.title,
            }"
            :options="
              commonStore.countries?.map((item) => {
                return { text: item.title, value: item._id };
              })
            "
            :placeholder="'Выберите страну'"
            @input="
              (country) => {
                form.country !== country && (form.city = '');
                form.country = country;
              }
            "
          />
        </fieldset>

        <!-- <fieldset class="fg">
            <label>Уровень</label>
          </fieldset> -->

        <!-- <fieldset class="fg">
            <label>Языки</label>
            
          </fieldset>
          <fieldset class="fg">
            <label>Уровень языка</label>
          </fieldset> -->

        <fieldset v-if="user?.active_role === 'buyer'" class="fg _full">
          <label>Объём проекта(заголовок)</label>
          <input
            v-model="form.service_volume"
            type="text"
            required
            placeholder="Заголовок"
          />
        </fieldset>
        <fieldset v-if="user?.active_role === 'buyer'" class="fg _full">
          <label>Объём проекта(описание)</label>
          <input
            v-model="form.service_volume_desc"
            type="text"
            required
            placeholder="Описание"
          />
        </fieldset>
        <fieldset class="fg">
          <label>Город</label>

          <UIVSelect
            :initial-current-text="{
              value: form.city,
              text: commonStore.cities?.find((item) => {
                if (item._id === form.city) return item;
              })?.title,
            }"
            :disabled="!form.country"
            :options="
              commonStore.cities
                ?.filter((el) =>
                  form.country ? el.country === form.country : true,
                )
                .map((item) => {
                  return { text: item.title, value: item._id };
                })
            "
            :placeholder="'Выберите город'"
            @input="(city) => (form.city = city)"
          />
        </fieldset>
      </div>
    </form>
  </div>

  <div
    v-if="
      user?.active_role === 'buyer' && editableItem && 'files' in editableItem
    "
    class="profile-item"
  >
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
            :to="baseUrl() + file"
            class="file-item"
          >
            <div class="file-item__title">{{ getFileName(file) }}</div>
            <div class="file-item__format">{{ getFileExtension(file) }}</div>
            <div
              class="file-item__delete"
              @click.prevent="deleteFile(file, index)"
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
            <input type="file" />
            <div class="file-input__wrap">
              <div class="file-input__title">Загрузить файлы</div>
            </div>
          </div>
        </div>
        <div class="project-files__hint">
          <div class="text15">Максимальный размер: 10 мб</div>
        </div>
      </div>

      <div class="profile-item__nav">
        <button class="profile-item__btn m-btn m-btn-blue m-btn-shadow">
          <span>Опубликовать</span>
        </button>
      </div>
    </div>
  </div>
  <ModulesProfileCreateItemDropZone v-else :banners="editableItem?.photos" />
  <div class="profile-item__nav">
    <button
      type="submit"
      form="create-item-form"
      class="profile-item__btn m-btn m-btn-blue m-btn-shadow"
    >
      <span>Сохранить</span>
    </button>
    <button class="profile-item__btn m-btn m-btn-blue m-btn-shadow">
      <span>Опубликовать</span>
    </button>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
const deleteFile = async (file: string, index: number) => {
  const { data, error } = await apiFetch('/api/files/single', {
    options: { method: 'DELETE', body: { filePath: file } },
    needToken: true,
  });
  if (!error.value && editableItem.value && 'files' in editableItem.value) {
    editableItem.value?.files.splice(index, 1);
  }
};
const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  const { data, error } = await apiFetch('/api/files/single', {
    options: { method: 'POST', body: formData },
  });
  if (!error.value && editableItem.value && 'files' in editableItem.value) {
    // editableItem.value?.files.push();
    console.log('Успех');
  }
};
const form = ref({
  title: '',
  description: '',
  price: '',
  city: '',
  country: '',
  category: '',
  service_volume_desc: '',
  service_volume: '',
  delivery_time: '',
});
const commonStore = useCommonStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const editableItem = ref<projectItem | serviceItem>();
const route = useRoute();
const fromCreate = Array.isArray(route.query.fromCreate)
  ? false
  : !!route.query.fromCreate;
function getFileExtension(filename: string) {
  // Разбиваем строку с именем файла по точке
  const parts = filename.split('.');
  // Возвращаем последний элемент массива (расширение файла)
  return parts[parts.length - 1];
}
function getFileName(filename: string) {
  // Разбиваем строку с именем файла по точке
  const parts = filename.split('.');
  // Возвращаем последний элемент массива (расширение файла)
  return parts[parts.length - 2].split('/')[1];
}
if (
  !route.params.id ||
  !route.query.type ||
  Array.isArray(route.query.type) ||
  !['project', 'service'].includes(route.query.type)
) {
  throw createError({ statusCode: 404 });
}
const id = route.params.id;
const type = route.query.type as 'project' | 'service';
const fetchItem = async () => {
  const { data, error } = await apiFetch<
    ApiResponse<projectItem | serviceItem>
  >(`/api/${type === 'project' ? 'projects' : 'services'}/${id}`);
  const value = data.value;
  if (value) {
    editableItem.value = value.result;
    form.value = {
      ...form.value,
      city: value.result.address.city._id,
      country: value.result.address.city.country,
      category: value.result.category,
      title: value.result.title,
      description: value.result.description,
      price: value.result.price.toString(),
      service_volume_desc: value.result.service_volume_desc,
      service_volume: value.result.service_volume,
      delivery_time: value.result.delivery_time.toString(),
    };
  }
};
fetchItem();
const editItem = async () => {
  const body =
    user.value?.active_role === 'buyer' ? { ...form.value } : { ...form.value };
  const { data, error } = await apiFetch(
    `/api/${user.value?.active_role === 'buyer' ? 'projects' : 'services'}/${id}`,
    { options: { method: 'PUT', body }, needToken: true },
  );
  const value = data.value;
  if (value) {
    useToast({ message: 'Изменения сохранены', type: 'success' });
  }
};
</script>

<style scoped lang="scss"></style>
