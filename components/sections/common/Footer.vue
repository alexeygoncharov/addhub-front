<template>
  <footer class="footer">
    <div class="container">
      <ModulesFooterTop />

      <ModulesFooterMiddle />

      <ModulesFooterBottom />
    </div>

    <div class="scroll-top" @click="scrollToTop()">
      <NuxtImg src="/img/arrow-top.svg" alt="" />
    </div>
  </footer>
</template>
<script setup>
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
</script>
