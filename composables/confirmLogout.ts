export const confirmLogout = ref(false);
export const openConfirmLogout = () => {
  confirmLogout.value = true;
};

export const closeConfirmLogout = () => {
  confirmLogout.value = false;
};
