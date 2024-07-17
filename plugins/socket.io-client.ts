import { io } from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
  const authToken = useCookie('authToken');

  const socketOptions = {
    multiplex: false,
    autoConnect: false,
    transports: ['polling'],
    auth: {},
  };

  if (authToken.value) {
    socketOptions.auth.authorization = `Bearer ${authToken.value}`;
  }

  const socket = io('https://hub.rdcd.ru', socketOptions);

  socket.on('connect_error', (err) => {
    console.log(err.message);
  });

  const updateAuthToken = (newToken: string) => {
    if (newToken) {
      socketOptions.auth.authorization = `Bearer ${newToken}`;
    } else {
      delete socketOptions.auth.authorization;
    }
  };
  return {
    provide: {
      socket,
      updateAuthToken,
    },
  };
});
