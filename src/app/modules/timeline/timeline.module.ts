import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { LikeModalComponent } from './like-modal/like-modal.component';
import { SuggestionModule } from './suggestion/suggestion.module';
import { LikeModalModule } from './like-modal/like-modal.module';
import { TimelineComponent } from './timeline.component';

@NgModule({
  declarations: [
    TimelineComponent,
  ],
  imports: [
    MatTooltipModule,
    MatDialogModule,
    CommonModule,
    ComplexSearchModule,
    SuggestionModule,
    LikeModalModule
  ],
  entryComponents: [LikeModalComponent],
  exports: [TimelineComponent]
})
export class TimelineModule { }
