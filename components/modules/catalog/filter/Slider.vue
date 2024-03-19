<template>
  <div class="filter-slider">
    <div class="filter-slider__inputs">
      <div class="fg">
        <label>От</label>
        <input
          type="number"
          :value="priceMin"
          @input="updateStartValue(0, $event.target.valueAsNumber)"
        />
        <div class="filter-slider__currency"><span>₽</span></div>
      </div>
      <div class="fg">
        <label>До</label>
        <input
          type="number"
          :value="priceMax"
          @input="updateStartValue(1, $event.target.valueAsNumber)"
        />
        <div class="filter-slider__currency"><span>₽</span></div>
      </div>
    </div>
    <div class="filter-slider__item">
      <div class="range-slider"></div>
    </div>
    <div class="filter-slider__output">
      <span>{{ priceMin }}</span> - <span>{{ priceMax }}</span> ₽
    </div>
  </div>
</template>

<script>
import { create } from 'nouislider';
import 'nouislider/dist/nouislider.css';

export default {
  props: {
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
  },
  emits: ['update:priceMin', 'update:priceMax'],
  mounted() {
    this.initSlider();
  },
  methods: {
    initSlider() {
      const sliderElement = this.$el.querySelector('.range-slider');
      this.slider = create(sliderElement, {
        start: [this.priceMin, this.priceMax],
        connect: true,
        step: 1,
        range: {
          min: this.min,
          max: this.max,
        },
      });

      this.slider.on('update', (values, handle) => {
        const value = parseInt(values[handle], 10);
        // Эмитируем события для обновления родительских пропсов
        if (handle === 0) {
          this.$emit('update:priceMin', value);
        } else {
          this.$emit('update:priceMax', value);
        }
      });
    },

    updateStartValue(handle, value) {
      if (value < this.min || value > this.max || isNaN(value)) return;

      this.updateSlider(handle, value);

      if (handle === 0) {
        this.$emit('update:priceMin', value);
      } else {
        this.$emit('update:priceMax', value);
      }
    },

    updateSlider(handle, value) {
      const newValue = [null, null];
      newValue[handle] = value;

      this.slider.set(newValue);
    },
  },
};
</script>
