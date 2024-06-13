<template>
  <ModulesProfileTop>Мои заказы </ModulesProfileTop>

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
    <div v-if="isRevealed" class="modal-screen">
      <div class="modal-wrapper-order">
        <div class="modal-header text20 medium">Открытие диспута</div>
        <div class="modal-body">
          <div class="chat-nav _flex">
            <div class="chat-nav__field">
              <textarea placeholder="Напишите сообщение"></textarea>
            </div>
            <div class="chat-nav__action _flex">
              <!--v-if-->
              <form class="chat-nav__file">
                <button
                  type="button"
                  class="chat-nav__file-btn"
                  @click="open()"
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15.4458 8.08021L9.55417 13.9729C9.45468 14.069 9.37532 14.1839 9.32073 14.311C9.26613 14.4381 9.2374 14.5748 9.2362 14.7131C9.23499 14.8514 9.26135 14.9886 9.31373 15.1166C9.3661 15.2446 9.44345 15.3609 9.54125 15.4587C9.63906 15.5565 9.75536 15.6339 9.88338 15.6863C10.0114 15.7386 10.1486 15.765 10.2869 15.7638C10.4252 15.7626 10.5619 15.7339 10.689 15.6793C10.816 15.6247 10.931 15.5453 11.0271 15.4458L16.9198 9.55417C17.5059 8.96807 17.8352 8.17314 17.8352 7.34427C17.8352 6.5154 17.5059 5.72048 16.9198 5.13437C16.3337 4.54827 15.5388 4.21901 14.7099 4.21901C13.881 4.21901 13.0861 4.54827 12.5 5.13437L6.60729 11.0271C6.11362 11.5085 5.72045 12.0831 5.45058 12.7176C5.18071 13.3521 5.03952 14.0339 5.0352 14.7234C5.03088 15.4129 5.16352 16.0964 5.42541 16.7343C5.68731 17.3721 6.07325 17.9516 6.56085 18.4392C7.04845 18.9267 7.628 19.3125 8.26589 19.5744C8.90378 19.8362 9.5873 19.9687 10.2768 19.9643C10.9663 19.9599 11.6481 19.8186 12.2826 19.5486C12.917 19.2787 13.4916 18.8854 13.9729 18.3917L19.8656 12.5L21.3385 13.9729L15.4458 19.8656C14.7687 20.5428 13.9648 21.0799 13.0801 21.4463C12.1954 21.8128 11.2472 22.0014 10.2896 22.0014C9.33198 22.0014 8.38375 21.8128 7.49904 21.4463C6.61433 21.0799 5.81046 20.5428 5.13333 19.8656C4.4562 19.1885 3.91908 18.3846 3.55262 17.4999C3.18616 16.6152 2.99754 15.667 2.99754 14.7094C2.99754 13.7518 3.18616 12.8035 3.55262 11.9188C3.91908 11.0341 4.4562 10.2303 5.13333 9.55312L11.0271 3.66146C12.0094 2.71272 13.325 2.18775 14.6906 2.19961C16.0562 2.21148 17.3626 2.75924 18.3282 3.7249C19.2939 4.69057 19.8416 5.99689 19.8535 7.36249C19.8654 8.7281 19.3404 10.0437 18.3917 11.026L12.5 16.9208C12.2097 17.211 11.8651 17.4412 11.4859 17.5983C11.1067 17.7553 10.7002 17.8361 10.2897 17.836C9.87927 17.836 9.47284 17.7551 9.09364 17.598C8.71443 17.4409 8.36989 17.2106 8.07969 16.9203C7.78948 16.63 7.55929 16.2854 7.40225 15.9062C7.24522 15.527 7.16442 15.1205 7.16447 14.71C7.16452 14.2996 7.24541 13.8931 7.40253 13.5139C7.55966 13.1347 7.78993 12.7902 8.08021 12.5L13.9729 6.60729L15.4458 8.08021Z"
                      fill="#C8CBE8"
                    ></path>
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="m-btn m-btn-blue" @click="openDispute()">
            <span>Отправить</span>
          </button>
          <button type="button" class="m-btn m-btn-blue" @click="cancel">
            <span>Отмена</span>
          </button>
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
            <th
              v-if="
                !(
                  activeTab === 'processing' && user?.active_role === 'buyer'
                ) &&
                activeTab !== 'paid' &&
                activeTab !== 'canceled'
              "
            >
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
                      :to="`/${type === 'service' ? 'services' : 'projects'}/${commonStore.categories?.find((el) => el._id === item.service.category)?.slug}/${item._id}`"
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
                  v-if="
                    item.status === 'completed' && user?.active_role === 'buyer'
                  "
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
                  v-if="
                    item.status === 'completed' || item.status === 'refunded'
                  "
                  class="reply-row__btn"
                  @click="reveal(item._id)"
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
                        d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z"
                      />
                    </svg>
                  </button>
                  <div class="tooltip">
                    <div class="tooltip__inner">
                      <div class="text14">Открыть диспут</div>
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
const disputeStore = useDisputesStore();
const { open, files, reset, onChange } = useFileDialog({
  accept: '.jpg, .png', // Set to accept only image files
  // directory: true, // Select directories instead of files if set true
  multiple: false,
});
const { isRevealed, reveal, confirm, cancel, onReveal, onConfirm, onCancel } =
  useConfirmDialog();
const dispute = ref<CreateDispute>({
  files: [],
  order: '',
});

onReveal((orderId: string) => {
  dispute.value.order = orderId;
});

function openDispute() {
  if (files.value?.length) {
    const fileSizeMB = files.value?.item(0)?.size;
    if (fileSizeMB && fileSizeMB >= 5 * 1024 * 1024) {
      useToast({ message: 'Файл не может превышать 5 мб' });
      reset();
    }
    const formData = new FormData();
    formData.append('file', files.value?.item(0) as Blob);
    commonStore.uploadFile(formData).then((file) => {
      if (file) {
        file.url = file?.url?.replace('/files', 'files') as string;
        dispute.value.files.push(file);
        disputeStore.createDispute(dispute.value);
        changeStatus('dispute', dispute.value.order);
        reset();
        confirm();
      }
    });
  } else {
    disputeStore.createDispute(dispute.value);
    changeStatus('dispute', dispute.value.order);
    confirm();
  }
}

const commonStore = useCommonStore();
const titles = [
  { title: 'Создано', value: 'created' },
  { title: 'В работе', value: 'processing' },
  { title: 'Сдано', value: 'completed' },
  { title: 'На доработке', value: 'refunded' },
  { title: 'Оплачено', value: 'paid' },
  { title: 'Отменено', value: 'canceled' },
];
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const currentPage = ref(1);
const activeTab = ref('created');
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
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
    const { data, error } = await apiFetch(`/api/orders/status/${id}`, {
      needToken: true,
      options: { method: 'PUT', body: { status: value } },
    });
    if (!error.value) {
      items.value = items.value?.filter((item) => item._id !== id);
    }
  });
};
const type = user.value?.active_role === 'seller' ? 'project' : 'service';

const items = ref<Order[]>();
const total = ref(0);
const updateItems = async () => {
  const { data } = await apiFetch<ApiListResponse<Order[]>>(`/api/orders/my`, {
    needToken: true,
    options: {
      query: {
        filter: { status: activeTab.value },
        offset: currentPage.value,
        limit: 8,
      },
    },
  });
  const value = data.value;
  if (value) {
    total.value = value.total;
    items.value = value.result;
  }
};
updateItems();
watch(() => user.value?.active_role, updateItems);
watch(currentPage, updateItems);
</script>

<style scoped></style>
