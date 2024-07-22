<template>
  <OnClickOutside :class="{ 'tabs-select': !full }" @trigger="isOpen = false">
    <div v-if="!full" class="tabs-select__show" @click="toggleSelect">
      <div class="tabs-select__current">
        {{ initialValues.find((el) => el.value === vModel)?.title }}
      </div>
    </div>
    <div :class="{ 'tabs-select__hidden': !full, _open: isOpen }">
      <div class="tabs">
        <div
          v-for="el in initialValues"
          :key="el.value"
          class="m-tab _tab"
          :class="{ _active: vModel === el.value }"
          @click="selectTab(el)"
        >
          <span>{{ el.title }}</span>
        </div>
      </div>
    </div>
  </OnClickOutside>
</template>

<script setup lang="ts">
import { OnClickOutside } from '@vueuse/components';
const emit = defineEmits(['updateItems']);
const props = defineProps<{
  full?: boolean;
  initialValues: { title: string; value: string }[];
}>();

const vModel = defineModel<string>({ required: true });
const isOpen = ref(false);

const selectTab = async (el: { title: string; value: string }) => {
  vModel.value = el.value;
  await nextTick();
  emit('updateItems');
  if (!props.full) {
    isOpen.value = false;
  }
};

const toggleSelect = () => {
  isOpen.value = !isOpen.value;
};
</script>
