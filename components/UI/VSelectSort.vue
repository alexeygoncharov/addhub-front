<template>
  <div
    ref="selectRef"
    :class="[
      'm-select',
      { _open: isOpen, '_not-select': placeholder && !currentText },
    ]"
  >
    <input class="m-select__field" type="hidden" />
    <div class="m-select__toggle" @click="toggleSelect">
      <span class="m-select__current">
        {{ currentText?.text || placeholder }}
      </span>
      <svg
        width="9"
        height="6"
        viewBox="0 0 9 6"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.07671 5.33928L8.86404 1.55188C8.9517 1.46428 9 1.34735 9 1.22266C9 1.09798 8.9517 0.981043 8.86404 0.893445L8.58519 0.614529C8.40349 0.433037 8.10818 0.433037 7.92675 0.614529L4.74638 3.7949L1.56248 0.611C1.47482 0.523402 1.35795 0.475036 1.23333 0.475036C1.10858 0.475036 0.991712 0.523402 0.903975 0.611L0.625198 0.889915C0.537531 0.977582 0.489235 1.09445 0.489235 1.21913C0.489235 1.34382 0.537531 1.46075 0.625198 1.54835L4.41599 5.33928C4.50393 5.42709 4.62135 5.47531 4.74617 5.47504C4.87148 5.47531 4.98883 5.42709 5.07671 5.33928Z"
          fill="#041E42"
        />
      </svg>
    </div>
    <div v-if="isOpen" class="m-select__dropdown">
      <div
        v-for="option in options"
        :key="option.text"
        :class="['m-select__option', { _active: currentText === option }]"
        @click="selectOption(option)"
      >
        <span>{{ option.text }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const selectRef = ref<HTMLDivElement>();
const props = defineProps({
  options: {
    type: Array as PropType<
      {
        type: string;
        text: string;
        value: { [key: string]: number | undefined };
      }[]
    >,
    required: true,
  },
  placeholder: {
    type: String,
    default: null,
  },
  initialCurrentText: {
    type: Object as PropType<{
      type: string;
      text: string;
      value: {
        [key: string]: number | undefined;
      };
    }>,
    default: () => null,
  },
});

console.log(
  'options = ',
  props.options,
  'placeholder = ',
  props.placeholder,
  'initialCurrentText = ',
  props.initialCurrentText,
);
const emits = defineEmits(['input']);
const isOpen = ref(false);
const currentText = ref(props.initialCurrentText);

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});

const toggleSelect = () => {
  isOpen.value = !isOpen.value;
};
const selectOption = (option: typeof props.initialCurrentText) => {
  currentText.value = option;
  emits('input', option);
  isOpen.value = false;
};
const handleClickOutside = (event: MouseEvent) => {
  if (selectRef.value && selectRef.value.contains(event.target as Node)) return;
  isOpen.value = false;
};
</script>
