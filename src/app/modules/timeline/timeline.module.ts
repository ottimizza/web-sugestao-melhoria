import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { LikeModalComponent } from './like-modal/like-modal.component';
import { SuggestionModule } from './suggestion/suggestion.module';
import { LikeModalModule } from './like-modal/like-modal.module';
import { TimelineComponent } from './timeline.component';
import { OutflowModalModule } from './outflow-modal/outflow-modal.module';
import { OutflowModalComponent } from './outflow-modal/outflow-modal.component';

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
    LikeModalModule,
    OutflowModalModule
  ],
  entryComponents: [
    LikeModalComponent,
    OutflowModalComponent
  ],
  exports: [TimelineComponent]
})
export class TimelineModule { }
