import { NgModule } from '@angular/core';
import { EmoteEvaluationComponent } from './emote-evaluation.component';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [EmoteEvaluationComponent],
  imports: [
    CommonModule,
    MatTooltipModule
  ],
  exports: [EmoteEvaluationComponent]
})
export class EmoteEvaluationModule { }
