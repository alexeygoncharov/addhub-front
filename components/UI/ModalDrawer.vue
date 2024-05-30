v
<script setup lang="ts">
import { closeModal } from '~/composables/modalDrawer';
const props = defineProps<{
  show: boolean;
  noTitle?: boolean;
}>();
onMounted(() => {
  addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
    }
  });
});

watch(
  () => props.show,
  (newValue) => {
    if (newValue) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  },
);
</script>

<template>
  <Transition name="slide-fade" :duration="200">
    <div v-if="show" ref="overlay" class="overlay" @click="closeModal()">
      <div class="modal-drawer" @click.stop>
        <div class="modal-drawer__body">
          <div class="modal-drawer__inner">
            <div
              v-if="useSlots()?.['drawer-title']"
              class="modal-drawer__inner-wrapper"
            >
              <h3 class="modal-drawer__title">
                <slot name="drawer-title"></slot>
              </h3>
              <a class="modal__close" href="#" @click.prevent="closeModal">
                <img src="~/assets/icons/form-close-grey.svg" loading="lazy" />
              </a>
            </div>
            <TheSkeleton
              v-else-if="!noTitle"
              class="modal-drawer__title-skeleton"
            />

            <slot name="drawer-body"></slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.modal-drawer {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  width: 100%;
  max-width: 5em;
  font-size: 1em;
  color: #484848;
  text-align: left;
  vertical-align: middle;
  cursor: default;
  background-color: #fff;

  &__body {
    height: 100%;
    overflow: hidden auto;

    &::-webkit-scrollbar {
      width: 20px;
    }

    &::-webkit-scrollbar-track {
      margin: 33px 0 27px;
      background: #f5f8fb;
      border-radius: 8px;
      box-shadow: 0 2px 10px -5px #9fc8df94;
    }

    &::-webkit-scrollbar-thumb {
      background: #282828;
      border: 3px solid #fff;
      border-radius: 18px;
    }
  }

  .modal__close {
    display: block;
    width: 26px;
    height: 26px;

    img {
      width: 100%;
      height: 100%;
      fill: #484848;
    }
  }

  &__inner {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 50px 56px 50px 70px;

    &-wrapper {
      display: flex;
      justify-content: space-between;
      margin-bottom: 30px;
    }
  }

  &__title {
    position: relative;
    display: flex;
    flex-basis: 90%;
    align-items: center;
    justify-content: space-between;
    font-size: 36px;
    font-weight: 700;
    line-height: 110%;

    &-skeleton {
      width: 40%;
      height: 45px;
      margin-bottom: 24em;
      border-radius: 10px;
    }
  }
}

@media (max-width: 1000px) {
  .modal-drawer {
    max-width: 500px;
    font-size: 14px;

    &__inner {
      padding: 43px 30px;
    }

    &__title {
      font-size: 24px;

      &-skeleton {
        width: 60%;
        height: 30px;
        border-radius: 7px;
      }
    }
  }
}

@media (max-width: 768px) {
  .modal-drawer {
    &__body {
      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-track {
        margin: 0;
      }
    }

    &__title {
      .modal__close {
        display: block;
      }
    }
  }
}

.slide-fade-enter-active .modal-drawer {
  transition:
    transform 0.2s cubic-bezier(1, 0.5, 0.8, 1),
    opacity 0.2s ease-out;
}

.slide-fade-leave-active .modal-drawer {
  margin-right: -20px;
  transition:
    transform 0.2s cubic-bezier(1, 0.5, 0.8, 1),
    opacity 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-from {
  margin-right: -20px;
}

.slide-fade-enter-from .modal-drawer,
.slide-fade-leave-to .modal-drawer {
  opacity: 0;
  transform: translateX(20px);
}

.slide-fade-enter-active {
  transition: opacity 0.2s ease-out;
}

.slide-fade-leave-active {
  transition: opacity 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background: rgb(74 90 104 / 33%);
  backdrop-filter: blur(6px);
}

@media (max-width: 500px) {
  .overlay {
    background: none;
    backdrop-filter: none;
  }
}
</style>
<style></style>
