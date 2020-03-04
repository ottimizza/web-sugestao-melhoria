import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OutflowModalComponent } from './outflow-modal.component';

@NgModule({
  declarations: [OutflowModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ],
  exports: [OutflowModalComponent]
})
export class OutflowModalModule { }
