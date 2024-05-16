import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adminsFormValidations'
})
export class AdminsFormValidationsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
