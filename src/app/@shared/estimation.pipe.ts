import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'estimation'
})
export class EstimationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (!value) value = 0;

    let minutes = value as number;

    if (minutes < 60) {
      return `${minutes}m`
    } else {
      let hours = minutes / 60;
      return `${hours}h`
    }
  }

}
