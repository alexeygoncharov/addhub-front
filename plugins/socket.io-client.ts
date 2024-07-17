import { io } from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
  const authToken = useCookie('authToken');

  const socketOptions = {
    multiplex: false,
    autoConnect: false,
    transports: ['websocket'],
    auth: {},
    path: '/socket.io', // Убедитесь, что путь правильный
  };

  if (authToken.value) {
    socketOptions.auth.authorization = `Bearer ${authToken.value}`;
  }

  const socket = io('https://hub.rdcd.ru', socketOptions);

  socket.on('connect_error', (err) => {
    console.log(err);
  });

  socket.on("error", (error) => {
    console.log('oshibka ', error);
  });

  socket.on("ping", (data) => {
    console.log('ssss ', data);
  })

  const updateAuthToken = (newToken: string) => {
    if (newToken) {
      socketOptions.auth.authorization = `Bearer ${newToken}`;
    } else {
      delete socketOptions.auth.authorization;
    }
    // Переподключение сокета с новым токеном
    socket.auth = socketOptions.auth;
    if (socket.connected) {
      socket.disconnect();
      socket.connect();
    }
  };

  return {
    provide: {
      socket,
      updateAuthToken,
    },
  };
});
