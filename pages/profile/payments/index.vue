<template>
  <div class="admin-top">
    <div class="text32 medium-text">Выплаты</div>

    <button class="admin-top__btn m-btn m-btn-blue m-btn-shadow">
      <span>Запросить выплату</span>
    </button>
  </div>

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
                <span>Отмена</span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <a href="" class="pagination__btn _prev">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3.8186 8.00232L10.1784 14.3445C10.3868 14.5522 10.7241 14.5518 10.9321 14.3434C11.14 14.1351 11.1395 13.7975 10.9311 13.5897L4.94983 7.62498L10.9313 1.6603C11.1396 1.45244 11.1402 1.11511 10.9324 0.906712C10.8281 0.802244 10.6915 0.75001 10.5548 0.75001C10.4186 0.75001 10.2825 0.801895 10.1784 0.905638L3.8186 7.24766C3.71824 7.34751 3.66193 7.4834 3.66193 7.62498C3.66193 7.76656 3.71841 7.90229 3.8186 8.00232Z"
            fill="#222222"
          />
        </svg>
      </a>

      <a href="" class="pagination__item">1</a>
      <a href="" class="pagination__item _active">2</a>
      <a href="" class="pagination__item">3</a>
      <a href="" class="pagination__item _hide-mob">4</a>
      <a href="" class="pagination__item _hide-tablet">5</a>
      <a href="" class="pagination__item">...</a>
      <a href="" class="pagination__item">20</a>

      <a href="" class="pagination__btn _next">
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.1813 7.24768L4.82149 0.90549C4.61312 0.697817 4.27576 0.698166 4.06774 0.906564C3.85988 1.11493 3.86042 1.45248 4.06882 1.66031L10.05 7.62502L4.0686 13.5897C3.86023 13.7976 3.85969 14.1349 4.06753 14.3433C4.17181 14.4478 4.30842 14.5 4.44503 14.5C4.5813 14.5 4.71737 14.4481 4.82147 14.3444L11.1813 8.00234C11.2816 7.90249 11.338 7.7666 11.338 7.62502C11.338 7.48344 11.2815 7.34771 11.1813 7.24768Z"
            fill="#222222"
          />
        </svg>
      </a>
    </div>

    <div class="pagination__text">
      <div class="text14">1 – 20 of 300+ публикаций доступно</div>
    </div>
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
definePageMeta({
  layout: 'profile',
});
</script>

<style scoped></style>
