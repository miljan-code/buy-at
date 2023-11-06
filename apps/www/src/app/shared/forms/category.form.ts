import { FormControl, FormGroup, Validators } from '@angular/forms';

interface CategoryForm {
  name: FormControl<string>;
  bilboard: FormControl<string>;
}

export const categoryForm = new FormGroup<CategoryForm>({
  name: new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  }),
  bilboard: new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  }),
});
