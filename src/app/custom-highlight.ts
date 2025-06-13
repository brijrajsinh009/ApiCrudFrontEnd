import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCustomHighlight]'
})
export class CustomHighlight {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'backgroundColor', 'yellow');
  }

}
