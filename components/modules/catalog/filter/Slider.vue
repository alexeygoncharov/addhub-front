<template>
  <div class="filter-slider">
    <div class="filter-slider__inputs">
      <div class="fg">
        <label>От</label>
        <input
          v-model="priceMinBuffer"
          type="number"
          @input="updateStartValue(0, $event)"
        />
        <div class="filter-slider__currency"><span>₽</span></div>
      </div>
      <div class="fg">
        <label>До</label>
        <input
          v-model="priceMaxBuffer"
          type="number"
          @input="updateStartValue(1, $event)"
        />
        <div class="filter-slider__currency"><span>₽</span></div>
      </div>
    </div>
    <div class="filter-slider__item">
      <div ref="sliderElement" class="range-slider"></div>
    </div>
    <div class="filter-slider__output">
      <span>{{ priceMinBuffer }}</span> - <span>{{ priceMaxBuffer }}</span> ₽
    </div>
  </div>
</template>

<script setup lang="ts">
import { create } from 'nouislider';
import type { API, target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
const sliderElement = ref<target>();
const slider = ref<API>();
const props = defineProps<{
  min: number;
  max: number;
}>();
const priceMin = defineModel<number>('priceMin', {
  required: true,
});
const priceMax = defineModel<number>('priceMax', {
  required: true,
});
const priceMaxBuffer = ref<number>(priceMax.value);
const priceMinBuffer = ref<number>(priceMin.value);
// console.log(props);

// watch([priceMin, priceMax], () => {
//   console.log(1);

//   priceMaxBuffer.value = priceMax.value;
//   priceMinBuffer.value = priceMin.value;
// });
onMounted(() => {
  initSlider();
});

const initSlider = () => {
  if (!sliderElement.value) return;
  slider.value = create(sliderElement.value, {
    start: [priceMin.value, priceMax.value],
    connect: true,
    step: 1,
    range: {
      min: props.min,
      max: props.max,
    },
  });

  slider.value.on('update', (values, handle) => {
    const value = parseInt(String(values[handle]), 10);
    if (handle === 0) {
      priceMinBuffer.value = value;
    } else {
      priceMaxBuffer.value = value;
    }
    // Эмитируем события для обновления родительских пропсов
    clearTimeout(filterTimeoutId.value);
    filterTimeoutId.value = setTimeout(() => {
      if (handle === 0) {
        priceMin.value = value;
      } else {
        priceMax.value = value;
      }
    }, 1000);
  });
};
const filterTimeoutId = ref<ReturnType<typeof setTimeout>>();

const updateStartValue = (handle: number, event: Event) => {
  if (!slider.value || !event.target) return;

  const value = (event.target as HTMLInputElement).valueAsNumber;
  if (value < props.min || value > props.max || isNaN(value)) return;

  const newValue = [0, 0];
  newValue[handle] = value;
  slider.value.set(newValue);
};
</script>
