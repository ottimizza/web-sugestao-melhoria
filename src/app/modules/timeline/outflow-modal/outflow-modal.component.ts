import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './outflow-modal.component.html',
  styleUrls: ['./outflow-modal.component.scss']
})
export class OutflowModalComponent {

  outflow = '';

  constructor(
    public dialogRef: MatDialogRef<OutflowModalComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
