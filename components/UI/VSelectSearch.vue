<template>
  <div ref="selectRef" class="m-select" :class="{ _open: dropdownVisible }">
    <input v-model="searchQuery" type="text" @input="handleInput" />
    <div v-if="dropdownVisible" class="m-select__dropdown">
      <div
        v-for="item in filteredItems"
        :key="item._id"
        :class="['m-select__option', { _active: item.title === searchQuery }]"
        @click="selectOption(item)"
      >
        {{ item.title }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';

interface Item {
  _id: string;
  title: string;
}

const props = withDefaults(
  defineProps<{
    items: Item[];
    modelValue: string;
  }>(),
  {
    modelValue: '',
    items: () => [],
  },
);

const selectRef = ref<HTMLDivElement | null>(null);
const emits = defineEmits(['input']);

const searchQuery = ref(props.modelValue);
const dropdownVisible = ref(false);

const binarySearch = (items, query) => {
  let low = 0;
  let high = items.length - 1;
  const results = [];
  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const midVal = items[mid].title.toLowerCase();

    if (midVal.startsWith(query.toLowerCase())) {
      // Добавляем найденный элемент и ищем возможные совпадения рядом
      results.push(items[mid]);
      let left = mid - 1;
      let right = mid + 1;
      while (
        left >= 0 &&
        items[left].title.toLowerCase().startsWith(query.toLowerCase())
      ) {
        results.push(items[left]);
        left--;
      }
      while (
        right < items.length &&
        items[right].title.toLowerCase().startsWith(query.toLowerCase())
      ) {
        results.push(items[right]);
        right++;
      }
      break;
    } else if (midVal < query.toLowerCase()) {
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return results;
};

const filteredItems = computed(() =>
  binarySearch(props.items, searchQuery.value),
);

function handleInput() {
  dropdownVisible.value = !!searchQuery.value;
}

function selectOption(item: any) {
  searchQuery.value = item.title;
  emits('input', item);
  dropdownVisible.value = false;
}

function hideDropdown() {
  setTimeout(() => {
    dropdownVisible.value = false;
  }, 100);
}

function handleClickOutside(event: MouseEvent) {
  if (!selectRef.value || selectRef.value.contains(event.target as Node))
    return;
  dropdownVisible.value = false;
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});
onBeforeUnmount(() =>
  document.removeEventListener('click', handleClickOutside),
);
</script>
