<template>
  <div class="message-item__files">
    <div class="file-item">
      <!--<div class="file-item__title">Техническое_задание_для</div>-->
      <div class="file-item__bottom">
        <a :href="baseUrl() + files[0]" target="_blank" class="file-item__btn">Скачать</a>
        <!--<div class="file-item__weight">255кб</div>-->
      </div>
    </div>
  </div>
</template>
<script setup>
defineProps({
  files: {
    type: Array,
    required: true,
  },
});
</script>
