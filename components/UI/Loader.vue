<script setup lang="ts">
import { progress } from '~/composables/loader';
</script>

<template>
  <div v-if="progress > 0" class="loader" :style="`width: ${progress}%;`"></div>
</template>

<style scoped lang="scss">
.loader {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: #917af8;
  transition: width 0.3s;
}
</style>
