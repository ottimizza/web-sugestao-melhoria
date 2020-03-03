import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { LikeModalComponent } from './like-modal.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [LikeModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [LikeModalComponent]
})
export class LikeModalModule { }
