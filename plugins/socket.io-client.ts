import { io } from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
  const authToken = useCookie('authToken');
  const socket = io('https://hub.rdcd.ru', {
    extraHeaders: {
      Authorization: `Bearer ${authToken?.value}`,
    },
    transports: ['polling'],
  });
  socket.on('connect_error', (err) => {
    // the reason of the error, for example "xhr poll error"
    console.log(err.message);

    // some additional description, for example the status code of the initial HTTP response
    console.log(err.description);

    // some additional context, for example the XMLHttpRequest object
    console.log(err.context);
  });
  // Делаем сокет доступным во всем приложении
  nuxtApp.provide('socket', socket);
});
