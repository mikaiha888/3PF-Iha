import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'displayFullname',
})
export class DisplayFullnamePipe implements PipeTransform {
  transform(value: (string | undefined)[], ...args: unknown[]): unknown {
    return value && `${value[0]} ${value[1]}`;
  }
}