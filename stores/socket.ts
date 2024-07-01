// store/socketStore.ts
import { defineStore } from 'pinia';
import { io, Socket } from 'socket.io-client';

interface SocketState {
  socket: Socket | null;
}

export const useSocketStore = defineStore('useSocketStore', {
  state: (): SocketState => ({
    socket: null,
  }),
  actions: {
    initializeSocket(authToken: string) {
      const socketOptions = {
        multiplex: false,
        autoConnect: false,
        transports: ['polling'],
        extraHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      this.socket = io('https://hub.rdcd.ru', socketOptions);

      this.socket.on('connect_error', (err) => {
        console.log(err.message);
        console.log(err.description);
        console.log(err.context);
      });
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSocketStore, import.meta.hot));
}
