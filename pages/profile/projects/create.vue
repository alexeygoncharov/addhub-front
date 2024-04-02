<template>
  <div class="admin-top">
    <div class="text32 medium-text">Новый проект</div>
  </div>

  <div class="profile-item">
    <div class="profile-item__bottom _pt0">
      <div class="profile-item__grid">
        <fieldset class="fg _full">
          <label>Заголовок проекта</label>
          <input type="text" placeholder="Заголовок" />
        </fieldset>
        <fieldset class="fg _full">
          <label>
            <label>Описание</label>
          </label>
          <textarea placeholder="Текст описания"></textarea>
        </fieldset>
        <fieldset class="fg _full">
          <label>Заголовок проекта</label>
          <input type="text" placeholder="Заголовок" />
        </fieldset>
        <fieldset class="fg">
          <label>Категория</label>
          <div class="m-select" data-placeholder="Выбрать">
            <input class="m-select__field" type="hidden" />
            <div class="m-select__toggle">
              <span class="m-select__current"></span>
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
              <div class="m-select__option" data-value="Категория 1">
                <span>Категория 1</span>
              </div>
              <div class="m-select__option" data-value="Категория 2">
                <span>Категория 2</span>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset class="fg">
          <label>Подкатегория</label>
          <div class="m-select" data-placeholder="Выбрать">
            <input class="m-select__field" type="hidden" />
            <div class="m-select__toggle">
              <span class="m-select__current"></span>
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
              <div class="m-select__option" data-value="Подкатегория 1">
                <span>Подкатегория 1</span>
              </div>
              <div class="m-select__option" data-value="Подкатегория 2">
                <span>Подкатегория 2</span>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset class="fg">
          <label>Срок</label>
          <div class="m-select" data-placeholder="Выбрать">
            <input class="m-select__field" type="hidden" />
            <div class="m-select__toggle">
              <span class="m-select__current"></span>
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
              <div class="m-select__option" data-value="Срок 1">
                <span>Срок 1</span>
              </div>
              <div class="m-select__option" data-value="Срок 2">
                <span>Срок 2</span>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset class="fg">
          <label>Цена</label>
          <input type="text" placeholder="₽" />
        </fieldset>
        <fieldset class="fg">
          <label>Страна</label>
          <div class="m-select" data-placeholder="Выбрать">
            <input class="m-select__field" type="hidden" />
            <div class="m-select__toggle">
              <span class="m-select__current"></span>
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
              <div class="m-select__option" data-value="Страна 1">
                <span>Страна 1</span>
              </div>
              <div class="m-select__option" data-value="Страна 2">
                <span>Страна 2</span>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset class="fg">
          <label>Уровень</label>
          <div class="m-select" data-placeholder="Выбрать">
            <input class="m-select__field" type="hidden" />
            <div class="m-select__toggle">
              <span class="m-select__current"></span>
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
              <div class="m-select__option" data-value="Уровень 1">
                <span>Уровень 1</span>
              </div>
              <div class="m-select__option" data-value="Уровень 2">
                <span>Уровень 2</span>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset class="fg">
          <label>Языки</label>
          <div class="m-select _multi-select">
            <input class="m-select__field" type="hidden" />
            <div class="m-select__toggle">
              <span class="m-select__current"></span>
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
              <div class="m-check">
                <input
                  checked
                  type="checkbox"
                  data-id="1"
                  data-value="Английский"
                />
                <label><span>Английский</span></label>
              </div>
              <div class="m-check">
                <input type="checkbox" data-id="2" data-value="Русский" />
                <label><span>Русский</span></label>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset class="fg">
          <label>Уровень языка</label>
          <div class="m-select" data-placeholder="Выбрать">
            <input class="m-select__field" type="hidden" />
            <div class="m-select__toggle">
              <span class="m-select__current"></span>
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
              <div class="m-select__option" data-value="Уровень 1">
                <span>Уровень 1</span>
              </div>
              <div class="m-select__option" data-value="Уровень 2">
                <span>Уровень 2</span>
              </div>
            </div>
          </div>
        </fieldset>

        <fieldset class="fg">
          <label>Город</label>
          <div class="m-select" data-placeholder="Выбрать">
            <input class="m-select__field" type="hidden" />
            <div class="m-select__toggle">
              <span class="m-select__current"></span>
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
              <div class="m-select__option" data-value="Город 1">
                <span>Город 1</span>
              </div>
              <div class="m-select__option" data-value="Город 2">
                <span>Город 2</span>
              </div>
            </div>
          </div>
        </fieldset>
      </div>

      <div class="profile-item__nav">
        <button class="profile-item__btn m-btn m-btn-blue m-btn-shadow">
          <span>Сохранить</span>
        </button>
      </div>
    </div>
  </div>

  <div class="profile-item">
    <div class="profile-item__top">
      <div class="text17 medium-text">Загрузить файлы</div>
    </div>
    <div class="profile-item__bottom">
      <div class="project-files">
        <div class="project-files__items">
          <div class="file-item">
            <div class="file-item__title">Техническое_задание_для</div>
            <div class="file-item__format">PDF</div>
          </div>
          <div class="file-item">
            <div class="file-item__title">logotype_photoshop_color</div>
            <div class="file-item__format">JPG</div>
          </div>
          <div class="file-input">
            <input type="file" />
            <div class="file-input__wrap">
              <div class="file-input__title">Загрузить файлы</div>
            </div>
          </div>
        </div>
        <div class="project-files__hint">
          <div class="text15">Максимальный размер: 10 мб</div>
        </div>
      </div>

      <div class="profile-item__nav">
        <button class="profile-item__btn m-btn m-btn-blue m-btn-shadow">
          <span>Опубликовать</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin',
});
</script>

<style scoped lang="scss"></style>
