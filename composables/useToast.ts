import { createApp } from 'vue';
import ToastComponent from '~/components/UI/VToast.vue';
export default function ({
  message,
  type = 'info',
  timeout = 5000,
}: {
  message: string;
  type?: string;
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
