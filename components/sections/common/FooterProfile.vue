<template>
  <footer class="footer2">
    <div class="footer-bottom">
      <div class="footer-bottom__c">
        © Addhub.io. 2024. Все права защищены.
      </div>

      <div class="footer-bottom__nav">
        <ModulesFooterDropdown
          v-model="selectedCurrency"
          :list="['RUB', 'USDT', 'BTC']"
        />
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { selectedCurrency } = storeToRefs(useUserStore());
</script>

<style scoped></style>
