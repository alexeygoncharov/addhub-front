<template>
  <div class="filter-slider">
    <div class="filter-slider__inputs">
      <div class="fg">
        <label>От</label>
        <input
          type="number"
          :value="priceMin"
          @input="updateStartValue(0, $event)"
        />
        <div class="filter-slider__currency"><span>₽</span></div>
      </div>
      <div class="fg">
        <label>До</label>
        <input
          type="number"
          :value="priceMax"
          @input="updateStartValue(1, $event)"
        />
        <div class="filter-slider__currency"><span>₽</span></div>
      </div>
    </div>
    <div class="filter-slider__item">
      <div ref="sliderElement" class="range-slider"></div>
    </div>
    <div class="filter-slider__output">
      <span>{{ priceMin }}</span> - <span>{{ priceMax }}</span> ₽
    </div>
  </div>
</template>

<script setup lang="ts">
import { create } from 'nouislider';
import type { API, target } from 'nouislider';
import 'nouislider/dist/nouislider.css';
const sliderElement = ref<target>();
const slider = ref<API>();
const props = defineProps({
  priceMin: {
    type: Number,
    required: true,
  },
  priceMax: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
});

onMounted(() => {
  initSlider();
});

const emits = defineEmits(['update:priceMin', 'update:priceMax']);
const initSlider = () => {
  if (!sliderElement.value) return;
  slider.value = create(sliderElement.value, {
    start: [props.priceMin, props.priceMax],
    connect: true,
    step: 1,
    range: {
      min: props.min,
      max: props.max,
    },
  });

  slider.value.on('update', (values, handle) => {
    const value = parseInt(String(values[handle]), 10);
    // Эмитируем события для обновления родительских пропсов
    if (handle === 0) {
      emits('update:priceMin', value);
    } else {
      emits('update:priceMax', value);
    }
  });
};

const updateStartValue = (handle: number, event: Event) => {
  if (!slider.value || !event.target) return;

  const value = (event.target as HTMLInputElement).valueAsNumber;
  if (value < props.min || value > props.max || isNaN(value)) return;

  const newValue = [0, 0];
  newValue[handle] = value;
  slider.value.set(newValue);

  if (handle === 0) {
    emits('update:priceMin', value);
  } else {
    emits('update:priceMax', value);
  }
};
</script>
