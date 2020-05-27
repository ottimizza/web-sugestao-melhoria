import { Component } from '@angular/core';
import { ActionButton } from '@shared/components/action-buttons/action-buttons.component';
import { MatDialog } from '@angular/material';
import { OutflowModalComponent } from '@modules/timeline/outflow-modal/outflow-modal.component';

@Component({
  templateUrl: './outflow.component.html',
  styleUrls: ['./outflow.component.scss']
})
export class OutflowComponent {


  button: ActionButton[] = [
    {
      id: 'outflow',
      icon: 'fal fa-frown',
      label: 'Tenho um desabafo!',
    }
  ];

  constructor(
    public dialog: MatDialog
  ) {}

  openDialog() {
    const dialogRef = this.dialog.open(OutflowModalComponent, {
      width: '94vw'
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

}
