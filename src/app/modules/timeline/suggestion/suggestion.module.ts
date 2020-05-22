import { NgModule } from '@angular/core';
import { SuggestionComponent } from './suggestion.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TagComponent } from './tag/tag.component';
import { MatChipsModule } from '@angular/material/chips';
import { ScrollTrackerModule } from '@shared/directives/scroll-tracker/scroll-tracker.module';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    SuggestionComponent,
    TagComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatChipsModule,
    ScrollTrackerModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule
  ],
  exports: [SuggestionComponent]
})
export class SuggestionModule { }
