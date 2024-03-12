<template>
  <div class="sort">
    <div class="sort__title text15"><span>Сортировать</span> по</div>
    <div class="m-select">
      <input class="m-select__field" type="hidden" />
      <div class="m-select__toggle">
        <span class="m-select__current"> Популярности </span>
        <svg
          width="6"
          height="6"
          viewBox="0 0 6 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.71056 1.35608H0.289413C0.0328762 1.35608 -0.0978122 1.66586 0.0861196 1.84979L2.79669 4.56036C2.90802 4.67169 3.09195 4.67169 3.20333 4.56036L5.9139 1.84979C6.09778 1.66586 5.9671 1.35608 5.71056 1.35608Z"
            fill="#222222"
          />
        </svg>
      </div>
      <div class="m-select__dropdown">
        <div class="m-select__option _active" data-value="Популярности">
          <span>Популярности</span>
        </div>
        <div class="m-select__option" data-value="Стоимости">
          <span>Стоимости</span>
        </div>
        <div class="m-select__option" data-value="Дате">
          <span>Дате</span>
        </div>
      </div>
    </div>
  </div>
</template>
