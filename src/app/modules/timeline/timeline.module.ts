import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { TimelineComponent } from './timeline.component';
import { SuggestionModule } from './suggestion/suggestion.module';

@NgModule({
  declarations: [TimelineComponent],
  imports: [
    CommonModule,
    ComplexSearchModule,
    SuggestionModule
  ],
  exports: [TimelineComponent]
})
export class TimelineModule { }
