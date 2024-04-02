<template>
  <ModulesItem :item="item" type="project">
    <template #item-content>
      <div class="stat">
        <!-- <UIStatCard
          title="Заказчик"
          value="Юридическое лицо"
          :icon="baseUrl() + item?.createdBy.avatar"
        />

        <UIStatCard
          title="Уровень проекта"
          value="Премиум"
          icon="/img/stat-icon10.svg"
        />

        <UIStatCard
          title="Срок"
          value="10-15 часов"
          icon="/img/stat-icon11.svg"
        /> -->
      </div>

      <div class="about-freelancer">
        <div class="text20 medium-text">Описание</div>
        <div class="text">
          <p>{{ item?.description }}</p>
        </div>
      </div>

      <div class="attached-files article-item">
        <div class="text20 medium-text">Прикрепленные файлы</div>
        <div class="project-files__items">
          <div class="file-item">
            <div class="file-item__title">Техническое_задание_для</div>
            <div class="file-item__format">PDF</div>
          </div>
          <div class="file-item">
            <div class="file-item__title">logotype_photoshop_color</div>
            <div class="file-item__format">JPG</div>
          </div>
        </div>
      </div>

      <!-- <div class="freelancer-offers">
        <div class="text20 text18-tablet medium-text">
          Предложения фрилансеров {{ item?.bids.length }}
        </div>
        <div class="freelancer-offers__items">
          <div class="offer-card" v-for="bid of item?.bids" :key="bid._id">
            <div class="offer-card__content">
              <div class="avatar">
                <img src="/img/avatar3.webp" alt="" />
                <span class="service-card__user-online"></span>
              </div>
              <div class="offer-card__info">
                <div class="offer-card__name text17 medium-text">
                  Константин Сухоруков
                </div>
                <div class="offer-card__items">
                  <div class="offer-card__item _rating">
                    <img src="/img/star.svg" alt="" />
                    <div class="offer-card__item-text">
                      <span>4.9</span> (595 отзывов)
                    </div>
                  </div>
                  <div class="offer-card__item">
                    <img src="/img/marker3.svg" alt="" />
                    <div class="offer-card__item-text">Екатеринбург</div>
                  </div>
                  <div class="offer-card__item">
                    <img src="/img/prop-icon2.svg" alt="" />
                    <div class="offer-card__item-text">2 часа назад</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="offer-card__nums">
              <div class="offer-card__price">100 ₽</div>
              <div class="offer-card__period">за 100 часов</div>
            </div>
            <div class="offer-card__text">
              <div class="text15 light-text">
                Многие пакеты настольных издательских систем и редакторы
                веб-страниц теперь используют Lorem Ipsum в качестве текста
                модели по умолчанию.
              </div>
            </div>
          </div>
        </div>
      </div> -->

      <div class="freelancer-req">
        <div class="text20 medium-text">Предложить свои услуги</div>
        <div class="freelancer-req__grid">
          <fieldset class="fg">
            <label>Ваша цена</label>
            <input type="text" />
          </fieldset>
          <fieldset class="fg">
            <label>Срок</label>
            <input type="text" />
          </fieldset>
          <fieldset class="fg _full">
            <label>Опишите ваше предложение</label>
            <textarea></textarea>
          </fieldset>
        </div>
        <div class="freelancer-req__items">
          <div class="req-answer">
            <input type="radio" name="req" />
            <div class="req-answer__inner">
              <div class="_check"></div>
              <div class="req-answer__content">
                <div class="req-answer__info">
                  <div class="req-answer__title medium-text">
                    Закрепить предложение
                  </div>
                  <div class="req-answer__desc light-text">
                    Профессионально переведу с английского на немецкий
                  </div>
                </div>
                <div class="req-answer__price">
                  <span>25 ₽</span>
                </div>
              </div>
            </div>
          </div>
          <div class="req-answer">
            <input type="radio" name="req" />
            <div class="req-answer__inner">
              <div class="_check"></div>
              <div class="req-answer__content">
                <div class="req-answer__info">
                  <div class="req-answer__title medium-text">
                    Закрепить в топе + выделить цветом
                  </div>
                  <div class="req-answer__desc light-text">
                    Профессионально переведу с английского на немецкий
                  </div>
                </div>
                <div class="req-answer__price">
                  <span>45 ₽</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </ModulesItem>
</template>

<script setup lang="ts">
import type { projectsItem } from '~/stores/catalog/catalog.type';
const item = ref<projectsItem>();
const route = useRoute();
const itemId = route.params.projectId;
const title = ref('');
setTimeout(
  () => apiFetch(`/api/projects/${itemId}`, { options: { method: 'POST' } }),
  2000,
);
const { data } = await apiFetch<ApiResponse<projectsItem>>(
  `/api/projects/${itemId}`,
);
const value = data.value;
if (value) {
  item.value = value.result;
  title.value = item.value?.title;
}
useHead({
  title,
});
</script>

<style scoped></style>
