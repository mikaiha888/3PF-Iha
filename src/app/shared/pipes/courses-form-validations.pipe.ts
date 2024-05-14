import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'coursesFormValidations',
})
export class CoursesFormValidationsPipe implements PipeTransform {
  transform(value?: ValidationErrors | null, ...args: string[]): unknown {
    if (!value) return '';

    let error = '';

    if (value['required']) error = 'Este campo es requerido';

    switch (args[0]) {
      case 'courseName':
        if (value['maxlength'])
          error = 'El campo no puede tener más de 50 caracteres';
        break;

      case 'description':
        if (value['minlength'])
          error = 'El campo no puede tener más de 50 caracteres';
        break;

      default:
        break;
    }

    return error;
  }
}
