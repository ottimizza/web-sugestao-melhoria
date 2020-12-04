import { NgModule } from '@angular/core';
import { SuggestionModalComponent } from './suggestion-modal.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
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
