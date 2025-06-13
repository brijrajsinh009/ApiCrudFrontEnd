import { C } from '@angular/cdk/keycodes';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customPipe'
})
export class CustomPipePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.toLowerCase().replace("a","Z");
  }

}
