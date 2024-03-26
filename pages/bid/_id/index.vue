<template>
    <div id="modal-screen" class="modal-screen">
        <div class="modal-project">
            <div class="modal-wrapper">
                <div class="header">
                    <div class="avatar">
                        <img :src="`${$config.public.apiBase}/${data.createdBy.avatar}`" alt=""
                            crossorigin="anonymous" />
                        <span v-if="data.createdBy.online_status === 'online'" class="modal-card__user-online"></span>
                    </div>
                    <div class="wraper">
                        <div class="title text20 medium-text">
                            {{ data.title }}
                        </div>
                        <div class="header__props">
                            <div class="header__prop">
                                <NuxtImg src="/img/prop-icon.svg" alt="" />
                                <span>{{ data.address.city.title }}</span>
                            </div>
                            <div class="header__prop">
                                <NuxtImg src="/img/prop-icon2.svg" alt="" />
                                <span>{{ data.createdAt }}</span>
                                <!-- Использование метода для форматирования даты -->
                            </div>
                            <div class="header__prop">
                                <NuxtImg src="/img/prop-icon3.svg" alt="" />
                                <span>{{ data.bids.length }} отклик</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-project__price">100</div>
                    <!-- Предположительно, здесь должна быть динамическая привязка к цене -->
                </div>
                <div class="modal-wrapper__text">
                    <div class="text15">
                        {{ data.description }}
                    </div>
                </div>
                <div class="modal-wrapper__maininput">
                    <span>Текст отклика</span>
                    <textarea v-model="description" />
                    <!-- Двусторонняя привязка данных -->
                </div>
                <div class="modal-wrapper__inputs">
                    <div class="modal-wrapper__input">
                        <span>Стоимость (руб)</span>
                        <input v-model="price" type="text" />
                        <!-- Двусторонняя привязка данных -->
                    </div>
                    <div class="modal-wrapper__input">
                        <span>Срок (в днях)</span>
                        <input v-model="term" type="text" />
                        <!-- Двусторонняя привязка данных -->
                    </div>
                </div>
                <div class="send-button">
                    <button @click="createBd">Предложить услугу</button>
                    <!-- Привязка метода к событию клика -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { type PropType, ref } from 'vue';
import { useBidsStore } from '~/stores/catalog/bids';
import type { projectsItem } from '~/stores/catalog/catalog.type';
const route = useRoute()
console.log(route.params._id)
const price = ref<number>(0);
const term = ref();
const description = ref();
const bidsStore = useBidsStore();
const props = defineProps({
    data: {
        type: Object as PropType<projectsItem>,
        required: true,
    },
});

async function createBd() {
    await bidsStore.createBid(props.data._id, price.value, term.value);
}


</script>
<style lang="scss">
.modal-screen {
    position: fixed;
    inset: 0;
    z-index: 10000;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
    justify-content: center;
    padding: 30px 0;
    background: rgba(0 0 0 / 60%);
    -webkit-overflow-scrolling: touch;
}

.modal-project {
    position: fixed;
    inset: 0;
    z-index: 999999;
    max-width: 728px;
    max-height: 728px;
    margin: auto;
    overflow: auto;
    background-color: whitesmoke;
    border-radius: 0 0 12px 12px;
}

input {
    width: 100%;
    height: 40px;
    padding: 0 15px;
    margin: 17px 0 0;
    background-color: #f8f8f8;
    border: 2px solid #ccc;
    border-radius: 4px;
}

.modal-wrapper {
    position: fixed;
    inset: 0;
    z-index: 1111;
    max-width: 500px;
    max-height: 600px;
    margin: auto;
    overflow: auto;
    border-radius: 0 0 12px 12px;

    &__text {
        max-width: 33.75em;
        margin: 20px 0;
        font-weight: 300;
    }

    .send-button {
        display: flex;
        flex-direction: row-reverse;
        width: 100%;
        margin: 50px 0;
    }

    button {
        width: 150px;
        height: 40px;
        color: #e8e8e8;
        background-color: rgba($color: #7464de, $alpha: 100%);
        border-radius: 4px;
    }

    &__maininput {
        width: 100%;
        margin: 20px 0;
    }

    textarea {
        box-sizing: border-box;
        width: 100%;
        height: 150px;
        padding: 12px 20px;
        margin: 20px 0;
        font-weight: 300;
        resize: none;
        background-color: #f8f8f8;
        border: 2px solid #ccc;
        border-radius: 4px;
    }

    &__inputs {
        display: flex;
        flex-direction: row;
        gap: 40px;
    }

    &__input {
        width: 100%;
        background-color: #f8f8f8;
    }

    .header {
        display: flex;
        flex-direction: row;

        &__props {
            display: flex;
            flex-direction: row;
            margin-top: 0.87;
        }

        &__prop {
            display: flex;
            align-items: center;
            padding-right: 0.125em;
            margin-right: 0.625em;
            color: #6b7177;
            border-right: 1px solid #e9e9e9;
        }
    }

    .modal-card__user-online {
        top: 0.25em;
        right: 0.25em;
        width: 0.5625em;
        height: 0.5625em;
        border-width: 1px;
    }

    .wraper {
        display: flex;
        flex-direction: column;
        width: 100%;

        .title {
            margin: 5px;
            font-weight: 500;
        }
    }

    .avatar {
        position: relative;
        width: 3.625em;
        height: 3.625em;
        margin-right: 1.25em;
    }
}
</style>