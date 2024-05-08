<script lang="ts" setup>
interface banner extends uploadFileResponse {
  loading?: number;
}
const props = defineProps<{
  uploadPath: string;
}>();
const emit = defineEmits<{ (e: 'changed'): void }>();
const banners = defineModel<uploadFileResponse[]>({
  default: [],
});
const bufBanners = ref<banner[]>(banners.value);

const isDragActive = ref(false);

const loadingIds = ref<number[]>([]);
let dropzoneEventsQueue = Promise.resolve();

const dragenter = () => {
  if (bufBanners.value?.length === 10) return;
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
  if (!bufBanners.value) return;
  let originId = Date.now();
  while (loadingIds.value.includes(originId)) {
    originId = Date.now();
  }
  loadingIds.value.push(originId);
  file.originId = originId;
  bufBanners.value.push({
    loading: originId,
    url: '',
    mimetype: '',
    name: '',
  });
  dropzoneEventsQueue = dropzoneEventsQueue.then(async () => {
    const formData = new FormData();
    formData.append('file', file);
    const { data, error } = await apiFetch<ApiResponse<uploadFileResponse>>(
      props.uploadPath,
      {
        options: { method: 'POST', body: formData },
        needToken: true,
      },
    );
    if (!error.value && data.value) {
      const bannerIndex = bufBanners.value?.findIndex(
        (b) => file.originId === b.loading,
      );
      if (bannerIndex === undefined || bannerIndex < 0 || !bufBanners.value)
        return;
      bufBanners.value[bannerIndex] = data.value.result;
      banners.value = bufBanners.value;
      emit('changed');
    } else {
      bufBanners.value = bufBanners.value?.filter(
        (b) => file.originId !== b.loading,
      );
      useToast({ message: 'Произошла ошибка при загрузке', type: 'error' });
    }
  });
};

const handleFileUpload = (event: Event) => {
  if (!bufBanners.value || !event.target || bufBanners.value.length === 10)
    return;
  let files = (event.target as HTMLInputElement).files as unknown as File[];
  if (!files?.length) return;
  if (files.length + bufBanners.value.length > 10) {
    files = Array.from(files).slice(0, 10 - bufBanners.value.length);
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!checkFile(file)) return;
    uploadData(file);
  }
};

async function deleteBanner(bannerIndex: number) {
  if (!bufBanners.value?.[bannerIndex]) return;
  const bufBanner = bufBanners.value?.[bannerIndex];
  bufBanners.value?.splice(bannerIndex, 1);
  const { data, error } = await apiFetch<ApiResponse<string>>(
    props.uploadPath,
    {
      options: { method: 'DELETE', body: { filePath: bufBanner.url } },
      needToken: true,
    },
  );
  if (error.value) {
    bufBanners.value?.splice(bannerIndex, 0, bufBanner);
    useToast({ message: 'Произошла ошибка при удалении', type: 'error' });
  } else {
    banners.value = bufBanners.value;
    emit('changed');
  }
}
const drop = (e: DragEvent) => {
  if (!e.dataTransfer || !bufBanners.value || bufBanners.value.length === 10)
    return;
  isDragActive.value = false;
  let files = e.dataTransfer.files as unknown as File[];
  if (files.length + bufBanners.value.length > 10) {
    files = Array.from(files).slice(0, 10 - bufBanners.value.length);
  }
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    if (!checkFile(file)) return;
    uploadData(file);
  }
};
function imageListHeight() {
  if (process.server || !bufBanners.value) return;
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
  const sumImage = bufBanners.value?.length + 1;
  const numRows = Math.ceil(sumImage / numColumns) || 1;
  container.style.height = labelHeight * numRows + 'px';
}
watch(() => bufBanners.value?.length, imageListHeight);
onMounted(() => {
  imageListHeight();
  addEventListener('resize', () => {
    imageListHeight();
  });
});
</script>
<template>
  <fieldset class="fg">
    <label>Загрузите изображения</label>
    <div
      class="banners-settings__body"
      @dragenter.prevent="dragenter"
      @dragover.prevent
    >
      <div class="banners-settings__imageList">
        <label
          v-for="i in 10"
          :key="i"
          class="banners-settings__image"
          :class="{
            'banners-settings__image--upload': bufBanners?.length + 1 === i,
            'banners-settings__image--hasImage': bufBanners?.[i - 1]?.url,
            'banners-settings__image--loading': bufBanners?.[i - 1]?.loading,
          }"
        >
          <nuxtImg
            v-if="bufBanners?.[i - 1]?.url"
            :src="baseUrl() + bufBanners[i - 1].url"
            crossorigin="anonymous"
            alt="product banner"
          />
          <svg
            v-if="bufBanners?.length + 1 == i"
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
            v-if="bufBanners?.[i - 1]?.loading"
            class="banners-settings__image--loading-icon"
          ></div>
          <input
            type="file"
            :disabled="bufBanners?.[i - 1] ? true : false"
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
        <br /><br />Размер изображения не должен превышать 5 МБ
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
      быть формата PNG, JPG. <br /><br />Максимум 10 изображений <br /><br />
      Размер изображения не должен превышать 5 МБ
    </p>
  </fieldset>
