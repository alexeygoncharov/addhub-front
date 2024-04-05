<template>
  <UIVBreadcrumbs :items="[{ name: 'Главная', to: '/' }, { name: 'Блог' }]" />

  <UIPageTop
    title="Блог"
    description=" Обеспечьте посетителю удобство работы в Интернете с помощью
            надежного UX-дизайна."
  />

  <div class="blog-page">
    <div class="container">
      <div class="blog-page__grid">
        <form class="blog-field fg">
          <input type="text" placeholder="Поиск по публикациям" />
          <button class="blog-field__btn hover-fill-primary">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.1163 1.60938C4.98403 1.60938 1.61792 4.97548 1.61792 9.10776C1.61792 13.24 4.98403 16.6127 9.1163 16.6127C10.8813 16.6127 12.5046 15.9941 13.7875 14.9671L16.9109 18.0889C17.0685 18.24 17.279 18.3233 17.4974 18.3211C17.7157 18.3189 17.9245 18.2312 18.079 18.0769C18.2335 17.9227 18.3214 17.714 18.3239 17.4957C18.3265 17.2774 18.2434 17.0667 18.0925 16.9089L14.9692 13.7856C15.997 12.5006 16.6163 10.8748 16.6163 9.10776C16.6163 4.97548 13.2486 1.60938 9.1163 1.60938ZM9.1163 3.27607C12.3478 3.27607 14.948 5.87623 14.948 9.10776C14.948 12.3393 12.3478 14.946 9.1163 14.946C5.88476 14.946 3.28459 12.3393 3.28459 9.10776C3.28459 5.87623 5.88476 3.27607 9.1163 3.27607Z"
                fill="#041E42"
              />
            </svg>
          </button>
        </form>

        <div class="blog-category">
          <div class="blog-category__title text20 medium-text">Категории</div>
          <div class="blog-category__links">
            <a href="" class="blog-category__link">
              <span class="text15">Дизайнеры</span>
              <div class="m-count"><span>1945</span></div>
            </a>

            <a href="" class="blog-category__link">
              <span class="text15">Веб-разработчики</span>
              <div class="m-count"><span>945</span></div>
            </a>

            <a href="" class="blog-category__link">
              <span class="text15">Иллюстраторы</span>
              <div class="m-count"><span>445</span></div>
            </a>

            <a href="" class="blog-category__link">
              <span class="text15">Node.js</span>
              <div class="m-count"><span>2145</span></div>
            </a>

            <a href="" class="blog-category__link">
              <span class="text15">Проект-менеджеры</span>
              <div class="m-count"><span>445</span></div>
            </a>
          </div>
        </div>

        <div class="blog-page__content">
          <div class="blog-page__items">
            <ModulesBlogCard
              v-for="i in 4"
              :key="i"
              :item="{}"
            ></ModulesBlogCard>
          </div>

          <UIVPagination
            v-model="currentPage"
            :items-per-page="4"
            :total-items="16"
            :total-pages="4"
          />
        </div>

        <div class="blog-recent">
          <div class="blog-recent__title text20 medium-text">
            Свежие публикации
          </div>
          <div class="blog-recent__items">
            <ModulesBlogMiniCard
              v-for="i in 3"
              :key="i"
              :item="{}"
            ></ModulesBlogMiniCard>
          </div>
        </div>

        <div class="blog-tags">
          <div class="blog-tags__title text20 medium-text">Метки</div>
          <div class="blog-tags__items">
            <a href="" class="tag m-btn"><span>Figma</span></a>
            <a href="" class="tag m-btn"><span>Sketch</span></a>
            <a href="" class="tag m-btn"><span>HTML5</span></a>
            <a href="" class="tag m-btn"><span>Software Design</span></a>
            <a href="" class="tag m-btn"><span>Prototyping</span></a>
            <a href="" class="tag m-btn"><span>SaaS</span></a>
            <a href="" class="tag m-btn"><span>Design Writing</span></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const currentPage = ref(1);
</script>

<style scoped></style>
