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

<script>
export default {
  props: {
    hasBackground: {
      type: Boolean,
      default: false,
    },
    sectionTop: {
      type: Object,
      required: true,
    },
  },
};
</script>
