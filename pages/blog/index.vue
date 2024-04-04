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
              v-for="i in 3"
              :key="i"
              :item="{}"
            ></ModulesBlogCard>
          </div>

          <div class="pagination">
            <a href="" class="pagination__btn _prev">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.8186 8.00232L10.1784 14.3445C10.3868 14.5522 10.7241 14.5518 10.9321 14.3434C11.14 14.1351 11.1395 13.7975 10.9311 13.5897L4.94983 7.62498L10.9313 1.6603C11.1396 1.45244 11.1402 1.11511 10.9324 0.906712C10.8281 0.802244 10.6915 0.75001 10.5548 0.75001C10.4186 0.75001 10.2825 0.801895 10.1784 0.905638L3.8186 7.24766C3.71824 7.34751 3.66193 7.4834 3.66193 7.62498C3.66193 7.76656 3.71841 7.90229 3.8186 8.00232Z"
                  fill="#222222"
                />
              </svg>
            </a>

            <a href="" class="pagination__item">1</a>
            <a href="" class="pagination__item _active">2</a>
            <a href="" class="pagination__item">3</a>
            <a href="" class="pagination__item _hide-mob">4</a>
            <a href="" class="pagination__item _hide-tablet">5</a>
            <a href="" class="pagination__item">...</a>
            <a href="" class="pagination__item">20</a>

            <a href="" class="pagination__btn _next">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.1813 7.24768L4.82149 0.90549C4.61312 0.697817 4.27576 0.698166 4.06774 0.906564C3.85988 1.11493 3.86042 1.45248 4.06882 1.66031L10.05 7.62502L4.0686 13.5897C3.86023 13.7976 3.85969 14.1349 4.06753 14.3433C4.17181 14.4478 4.30842 14.5 4.44503 14.5C4.5813 14.5 4.71737 14.4481 4.82147 14.3444L11.1813 8.00234C11.2816 7.90249 11.338 7.7666 11.338 7.62502C11.338 7.48344 11.2815 7.34771 11.1813 7.24768Z"
                  fill="#222222"
                />
              </svg>
            </a>
          </div>

          <div class="pagination__text">
            <div class="text14">1 – 20 of 300+ публикаций доступно</div>
          </div>
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

<script setup lang="ts"></script>

<style scoped></style>
