export const showFilters = ref(false);
export const showModal = ref(false);
export const showMobileCategory = ref(false);

export const toggleModal = () => {
  showModal.value = !showModal.value;
};

export const openModal = () => {
  showModal.value = true;
};

export const closeModal = () => {
  showModal.value = false;
};
