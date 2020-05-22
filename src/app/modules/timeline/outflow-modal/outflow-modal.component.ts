import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { OutflowService } from '@app/http/outflow.service';
import { ToastService } from '@shared/services/toast.service';
import { Outflow } from '@shared/models/Outflow';
import { environment } from '@env';
import { User } from '@shared/models/User';
import { LoggerUtils } from '@shared/utils/logger.utills';

@Component({
  templateUrl: './outflow-modal.component.html',
  styleUrls: ['./outflow-modal.component.scss']
})
export class OutflowModalComponent {

  outflow = '';
  clazz: string;
  labelError: string;

  isPosting: boolean;

  constructor(
    public dialogRef: MatDialogRef<OutflowModalComponent>,
    public outflowService: OutflowService,
    public toastService: ToastService
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.outflow && this.outflow.length && !this.isPosting) {
      this.isPosting = true;
      const currentUser = User.fromLocalStorage();
      const outflow: Outflow = {
        dataRetornoCliente: undefined,
        texto: this.outflow,
        topicoId: +environment.topic.id,
        usuario: `${currentUser.firstName} ${currentUser.lastName ?? ''}`,
        userId: currentUser.id
      };
      this.outflowService.create(outflow).subscribe(() => {
        this.toastService.show('Desabafo criado com sucesso!', 'success');
        this.dialogRef.close(this.outflow);
      }, err => {
        this.toastService.show('Falha ao enviar o desabafo', 'danger');
        LoggerUtils.throw(err);
      });
    } else {
      this.clazz = 'border-danger';
      this.labelError = 'labelred';
    }
  }

}
