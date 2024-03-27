<template></template>

<script setup lang="ts">
import { type PropType, ref } from 'vue';
import { useBidsStore } from '~/stores/catalog/bids';
import type { projectsItem } from '~/stores/catalog/catalog.type';
const route = useRoute();
console.log(route.params._id);
</script>
