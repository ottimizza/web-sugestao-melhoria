import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { TimelineComponent } from './timeline.component';
import { SuggestionModule } from './suggestion/suggestion.module';
import { TimelineButtonsComponent } from './timeline-buttons/timeline-buttons.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [
    TimelineComponent,
    TimelineButtonsComponent
  ],
  imports: [
    CommonModule,
    ComplexSearchModule,
    SuggestionModule,
    MatTooltipModule
  ],
  exports: [TimelineComponent]
})
export class TimelineModule { }
