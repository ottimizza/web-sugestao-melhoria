import { NgModule } from '@angular/core';
import { InnerHTMLDirective } from './inner-html.directive';

@NgModule({
  declarations: [InnerHTMLDirective],
  exports: [InnerHTMLDirective]
})
export class InnerHTMLModule { }
