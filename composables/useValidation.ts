import { defineRule, configure } from 'vee-validate';
import {
  required,
  min,
  max,
  email,
  alpha,
  regex,
  numeric,
  // eslint-disable-next-line camelcase
  alpha_dash,
  // eslint-disable-next-line camelcase
  alpha_spaces,
  confirmed,
} from '@vee-validate/rules';
import { localize } from '@vee-validate/i18n';
import ru from '@vee-validate/i18n/dist/locale/ru.json';

async function validateEmail(value: string) {
  if (email(value)) {
    const { data, error } = await apiFetch<ApiResponse<null>>(
      '/api/auth/check_email',
      {
        options: {
          body: { email: value },
          method: 'POST',
        },
      },
    );
    return !!data.value || 'Пользователь с таким email уже существует';
  }
  return false;
}

function validatePhone(value: string) {
  const regex =
    /^\+7\s*\(\d{3}\)\s*\d{3}-\d{2}-\d{2}$|^\+7\s*\(\d{4}\)\s*\d{2}-\d{2}-\d{2}$/;
  return regex.test(value);
}

async function validateUsername(value: string) {
  if (alpha_dash(value, ['']) || !value) {
    const { data, error } = await apiFetch<ApiResponse<null>>(
      '/api/auth/check_username',
      {
        options: {
          body: { user_name: value },
          method: 'POST',
        },
      },
    );
    return !!data.value || 'Пользователь с таким логином уже существует';
  }
  return false;
}
export function useValidation() {
  // Регистрация правил
  defineRule('required', required);
  defineRule('min', min);
  defineRule('max', max);
  defineRule('alpha', alpha);
  defineRule('numeric', numeric);
  defineRule('phone', validatePhone);
  defineRule('alpha_dash', alpha_dash);
  defineRule('alpha_spaces', alpha_spaces);
  defineRule('confirmed', confirmed);
  defineRule('emailFetch', validateEmail);
  defineRule('username', validateUsername);
  defineRule('email', email);

  defineRule('captcha', (value: string) => {
    if (!value) {
      return 'Пожалуйста, подтвердите, что вы не робот.';
    }
    return true;
  });
  defineRule('role', (value: string) => {
    if (!value) {
      return 'Пожалуйста, выберите роль.';
    }
    return true;
  });

  // Настройка локализации
  localize({ ru });

  configure({
    generateMessage: localize('ru', {
      names: {
        username: 'логин',
        name: 'имя',
        surname: 'фамилия',
        email: 'email адрес',
        password: 'пароль',
        repeatPassword: 'повторите пароль',
        phone_number: 'номер телефона',
        title: 'заголовок'
      },
    }),
  });
}
