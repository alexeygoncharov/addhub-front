<template>
  <ModulesProfileTop>Сохраненное</ModulesProfileTop>

  <div class="saves _tabs-parent">
    <UITabsSelect
      v-model="active"
      full
      :initial-values="[
        { title: 'Услуги', value: 'services' },
        { title: 'Проекты', value: 'projects' },
      ]"
    />
    <div class="tab-content _tab1 _active">
      <div v-if="active === 'services'" class="saves__grid grid-col4">
        <ModulesCardsService
          v-for="item of services"
          :id="item.id"
          :key="item.id"
        />
      </div>
      <div v-else class="saves__grid">
        <ModulesCardsProject
          v-for="item of projects"
          :id="item.id"
          :key="item.id"
        />
      </div>

      <UIVPagination
        v-if="services.length > 8"
        v-model="currentPage"
        :items-per-page="8"
        :total-items="services.length"
        :total-pages="Math.ceil(services.length / 8)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
const currentPage = ref(1);
const active = ref('services');
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
const favorites = storeToRefs(userStore).favorites;
const projects = computed(() =>
  favorites.value.filter((el) => el.type === 'project'),
);
const services = computed(() =>
  favorites.value.filter((el) => el.type === 'service'),
);
</script>

<style scoped></style>
