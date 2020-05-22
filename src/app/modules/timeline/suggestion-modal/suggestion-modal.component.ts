import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SuggestionService } from '@app/http/suggestion.service';
import { ToastService } from '@shared/services/toast.service';
import { Suggestion } from '@shared/models/Suggestion';
import { DateUtils } from '@shared/utils/date-utils';
import { User } from '@shared/models/User';
import { environment } from '@env';
import { LoggerUtils } from '@shared/utils/logger.utills';

@Component({
  templateUrl: './suggestion-modal.component.html',
  styleUrls: ['./suggestion-modal.component.scss']
})
export class SuggestionModalComponent {

  problem = '';
  improvement = '';
  title = '';
  diminuicaoSuporte: number;
  automacaoProcesso: number;
  aumentoProdutividade: number;
  errorLabel = this.pattern;
  errorBorder = this.pattern;

  constructor(
    public dialogRef: MatDialogRef<SuggestionModalComponent>,
    public suggestionService: SuggestionService,
    public toastService: ToastService,
  ) {}

  private get pattern() {
    return { problem: '', improvement: '', title: '' };
  }

  getResult() {
    return {
      problem: this.problem,
      improvement: this.improvement,
    };
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submit() {
    if (this.problem && this.improvement && this.title &&
        this.aumentoProdutividade !== undefined && this.diminuicaoSuporte !== undefined && this.automacaoProcesso !== undefined) {

      const currentUser = User.fromLocalStorage();
      const suggestion: any = {
        dataAtualizacao: DateUtils.getTracedDate(new Date()),
        dataCriacao: DateUtils.getTracedDate(new Date()),
        descricaoSugestao: this.improvement,
        problemaResolvido: this.problem,
        resultadoAutomacao: this.automacaoProcesso,
        resultadoProdutividade: this.aumentoProdutividade,
        resultadoSuporte: this.diminuicaoSuporte,
        status: 1,
        numeroComentarios: 0,
        numeroDislikes: 0,
        numeroLikes: 0,
        titulo: this.title,
        topicoId: environment.topic.id,
        usuario: `${currentUser.firstName} ${currentUser.lastName ?? ''}`,
        userId: currentUser.id
      };

      this.suggestionService.create(suggestion).subscribe(result => {
        this.toastService.show('Sugestão criada com sucesso', 'success');
        this.dialogRef.close(result);
      }, err => {
        this.toastService.show('Falha ao criar sugestão', 'danger');
        LoggerUtils.throw(err);
      });

    } else {
      this.errorLabel = this.pattern;
      this.errorBorder = this.pattern;

      if (!this.problem || !this.problem.length) {
        this.errorLabel.problem = 'labelred';
        this.errorBorder.problem = 'border-danger';
      }
      if (!this.improvement || !this.improvement.length) {
        this.errorLabel.improvement = 'labelred';
        this.errorBorder.improvement = 'border-danger';
      }
      if (!this.title || !this.title.length) {
        this.errorLabel.title = 'labelred';
        this.errorBorder.title = 'border-danger';
      }
    }

  }

}
