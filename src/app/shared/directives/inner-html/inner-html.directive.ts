import { Directive, HostListener, Output, EventEmitter, ElementRef, Input, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appInnerHtml]'
})
export class InnerHTMLDirective implements AfterViewInit {

  @Input()
  public content = '';

  constructor(
    private el: ElementRef<HTMLDivElement>
  ) {}

  ngAfterViewInit(): void {
    this.el.nativeElement.innerHTML = this.content;
  }

}
