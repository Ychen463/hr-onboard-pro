import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenUrl'
})
export class ShortenUrlPipe implements PipeTransform {
  transform(value: string, maxLength: number = 20): string {
    if (value.length <= maxLength) {
      return value;
    }
    return value.substr(0, maxLength) + '...';
  }
}
