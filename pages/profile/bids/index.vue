<template>
  <ModulesProfileTop>Мои отклики</ModulesProfileTop>

  <div class="replies m-table">
    <UITabsSelect
      v-model="activeTab"
      :initial-values="titles"
      @update-items="
        async () => {
          await nextTick();
          updateBids();
        }
      "
    />
    <table style="margin-top: 1em">
      <thead>
        <tr>
          <th><span>Задача</span></th>
          <th><span>Бюджет</span></th>
          <th><span>Статус</span></th>
          <th v-if="activeTab == 'pending'"><span>Действия</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(bid, index) in bids" :key="bid._id" class="reply-row">
          <td>
            <div class="reply-row__info">
              <div class="reply-row__content">
                <div class="reply-row__title text17 medium-text">
                  <nuxtLink
                    :to="`/projects/${commonStore.categories?.find((el) => el._id === bid.project_id.category)?.slug}/${bid.project_id._id}`"
                    >{{ bid.project_id.title }}</nuxtLink
                  >
                </div>
                <div class="reply-row__props">
                  <div class="reply-row__prop">
                    <img src="/img/marker2.svg" alt="" />
                    <span>{{
                      commonStore.cities?.find(
                        (c) => c._id === bid.project_id.address.city,
                      )?.title
                    }}</span>
                  </div>
                  <ClientOnly>
                    <div class="reply-row__prop">
                      <img src="/img/calendar2.svg" alt="" />
                      <span>{{ $dayjs(bid.createdAt).fromNow() }}</span>
                    </div>
                  </ClientOnly>
                  <!-- <div class="reply-row__prop">
                    <img src="/img/reply.svg" alt="" />
                    <span>1 предложение</span>
                  </div> -->
                </div>
              </div>
            </div>
          </td>
          <td>
            <div class="reply-row__price">
              <span class="text17 medium-text">{{ bid.price }} руб.</span>
            </div>
          </td>
          <td>
            <div class="finance-row__title">Статус</div>
            <div
              class="finance-row__type"
              :class="{
                _yellow: bid.status === 'pending',
                _red: bid.status === 'rejected',
                _green: bid.status === 'accepted',
              }"
            >
              <span>{{
                bid.status === 'accepted'
                  ? 'Принято, в работе'
                  : bid.status === 'rejected'
                    ? 'Отклонено'
                    : 'В ожидании'
              }}</span>
            </div>
          </td>
          <td v-if="activeTab == 'pending'">
            <div v-if="user?.active_role == 'seller'" class="reply-row__action">
              <div class="reply-row__btn">
                <button class="m-btn m-btn-blue3" @click="editBid(bid)">
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
                <button
                  class="m-btn m-btn-blue3"
                  @click="deleteBid(bid, index)"
                >
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
            <div
              v-else-if="user?.active_role == 'buyer'"
              class="reply-row__action"
            >
              <div class="reply-row__btn">
                <button
                  class="m-btn m-btn-blue3"
                  @click="
                    () => {
                      editBid(bid);
                      editableIndex = index;
                    }
                  "
                >
                  <svg
                    fill="#000000"
                    width="800px"
                    height="800px"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5,2 L7,2 C7.55228475,2 8,2.44771525 8,3 C8,3.51283584 7.61395981,3.93550716 7.11662113,3.99327227 L7,4 L5,4 C4.48716416,4 4.06449284,4.38604019 4.00672773,4.88337887 L4,5 L4,19 C4,19.5128358 4.38604019,19.9355072 4.88337887,19.9932723 L5,20 L19,20 C19.5128358,20 19.9355072,19.6139598 19.9932723,19.1166211 L20,19 L20,17 C20,16.4477153 20.4477153,16 21,16 C21.5128358,16 21.9355072,16.3860402 21.9932723,16.8833789 L22,17 L22,19 C22,20.5976809 20.75108,21.9036609 19.1762728,21.9949073 L19,22 L5,22 C3.40231912,22 2.09633912,20.75108 2.00509269,19.1762728 L2,19 L2,5 C2,3.40231912 3.24891996,2.09633912 4.82372721,2.00509269 L5,2 L7,2 L5,2 Z M21,2 L21.081,2.003 L21.2007258,2.02024007 L21.2007258,2.02024007 L21.3121425,2.04973809 L21.3121425,2.04973809 L21.4232215,2.09367336 L21.5207088,2.14599545 L21.5207088,2.14599545 L21.6167501,2.21278596 L21.7071068,2.29289322 L21.7071068,2.29289322 L21.8036654,2.40469339 L21.8036654,2.40469339 L21.8753288,2.5159379 L21.9063462,2.57690085 L21.9063462,2.57690085 L21.9401141,2.65834962 L21.9401141,2.65834962 L21.9641549,2.73400703 L21.9641549,2.73400703 L21.9930928,2.8819045 L21.9930928,2.8819045 L22,3 L22,3 L22,9 C22,9.55228475 21.5522847,10 21,10 C20.4477153,10 20,9.55228475 20,9 L20,5.414 L13.7071068,11.7071068 C13.3466228,12.0675907 12.7793918,12.0953203 12.3871006,11.7902954 L12.2928932,11.7071068 C11.9324093,11.3466228 11.9046797,10.7793918 12.2097046,10.3871006 L12.2928932,10.2928932 L18.584,4 L15,4 C14.4477153,4 14,3.55228475 14,3 C14,2.44771525 14.4477153,2 15,2 L21,2 Z"
                    />
                  </svg>
                </button>
                <div class="tooltip">
                  <div class="tooltip__inner">
                    <div class="text14">Открыть</div>
                  </div>
                </div>
              </div>
              <div class="reply-row__btn">
                <button
                  class="m-btn m-btn-blue3"
                  @click="changeStatus(bid, 'rejected', index)"
                >
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
                    <div class="text14">Отклонить</div>
                  </div>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <UIVPagination
      v-model="currentPage"
      :items-per-page="8"
      :total-items="totalItems"
      :total-pages="Math.ceil(totalItems / 8)"
    />
    <ModulesProductBidModal
      v-if="userStore.user"
      v-show="openBidEdit"
      :id="editableData?.project_id._id || ''"
      v-model="openBidEdit"
      v-model:editable="editableData"
      :view-only="user?.active_role === 'buyer'"
      @update-bid="updateBids()"
      @approve-bid="
        editableData && changeStatus(editableData, 'accepted', editableIndex)
      "
    />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'profile', middleware: 'authenticated' });
