<template>
  <div class="admin-top">
    <div class="text32 medium-text">Сообщения</div>
  </div>

  <div class="chat _active">
    <button class="chat__back">
      <span>Назад</span>
    </button>
    <div class="chat__sidebar">
      <div class="chat-search fg">
        <input type="text" placeholder="Поиск" />
        <img src="/img/search2.svg" alt="" class="chat-search__icon" />
      </div>
      <div class="chat-items">
        <div v-for="i in 10" :key="i" class="chat-item" @click="activeChat = i">
          <div class="avatar">
            <img src="/img/avatar17.webp" alt="" />
          </div>
          <div class="chat-item__info">
            <div class="chat-item__name">Андрей Ветров</div>
            <div class="chat-item__prof">Руководитель департамента</div>
          </div>
          <div class="chat-item__nums">
            <div class="chat-item__time">35 мин</div>
          </div>
        </div>
      </div>
    </div>
    <div class="chat__content">
      <div
        v-for="i in 10"
        :key="i"
        class="chat-content"
        :class="[{ _type2: i % 2 === 0 }, { _active: activeChat == i }]"
        data-id="1"
      >
        <div class="chat-content__top">
          <div class="chat-user">
            <div class="avatar">
              <img src="/img/avatar17.webp" alt="" />
            </div>
            <div class="chat-user__info">
              <div class="chat-user__name">Андрей Ветров</div>
              <div class="chat-user__status">
                <span>онлайн</span>
              </div>
            </div>
          </div>
          <div v-if="i % 2 !== 0" class="chat-content__order _flex">
            <img src="/img/folder.svg" alt="" />
            <span>Чат по заказу "Расклеить объявления"</span>
          </div>
          <div class="chat-content__right _flex">
            <div v-if="i % 2 == 0" class="chat-status">
              <img src="/img/thunder.svg" alt="" />
              <span>Открытый диспут</span>
            </div>
            <button class="chat-content__delete _flex">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.1635 5.95719H14.3929V4.125C14.3929 3.98825 14.3386 3.8571 14.2419 3.7604C14.1452 3.6637 14.014 3.60938 13.8773 3.60938H8.12292C7.98617 3.60938 7.85502 3.6637 7.75832 3.7604C7.66162 3.8571 7.60729 3.98825 7.60729 4.125V5.95719H4.83667C4.69992 5.95719 4.56877 6.01151 4.47207 6.10821C4.37537 6.20491 4.32104 6.33606 4.32104 6.47281C4.32104 6.60956 4.37537 6.74072 4.47207 6.83741C4.56877 6.93411 4.69992 6.98844 4.83667 6.98844H5.50011V16.5C5.50102 16.9999 5.70025 17.479 6.05407 17.8322C6.40788 18.1854 6.88738 18.3837 7.3873 18.3837H14.6404C15.1356 18.3765 15.608 18.175 15.9559 17.8226C16.3038 17.4702 16.4993 16.9952 16.5001 16.5V6.98844H17.1498C17.2865 6.99026 17.4184 6.93768 17.5164 6.84228C17.6144 6.74687 17.6705 6.61644 17.6723 6.47969C17.6741 6.34294 17.6215 6.21106 17.5261 6.11307C17.4307 6.01508 17.3003 5.95901 17.1635 5.95719ZM8.63854 4.64062H13.3617V5.95719H8.63854V4.64062ZM15.4689 16.5C15.4679 16.7264 15.3774 16.9432 15.2169 17.103C15.0565 17.2628 14.8393 17.3525 14.6129 17.3525H7.37355C7.14952 17.3489 6.93584 17.2576 6.77838 17.0982C6.62092 16.9388 6.53223 16.724 6.53136 16.5V6.98844H15.4689V16.5Z"
                  fill="#6B7177"
                />
              </svg>
              <span>Удалить диалог</span>
            </button>
          </div>
        </div>

        <div class="messages">
          <div class="messages__split">
            <div class="messages__split-text text14">
              Андрей Ветров открыл диспут
            </div>
          </div>

          <div class="message-item">
            <div class="message-user">
              <div class="avatar">
                <img src="/img/avatar17.webp" alt="" />
              </div>
              <div class="message-user__name">Андрей Ветров</div>
              <div class="message-user__time">
                <span>35 мин</span>
              </div>
            </div>

            <div class="message-item__content">
              <div class="message-item__text">
                Не смогли найти общий язык, но часть проекта уже выполнена,
                поэтому пришли к обоюдному согласию разделить бюджет проекта
                50/50. Прошу выплатить 50% от бюджета исполнителю, 50% вернуть
                мне.
              </div>
            </div>
          </div>

          <div class="message-item _judge">
            <div class="message-user">
              <div class="avatar">
                <img src="/img/avatar20.webp" alt="" />
              </div>
              <div class="message-user__name">Арбитраж</div>
              <div class="message-user__time">
                <span>35 мин</span>
              </div>
            </div>

            <div class="message-item__content">
              <div class="message-item__text">
                Уважаемый исполнитель, вы принимаете условия Заказчика на
                выплату вознаграждения в размере 50%?
              </div>
            </div>
          </div>
        </div>

        <div class="chat-nav _flex">
          <div class="chat-nav__field">
            <textarea placeholder="Напишите сообщение"></textarea>
          </div>
          <div class="chat-nav__action _flex">
            <div class="chat-nav__file">
              <input type="file" />
              <button class="chat-nav__file-btn">
                <svg
                  width="25"
                  height="25"
                  viewBox="0 0 25 25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.4458 8.08021L9.55417 13.9729C9.45468 14.069 9.37532 14.1839 9.32073 14.311C9.26613 14.4381 9.2374 14.5748 9.2362 14.7131C9.23499 14.8514 9.26135 14.9886 9.31373 15.1166C9.3661 15.2446 9.44345 15.3609 9.54125 15.4587C9.63906 15.5565 9.75536 15.6339 9.88338 15.6863C10.0114 15.7386 10.1486 15.765 10.2869 15.7638C10.4252 15.7626 10.5619 15.7339 10.689 15.6793C10.816 15.6247 10.931 15.5453 11.0271 15.4458L16.9198 9.55417C17.5059 8.96807 17.8352 8.17314 17.8352 7.34427C17.8352 6.5154 17.5059 5.72048 16.9198 5.13437C16.3337 4.54827 15.5388 4.21901 14.7099 4.21901C13.881 4.21901 13.0861 4.54827 12.5 5.13437L6.60729 11.0271C6.11362 11.5085 5.72045 12.0831 5.45058 12.7176C5.18071 13.3521 5.03952 14.0339 5.0352 14.7234C5.03088 15.4129 5.16352 16.0964 5.42541 16.7343C5.68731 17.3721 6.07325 17.9516 6.56085 18.4392C7.04845 18.9267 7.628 19.3125 8.26589 19.5744C8.90378 19.8362 9.5873 19.9687 10.2768 19.9643C10.9663 19.9599 11.6481 19.8186 12.2826 19.5486C12.917 19.2787 13.4916 18.8854 13.9729 18.3917L19.8656 12.5L21.3385 13.9729L15.4458 19.8656C14.7687 20.5428 13.9648 21.0799 13.0801 21.4463C12.1954 21.8128 11.2472 22.0014 10.2896 22.0014C9.33198 22.0014 8.38375 21.8128 7.49904 21.4463C6.61433 21.0799 5.81046 20.5428 5.13333 19.8656C4.4562 19.1885 3.91908 18.3846 3.55262 17.4999C3.18616 16.6152 2.99754 15.667 2.99754 14.7094C2.99754 13.7518 3.18616 12.8035 3.55262 11.9188C3.91908 11.0341 4.4562 10.2303 5.13333 9.55312L11.0271 3.66146C12.0094 2.71272 13.325 2.18775 14.6906 2.19961C16.0562 2.21148 17.3626 2.75924 18.3282 3.7249C19.2939 4.69057 19.8416 5.99689 19.8535 7.36249C19.8654 8.7281 19.3404 10.0437 18.3917 11.026L12.5 16.9208C12.2097 17.211 11.8651 17.4412 11.4859 17.5983C11.1067 17.7553 10.7002 17.8361 10.2897 17.836C9.87927 17.836 9.47284 17.7551 9.09364 17.598C8.71443 17.4409 8.36989 17.2106 8.07969 16.9203C7.78948 16.63 7.55929 16.2854 7.40225 15.9062C7.24522 15.527 7.16442 15.1205 7.16447 14.71C7.16452 14.2996 7.24541 13.8931 7.40253 13.5139C7.55966 13.1347 7.78993 12.7902 8.08021 12.5L13.9729 6.60729L15.4458 8.08021Z"
                    fill="#C8CBE8"
                  />
                </svg>
              </button>
            </div>
            <button class="chat-nav__btn m-btn m-btn-blue m-btn-shadow">
              <span>Отправить</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const activeChat = ref(0);
definePageMeta({
  layout: 'admin',
});
</script>
