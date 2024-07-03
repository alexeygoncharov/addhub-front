import { io } from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
  const authToken = useCookie('authToken');

  const socketOptions = {
    multiplex: false,
    autoConnect: false,
    transports: ['polling'],
    extraHeaders: {
      Authorization: `Bearer ${authToken.value}`,
    },
  };

  const socket = io('https://hub.rdcd.ru', socketOptions);

  socket.on('connect_error', (err) => {
    console.log(err.message);
    // console.log(err.description);
    // console.log(err.context);
  });

  // Метод для обновления токена
  const updateAuthToken = (newToken: string) => {
    socketOptions.extraHeaders.Authorization = `Bearer ${newToken}`;
    // Можно добавить дополнительную логику, если необходимо
  };
  return {
    provide: {
      socket,
      updateAuthToken,
    },
  };
  // Делаем сокет и метод обновления токена доступными во всем приложении
});
