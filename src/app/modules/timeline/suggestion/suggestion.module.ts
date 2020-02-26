import { NgModule } from '@angular/core';
import { SuggestionComponent } from './suggestion.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TagComponent } from './tag/tag.component';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    SuggestionComponent,
    TagComponent
  ],
  imports: [
    CommonModule,
    MatTooltipModule,
    MatChipsModule
  ],
  exports: [SuggestionComponent]
})
export class SuggestionModule { }
