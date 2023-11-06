import { FormControl, FormGroup, Validators } from '@angular/forms';

interface CustomizationForm {
  name: FormControl<string>;
  logo: FormControl<string>;
  favicon: FormControl<string>;
  coverImage: FormControl<string>;
  slug: FormControl<string>;
}

export const customizationForm = new FormGroup<CustomizationForm>({
  name: new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  }),
  coverImage: new FormControl('', { nonNullable: true }),
  logo: new FormControl('', { nonNullable: true }),
  favicon: new FormControl('', { nonNullable: true }),
  slug: new FormControl('', {
    validators: [Validators.required],
    nonNullable: true,
  }),
});
