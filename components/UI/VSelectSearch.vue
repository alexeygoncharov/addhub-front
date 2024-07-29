<template>
  <OnClickOutside
    ref="selectRef"
    class="m-select"
    :class="{ _open: dropdownVisible }"
    @trigger="handleFocusOut"
  >
    <input
      v-model="searchQuery"
      :disabled="disabled"
      type="text"
      @focus="dropdownVisible = true"
    />
    <div
      v-if="dropdownVisible && filteredItems.length"
      class="m-select__dropdown"
    >
      <div
        v-for="item in filteredItems"
        :key="item.value"
        :class="['m-select__option', { _active: item.title === searchQuery }]"
        @click="selectOption(item.value, item.title)"
      >
        {{ item.title }}
      </div>
    </div>
  </OnClickOutside>
</template>

<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';
const checkedItem = defineModel<string>({ required: true });
const props = defineProps<{
  items: { title: string; value: string }[];
  disabled?: boolean;
}>();

const searchQuery = ref('');
watch(
  () => props.items.length,
  () => {
    searchQuery.value =
      props.items.find((item) => item.value === checkedItem.value)?.title || '';
  },
  { immediate: true },
);
const dropdownVisible = ref(false);

const selectRef = ref<HTMLDivElement | null>(null);
const handleFocusOut = () => {
  dropdownVisible.value = false;
  if (!props.items.find((item) => item.title === searchQuery.value)) {
    searchQuery.value =
      props.items.find((item) => item.value === checkedItem.value)?.title || '';
  }
};

const binarySearch = (
  items: { title: string; value: string }[],
  query: string,
) => {
  let low = 0;
  let high = items.length - 1;
  const results: typeof props.items = [];
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
  return results.length || query ? results : props.items;
};

const filteredItems = computed(() =>
  binarySearch(props.items, searchQuery.value),
);

function selectOption(value: string, title: string) {
  searchQuery.value = title;
  checkedItem.value = value;
  dropdownVisible.value = false;
}
</script>
