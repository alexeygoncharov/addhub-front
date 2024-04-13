<script lang="ts" setup>
const banners = defineModel<[]>('banners');

const isDragActive = ref(false);

const loadingIds = ref<number[]>([]);
let dropzoneEventsQueue = Promise.resolve();

const dragenter = () => {
  if (banners.value?.length === 10) return;
  isDragActive.value = true;
};

const dragleave = () => {
  isDragActive.value = false;
};

function checkFile(file: File) {
  const validImageTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const fileType = file.type;
  if (!validImageTypes.includes(fileType)) {
    return false;
  }
  if (file.size > 5 * 1024 * 1024) {
    return false;
  }
  return true;
}
declare global {
  interface File {
    originId?: number;
  }
}
const uploadData = (file: File) => {
  if (!banners.value) return;
  let originId = Date.now();
  while (loadingIds.value.includes(originId)) {
    originId = Date.now();
  }
  loadingIds.value.push(originId);
  file.originId = originId;
  dropzoneEventsQueue = dropzoneEventsQueue.then(() => {
    //   const bannerIndex = banners.value?.findIndex(
    //     (b) => file.originId === b.loading,
    //   );
    //   if (bannerIndex === undefined || bannerIndex < 0 || !banners.value) return;
    //   banners.value[bannerIndex] = response.data;
    //
    //     banners.value = banners.value?.filter((b) => file.originId !== b.loading);
    //     showNotif('error', t('up.error'), response.message);
  });
  banners.value.push({
    download_url: '',
    loading: originId,
    id: 0,
    file_key: '',
  });
};

const handleFileUpload = (event: Event) => {
  if (!banners.value || !event.target || banners.value.length === 10) return;
  let files = (event.target as HTMLInputElement).files as unknown as File[];
  if (!files?.length) return;
  if (files.length + banners.value.length > 10) {
    files = Array.from(files).slice(0, 10 - banners.value.length);
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!checkFile(file)) return;
    uploadData(file);
  }
};

function deleteBanner(bannerIndex: number) {
  if (!banners.value?.[bannerIndex]) return;
  const bufBanner = banners.value?.[bannerIndex];
  banners.value?.splice(bannerIndex, 1);

  return 1;
}
const drop = (e: DragEvent) => {
  if (!e.dataTransfer || !banners.value || banners.value.length === 10) return;
  isDragActive.value = false;
  let files = e.dataTransfer.files as unknown as File[];
  if (files.length + banners.value.length > 10) {
    files = Array.from(files).slice(0, 10 - banners.value.length);
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!checkFile(file)) return;
    uploadData(file);
  }
};
function imageListHeight() {
  if (process.server || !banners.value) return;
  const container = document.querySelector(
    '.banners-settings__imageList',
  ) as HTMLDivElement;
  if (!container) return;
  if (window.innerWidth > 1000) {
    container.style.height = 'auto';
    return;
  }
  const labels = container.querySelectorAll('label');
  const labelHeight = labels[0].offsetHeight + 15;
  const numColumns = Math.floor(
    container.offsetWidth / (labels[0].offsetWidth + 15),
  );
  const sumImage = banners.value?.length + 1;
  const numRows = Math.ceil(sumImage / numColumns) || 1;
  container.style.height = labelHeight * numRows + 'px';
}
watch(() => banners.value?.length, imageListHeight);
onMounted(() => {
  imageListHeight();
  addEventListener('resize', () => {
    imageListHeight();
  });
});
</script>
<template>
  <fieldset class="fg">
    <label>Город</label>
    <div
      class="banners-settings__body"
      @dragenter.prevent="dragenter"
      @dragover.prevent
    >
      <div v-if="banners" class="banners-settings__imageList">
        <label
          v-for="i in 10"
          :key="i"
          class="banners-settings__image"
          :class="{
            'banners-settings__image--upload': banners?.length + 1 === i,
            'banners-settings__image--hasImage': banners?.[i - 1]?.download_url,
            'banners-settings__image--loading': banners?.[i - 1]?.loading,
          }"
        >
          <img
            v-if="banners?.[i - 1]?.download_url"
            :src="banners[i - 1].download_url"
            alt="product banner"
          />
          <svg
            v-if="banners?.length + 1 == i"
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.57276 2.44936C7.57276 1.83771 8.08409 1.34187 8.71486 1.34187H11.4273C12.0581 1.34187 12.5694 1.83771 12.5694 2.44936V7.61763L13.6596 7.61763C14.7216 7.61763 15.2087 8.90035 14.4002 9.56819L10.8117 12.5324C10.3849 12.885 9.75729 12.885 9.33048 12.5324L5.74203 9.56819C4.93354 8.90035 5.42057 7.61763 6.48264 7.61763L7.57276 7.61763V2.44936ZM11.4273 2.44936L8.71486 2.44936V8.72512H6.48264L10.0711 11.6893L13.6596 8.72512L11.4273 8.72512V2.44936Z"
              fill="#ADADAD"
            />
            <line
              x1="3.37903"
              y1="15.0085"
              x2="16.7644"
              y2="15.0085"
              stroke="#ADADAD"
              stroke-width="1.46188"
              stroke-linecap="round"
            />
          </svg>
          <div
            v-if="banners?.[i - 1]?.loading"
            class="banners-settings__image--loading-icon"
          ></div>
          <input
            type="file"
            :disabled="banners?.[i - 1] ? true : false"
            multiple
            @change="handleFileUpload"
          />
          <div
            class="banners-settings__image--delete"
            @click.prevent="deleteBanner(i - 1)"
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
        </label>
      </div>
      <p class="banners-settings__messages">
        Баннеры отображаются на странице товара.<br /><br />Изображения должны
        быть формата PNG, JPG. <br /><br />Максимум 10 изображений
      </p>
      <div
        class="banners-settings__drag"
        :class="{ 'banners-settings__drag--active': isDragActive }"
        @dragenter.prevent="dragenter"
        @dragleave.prevent="dragleave"
        @drop.prevent="drop"
      >
        <p>Отпустите файлы здесь...</p>
        <div ref="dragRef" class="banners-settings__drag-wrapper"></div>
      </div>
    </div>
    <p class="banners-settings__messages--mobile">
      Баннеры отображаются на странице товара.<br /><br />Изображения должны
      быть формата PNG, JPG. <br /><br />Максимум 10 изображений
    </p>
  </fieldset>
</template>
<style scoped lang="scss"></style>
