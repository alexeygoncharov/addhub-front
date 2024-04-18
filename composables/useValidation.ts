import { defineRule, configure } from 'vee-validate';
import {
  required,
  min,
  email,
  alpha,
  // eslint-disable-next-line camelcase
  alpha_dash,
  confirmed,
} from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import ru from '@vee-validate/i18n/dist/locale/ru.json';

async function validateEmail(value: string) {
  if (email(value)) {
    const { data, error } = await apiFetch('/api/auth/check_email', {
      options: {
        body: { email: value },
        method: 'POST',
      },
    });
    return !!data.value || 'Пользователь с таким email уже существует';
  }
  return false;
}
async function validateUsername(value: string) {
  if (alpha_dash(value, ['']) || !value) {
    const { data, error } = await apiFetch('/api/auth/check_username', {
      options: {
        body: { user_name: value },
        method: 'POST',
      },
    });
    return !!data.value || 'Пользователь с таким логином уже существует';
  }
  return false;
}
export function useValidation() {
  // Регистрация правил
  defineRule('required', required);
  defineRule('min', min);
  defineRule('alpha', alpha);
  defineRule('alpha_dash', alpha_dash);
  defineRule('confirmed', confirmed);
  defineRule('emailFetch', validateEmail);
  defineRule('username', validateUsername);
  defineRule('email', email);

  // Настройка локализации
  configure({
    generateMessage: localize({
      ru,
    }),
  });

  setLocale('ru');
}
