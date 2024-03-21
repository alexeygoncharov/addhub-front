<template>
  <div :class="['blog', { blog_bg: hasBackground }]">
    <div class="container">
      <UISectionTop v-bind="sectionTop" />
      <div class="blog__grid grid-col4 grid-tablet2 grid-mob-full">
        <ModulesCardsBlog img="blog.webp" />
        <ModulesCardsBlog img="blog2.webp" />
        <ModulesCardsBlog img="blog3.webp" />
        <ModulesCardsBlog img="blog4.webp" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  hasBackground: {
    type: Boolean,
    default: false,
  },
  sectionTop: {
    type: Object as PropType<{
      title: string;
      desc: string;
      link: { text: string };
    }>,
    required: true,
  },
});
</script>
