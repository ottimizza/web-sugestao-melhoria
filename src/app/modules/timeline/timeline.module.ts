import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';

import { ComplexSearchModule } from '@shared/components/search/complex-search.module';
import { OutflowModalComponent } from './outflow-modal/outflow-modal.component';
import { OutflowModalModule } from './outflow-modal/outflow-modal.module';
import { SuggestionModule } from './suggestion/suggestion.module';
import { LikeModalModule } from './like-modal/like-modal.module';
import { TimelineComponent } from './timeline.component';
import { SuggestionModalModule } from './suggestion-modal/suggestion-modal.module';
import { SuggestionModalComponent } from './suggestion-modal/suggestion-modal.component';
import { BreadcrumbModule } from '@shared/components/breadcrumb/breadcrumb.module';
import { ActionButtonsModule } from '@shared/components/action-buttons/action-buttons.module';
import { LikeModalComponent } from './like-modal/like-modal.component';
import { MatChipsModule, MatIconModule } from '@angular/material';

@NgModule({
  declarations: [
    TimelineComponent,
  ],
  imports: [
    MatTooltipModule,
    MatDialogModule,
    MatChipsModule,
    MatIconModule,
    CommonModule,
    ComplexSearchModule,
    SuggestionModule,
    LikeModalModule,
    OutflowModalModule,
    SuggestionModalModule,
    BreadcrumbModule,
    ActionButtonsModule
  ],
  entryComponents: [
    LikeModalComponent,
    OutflowModalComponent,
    SuggestionModalComponent
  ],
  exports: [TimelineComponent]
})
export class TimelineModule { }
