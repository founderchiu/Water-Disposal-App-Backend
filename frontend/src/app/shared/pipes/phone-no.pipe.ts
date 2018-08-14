import { Pipe, PipeTransform } from '@angular/core';
import { format, ParsedNumber } from 'libphonenumber-js';

@Pipe({
  name: 'phoneNo'
})
export class PhoneNoPipe implements PipeTransform {

  transform(value: ParsedNumber, args?: string): any {
    if (!value) {
      return value;
    }
    return format(value, 'International');
  }

}