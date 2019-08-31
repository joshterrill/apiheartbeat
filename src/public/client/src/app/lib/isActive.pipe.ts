import { Pipe, PipeTransform } from '@angular/core';
import { Endpoint } from '../app.interfaces';

@Pipe({ name: 'isActive' })
export class IsActivePipe implements PipeTransform {
  transform(endpoints: Endpoint[], isActive: boolean): Endpoint[] {
    return endpoints.filter(endpoint => endpoint.isActive === isActive);
  }
}