const titles = [
  { title: 'В ожидании', value: 'pending' },
  { title: 'Одобрено', value: 'accepted' },
  { title: 'Отклонено', value: 'rejected' },
];
const activeTab = ref('pending');
const commonStore = useCommonStore();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const currentPage = ref(1);
const totalItems = ref(0);
const openBidEdit = ref(false);
const editableIndex = ref<number>(0);
const editableData = ref<Bid>();
const bidsStore = useBidsStore();
const bids = ref<Bid[]>();
const editBid = (bid: Bid) => {
  openBidEdit.value = true;
  editableData.value = { ...bid };
};
const changeStatus = (
  bid: Bid,
  status: 'pending' | 'accepted' | 'rejected',
  index: number,
) => {
  bidsStore.changeStatus(status, bid._id).then((result) => {
    if (result && bids.value) {
      bids.value.splice(index, 1);
    }
  });
};
const deleteBid = async (bid: Bid, index: number) => {
  const result = await bidsStore.deleteBid(bid.project_id._id, bid._id);
  if (result) {
    bids.value?.splice(index, 1);
  }
};
const updateBids = async () => {
  if (!user.value) return;
  const { data } = await apiFetch<ApiListResponse<Bid[]>>(
    `/api/bids/${user.value?.active_role}/my`,
    {
      needToken: true,
      options: {
        query: {
          offset: currentPage.value,
          limit: 8,
          filter: { status: activeTab.value },
        },
      },
    },
  );
  const value = data.value;
  if (value?.status === 200) {
    totalItems.value = value.total;
    bids.value = value.result;
  }
};
updateBids();
watch(() => user.value?.active_role, updateBids);
</script>

<style scoped></style>