</template>
<style scoped lang="scss">
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.banners-settings {
  &__body {
    position: relative;
    display: flex;
    gap: 20px;
    width: fit-content;
    padding: 30px 9px 30px 30px;
    overflow: hidden;
    background: #fff;
    border-radius: 15px;
    box-shadow: 0 1px 28px -14px #8fb6e240;
  }

  &__imageList {
    display: grid;
    grid-template-rows: 1fr 1fr;
    grid-template-columns: repeat(5, 1fr);
    gap: 15px;
  }

  &__image {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 7em;
    height: 7em;
    overflow: visible;
    border: 1px solid #d9d9d9;
    border-radius: 6px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
    }

    input {
      display: none;
    }

    &--upload {
      cursor: pointer;
      background: #f5f5f5;
      border: 0;
    }

    &--delete {
      position: absolute;
      top: 0;
      right: 0;
      display: none;
      align-items: center;
      justify-content: center;
      width: 23px;
      height: 23px;
      cursor: pointer;
      background-color: rgb(255 255 255);
      border-radius: 50%;
      box-shadow: 0 4px 11.5px -5px #00000040;
      transform: translate(50%, -50%);

      &:hover {
        display: flex;
      }
    }

    &--loading {
      /* Safari */

      &-icon {
        width: 3em;
        height: 3em;
        border: 3px solid #d9d9d9;
        border-top: 3px solid #fff;
        border-radius: 50%;
        animation: spin 0.5s linear infinite; /* Safari */

        &:hover {
          // animation: none;
          // border: 1px black solid;
          // border-radius: 0;
        }
      }
    }

    &--hasImage {
      border: 0;

      &:hover {
        // background-color: #d9d9d9;
        .banners-settings__image--delete {
          display: flex;
        }
      }
    }
  }

  &__messages {
    font-size: 0.9em;
    font-weight: 500;
    color: #bababa;

    &--mobile {
      display: none;
    }
  }

  &__drag {
    position: absolute;
    bottom: 0;
    left: 0;
    display: none;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background-color: #b6b6b6;

    > p {
      pointer-events: none;
    }

    &--active {
      display: flex;
    }
  }

  @media (max-width: 1000px) {
    &__body {
      gap: 0;
      width: 100%;
      padding: 26px 20px;
      border-radius: 15px;
    }

    &__imageList {
      grid-template-rows: none;
      grid-template-columns: repeat(auto-fill, minmax(97px, 1fr));
      gap: 15px;
      justify-items: center;
      width: 100%;
      padding-top: 7px;
      overflow: hidden;
    }

    &__image {
      width: 97px;
      height: 97px;
      border-radius: 6px img {
        border-radius: 6px;
      }

      &--loading {
        &-icon {
          width: 30px;
          height: 30px;
        }
      }

      &--hasImage {
        .banners-settings__image--delete {
          display: flex;
        }
      }
    }

    &__messages {
      display: none;

      &--mobile {
        display: block;
        margin-top: 20px;
        font-size: 14px;
        font-weight: 500;
        color: #bababa;
      }
    }

    &__drag {
      font-size: 16px;

      &-wrapper {
        display: none;
      }
    }
  }
}
</style>
