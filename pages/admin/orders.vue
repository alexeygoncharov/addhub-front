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
            <td
              v-if="
                !(
                  item.status === 'processing' && user?.active_role === 'buyer'
                ) &&
                activeTab !== 'paid' &&
                activeTab !== 'canceled'
              "
            >
              <div class="reply-row__action">
                <div
                  v-if="
                    user?.active_role === 'seller' && item.status === 'created'
                  "
                  class="reply-row__btn"
                  @click="changeStatus('processing', item._id)"
                >
                  <button class="m-btn m-btn-blue3">
                    <svg
                      fill="#9DA1C6"
                      width="800px"
                      height="800px"
                      viewBox="0 0 1920 1920"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1468.214 0v564.698h-112.94V112.94H112.94v1694.092h1242.334v-225.879h112.94v338.819H0V0h1468.214Zm129.428 581.311c22.137-22.136 57.825-22.136 79.962 0l225.879 225.879c22.023 22.023 22.023 57.712 0 79.848l-677.638 677.637c-10.616 10.504-24.96 16.49-39.98 16.49h-225.88c-31.17 0-56.469-25.299-56.469-56.47v-225.88c0-15.02 5.986-29.364 16.49-39.867Zm-155.291 314.988-425.895 425.895v146.031h146.03l425.895-425.895-146.03-146.03Zm-764.714 346.047v112.94H338.82v-112.94h338.818Zm225.88-225.88v112.94H338.818v-112.94h564.697Zm734.106-315.44-115.424 115.425 146.03 146.03 115.425-115.423-146.031-146.031ZM1129.395 338.83v451.758H338.82V338.83h790.576Zm-112.94 112.94H451.759v225.878h564.698V451.77Z"
                        fill-rule="evenodd"
                      />
                    </svg>
                  </button>
                  <div class="tooltip">
                    <div class="tooltip__inner">
                      <div class="text14">В работе</div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    user?.active_role === 'seller' &&
                    (item.status === 'processing' || item.status === 'refunded')
                  "
                  class="reply-row__btn"
                  @click="changeStatus('completed', item._id)"
                >
                  <button class="m-btn m-btn-blue3">
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
                  </button>
                  <div class="tooltip">
                    <div class="tooltip__inner">
                      <div class="text14">Сдать</div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="item.status === 'completed'"
                  class="reply-row__btn"
                  @click="changeStatus('paid', item._id)"
                >
                  <button class="m-btn m-btn-blue3">
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
                  </button>
                  <div class="tooltip">
                    <div class="tooltip__inner">
                      <div class="text14">Принять</div>
                    </div>
                  </div>
                </div>
                <div
                  v-if="
                    item.status === 'completed' && user?.active_role === 'buyer'
                  "
                  class="reply-row__btn"
                  @click="changeStatus('refunded', item._id)"
                >
                  <button class="m-btn m-btn-blue3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      height="24px"
                      viewBox="0 -960 960 960"
                      width="24px"
                      fill="#9DA1C6"
                    >
                      <path
                        d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"
                      />
                    </svg>
                  </button>
                  <div class="tooltip">
                    <div class="tooltip__inner">
                      <div class="text14">Отправить на доработку</div>
                    </div>
                  </div>
                </div>
                <!-- <div
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
                      <div class="text14">Отменить</div>
                    </div>
                  </div>
                </div> -->

                <div
                  v-if="item.status !== 'canceled'"
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
                      <div class="text14">Отменить</div>
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
import {
  getOrders,
  changeOrderStatus,
} from '~/modules/admin/composables/orders';
const commonStore = useCommonStore();
const titles = [
  { title: 'В работе', value: 'processing' },
  { title: 'Сдано', value: 'completed' },
  { title: 'На доработке', value: 'refunded' },
  { title: 'Оплачено', value: 'paid' },
  { title: 'Отменено', value: 'canceled' },
];
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const currentPage = ref(1);
const activeTab = ref('processing');
definePageMeta({
  layout: 'admin',
});
let dropzoneEventsQueue = Promise.resolve();
const changeStatus = (
  value:
    | 'canceled'
    | 'completed'
    | 'processing'
    | 'paid'
    | 'refunded'
    | 'dispute',
  id: string,
) => {
  dropzoneEventsQueue = dropzoneEventsQueue.then(async () => {
    await changeOrderStatus(value, id).then((data) => {
      if (data) {
        items.value = items.value?.filter((item) => item._id !== id);
      }
    });
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
