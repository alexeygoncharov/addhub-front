interface itemForm {
  title: string;
  description: string;
  price: string;
  city: {
    _id: string;
    title: string;
  };
  country: {
    _id: string;
    title: string;
  };
  category: string;
  service_volume_desc: string;
  service_volume: string;
  delivery_time: string;
}

export const validateItem = (form: itemForm, errors: Ref<string[]>) => {
  errors.value = [];
  if (!form.city) {
    errors.value.push('city');
  }
  if (!form.country) {
    errors.value.push('country');
  }
  if (!form.category) {
    errors.value.push('category');
  }
};
