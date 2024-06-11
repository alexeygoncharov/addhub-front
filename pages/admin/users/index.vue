<template>
  <section>
    <ModulesProfileTop>Пользователи </ModulesProfileTop>
    <div class="users">
      <div class="users__category-mobile">
        <div class="users__category-mobile-info">
          <div
            class="users__category-mobile-item"
            @click="showFilter = !showFilter"
          >
            <a class="users__category-mobile-item-link mobile-search">
              Поиск
              <svg
                width="45"
                height="45"
                viewBox="0 0 45 45"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23.5826 10.8857C27.0888 14.3919 27.0888 20.0766 23.5826 23.5828C20.0764 27.089 14.3917 27.089 10.8855 23.5828C7.37925 20.0766 7.37925 14.3919 10.8855 10.8857C14.3917 7.37946 20.0764 7.37946 23.5826 10.8857ZM8.26347 26.2048C12.7725 30.7138 19.8311 31.1191 24.7985 27.4207L34.1145 36.7367C34.8386 37.4608 36.0125 37.4608 36.7365 36.7367C37.4606 36.0127 37.4606 34.8388 36.7365 34.1147L27.4205 24.7987C31.1189 19.8314 30.7136 12.7727 26.2046 8.26368C21.2503 3.30937 13.2178 3.30937 8.26347 8.26368C3.30916 13.218 3.30916 21.2505 8.26347 26.2048Z"
                  fill="#484848"
                  stroke="#484848"
                />
              </svg>
            </a>
          </div>
          <div class="users__category-mobile-item">
            <a class="users__category-mobile-item-link" href="#">
              Все пользователи
              <div class="users__category-mobile-item-amount">
                {{ total }}
              </div>
            </a>
          </div>
        </div>

        <Swiper
          v-if="showFilter"
          class="users__category-mobile-form swiper"
          :space-between="15"
          slides-per-view="auto"
        >
          <SwiperSlide class="users__category-mobile-form-item swiper-slide">
            <label class="users__category-mobile-form-item-label"
              >Поиск по ID</label
            >
            <input
              class="users__category-mobile-form-item-input"
              type="text"
              placeholder="Введите ID"
            />
          </SwiperSlide>
          <SwiperSlide class="users__category-mobile-form-item swiper-slide">
            <label class="users__category-mobile-form-item-label"
              >Поиск ФИО</label
            >
            <input
              class="users__category-mobile-form-item-input"
              type="text"
              placeholder="Введите ФИО"
            />
          </SwiperSlide>
          <SwiperSlide class="users__category-mobile-form-item swiper-slide">
            <label class="users__category-mobile-form-item-label"
              >Поиск по Email</label
            >
            <input
              class="users__category-mobile-form-item-input"
              type="text"
              placeholder="Введите email"
            />
          </SwiperSlide>
          <SwiperSlide class="users__category-mobile-form-item swiper-slide">
            <label class="users__category-mobile-form-item-label"
              >Поиск по Дате</label
            >
            <div class="users__category-mobile-form-item-box">
              <input
                class="users__category-mobile-form-item-input"
                type="text"
                placeholder="От"
              />
              <input
                class="users__category-mobile-form-item-input"
                type="text"
                placeholder="До"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div class="users__category users-category" :class="{ hide: showFilter }">
        <a class="users__search" @click="showFilter = !showFilter">
          <svg
            width="45"
            height="45"
            viewBox="0 0 45 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M23.5826 10.8857C27.0888 14.3919 27.0888 20.0766 23.5826 23.5828C20.0764 27.089 14.3917 27.089 10.8855 23.5828C7.37925 20.0766 7.37925 14.3919 10.8855 10.8857C14.3917 7.37946 20.0764 7.37946 23.5826 10.8857ZM8.26347 26.2048C12.7725 30.7138 19.8311 31.1191 24.7985 27.4207L34.1145 36.7367C34.8386 37.4608 36.0125 37.4608 36.7365 36.7367C37.4606 36.0127 37.4606 34.8388 36.7365 34.1147L27.4205 24.7987C31.1189 19.8314 30.7136 12.7727 26.2046 8.26368C21.2503 3.30937 13.2178 3.30937 8.26347 8.26368C3.30916 13.218 3.30916 21.2505 8.26347 26.2048Z"
              fill="#484848"
              stroke="#484848"
            />
          </svg>
          <div class="users__search-text">
            Нажмите
            <span>для поиска</span>
          </div>
        </a>
        <a class="users__item">
          <div class="users__amount">{{ total }}</div>
          Все пользователи
        </a>
      </div>
      <div class="users-table">
        <table
          id="users-table"
          class="users-table__table nowrap"
          style="width: 100%"
        >
          <thead>
            <tr class="users-table__row">
              <th>
                <div class="users-table__cell">ID</div>
              </th>
              <th>
                <div class="users-table__cell">Имя</div>
              </th>
              <th>
                <div class="users-table__cell">Email</div>
              </th>
              <th>
                <div class="users-table__cell">Статус</div>
              </th>
              <th>
                <div class="users-table__cell cell-registration">
                  Дата регистрации
                </div>
              </th>
            </tr>
          </thead>
          <tbody v-if="!uploading">
            <tr
              v-for="el of users"
              :key="el._id"
              class="users-table__row row-info"
              :class="`users-table__row--${el.status === 'active' ? 'green' : 'red'}`"
              data-path="users-7"
              @click="openUser(el._id)"
            >
              <td>
                <div class="users-table__cell">{{ el._id }}</div>
              </td>
              <td>
                <div class="users-table__cell">{{ el.name }}</div>
              </td>
              <td>
                <div class="users-table__cell">{{ el.email }}</div>
              </td>
              <td>
                <div class="users-table__cell">
                  {{
                    listOfStatuses.find((status) => status.value === el.status)
                      ?.name
                  }}
                </div>
              </td>
              <td>
                <div class="users-table__cell">
                  {{
                    new Date(el.createdAt).toLocaleDateString() +
                    ` в ` +
                    new Date(el.createdAt).toLocaleTimeString('ru', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  }}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="uploading">
          <UiSkeleton
            v-for="el in 10"
            :key="el"
            class="users-table__skeleton"
          />
        </div>
        <UIVPagination
          v-model="currentPage"
          :total-items="total"
          :items-per-page="8"
          class="users__pagination"
          :total-pages="Math.ceil(total / 8)"
        />
      </div>
      <div
        class="users__filter"
        :class="{ 'users__filter--active': showFilter }"
      >
        <div class="users__filter-heading">
          <a class="users__filter-button" @click="showFilter = false"
            >img close</a
          >
          <h3 class="users__filter-title">Фильтрация</h3>
        </div>
        <form class="users__form">
          <div class="users__form-item">
            <label class="users__item-label">Поиск по ID</label>
            <input
              class="users__item-input"
              type="text"
              placeholder="Введите ID"
            />
          </div>
          <div class="users__form-item">
            <label class="users__item-label">Поиск по Имени</label>
            <input
              class="users__item-input"
              type="text"
              placeholder="Введите Имя"
            />
          </div>
          <div class="users__form-item">
            <label class="users__item-label">Поиск по Username</label>
            <input
              class="users__item-input"
              type="text"
              placeholder="Введите Username"
            />
          </div>
          <div class="users__form-item">
            <label class="users__item-label">Поиск по Email</label>
            <input
              class="users__item-input"
              type="text"
              placeholder="Введите email"
            />
          </div>
          <div class="users__form-item">
            <label class="users__item-label">Поиск по рейтингу</label>
            <div class="filter-slider">
              <div class="filter-slider__inputs">
                <div class="fg">
                  <label>От</label>

                  <input
                    v-model="rateMinBuffer"
                    type="number"
                    @input="updateValue(0, $event)"
                  />
                  <div class="filter-slider__currency"></div>
                </div>
                <div class="fg">
                  <label>До</label>
                  <input
                    v-model="rateMaxBuffer"
                    type="number"
                    @input="updateValue(1, $event)"
                  />
                  <div class="filter-slider__currency"></div>
                </div>
              </div>
              <div class="filter-slider__item">
                <div ref="sliderElement" class="range-slider"></div>
              </div>
              <div class="filter-slider__output">
                <span>{{ rateMinBuffer }}</span> -
                <span>{{ rateMaxBuffer }}</span>
              </div>
            </div>
          </div>

          <div class="users__form-item">
            <label class="users__item-label">Поиск по Дате</label>
            <div class="users__item-box">
              <input class="users__item-input" type="text" placeholder="От" />
              <input class="users__item-input" type="text" placeholder="До" />
            </div>
          </div>
          <div class="users__form-item">
            <label class="users__item-label">Статус</label>
            <div class="users__item-checkboxes">
              <label class="checkbox-active checkbox">
                <input class="users__item-input-checkbox" type="checkbox" />
                <p class="checkbox-title checkbox-title--active">Активен</p>
              </label>
              <!-- <label class="checkbox-disabled checkbox">
                <input class="users__item-input-checkbox" type="checkbox" />
                <p class="checkbox-title checkbox-title--disabled">Отключен</p>
              </label> -->
              <label class="checkbox-blocked checkbox">
                <input class="users__item-input-checkbox" type="checkbox" />
                <p class="checkbox-title checkbox-title--blocked">
                  Заблокирован
                </p>
              </label>
            </div>
          </div>
        </form>
      </div>
    </div>
    <UiModalDrawer :show="showModal">
      <template v-if="currentUser" #drawer-title>{{
        currentUser.name
      }}</template>
      <template #drawer-body>
        <div v-if="currentUser" class="users-modal__inner">
          <div class="users-modal__row">
            <div
              :class="[
                'users-modal__status',
                `users-modal__status${currentUser.status ? '--success' : '--disabled'}`,
              ]"
            >
              {{ currentUser.status ? 'Активный' : 'Заблокирован' }}
            </div>
            <div class="users-modal__date">
              <p class="users-modal__date-text">Зарегистрирован:</p>
              <p v-if="currentUser" class="users-modal__date-registration">
                {{
                  new Date(currentUser.createdAt).toLocaleDateString() +
                  ` в ` +
                  new Date(currentUser.createdAt).toLocaleTimeString('ru', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })
                }}
              </p>
            </div>
          </div>
          <div class="users-modal__main">
            <div class="users-modal__info">
              <div class="users-modal__info-category">Email:</div>
              <div class="users-modal__info-value">{{ currentUser.email }}</div>
              <div v-if="currentUser.phone" class="users-modal__info-category">
                Телефон:
              </div>
              <div v-if="currentUser.phone" class="users-modal__info-value">
                {{ currentUser.phone }}
              </div>
              <div class="users-modal__info-category">Товаров:</div>
              <div class="users-modal__info-value">
                {{ currentUser.products_count }}
              </div>
              <div class="users-modal__info-category">Заработано:</div>
              <div class="users-modal__info-value">
                {{ currentUser.earning }}
              </div>
              <div class="users-modal__info-category">Выплачено:</div>
              <div class="users-modal__info-value">{{ currentUser.paid }}</div>
              <div class="users-modal__info-category">Удержано:</div>
              <div class="users-modal__info-value">
                {{ currentUser.withheld }}
              </div>
            </div>
            <div class="users-modal__links">
              <nuxt-link
                :to="`/ap/users/${currentUser.id}/profile`"
                class="users-modal__link"
                >Открыть профиль</nuxt-link
              >
              <nuxt-link
                :to="`/u/${currentUser.username}`"
                class="users-modal__link"
              >
                Посмотреть товары
              </nuxt-link>
              <a class="users-modal__link" href="#"> Посмотреть выплаты </a>
              <a class="users-modal__link users-modal__link--blocked" href="#">
                Заблокировать
              </a>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="users-modal__row">
            <UiSkeleton class="users-modal__status--skeleton" />

            <UiSkeleton class="users-modal__date--skeleton" />
          </div>
          <div class="users-modal__main">
            <div class="users-modal__info">
              <template v-for="el in 6" :key="el">
                <UiSkeleton
                  class="users-modal__info-category--skeleton"
                  :style="{ width: length() + '%' }"
                />
                <UiSkeleton
                  class="users-modal__info-value--skeleton"
                  :style="{ width: length() + '%' }"
                />
              </template>
            </div>
            <div class="users-modal__links">
              <UiSkeleton
                v-for="el in 4"
                :key="el"
                class="users-modal__link--skeleton"
              />
            </div>
          </div>
        </div>
      </template>
    </UiModalDrawer>
  </section>
