import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'numberOfTimesPipe'})
export class NumberOfTimesPipe implements PipeTransform {
  transform(value: number): string {
    if (value <= 1000) {
      return `${value}`;
    }
    const subToken: number = `${value}`.length - 3;
    const numberVal: string = `${value}`.substr(0, subToken);
    return `${numberVal}k+`;
  }
}