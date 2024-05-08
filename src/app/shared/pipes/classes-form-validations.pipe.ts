import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'classesFormValidations',
})
export class ClassesFormValidationsPipe implements PipeTransform {
  transform(value?: ValidationErrors | null, ...args: string[]): unknown {
    if (!value) return '';

    let error = '';

    if (value['required']) error = 'Este campo es requerido';

    switch (args[0]) {
      case 'time':
        if (value['pattern']) error = 'Horario de clase inválido';
        break;

      case 'date':
        if (value['pattern']) error = 'Fecha de clase inválida';
        break;

      default:
        break;
    }

    return error;
  }
}
