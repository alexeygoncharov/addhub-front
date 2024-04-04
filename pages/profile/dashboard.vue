<template>
  <SectionsProfileDashboard v-if="user?.active_role !== 'buyer'">
    <div class="dashboard-card _big">
      <div class="dashboard-card__top">
        <div class="dashboard-card__title text17 medium-text">
          Просмотры профиля
        </div>
        <div class="sort">
          <div class="m-select" :class="{ _open: isDropdownOpen }">
            <input class="m-select__field" type="hidden" />
            <div class="m-select__toggle" @click="toggleDropdown()">
              <span class="m-select__current"> {{ dropdownValue }} </span>
              <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.71056 1.35608H0.289413C0.0328762 1.35608 -0.0978122 1.66586 0.0861196 1.84979L2.79669 4.56036C2.90802 4.67169 3.09195 4.67169 3.20333 4.56036L5.9139 1.84979C6.09778 1.66586 5.9671 1.35608 5.71056 1.35608Z"
                  fill="#222222"
                />
              </svg>
            </div>
            <OnClickOutside @trigger="isDropdownOpen = false">
              <div class="m-select__dropdown">
                <div
                  v-for="item of dropdownItems"
                  :key="item"
                  class="m-select__option"
                  :class="{ _active: item === dropdownValue }"
                  data-value="Неделя"
                  @click="
                    {
                      dropdownValue = item;
                      toggleDropdown();
                    }
                  "
                >
                  <span>{{ item }}</span>
                </div>
              </div>
            </OnClickOutside>
          </div>
        </div>
      </div>
      <div class="dashboard-card__bottom">
        <ClientOnly>
          <apexchart
            id="chart2"
            class="chart line-chart"
            :options="lineOptions"
            type="area"
            height="296"
            :series="[
              {
                name: 'Desktops',
                data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
              },
            ]"
          ></apexchart
        ></ClientOnly>
      </div>
    </div>
    <div class="dashboard-card">
      <div class="dashboard-card__top">
        <div class="dashboard-card__title text17 medium-text">
          Источник трафика
        </div>
        <div class="dashboard-card__more">
          <button class="dashboard-card__more-btn">
            <svg
              width="3"
              height="15"
              viewBox="0 0 3 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="1.5" cy="1.5" r="1.5" fill="#6A7A99" />
              <circle cx="1.5" cy="7.5" r="1.5" fill="#6A7A99" />
              <circle cx="1.5" cy="13.5" r="1.5" fill="#6A7A99" />
            </svg>
          </button>
        </div>
      </div>
      <div class="dashboard-card__bottom">
        <ClientOnly>
          <apexchart
            id="chart"
            class="chart"
            :options="donutOptions"
            type="donut"
            :series="[32, 28, 40]"
            height="296"
          ></apexchart
        ></ClientOnly>
      </div>
    </div>
  </SectionsProfileDashboard>
  <SectionsProfileDashboard v-else>
    <div class="dashboard-card _big2">
      <div class="dashboard-card__top">
        <div class="dashboard-card__title text17 medium-text">Мои проекты</div>
        <a href="" class="dashboard-card__link">
          <span>Смотреть все</span>
        </a>
      </div>
      <div class="dashboard-card__bottom">
        <div class="dashboard-card__projects">
          <div class="project-card">
            <div class="project-card__col1">
              <div class="project-card__title">
                Мобильное приложение для доставки еды
              </div>
              <div class="reply-row__props">
                <div class="reply-row__prop">
                  <img src="/img/marker2.svg" alt="" />
                  <span>Москва, Россия</span>
                </div>
                <div class="reply-row__prop">
                  <img src="/img/calendar2.svg" alt="" />
                  <span>2 часа назад</span>
                </div>
                <div class="reply-row__prop">
                  <img src="/img/reply.svg" alt="" />
                  <span>5 предложений</span>
                </div>
              </div>
            </div>
            <div class="project-card__col2">
              <div class="project-card__type">Веб-дизайн и приложений</div>
            </div>
            <div class="project-card__col3">
              <div class="project-card__price">₽500000</div>
            </div>
            <div class="project-card__col4">
              <div class="project-card__nums">
                <div class="project-card__count">
                  <span>5</span>
                </div>
                <div class="project-card__nums-title">новых предложений</div>
              </div>
            </div>
          </div>

          <div class="project-card">
            <div class="project-card__col1">
              <div class="project-card__title">
                Мобильное приложение для доставки еды
              </div>
              <div class="reply-row__props">
                <div class="reply-row__prop">
                  <img src="/img/marker2.svg" alt="" />
                  <span>Москва, Россия</span>
                </div>
                <div class="reply-row__prop">
                  <img src="/img/calendar2.svg" alt="" />
                  <span>2 часа назад</span>
                </div>
                <div class="reply-row__prop">
                  <img src="/img/reply.svg" alt="" />
                  <span>5 предложений</span>
                </div>
              </div>
            </div>
            <div class="project-card__col2">
              <div class="project-card__type">Веб-дизайн и приложений</div>
            </div>
            <div class="project-card__col3">
              <div class="project-card__price">₽500000</div>
            </div>
            <div class="project-card__col4">
              <div class="project-card__nums">
                <div class="project-card__count">
                  <span>5</span>
                </div>
                <div class="project-card__nums-title">новых предложений</div>
              </div>
            </div>
          </div>

          <div class="project-card">
            <div class="project-card__col1">
              <div class="project-card__title">
                Мобильное приложение для доставки еды
              </div>
              <div class="reply-row__props">
                <div class="reply-row__prop">
                  <img src="/img/marker2.svg" alt="" />
                  <span>Москва, Россия</span>
                </div>
                <div class="reply-row__prop">
                  <img src="/img/calendar2.svg" alt="" />
                  <span>2 часа назад</span>
                </div>
                <div class="reply-row__prop">
                  <img src="/img/reply.svg" alt="" />
                  <span>5 предложений</span>
                </div>
              </div>
            </div>
            <div class="project-card__col2">
              <div class="project-card__type">Веб-дизайн и приложений</div>
            </div>
            <div class="project-card__col3">
              <div class="project-card__price">₽500000</div>
            </div>
            <div class="project-card__col4">
              <div class="project-card__nums">
                <div class="project-card__count">
                  <span>5</span>
                </div>
                <div class="project-card__nums-title">новых предложений</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SectionsProfileDashboard>
