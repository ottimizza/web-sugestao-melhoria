import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VoteService } from '@app/http/vote.service';
import { EmoteEvaluation } from '@shared/models/EmoteEvaluation';
import { Vote } from '@shared/models/Vote';
import { User } from '@shared/models/User';
import { ToastService } from '@shared/services/toast.service';
import { LoggerUtils } from '@shared/utils/logger.utills';

@Component({
  templateUrl: './like-modal.component.html',
  styleUrls: ['./like-modal.component.scss']
})
export class LikeModalComponent {

  opinion = '';
  diminuicaoSuporte: EmoteEvaluation;
  automacaoProcesso: EmoteEvaluation;
  aumentoProdutividade: EmoteEvaluation;

  isPosting: boolean;

  constructor(
    public dialogRef: MatDialogRef<LikeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string, icon: string, aprovado: boolean, id: number },
    public voteService: VoteService,
    public toastService: ToastService
  ) {}

  get info() {
    return {
      bad: 'Não',
      meh: 'Não sei',
      top: 'Sim'
    };
  }

  vote() {
    const currentUser = User.fromLocalStorage();
    const vote: Vote = {
      aprovado: this.data.aprovado,
      comentario: this.opinion,
      resultadoAutomacao: this.automacaoProcesso,
      resultadoProdutividade: this.aumentoProdutividade,
      resultadoSuporte: this.diminuicaoSuporte,
      sugestaoId: this.data.id,
      usuario: `${currentUser.firstName} ${currentUser.lastName ?? ''}`,
      userId: currentUser.id
    };
    if (!this.isPosting) {
      this.isPosting = true;
      this.voteService.create(vote).subscribe(results => {
        this.dialogRef.close();
      }, err => {
        this.toastService.show(`Falha ao registrar ${this.data.aprovado ? 'like' : 'dislike'}`, 'danger');
        LoggerUtils.throw(err);
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
