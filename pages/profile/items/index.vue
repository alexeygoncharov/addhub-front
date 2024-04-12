<template>
  <ModulesProfileTop
    >Мои проекты

    <template #btn>
      <button class="admin-top__btn m-btn m-btn-blue m-btn-shadow">
        <span>Создать проект</span>
      </button></template
    >
  </ModulesProfileTop>

  <div class="payments projects-table m-table _tabs-parent _mob-select">
    <div class="tabs-select">
      <div class="tabs-select__show">
        <div class="tabs-select__current"></div>
      </div>
      <div class="tabs-select__hidden">
        <div class="tabs">
          <div
            v-for="(title, index) of titles"
            :key="title"
            class="m-tab _tab"
            :class="{ _active: activeTab === index }"
            @click="activeTab = index"
          >
            <span>{{ title }}</span>
          </div>
        </div>
      </div>
    </div>

    <div
      v-for="i in 5"
      :key="i"
      class="tab-content"
      :class="{ _active: activeTab === i - 1 }"
    >
      <table>
        <thead>
          <tr>
            <th><span>Название</span></th>
            <th><span>Категория</span></th>
            <th><span>Стоимость</span></th>
            <th><span>Действия</span></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="j in 8" :key="j" class="reply-row">
            <td>
              <div class="reply-row__info">
                <div class="reply-row__content">
                  <div class="reply-row__title text17 medium-text">
                    <a href="">Мобильное приложение по доставке еды</a>
                  </div>
                  <div class="reply-row__props">
                    <div class="reply-row__prop">
                      <img src="/img/marker2.svg" alt="" />
                      <span>Москва, Россия</span>
                    </div>
                    <div class="reply-row__prop">
                      <img src="/img/calendar2.svg" alt="" />
                      <span>Декабрь 2, 2023</span>
                    </div>
                    <div class="reply-row__prop">
                      <img src="/img/reply.svg" alt="" />
                      <span>1 предложение</span>
                    </div>
                  </div>
                </div>
              </div>
            </td>
            <td>
              <div class="reply-row__price">
                <span class="text15 light-text"> Веб-дизайн и приложений </span>
              </div>
            </td>
            <td>
              <div class="reply-row__price">
                <span class="text15 light-text"> ₽500000 </span>
              </div>
            </td>
            <td>
              <div class="reply-row__action">
                <div class="reply-row__btn">
                  <button class="m-btn m-btn-blue3">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.667 6.92697C16.5575 6.92691 16.4491 6.94844 16.3479 6.99031C16.2468 7.03219 16.1549 7.09359 16.0774 7.171C16 7.24842 15.9386 7.34034 15.8967 7.4415C15.8549 7.54266 15.8333 7.65108 15.8334 7.76056V15.8332C15.8332 16.0542 15.7454 16.266 15.5892 16.4223C15.433 16.5786 15.2211 16.6665 15.0002 16.6668H4.16699C3.94597 16.6666 3.73407 16.5787 3.57778 16.4224C3.4215 16.2661 3.33361 16.0542 3.3334 15.8332V5.00001C3.33371 4.77906 3.42165 4.56725 3.57792 4.41105C3.73419 4.25485 3.94604 4.16702 4.16699 4.16681H12.2396C12.3506 4.16921 12.4609 4.14943 12.5642 4.10863C12.6674 4.06783 12.7614 4.00682 12.8407 3.9292C12.92 3.85157 12.9831 3.75888 13.0261 3.65658C13.0691 3.55427 13.0913 3.4444 13.0913 3.33341C13.0913 3.22242 13.0691 3.11255 13.0261 3.01024C12.9831 2.90794 12.92 2.81525 12.8407 2.73763C12.7614 2.66 12.6674 2.599 12.5642 2.55819C12.4609 2.51739 12.3506 2.49761 12.2396 2.50001H4.16699C3.8386 2.4997 3.51337 2.56416 3.20992 2.68969C2.90647 2.81521 2.63075 2.99935 2.39854 3.23156C2.16633 3.46377 1.98219 3.73949 1.85667 4.04294C1.73114 4.34639 1.66668 4.67162 1.66699 5.00001V15.8332C1.66668 16.1616 1.73114 16.4868 1.85667 16.7903C1.98219 17.0937 2.16633 17.3695 2.39854 17.6017C2.63075 17.8339 2.90647 18.018 3.20992 18.1435C3.51337 18.2691 3.8386 18.3335 4.16699 18.3332H15.0002C15.6632 18.3332 16.2991 18.0698 16.768 17.601C17.2368 17.1321 17.5002 16.4963 17.5002 15.8332V7.76056C17.5002 7.65111 17.4787 7.54272 17.4369 7.44159C17.395 7.34045 17.3337 7.24855 17.2563 7.17114C17.1789 7.09373 17.0871 7.03232 16.9859 6.99043C16.8848 6.94853 16.7764 6.92697 16.667 6.92697Z"
                        fill="#9DA1C6"
                      />
                      <path
                        d="M18.0893 1.91095C18.012 1.83352 17.9202 1.77209 17.8191 1.73017C17.718 1.68826 17.6097 1.66669 17.5002 1.66669C17.3908 1.66669 17.2825 1.68826 17.1814 1.73017C17.0803 1.77209 16.9885 1.83352 16.9112 1.91095L8.57757 10.2442C8.50019 10.3215 8.43881 10.4134 8.39693 10.5145C8.35505 10.6156 8.3335 10.724 8.3335 10.8334C8.3335 10.9428 8.35505 11.0512 8.39693 11.1523C8.43881 11.2534 8.50019 11.3453 8.57757 11.4227C8.65496 11.5001 8.74682 11.5614 8.84793 11.6033C8.94903 11.6452 9.0574 11.6667 9.16683 11.6667C9.27627 11.6667 9.38463 11.6452 9.48574 11.6033C9.58684 11.5614 9.67871 11.5001 9.75609 11.4227L18.0893 3.08907C18.1667 3.01176 18.2282 2.91994 18.2701 2.81886C18.312 2.71778 18.3336 2.60943 18.3336 2.50001C18.3336 2.39059 18.312 2.28224 18.2701 2.18116C18.2282 2.08009 18.1667 1.98826 18.0893 1.91095Z"
                        fill="#9DA1C6"
                      />
                    </svg>
                  </button>
                  <div class="tooltip">
                    <div class="tooltip__inner">
                      <div class="text14">Изменить</div>
                    </div>
                  </div>
                </div>
                <div class="reply-row__btn">
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
                      <div class="text14">Удалить</div>
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
      :total-items="24"
      :total-pages="3"
    />
  </div>
</template>

<script setup lang="ts">
const titles = [
  'Опубликовано',
  'Не опубликовано',
  'Активные',
  'Завершено',
  'Отменено',
];
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const currentPage = ref(1);
const activeTab = ref(0);
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});

const items = ref([]);
const updateItems = async () => {
  const { data } = await apiFetch<ApiListResponse<{}[]>>(
    `/api/${user.value?.active_role === 'seller' ? 'services' : 'projects'}/my`,
    {
      needToken: true,
    },
  );
  const value = data.value;
  if (value?.status === 200) {
    items.value = value.result;
  }
};
updateItems();
</script>

<style scoped></style>
