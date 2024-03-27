import { FormControl, Validators } from '@angular/forms';

export function dpiValidator(control: FormControl) {
    const dpi = control.value;
    const dpiPattern = /^\d{13}$/;

    if (!dpiPattern.test(dpi)) {
        return { invalidDpi: true };
    }

    return null;
}

export function guatemalaPhoneNumberValidator(control: FormControl) {
  const phoneNumber = control.value;
  const phoneNumberPattern = /^([+]502|502)?\d{8}$/;

  if (!phoneNumberPattern.test(phoneNumber)) {
    return { invalidPhoneNumber: true };
  }

  return null;
}
