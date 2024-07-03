<template>
  <div ref="selectRef" class="m-select" :class="{ _open: dropdownVisible }">
    <input
      v-model="searchQuery"
      type="text"
      :placeholder="placeholder"
      @input="handleInput"
    />
    <div v-if="dropdownVisible" class="m-select__dropdown">
      <div
        v-for="item in filteredItems"
        :key="item.key"
        :class="['m-select__option', { _active: item.name === searchQuery }]"
        @click="selectOption(item)"
      >
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

interface Item {
  key: string;
  name: string;
}

const props = withDefaults(
  defineProps<{
    items: Item[];
    modelValue: string;
    placeholder: string;
  }>(),
  {
    items: () => [],
    modelValue: '',
    placeholder: 'Введите текст', // Значение по умолчанию для placeholder
  },
);

const selectRef = ref<HTMLDivElement | null>(null);
const emits = defineEmits(['input']);

const searchQuery = ref(props.modelValue);
const dropdownVisible = ref(false);

const filteredItems = computed(() => {
  return props.items.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.value.toLowerCase()),
  );
});

function handleInput() {
  dropdownVisible.value = !!searchQuery.value;
}

function selectOption(item: Item) {
  searchQuery.value = item.name;
  emits('input', item);
  dropdownVisible.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (!selectRef.value || selectRef.value.contains(event.target as Node))
    return;
  dropdownVisible.value = false;
}

onMounted(() => document.addEventListener('click', handleClickOutside));
onBeforeUnmount(() =>
  document.removeEventListener('click', handleClickOutside),
);
</script>
