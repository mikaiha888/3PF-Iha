import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHeaderFontSize]',
})
export class HeaderFontSizeDirective {
  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.fontSize = '1.875rem';
    this.elementRef.nativeElement.style.color = 'black';
  }

  ngAfterViewInit() {
    const firstChild = this.elementRef.nativeElement.children[0];
    if (
      this.elementRef.nativeElement.tagName.toLowerCase() === 'h1' &&
      firstChild instanceof HTMLElement &&
      firstChild.tagName.toLowerCase() === 'span'
    ) {
      firstChild.style.color = 'rgb(55 48 163)';
    }
  }
}