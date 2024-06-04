<script setup lang="ts">
defineProps<{
  buttonDisabled?: boolean;
  btnColor?: string;
}>();
const show = defineModel<boolean>('show', { required: true });
defineEmits<{
  (e: 'submit'): void;
  (e: 'close'): void;
}>();
</script>

<template>
  <div v-show="show">
    <div
      class="modal__overlay"
      @mousedown="
        show = false;
        $emit('close');
      "
    >
      <div class="modal__window" @mousedown.stop>
        <div
          class="modal__window-close"
          @click="
            show = false;
            $emit('close');
          "
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L21 21M21 1L1 21" stroke="#A1A1A1" />
          </svg>
        </div>
        <div class="modal__window-title">
          <slot name="title"></slot>
        </div>

        <div class="modal__window-data">
          <slot name="data"></slot>
        </div>

        <button
          class="m-btn m-btn-blue modal__window-btn"
          :style="{ backgroundColor: btnColor || '' }"
          :class="{ 'modal__window-btn--disabled': buttonDisabled }"
          @click.prevent="$emit('submit')"
        >
          <slot name="button-text"></slot>
        </button>
        <p class="modal__window-submission_label">
          <slot name="submissionLabel"></slot>
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '~/assets/style/common/modalWindow';
</style>
