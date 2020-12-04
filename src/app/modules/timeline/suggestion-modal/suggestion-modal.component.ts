import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SuggestionService } from '@app/http/suggestion.service';
import { ToastService } from '@shared/services/toast.service';
import { Suggestion } from '@shared/models/Suggestion';
import { DateUtils } from '@shared/utils/date-utils';
import { User } from '@shared/models/User';
import { environment } from '@env';
import { LoggerUtils } from '@shared/utils/logger.utills';
import { EmoteEvaluation } from '@shared/models/EmoteEvaluation';

@Component({
  templateUrl: './suggestion-modal.component.html',
  styleUrls: ['./suggestion-modal.component.scss']
})
export class SuggestionModalComponent {

  problem = '';
  improvement = '';
  title = '';
  diminuicaoSuporte: EmoteEvaluation;
  automacaoProcesso: EmoteEvaluation;
  aumentoProdutividade: EmoteEvaluation;
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

  errorText() {
    if (!this.title) {
      return 'Informe um título';
    } else if (!this.improvement) {
      return 'Informe a sua sugestão';
    } else if (!this.problem) {
      return 'Informe o problema a ser resolvido';
    } else if (!this.diminuicaoSuporte) {
      return 'Informe se você acha que isto ajudará a diminuir o suporte';
    } else if (!this.automacaoProcesso) {
      return 'Informe se você acha que isto ajudará a automatizar algum processo';
    } else if (!this.aumentoProdutividade) {
      return 'Informe se você acha que isto irá aumentar a produtividade';
    }
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
