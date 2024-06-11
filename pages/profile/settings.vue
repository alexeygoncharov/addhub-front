<template>
  <SectionsProfileEditProfile></SectionsProfileEditProfile>
  <SectionsProfileChangeEmail></SectionsProfileChangeEmail>
  <SectionsProfileChangePassword></SectionsProfileChangePassword>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
</script>
