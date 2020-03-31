import { NgModule } from '@angular/core';
import { SuggestionModalComponent } from './suggestion-modal.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmoteEvaluationModule } from '@shared/components/emote-evaluation/emote-evaluation.module';

@NgModule({
  declarations: [SuggestionModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    EmoteEvaluationModule
  ],
  exports: [SuggestionModalComponent]
})
export class SuggestionModalModule { }