</template>

<script setup lang="ts">
import type { ApexOptions } from 'apexcharts';
import { OnClickOutside } from '@vueuse/components';
definePageMeta({ layout: 'profile' });
const userStore = useUserStore();
const user = storeToRefs(userStore).user;
const [isDropdownOpen, toggleDropdown] = useToggle();
const colors = ['#5D68F1', '#F3F4FF', '#DADDFF'];
const dropdownValue = ref('Неделя');
const dropdownItems = ['Неделя', 'Месяц', 'Год'];
const donutOptions = {
  labels: ['Прямой', 'По ссылке', 'Поиск'],
  chart: {
    fontFamily: 'Navigo, sans-serif',
  },
  fill: {
    opacity: 1,
    colors,
  },
  states: {
    hover: {
      filter: 'none',
    },
  },
  tooltip: {
    enabled: false,
    y: {
      formatter: function (val) {
        return val + '%';
      },
    },
  },
  dataLabels: {
    formatter(val, opts) {
      return '';
    },
  },
  legend: {
    position: 'left',
    horizontalAlign: 'center',
    formatter(seriesName, opts) {
      return `
                        <span class="apexcharts-legend-title">${seriesName}</span> <br>
                        <span class="apexcharts-legend-num">${opts.w.globals.series[opts.seriesIndex]}%</span>
                        `;
    },
    markers: {
      fillColors: colors,
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: '75%',
      },
    },
  },
  responsive: [
    {
      breakpoint: 576,
      options: {
        chart: {
          height: 180,
        },
      },
    },
  ],
} as ApexOptions;

const lineOptions = {
  chart: {
    fontFamily: 'Navigo, sans-serif',
    zoom: {
      enabled: false,
    },
    toolbar: {
      show: false,
    },
  },
  fill: {
    // colors: ['#F3F4FF']
  },
  colors: ['#5D68F1'],
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
  },
  title: {
    text: '',
  },
  grid: {
    row: {
      colors: ['transparent', 'transparent'],
      opacity: 1,
      borderColor: '#D7DBDE',
    },
  },
  xaxis: {
    categories: [
      'Янв',
      'Фев',
      'Мар',
      'Апр',
      'Май',
      'Июн',
      'Июл',
      'Авг',
      'Сен',
      'Окт',
      'Ноя',
      'Дек',
    ],
    labels: {
      style: {
        colors: ['#4F547B'],
      },
    },
  },
  yaxis: {
    labels: {
      style: {
        colors: ['#4F547B'],
      },
    },
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return val.toString();
      },
    },
  },
} as ApexOptions;
</script>

<style scoped></style>
