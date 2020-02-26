import { NgModule } from '@angular/core';
import { SuggestionComponent } from './suggestion.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [SuggestionComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [SuggestionComponent]
})
export class SuggestionModule { }
