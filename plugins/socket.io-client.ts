import { io } from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
  const authToken = useCookie('authToken');

  const socketOptions = {
    multiplex: false,
    autoConnect: false,
    transports: ['websocket'],
    auth: {},
  };

  if (authToken.value) {
    socketOptions.auth.token = authToken.value;
  }

  const socket = io('wss://hub.rdcd.ru', socketOptions);

  socket.on('connect_error', (err) => {
    console.log(err.message);
  });

  const updateAuthToken = (newToken: string) => {
    if (newToken) {
      socketOptions.auth.token = `Bearer ${newToken}`;
    } else {
      delete socketOptions.auth.token;
    }
  };
  return {
    provide: {
      socket,
      updateAuthToken,
    },
  };
});
