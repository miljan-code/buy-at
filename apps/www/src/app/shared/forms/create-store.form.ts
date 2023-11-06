import { FormGroup, FormControl, Validators } from '@angular/forms';

interface CreateStoreForm {
  storeName: FormControl<string>;
  coverImage: FormControl<string>;
}

export const createStoreForm = new FormGroup<CreateStoreForm>({
  storeName: new FormControl('', {
    validators: [Validators.required, Validators.minLength(4)],
    nonNullable: true,
  }),
  coverImage: new FormControl('', {
    nonNullable: true,
  }),
});
