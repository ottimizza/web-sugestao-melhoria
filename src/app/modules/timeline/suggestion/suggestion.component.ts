import { Component, Input, OnInit } from '@angular/core';
import { Suggestion } from '@shared/models/Suggestion';
import { User } from '@shared/models/User';
import { MobileUtils } from '@shared/utils/mobile.utils';
import { Comment } from '@shared/models/Comment';
import { ArrayUtils } from '@shared/utils/array.utils';
import { StringUtils } from '@shared/utils/string.utils';
import { MatDialog } from '@angular/material/dialog';
import { LikeModalComponent } from '../like-modal/like-modal.component';
import { LoggerUtils } from '@shared/utils/logger.utills';

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

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    const fake = this.fake().comments;
    this.comments = this.comments.concat(fake);
    MobileUtils.onResize(event => this.isMobile);
  }

  get title(): string {
    const divisor = MobileUtils.isMobile ? 48 : 90;
    return StringUtils.cut(this.suggestion.titulo, divisor);
  }

  nextPage() {
    const fake = this.fake().comments;
    this.comments = ArrayUtils.sum(this.comments, fake);
  }

  openLikeDialog(): void {
    const dialogRef = this.dialog.open(LikeModalComponent, {
      width: '90vw',
      data: {
        title: 'Que bom que gostou!',
        icon: 'fa fa-heart text-danger'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      LoggerUtils.log(result);
    });
  }

  openDisikeDialog(): void {
    const dialogRef = this.dialog.open(LikeModalComponent, {
      width: '90vw',
      data: {
        title: 'Ah! Que pena! :(',
        icon: 'fa fa-heart-broken text-danger'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      LoggerUtils.log(result);
    });
  }

  get content() {
    const divisor = MobileUtils.isMobile ? 100 : 500;
    return StringUtils.cut(
      `${this.suggestion.problema} ${this.suggestion.sugestaoMelhoria} ${this.suggestion.resultadoEsperado}`, divisor
    );
  }

  get button() {
    if (this.isSelected) {
      return 'Mostrar menos';
    } else {
      return 'Continuar lendo';
    }
  }

  get hour() {
    return this.fake().hour;
  }

  get isMobile() {
    return MobileUtils.isMobile;
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
        // tslint:disable-next-line: max-line-length
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
