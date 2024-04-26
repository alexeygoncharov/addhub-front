import { io, Socket } from 'socket.io-client';

export default defineNuxtPlugin((nuxtApp) => {
  const authToken = useCookie('authToken');
  const socket = io('https://hub.rdcd.ru', {
    extraHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
    transports: ['polling'],
  });
  const isConnected = ref(false);
  const transport = ref('N/A');
  function onConnect() {
    isConnected.value = true;
    transport.value = socket.io.engine.transport.name;
    socket.io.engine.on('upgrade', (rawTransport) => {
      transport.value = rawTransport.name;
    });
  }

  function onDisconnect() {
    isConnected.value = false;
    transport.value = 'N/A';
  }

  socket.once('connect', onConnect);
  socket.on('disconnect', onDisconnect);
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
