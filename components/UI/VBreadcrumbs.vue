<template>
  <div class="breadcrumbs">
    <div class="container">
      <ol>
        <li v-for="(item, idx) in items" :key="idx">
          <NuxtLink v-if="item.to" :to="item.to">{{ item.name }}</NuxtLink>
          <span v-else>{{ item.name }}</span>
        </li>
      </ol>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  items: {
    type: Array as PropType<{ name: string; to?: string }[]>,
    required: true,
  },
});
</script>
