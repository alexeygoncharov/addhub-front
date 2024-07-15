import { io } from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
  const authToken = useCookie('authToken');

  const socketOptions = {
    multiplex: false,
    autoConnect: false,
    transports: ['websocket'],
    extraHeaders: {},
  };

  if (authToken.value) {
    socketOptions.extraHeaders.Authorization = `Bearer ${authToken.value}`;
  }

  const socket = io('https://hub.rdcd.ru', socketOptions);

  socket.on('connect_error', (err) => {
    console.log(err.message);
  });

  const updateAuthToken = (newToken: string) => {
    if (newToken) {
      socketOptions.extraHeaders.Authorization = `Bearer ${newToken}`;
    } else {
      delete socketOptions.extraHeaders.Authorization;
    }
  };
  return {
    provide: {
      socket,
      updateAuthToken,
    },
  };
});
