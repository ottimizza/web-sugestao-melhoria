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

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent implements OnInit {

  @Input() suggestion: Suggestion;

  isSelected = false;
  visibleComments = false;
  comments: Comment[] = [];

  constructor(
    public dialog: MatDialog,
    private _toast: ToastService
  ) {}

  ngOnInit(): void {
    const fake = this.fake().comments;
    this.comments = this.comments.concat(fake);
  }

  get title(): string {
    return StringUtils.cut(this.suggestion.titulo, 50);
  }

  nextPage() {
    const fake = this.fake().comments;
    this.comments = ArrayUtils.sum(this.comments, fake);
  }

  openLikeDialog(): void {
    const dialogRef = this.dialog.open(LikeModalComponent, {
      width: '94vw',
      data: {
        title: 'Que bom que gostou!',
        icon: 'fa fa-heart text-danger'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._toast.show('Você curtiu uma publicação');
      }
      LoggerUtils.log(result);
    });
  }

  openDisikeDialog(): void {
    const dialogRef = this.dialog.open(LikeModalComponent, {
      width: '94vw',
      data: {
        title: 'Ah! Que pena! :(',
        icon: 'fa fa-heart-broken text-danger'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this._toast.show('Você deu um dislike em uma publicação!');
      }
      LoggerUtils.log(result);
    });
  }

  get content() {
    return StringUtils.cut(
      `${this.suggestion.problema} ${this.suggestion.sugestaoMelhoria} ${this.suggestion.resultadoEsperado}`, 280
    );
  }

  get button() {
    return this.isSelected ? 'Mostrar menos' : 'Continuar lendo';
  }


  get hour() {
    return this.fake().hour;
  }

  get name() {
    const user = User.fromLocalStorage();
    return `${user.firstName} ${user.lastName}`;
  }

  fake() {

    const a = () => {
      const comments: Comment[] = [];
      for (let i = 0; i < 5; i++) {
        const comment = new Comment();
        // tslint:disable
        comment.comment = 'Gostaria de enfatizar que a revolução dos costumes obstaculiza a apreciação da importância dos níveis de motivação departamental.';
        comment.userId = Math.round(Math.random() * 100);
        comments.push(comment);
      }
      return comments;
    };

    return {
      comments: a(),
      hour: '3 horas atrás'
    };
  }

}
