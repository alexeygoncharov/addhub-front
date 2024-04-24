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
                errors.splice(errors.indexOf('country'), 1);
              }
            "
          />
          <p v-if="errors.includes('country')" class="fg__error">
            Обязательное поле
          </p>
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

        <fieldset v-if="user?.active_role === 'seller'" class="fg _full">
          <label>Объём проекта(заголовок)</label>
          <input
            v-model="form.service_volume"
            type="text"
            required
            placeholder="Заголовок"
          />
        </fieldset>
        <fieldset v-if="user?.active_role === 'seller'" class="fg _full">
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
            @input="
              (city) => {
                form.city = city;
                errors.splice(errors.indexOf('city'), 1);
              }
            "
          />
          <p v-if="errors.includes('city')" class="fg__error">
            Обязательное поле
          </p>
        </fieldset>
      </div>
    </form>
  </div>

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
const errors = ref<string[]>([]);
const createItem = async () => {
  validateItem(form.value, errors);
  if (errors.value.length) return;
  const body =
    user.value?.active_role === 'buyer' ? { ...form.value } : { ...form.value };
  const { data, error } = await apiFetch<
    ApiResponse<projectItem | serviceItem>
  >(`/api/${user.value?.active_role === 'buyer' ? 'projects' : 'services'}`, {
    options: { method: 'POST', body },
    needToken: true,
  });
  const value = data.value;
  if (value) {
    navigateTo(
      `/profile/items/${value.result._id}/edit?type=${user.value?.active_role === 'buyer' ? 'project' : 'service'}&fromCreate=true`,
    );
  } else {
    useToast({ message: 'Произошла ошибка', type: 'error' });
  }
};
</script>

<style scoped lang="scss"></style>
