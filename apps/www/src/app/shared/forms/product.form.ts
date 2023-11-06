import { FormGroup, FormControl, Validators } from '@angular/forms';

interface ProductForm {
  name: FormControl<string>;
  description: FormControl<string>;
  price: FormControl<number>;
  category: FormControl<string>;
  quantity: FormControl<number>;
  featured: FormControl<boolean>;
  image: FormControl<string>;
}

export const productForm = new FormGroup<ProductForm>({
  name: new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  }),
  description: new FormControl('', {
    nonNullable: true,
  }),
  price: new FormControl(0, {
    validators: [Validators.required],
    nonNullable: true,
  }),
  category: new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  }),
  quantity: new FormControl(1, {
    nonNullable: true,
  }),
  featured: new FormControl(false, {
    validators: [Validators.required],
    nonNullable: true,
  }),
  image: new FormControl('', {
    nonNullable: true,
  }),
});
