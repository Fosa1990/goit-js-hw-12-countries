import { error, info } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

export function onNoCountry() {
  info({
    title: 'Помилка! Σ(‘◉⌓◉’)',
    text: 'Введіть коректно запит ...(Ukraine)',
    delay: 2000,
    closerHover: true,
    mouseReset: true,
    shadow: true,
  });
}

export function onOutputInfo() {
  error({
    title: 'Такої країни не існує Σ(‘◉⌓◉’)',
    text: 'Зробіть новий повторний пошук ...(USA)',
    delay: 2000,
    closerHover: true,
    mouseReset: true,
    shadow: true,
  });
}
export function onError() {
  alert('Дані для пошуку країни відсутні ... (；☉_☉)');
}
