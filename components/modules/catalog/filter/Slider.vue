<template>
  <div class="filter-slider">
    <div class="filter-slider__inputs">
      <div class="fg">
        <label>От</label>
        <input
          type="number"
          :value="start1"
          @input="updateStartValue(0, $event.target.valueAsNumber)"
        />
        <div class="filter-slider__currency"><span>₽</span></div>
      </div>
      <div class="fg">
        <label>До</label>
        <input
          type="number"
          :value="start2"
          @input="updateStartValue(1, $event.target.valueAsNumber)"
        />
        <div class="filter-slider__currency"><span>₽</span></div>
      </div>
    </div>
    <div class="filter-slider__item">
      <div class="range-slider"></div>
    </div>
    <div class="filter-slider__output">
      <span>{{ start1 }}</span> - <span>{{ start2 }}</span> ₽
    </div>
  </div>
</template>

<script>
import noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export default {
  props: {
    start1: {
      type: Number,
      required: true,
    },
    start2: {
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
  mounted() {
    this.initSlider();
  },
  methods: {
    initSlider() {
      const sliderElement = this.$el.querySelector('.range-slider');
      this.slider = noUiSlider.create(sliderElement, {
        start: [this.start1, this.start2],
        connect: true,
        step: 1,
        range: {
          min: this.min,
          max: this.max,
        },
      });

      this.slider.on('update', (values, handle) => {
        let value = parseInt(values[handle], 10);
        // Эмитируем события для обновления родительских пропсов
        if (handle === 0) {
          this.$emit('update:start1', value);
        } else {
          this.$emit('update:start2', value);
        }
      });
    },

    updateStartValue(handle, value) {
      if (value < this.min || value > this.max || isNaN(value)) return;

      this.updateSlider(handle, value);

      if (handle === 0) {
        this.$emit('update:start1', value);
      } else {
        this.$emit('update:start2', value);
      }
    },

    updateSlider(handle, value) {
      let newValue = [null, null];
      newValue[handle] = value;

      this.slider.set(newValue);
    },
  },
};
</script>
