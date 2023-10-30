import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[autofocus]',
  standalone: true,
})
export class AutofocusDirective implements OnInit {
  constructor(private readonly el: ElementRef<HTMLInputElement>) {}

  ngOnInit(): void {
    this.el.nativeElement.focus();
  }
}
