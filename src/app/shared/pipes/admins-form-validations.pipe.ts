import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'adminsFormValidations',
})
export class AdminsFormValidationsPipe implements PipeTransform {
  transform(value?: ValidationErrors | null, ...args: string[]): unknown {
    if (!value) return '';

    let error = '';

    if (value['required']) error = 'Este campo es requerido';

    switch (args[0]) {
      case 'name':
        if (value['pattern']) error = 'El campo debe contener solo letras';
        if (value['maxlength'])
          error = 'El campo no puede tener más de 32 caracteres';
        break;

      case 'email':
        if (value['pattern'])
          error = 'El formato del correo electrónico es incorrecto.';
        break;

      case 'cel':
        if (value['pattern']) error = 'Número de celular inválido';
        break;

      default:
        break;
    }

    return error;
  }
}
