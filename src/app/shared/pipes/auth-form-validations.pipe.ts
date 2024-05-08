import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authFormValidations'
})
export class AuthFormValidationsPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
