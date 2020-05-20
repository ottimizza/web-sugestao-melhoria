import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { LikeModalComponent } from '../like-modal/like-modal.component';
import { ToastService } from '@shared/services/toast.service';
import { LoggerUtils } from '@shared/utils/logger.utills';
import { StringUtils } from '@shared/utils/string.utils';
import { Suggestion } from '@shared/models/Suggestion';
import { ArrayUtils } from '@shared/utils/array.utils';
import { Comment } from '@shared/models/Comment';
import { User } from '@shared/models/User';
import { DateUtils } from '@shared/utils/date-utils';
import { SuggestionService } from '@app/http/suggestion.service';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { CommentService } from '@app/http/comment.service';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  @Input() suggestion: Suggestion;

  isSelected = false;
  visibleComments = false;
  error = false;

  comments: Comment[] = [];
  ownComment = ''

  pageInfo: PageInfo;
  isFetching: boolean;

  constructor(
    public dialog: MatDialog,
    public commentService: CommentService,
    private _toast: ToastService
  ) {}

  ngOnInit(): void {
    this.nextPage();
  }

  getDate(date: string) {
    // @ts-ignore
    const postDate = new Date(date.split('-')).getTime();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

    const beforeYesterday = new Date(yesterday.getTime() - (24 * 60 * 60 * 1000));

    if (postDate === today.getTime()) {
      return 'Hoje';
    } else if (postDate === yesterday.getTime()) {
      return 'Ontem';
    } else if (postDate === beforeYesterday.getTime()) {
      return 'Anteontem';
    }
    return DateUtils.getDateString(new Date(postDate));
  }

  get title(): string {
    return StringUtils.cut(this.suggestion.titulo, 50);
  }

  nextPage() {
    const searchCriteria = {
      pageIndex: this.pageInfo ? this.pageInfo.pageIndex + 1 : 0,
      pageSize: 10,
      sugestaoId: this.suggestion.id
    };
    this.isFetching = true;
    this.commentService.getComments(searchCriteria).subscribe(results => {
      this.isFetching = false;
      this.comments = this.comments.concat(results.records);
      this.pageInfo = results.pageInfo;
    }, err => {
      this._toast.show(`Falha ao obter comentários para a sugestão "${this.suggestion.titulo}"`, 'danger');
      LoggerUtils.throw(err);
      this.isFetching = false;
    });
  }

  submit() {
    if (this.ownComment?.length) {
      this.error = false;
      const user = User.fromLocalStorage();
      const comment = { sugestaoId: this.suggestion.id, texto: this.ownComment, usuario: `${user.firstName} ${user.lastName ?? ''}` };
      this.ownComment = '';
      this.commentService
        .create(comment)
        .subscribe((result: Comment) => {
          this.pageInfo.totalElements++;
          this.comments = [result].concat(this.comments);
        }, err => {
          this._toast.show('Falha ao enviar comentário');
          LoggerUtils.throw(err);
        });
    } else {
      this.error = true;
    }
  }

  openLikeDialog(): void {
    const dialogRef = this.dialog.open(LikeModalComponent, {
      width: '94vw',
      data: {
        title: 'Que bom que gostou!',
        icon: 'fa fa-heart text-danger',
        aprovado: true,
        id: this.suggestion.id
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  openDisikeDialog(): void {
    const dialogRef = this.dialog.open(LikeModalComponent, {
      width: '94vw',
      data: {
        title: 'Ah! Que pena! :(',
        icon: 'fa fa-heart-broken text-danger',
        aprovado: false,
        id: this.suggestion.id
      }
    });

    dialogRef.afterClosed().subscribe();
  }

  get content() {
    return StringUtils.cut(
      // `${this.suggestion.problema} ${this.suggestion.sugestaoMelhoria} ${this.suggestion.resultadoEsperado}`, 280
      `${this.suggestion.problemaResolvido} ${this.suggestion.descricaoSugestao}`, 280
    );
  }

  get button() {
    return this.isSelected ? 'Mostrar menos' : 'Continuar lendo';
  }

}
