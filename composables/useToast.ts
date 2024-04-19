import { createApp } from 'vue';
import ToastComponent from '~/components/UI/VToast.vue';
export default function ({
  message,
  type = 'info',
  timeout = 1000,
}: {
  message: string;
  type?: 'info' | 'error' | 'success';
  timeout?: number;
}) {
  const toastApp = createApp(ToastComponent, {
    message,
    type,
    timeout,
    onClose: () => {
      toastApp.unmount();
      document.body.removeChild(mountPoint);
    },
  });
  const mountPoint = document.createElement('div');
  document.body.appendChild(mountPoint);
  toastApp.mount(mountPoint);
}
