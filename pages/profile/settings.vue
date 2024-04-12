<template>
  <SectionsProfileEditProfile></SectionsProfileEditProfile>
  <SectionsProfileChangePassword></SectionsProfileChangePassword>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
</script>
