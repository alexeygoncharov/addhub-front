export const progress = ref(0);

let loaderTimer: ReturnType<typeof setInterval>;

export const startLoading = () => {
  if (!process.client) return;
  let elapsed = 0;
  stopLoading();

  loaderTimer = setInterval(() => {
    elapsed += 500; // Увеличиваем значение elapsed на интервал времени
    progress.value =
      (2 / Math.PI) * 100 * Math.atan(((elapsed / 2000) * 100) / 50);
  }, 500);
};

export const stopLoading = () => {
  clearInterval(loaderTimer);
  progress.value = 100;
  setTimeout(() => {
    progress.value = 0;
  }, 1000);
};
