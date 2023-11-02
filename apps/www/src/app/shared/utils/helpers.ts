import { FormGroup } from '@angular/forms';

export const hydrateFormFields = <T>(forms: FormGroup[], obj: T) => {
  forms.forEach((form) => {
    const { controls } = form;
    Object.keys(controls).forEach((key) => {
      controls[key as keyof typeof controls].setValue(
        obj[key as keyof typeof obj] || '',
      );
    });
  });
};
