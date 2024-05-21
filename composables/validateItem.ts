interface BaseForm {
  title: string;
  description: string;
  price: string;
  city: string;
  country: string;
  category: string;
  service_volume_desc: string;
  service_volume: string;
  delivery_time: string;
}

// Расширяем интерфейс для типа 'project'
interface ProjectForm extends BaseForm {
  files: uploadFileResponse[];
}

// Расширяем интерфейс для типа 'photo'
interface PhotoForm extends BaseForm {
  photos: uploadFileResponse[];
}

// Определяем объединенный тип формы
export type ItemForm = ProjectForm | PhotoForm;

export const validateItem = (form: ItemForm, errors: Ref<string[]>) => {
  errors.value = [];
  if (!form.city) {
    errors.value.push('city');
  }
  if ('photos' in form && !form.photos.length) {
    errors.value.push('photos');
  }
  if (!form.country) {
    errors.value.push('country');
  }
  if (!form.category) {
    errors.value.push('category');
  }
};
