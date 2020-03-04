import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  templateUrl: './outflow-modal.component.html',
  styleUrls: ['./outflow-modal.component.scss']
})
export class OutflowModalComponent {

  outflow = '';
  clazz: string;
  labelError: string;

  constructor(
    public dialogRef: MatDialogRef<OutflowModalComponent>
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.outflow && this.outflow.length) {
      this.dialogRef.close(this.outflow);
    } else {
      this.clazz = 'border-danger';
      this.labelError = 'labelred';
    }
  }

}
