import { Injectable } from '@angular/core';
import { SuggestionService } from '@app/http/suggestion.service';
import { Suggestion } from '@shared/models/Suggestion';
import { DateUtils } from '@shared/utils/date-utils';
import { EmoteEvaluation } from '@shared/models/EmoteEvaluation';
import { environment } from '@env';
import { User } from '@shared/models/User';
import { LoggerUtils } from '@shared/utils/logger.utills';
import { CommentService } from '@app/http/comment.service';
import { Comment } from '@shared/models/Comment';
import { Subject } from 'rxjs';

// tslint:disable
@Injectable({
  providedIn: 'root'
})
export class PopulatorService {

  constructor(
    private suggestionService: SuggestionService,
    private commentService: CommentService
  ) {}

  public populateComments(suggestionId: number, quantity: number) {

    const $retorno = new Subject<Comment[]>();
    const array = [];

    if (this._verify(quantity, 'comentários')) {

      const comment: Comment = {
        sugestaoId: suggestionId,
        texto: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce molestie nisl a molestie dignissim. Donec sit amet lorem non magna efficitur.',
        usuario: `Comentário criado por script utilizando o usuário ${User.fromLocalStorage().email}`,
        userId: User.fromLocalStorage().id
      }

      const returning = (index: number) => {
        if (index === quantity - 1) {
          $retorno.next(array);
        }
      }

      for (let i = 0; i < quantity; i++) {

        this.commentService.create(comment).subscribe(result => {
          LoggerUtils.log(`Comentário ${quantity + 1}:`)
          LoggerUtils.log(result);
          LoggerUtils.log('--------------');
          returning(i);
        }, err => {
          LoggerUtils.error(`Comentário ${quantity + 1}:`)
          LoggerUtils.throw(err);
          LoggerUtils.error('--------------');
          returning(i);
        })

      }

    }

    return $retorno

  }

  public populateSuggestions(quantity: number) {
    if (this._verify(quantity, 'sugestões')) {

        const suggestion: any = {
          dataAtualizacao: DateUtils.getTracedDate(new Date()),
          dataCriacao: DateUtils.getTracedDate(new Date()),
          descricaoSugestao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius non enim vel dapibus. Donec vel velit arcu. Suspendisse porta ante.',
          numeroComentarios: 0,
          numeroDislikes: 0,
          numeroLikes: 0,
          problemaResolvido: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent varius non enim vel dapibus. Donec vel velit arcu. Suspendisse porta ante.',
          resultadoAutomacao: EmoteEvaluation.NAO,
          resultadoProdutividade: EmoteEvaluation.NAO_SEI,
          resultadoSuporte: EmoteEvaluation.SIM,
          status: 1,
          titulo: 'Lorem ipsum dolor sit amet orci aliquam.',
          topicoId: environment.topic.id,
          usuario: `Sugestão criada por script utilizando o usuário ${User.fromLocalStorage().email}`,
          userId: User.fromLocalStorage().id
        };

        for (let i = 0; i < quantity; i++) {

          this.suggestionService.create(suggestion).subscribe(result => {
            LoggerUtils.log(`Sugestão ${quantity + 1}:`)
            LoggerUtils.log(result);
            LoggerUtils.log('--------------');
          }, err => {
            LoggerUtils.error(`Sugestão ${quantity + 1}:`)
            LoggerUtils.throw(err);
            LoggerUtils.error('--------------');
          })

        }

    }

  }

  private _verify(quantity: number, item: string): boolean {
    return confirm(`Você está prestes a criar ${quantity} ${item}. Deseja continuar?`);
  }

}