</template>

<script setup lang="ts">
import 'nouislider/dist/nouislider.css';
import { create } from 'nouislider';
import type { API, target } from 'nouislider';
import { showModal, openModal } from '~/composables/modalDrawer';
import { getUsers } from '~/modules/admin/composables/users';
const slider = ref<API>();
const sliderElement = ref<target>();
const filterTimeoutId = ref<ReturnType<typeof setTimeout>>();

const listOfStatuses = [
  {
    name: 'Активный',
    value: 'active',
  },
  { name: 'Заблокированный', value: 'blocked' },
];

const updateValue = (handle: number, event: Event) => {
  if (!slider.value || !event.target) return;

  const value = (event.target as HTMLInputElement).valueAsNumber;
  if (value < 0 || value > 5 || isNaN(value)) return;

  const newValue = [0, 0];
  newValue[handle] = value;
  slider.value.set(newValue);
};

onMounted(() => {
  if (!sliderElement.value) return;
  slider.value = create(sliderElement.value, {
    start: [0, 5],
    connect: true,
    step: 1,
    range: {
      min: 0,
      max: 5,
    },
  });
  slider.value.on('update', (values, handle) => {
    const value = parseInt(String(values[handle]), 10);
    if (handle === 0) {
      rateMinBuffer.value = value;
    } else {
      rateMaxBuffer.value = value;
    }

    clearTimeout(filterTimeoutId.value);
    filterTimeoutId.value = setTimeout(() => {
      if (handle === 0) {
        rateMin.value = value;
      } else {
        rateMax.value = value;
      }
    }, 300);
  });
});
const rateMinBuffer = ref(0);
const rateMaxBuffer = ref(5);
const rateMin = ref(0);
const rateMax = ref(5);

const length = () => {
  return Math.floor(Math.random() * (90 - 50 + 1)) + 50;
};
definePageMeta({
  layout: 'admin',
});
const showFilter = ref(false);
const currentPage = ref(1);
const total = ref(0);
const uploading = ref(false);
const users = ref<AdminProfile[]>([]);
const currentUser = ref();
const updateUsers = () => {
  uploading.value = true;
  getUsers(currentPage.value).then((data) => {
    if (!data?.value) return;
    users.value = data?.value.result;
    total.value = data?.value.total;
  });
  uploading.value = false;
};
updateUsers();
watch(currentPage, () => {
  updateUsers();
});
const openUser = (id: string) => {
  currentUser.value = undefined;
  openModal();
};
</script>

<style lang="scss" scoped>
@import '~/assets/style/pages/admin/users';
</style>
