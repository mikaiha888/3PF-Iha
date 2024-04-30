import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formFieldValidations',
})
export class FormFieldValidationsPipe implements PipeTransform {
  transform(value?: ValidationErrors | null, ...args: string[]): unknown {
    let error = '';
    if (value && args[0] === 'name') {
      if (value['required']) error = 'Este campo es requerido';
      else if (value['pattern']) error = 'El campo debe contener solo letras';
      else if (
        value['maxlength']['actualLength'] >
        value['maxlength']['requiredLength']
      )
        error = 'El campo no puede tener mas de 32 caracteres';
    }
    if (value && args[0] === 'email') {
      if (value['required']) error = 'Este campo es requerido';
      else if (value['pattern'])
        error = 'El formato del correo electrónico es incorrecto.';
    }
    if (value && args[0] === 'cel') {
      if (value['required']) error = 'Este campo es requerido';
      else if (value['pattern'])
        error = 'Número de celular inválido';
    }
    if (value && args[0] === 'course') {
      if (value['required']) error = 'Este campo es requerido';
    }

    return error;
  }
}
