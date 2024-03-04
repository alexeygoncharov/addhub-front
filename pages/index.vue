<template>
  <SectionsIndexMain />
  <SectionsIndexCategories />
  <SectionsIndexServices />
  <SectionsCommonAdvantages
    title="Необходимо выполнить проект?"
    desc="Самые просматриваемые и самые продаваемые услуги за все время"
  />
  <SectionsCommonAdvantages2 :img="advantages2Img" />
  <SectionsCommonAdvantageNums />
  <SectionsCommonReviews title="Отзывы пользователей" />
</template>

<script>
import ImgAdvantages2 from '~/assets/img/man3.webp';
export default {
  data() {
    return {
      advantages2Img: ImgAdvantages2,
    };
  },
};
</script>
