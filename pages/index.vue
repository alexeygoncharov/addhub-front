<template>
  <SectionsIndexMain />
  <SectionsIndexCategories />
  <SectionsIndexServices />
  <SectionsCommonAdvantages
    title="Необходимо выполнить проект?"
    desc="Самые просматриваемые и самые продаваемые услуги за все время"
  />
  <SectionsCommonAdvantages2 img="man3.webp" />
  <SectionsCommonAdvantageNums />
  <SectionsCommonReviews title="Отзывы пользователей" />
  <SectionsCommonOffer
    :link="{ text: 'Найти исполнителя', path: '/freelancers/all' }"
    :img-list="['offer.webp', 'offer2.webp']"
  />
  <SectionsCommonBlog
    :section-top="{
      title: 'Наш блог',
      desc: 'Узнайте, как вы можете повысить свой карьерный статус',
      link: { text: 'Все статьи' },
    }"
  />
  <SectionsIndexTrust />
  <SectionsIndexFindTalent />
</template>
<style lang="scss">
// @import '/assets/style/pages/b-index';
</style>
