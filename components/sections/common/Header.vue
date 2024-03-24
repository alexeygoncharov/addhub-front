<template>
  <header class="header">
    <div class="container">
      <div class="header-top">
        <ModulesHeaderLogo />

        <ModulesHeaderMenu />

        <ModulesHeaderNavTop />

        <ModulesHeaderAuth v-model="mobMenu" />
      </div>

      <ModulesHeaderNavBottom />
      <ModulesHeaderMobMenu v-model="mobMenu" />
    </div>

    <div class="search-modal">
      <div class="search-modal__bg _toggle-search"></div>
      <div class="search-modal__wrap">
        <div class="page-search">
          <NuxtImg src="/img/search.svg" alt="" class="page-search__icon" />
          <div class="page-search__field fg">
            <input type="text" placeholder="Найти" />
          </div>
          <button class="page-search__btn m-btn m-btn-blue">
            <span>Найти</span>
          </button>
        </div>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
const mobMenu = ref(false);
</script>
