import { Pipe, PipeTransform } from '@angular/core';
import { siteConfig } from '~config/site';

@Pipe({
  name: 'linkify',
  standalone: true,
})
export class LinkifyPipe implements PipeTransform {
  transform(value: string) {
    let protocol,
      domain = '';
    if (siteConfig.environment === 'development') {
      protocol = 'http://';
      domain = 'localhost:4200';
    } else {
      protocol = 'https://';
      domain = '';
    }
    return `${protocol}${value}.${domain}`;
  }
}
