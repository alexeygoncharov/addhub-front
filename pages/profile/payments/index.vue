<template>
  <ModulesProfileTop
    >Выплаты

    <template #btn>
      <button class="admin-top__btn m-btn m-btn-blue m-btn-shadow">
        <span>Запросить выплату</span>
      </button></template
    >
  </ModulesProfileTop>

  <div class="payments m-table">
    <table>
      <thead>
        <tr>
          <th><span>Сумма</span></th>
          <th><span>Дата</span></th>
          <th><span>Способ оплаты</span></th>
          <th><span>Статус</span></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="i in 5" :key="i" class="pay-row">
          <td>
            <div class="pay-row__title">Сумма</div>
            <div class="pay-row__desc">₽1.800</div>
          </td>
          <td>
            <div class="pay-row__title">Дата</div>
            <div class="pay-row__desc">Апрель 9, 2022</div>
          </td>
          <td>
            <div class="pay-row__title">Способ оплаты</div>
            <div class="pay-row__desc">Payoneer</div>
          </td>
          <td>
            <div class="pay-row__title">Статус</div>
            <div class="pay-row__badges">
              <div class="m-badge">
                <span>Успешно</span>
              </div>
            </div>
          </td>
        </tr>

        <tr class="pay-row">
          <td>
            <div class="pay-row__title">Сумма</div>
            <div class="pay-row__desc">₽1.800</div>
          </td>
          <td>
            <div class="pay-row__title">Дата</div>
            <div class="pay-row__desc">Апрель 9, 2022</div>
          </td>
          <td>
            <div class="pay-row__title">Способ оплаты</div>
            <div class="pay-row__desc">Payoneer</div>
          </td>
          <td>
            <div class="pay-row__title">Статус</div>
            <div class="pay-row__badges">
              <div class="m-badge _yellow">
                <span>В процессе</span>
              </div>
            </div>
          </td>
        </tr>

        <tr class="pay-row">
          <td>
            <div class="pay-row__title">Сумма</div>
            <div class="pay-row__desc">₽1.800</div>
          </td>
          <td>
            <div class="pay-row__title">Дата</div>
            <div class="pay-row__desc">Апрель 9, 2022</div>
          </td>
          <td>
            <div class="pay-row__title">Способ оплаты</div>
            <div class="pay-row__desc">Paypal</div>
          </td>
          <td>
            <div class="pay-row__title">Статус</div>
            <div class="pay-row__badges">
              <div class="m-badge _red">
                <span>Отменааааа</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <UIVPagination
      v-model="currentPage"
      :items-per-page="5"
      :total-items="25"
      :total-pages="5"
    />
  </div>

  <form action="" class="pay-form">
    <div class="pay-form__top">
      <div class="text17 medium-text">Платежные способы</div>
    </div>
    <div class="pay-form__items">
      <fieldset class="fg">
        <label>Выберите способ оплаты</label>
        <div class="m-select">
          <input class="m-select__field" type="hidden" />
          <div class="m-select__toggle">
            <span class="m-select__current"> Популярности </span>
            <svg
              width="9"
              height="6"
              viewBox="0 0 9 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.07671 5.33928L8.86404 1.55188C8.9517 1.46428 9 1.34735 9 1.22266C9 1.09798 8.9517 0.981043 8.86404 0.893445L8.58519 0.614529C8.40349 0.433037 8.10818 0.433037 7.92675 0.614529L4.74638 3.7949L1.56248 0.611C1.47482 0.523402 1.35795 0.475036 1.23333 0.475036C1.10858 0.475036 0.991712 0.523402 0.903975 0.611L0.625198 0.889915C0.537531 0.977582 0.489235 1.09445 0.489235 1.21913C0.489235 1.34382 0.537531 1.46075 0.625198 1.54835L4.41599 5.33928C4.50393 5.42709 4.62135 5.47531 4.74617 5.47504C4.87148 5.47531 4.98883 5.42709 5.07671 5.33928Z"
                fill="#041E42"
              />
            </svg>
          </div>
          <div class="m-select__dropdown">
            <div class="m-select__option _active" data-value="USDT">
              <span>USDT</span>
            </div>
            <div class="m-select__option" data-value="Paypal">
              <span>Paypal</span>
            </div>
            <div class="m-select__option" data-value="Paypal">
              <span>Paypal</span>
            </div>
          </div>
        </div>
      </fieldset>
      <div class="pay-way">
        <div class="pay-way__title text17 medium-text">Способ платежа</div>
        <div class="pay-way__wrap">
          <div class="pay-way__items">
            <div class="pay-way__item">
              <input type="radio" checked name="payWay" />
              <label><span>USDT</span></label>
            </div>
            <div class="pay-way__item">
              <input type="radio" name="payWay" />
              <label><span>Банковский перевод</span></label>
            </div>
            <div class="pay-way__item">
              <input type="radio" name="payWay" />
              <label><span>Payoneer</span></label>
            </div>
          </div>
        </div>
      </div>
      <fieldset class="pay-form__address fg">
        <label>Адрес для выплат (USDT TRC-20)</label>
        <input type="text" />
      </fieldset>
    </div>
    <div class="pay-form__nav">
      <button class="pay-form__btn m-btn m-btn-blue m-btn-shadow">
        <span>Сохранить</span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
const currentPage = ref(1);
definePageMeta({
  layout: 'profile',
  middleware: 'authenticated',
});
</script>

<style scoped></style>
