<template>
  <div class="footer-bottom">
    <div class="footer-bottom__c">© Addhub.io. 2024. Все права защищены.</div>

    <div class="footer-bottom__nav">
      <ModulesFooterDropdown
        v-model="selectedCurrency"
        :list="['RUB', 'USDT', 'BTC']"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
const { selectedCurrency } = storeToRefs(useUserStore());
</script>
