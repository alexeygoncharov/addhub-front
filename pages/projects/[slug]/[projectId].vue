<template>
  <ModulesItem :item="item" type="project" @submit="showBid = true">
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

      <div v-if="item?.files.length" class="attached-files article-item">
        <div class="text20 medium-text">Прикрепленные файлы</div>
        <div class="project-files__items">
          <nuxtLink
            v-for="(file, index) of item?.files"
            :key="index"
            target="_blank"
            :to="baseUrl() + file.url"
            class="file-item"
          >
            <div class="file-item__title">{{ getFileName(file.url) }}</div>
            <div class="file-item__format">
              {{ getFileExtension(file.url) }}
            </div>
          </nuxtLink>
        </div>
      </div>

      <div v-if="item?.createdBy === user?._id" class="freelancer-offers">
        <div class="text20 text18-tablet medium-text">
          Предложения фрилансеров {{ item?.bids.length }}
        </div>
        <div class="freelancer-offers__items">
          <div v-for="bid of item?.bids" :key="bid._id" class="offer-card">
            <div class="offer-card__content">
              <div class="avatar">
                <img
                  v-if="bid.user.avatar.url"
                  crossorigin="anonymous"
                  :src="baseUrl() + bid.user.avatar.url"
                  alt=""
                />

                <div v-else><Avatar :size="80" :name="bid.user.name" /></div>
                <span class="service-card__user-online"></span>
              </div>
              <div class="offer-card__info">
                <div class="offer-card__name text17 medium-text">
                  {{ bid.user.name }}
                </div>
                <div class="offer-card__items">
                  <div class="offer-card__item _rating">
                    <img src="/img/star.svg" alt="" />
                    <div class="offer-card__item-text">
                      <span>{{ bid.user.rate }}</span>
                      <!-- (595 отзывов) -->
                    </div>
                  </div>
                  <!-- <div class="offer-card__item">
                    <img src="/img/marker3.svg" alt="" />
                    <div class="offer-card__item-text">Екатеринбург</div>
                  </div> -->
                  <div class="offer-card__item">
                    <img src="/img/prop-icon2.svg" alt="" />
                    <div class="offer-card__item-text">{{ bid.createdAt }}</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="offer-card__nums">
              <div class="offer-card__price">{{ bid.price }} руб.</div>
              <!-- <div class="offer-card__period">за 100 часов</div> -->
            </div>
            <div class="offer-card__text">
              <div class="text15 light-text">
                <!-- {{  }} -->
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="userBid" class="freelancer-req">
        <div class="text20 medium-text">Ваш отклик</div>
        <div class="freelancer-req__grid">
          <fieldset class="fg">
            <label>Цена</label>
            <p>{{ userBid?.price }} руб.</p>
          </fieldset>
          <fieldset class="fg">
            <label>Срок</label>
            <p>{{ pluralize(userBid?.term, 'день', 'дня', 'дней') }}</p>
          </fieldset>
          <fieldset v-if="userBid?.description" class="fg _full">
            <p>
              {{ userBid?.description }}
            </p>
          </fieldset>
        </div>
        <!-- <div class="freelancer-req__items">
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
        </div> -->
      </div>
    </template>
  </ModulesItem>
  <ModulesProductBidModal
    v-show="showBid"
    :id="itemId"
    v-model="showBid"
    @new-bid="updateProject()"
  />
</template>

<script setup lang="ts">
import type { projectsItem } from '~/stores/catalog/catalog.type';
const showBid = ref(false);
// TODO доработать запрос на бке
const userBid = computed(() => {
  return item.value?.bids.find((bid) => {
    return bid.user._id === userStore.user?._id;
  });
});

const item = ref<projectItem>();
const route = useRoute();
const itemId = Array.isArray(route.params.projectId)
  ? route.params.projectId[1]
  : route.params.projectId;
const category = useCommonStore().categories?.find(
  (item) => item.slug === route.params.slug,
);
if (!category || !itemId) {
  throw showError({ statusCode: 404 });
}

const title = ref('');
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
function getFileExtension(filename: string) {
  // Разбиваем строку с именем файла по точке
  const parts = filename.split('.');
  // Возвращаем последний элемент массива (расширение файла)
  return parts[parts.length - 1];
}
function getFileName(filename: string) {
  // Разбиваем строку с именем файла по точке
  const parts = filename.split('.');
  // Возвращаем последний элемент массива (расширение файла)
  return parts[parts.length - 2].split('/')[1];
}
if (process.client) {
  setTimeout(
    () =>
      apiFetch(`/api/views/project/${itemId}`, { options: { method: 'POST' } }),
    2000,
  );
}
const updateProject = async () => {
  const { data } = await apiFetch<ApiResponse<projectItem>>(
    `/api/projects/${itemId}`,
  );
  const value = data.value;
  if (value) {
    item.value = value.result;
    title.value = item.value?.title;
  }
};
updateProject();
useHead({
  title,
});
</script>

<style scoped></style>
