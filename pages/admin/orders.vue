<template>
  <ModulesProfileTop>Заказы </ModulesProfileTop>

  <div class="payments projects-table m-table _tabs-parent _mob-select">
    <div class="tabs-select">
      <div class="tabs-select__show">
        <div class="tabs-select__current"></div>
      </div>
      <div class="tabs-select__hidden">
        <div class="tabs">
          <div
            v-for="el in titles"
            :key="el.value"
            class="m-tab _tab"
            :class="{ _active: activeTab === el.value }"
            @click="
              async () => {
                activeTab = el.value;
                await nextTick();
                updateItems();
              }
            "
          >
            <span>{{ el.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="tab-content _active">
      <table>
        <thead>
          <tr>
            <th><span>Название</span></th>
            <th><span>Категория</span></th>
            <th><span>Стоимость</span></th>
            <th v-if="activeTab !== 'canceled' && activeTab !== 'completed'">
              <span>Действия</span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item of items" :key="item._id" class="reply-row">
            <td>
              <div class="reply-row__info">
                <div class="reply-row__content">
                  <div class="reply-row__title text17">
                    <nuxtLink
                      class="medium-text"
                      :to="`/${commonStore.categories?.find((el) => el._id === item.service.category)?.slug}/${item._id}`"
                      href=""
                      >{{ item.service.title }}</nuxtLink
                    >
                    <p>- (Заказ №{{ item.order_number }})</p>
                  </div>
                  <div class="reply-row__props">
                    <div class="reply-row__prop">
                      <img src="/img/marker2.svg" alt="" />
                      <span
                        >{{
                          commonStore.cities?.find(
                            (c) => c._id === item.service.address.city,
                          )?.title
                        }},
                        {{
                          commonStore.countries?.find(
                            (c) => c._id === item.service.address.country,
                          )?.title
                        }}</span
                      >
                    </div>
                    <ClientOnly>
                      <div class="reply-row__prop">
                        <img src="/img/calendar2.svg" alt="" />
                        <span>{{ $dayjs(item.createdAt).fromNow() }}</span>
                      </div>
                    </ClientOnly>
                    <!-- <div v-if="'reviews' in item" class="reply-row__prop">
                        <img src="/img/reply.svg" alt="" />
                         <span>{{ item.reviews.length }}</span> 
                      </div> -->
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div class="reply-row__price">
                <span class="text15 light-text">
                  {{
                    commonStore.categories?.find(
                      (el) => el._id === item.service.category,
                    )?.title
                  }}
                </span>
              </div>
            </td>
            <td>
              <div class="reply-row__price">
                <span class="text15 light-text">
                  {{ item.service.price }} руб.
                </span>
              </div>
            </td>
            <td v-if="activeTab !== 'canceled' && activeTab !== 'completed'">
              <div class="reply-row__action">
                <div v-if="item.status === 'processing'" class="reply-row__btn">
                  <p class="m-btn m-btn-blue3">
                    <svg
                      width="800px"
                      height="800px"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M14.7071 3.00001L5.50001 12.2071L0.292908 7.00001L1.00001 6.29291L5.50001 10.7929L14 2.29291L14.7071 3.00001Z"
                        fill="#9DA1C6"
                      />
                    </svg>
                  </p>
                  <div class="tooltip">
                    <div class="tooltip__inner">
                      <div class="text14">Завершить</div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="item.status === 'created'"
                  class="reply-row__btn"
                  @click="changeStatus('canceled', item._id)"
                >
                  <button class="m-btn m-btn-blue3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.9119 10.0087L16.0613 4.8875C16.3082 4.64312 16.3082 4.2475 16.0613 4.00375C15.815 3.75937 15.415 3.75937 15.1688 4.00375L10.0238 9.12062L4.83129 3.9275C4.58504 3.68062 4.18504 3.68062 3.93879 3.9275C3.69254 4.175 3.69254 4.57562 3.93879 4.8225L9.12754 10.0119L3.92004 15.1906C3.67379 15.435 3.67379 15.8306 3.92004 16.0744C4.16629 16.3187 4.56629 16.3187 4.81254 16.0744L10.0157 10.9L15.1875 16.0725C15.4338 16.3194 15.8338 16.3194 16.08 16.0725C16.3263 15.825 16.3263 15.4244 16.08 15.1775L10.9119 10.0087Z"
                        fill="#9DA1C6"
                      />
                    </svg>
                  </button>
                  <div class="tooltip">
                    <div class="tooltip__inner">
                      <div class="text14">Отмена</div>
                    </div>
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <UIVPagination
      v-model="currentPage"
      :items-per-page="8"
      :total-items="total"
      :total-pages="Math.ceil(total / 8)"
    />
  </div>
</template>

<script setup lang="ts">
import { getOrders } from '~/modules/admin/composables/orders';
const commonStore = useCommonStore();
const titles = [
  { title: 'Создано', value: 'created' },
  { title: 'В работе', value: 'processing' },
  { title: 'Завершено', value: 'completed' },
  { title: 'Отменено', value: 'canceled' },
];
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const currentPage = ref(1);
const activeTab = ref('created');
definePageMeta({
  layout: 'admin',
});
let dropzoneEventsQueue = Promise.resolve();
const changeStatus = (value: 'canceled' | 'completed', id: string) => {
  dropzoneEventsQueue = dropzoneEventsQueue.then(async () => {
    const { data, error } = await apiFetch(`/api/orders/status/${id}`, {
      needToken: true,
      options: { method: 'PUT', body: { status: value } },
    });
    if (!error.value) {
      items.value = items.value?.filter((item) => item._id !== id);
    }
  });
};

const items = ref<Order[]>();
const total = ref(0);
const updateItems = () => {
  getOrders(currentPage.value, activeTab.value).then((data) => {
    if (!data?.value) return;
    items.value = data?.value.result;
    total.value = data?.value.total;
  });
};
updateItems();
</script>

<style scoped></style>
