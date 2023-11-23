import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';

interface Attribute {
  name: FormControl<string>;
  options: FormArray<FormControl<string>>;
}

interface CategoryForm {
  name: FormControl<string>;
  bilboard: FormControl<string>;
  attributes: FormArray<FormGroup<Attribute>>;
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
  attributes: new FormArray([
    new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required],
        nonNullable: true,
      }),
      options: new FormArray([
        new FormControl('', {
          validators: Validators.required,
          nonNullable: true,
        }),
      ]),
    }),
  ]),
});
