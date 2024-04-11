import Avatar from 'vue-boring-avatars';

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('Avatar', Avatar);
});
