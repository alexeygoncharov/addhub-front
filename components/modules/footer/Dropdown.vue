<template>
  <OnClickOutside @trigger="isOpen = false">
    <div ref="dropdownRef" :class="['footer-dropdown', { _open: isOpen }]">
      <div class="footer-dropdown__toggle" @click="isOpen = !isOpen">
        <span class="footer-dropdown__title">{{ current }}</span>
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.71056 4.64404H0.289413C0.0328762 4.64404 -0.0978122 4.33426 0.0861196 4.15033L2.79669 1.43976C2.90802 1.32843 3.09195 1.32843 3.20333 1.43976L5.9139 4.15033C6.09778 4.33426 5.9671 4.64404 5.71056 4.64404Z"
            fill="white"
          />
        </svg>
      </div>
      <ul class="footer-dropdown__list">
        <li
          v-for="(el, index) of list"
          :key="index"
          @click="
            {
              current = el;
              isOpen = false;
            }
          "
        >
          <a class="_active">{{ el }}</a>
        </li>
      </ul>
    </div>
  </OnClickOutside>
</template>

<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';
const isOpen = ref(false);
const current = defineModel<string>({ required: true });
const props = defineProps<{
  list: string[];
}>();
</script>
