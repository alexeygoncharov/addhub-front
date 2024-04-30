<template>
  <div class="message-item__files">
    <div class="file-item">
      {{ baseUrl() }}
      <div class="file-item__title">{{ files[0]?.name }}</div>
      <div v-if="isImage(files[0].mimetype)">
        <img
          crossorigin="anonymous"
          :src="baseUrl() + files[0].url"
          target="_blank"
          alt="Image file"
          class="file-item__image"
        />
      </div>
      <div v-else-if="isVideo(files[0].mimetype)">
        <video
          crossorigin="anonymous"
          :src="baseUrl() + files[0].url"
          controls
          class="file-item__video"
        ></video>
      </div>
      <div
        v-else-if="
          isPDF(files[0].mimetype) ||
          isDocument(files[0].mimetype) ||
          isZip(files[0].mimetype)
        "
      >
        <div :src="baseUrl() + files[0].url" class="file-item__pdf"></div>
      </div>
      <div class="file-item__bottom">
        <a
          :href="baseUrl() + files[0].url"
          target="_blank"
          class="file-item__btn"
          >Скачать</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, computed } from 'vue';

const props = defineProps({
  files: {
    type: Array,
    required: true,
  },
});

const isImage = (mimetype) =>
  ['image/jpeg', 'image/png', 'image/gif', 'image/svg'].includes(mimetype);
const isVideo = (mimetype) =>
  ['video/mp4', 'video/webm', 'video/quicktime'].includes(mimetype);
const isPDF = (mimetype) => mimetype === 'application/pdf';
const isDocument = (mimetype) =>
  [
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    'application/vnd.ms-excel',
  ].includes(mimetype);
const isZip = (mimetype) => mimetype === 'application/zip';
</script>

<style>
.file-item__image,
.file-item__video,
.file-item__pdf {
  max-width: 100%;
  height: auto;
}

.file-item__video {
  display: block;
  width: 100%;
  height: 100px; /* or any other height that fits your design */
}
</style>
