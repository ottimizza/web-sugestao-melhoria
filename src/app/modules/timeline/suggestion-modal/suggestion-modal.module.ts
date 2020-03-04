import { NgModule } from '@angular/core';
import { SuggestionModalComponent } from './suggestion-modal.component';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SuggestionModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: [SuggestionModalComponent]
})
export class SuggestionModalModule { }
