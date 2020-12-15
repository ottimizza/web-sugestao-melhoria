import { Component, Input, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { LikeModalComponent } from '../like-modal/like-modal.component';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { CommentService } from '@app/http/comment.service';
import { StringUtils } from '@shared/utils/string.utils';
import { ArrayUtils } from '@shared/utils/array.utils';
import { Suggestion } from '@shared/models/Suggestion';
import { VoteService } from '@app/http/vote.service';
import { DateUtils } from '@shared/utils/date-utils';
import { Comment } from '@shared/models/Comment';
import { User } from '@shared/models/User';
import { UserService } from '@app/http/users.service';
import { finalize } from 'rxjs/operators';
import { FileService } from '@app/services/file.service';
import { FileStorageService } from '@app/http/file-storage.service';
import { ToastService } from '@shared/services/toast.service';

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
  avatar = './assets/images/Portrait_Placeholder.png';
  ownComment = '';

  pageInfo: PageInfo;
  isFetching: boolean;


  constructor(
    public dialog: MatDialog,
    public commentService: CommentService,
    public voteService: VoteService,
    public userService: UserService,
    private fileService: FileService,
  ) {}

  ngOnInit(): void {
    this.nextPage();
    this.userService.fetchById(this.suggestion.userId).subscribe(result => {
      if (result.record.avatar) {
        this.avatar = result.record.avatar;
      }
    });
  }

  getDate(date: string) {
    const postDate = new Date(date.replace('-', ' ')).getTime();

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
    return DateUtils.format(new Date(postDate));
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
    this.commentService.getComments(searchCriteria)
      .pipe(finalize(() => this.isFetching = false))
      .subscribe(results => {
      this.comments = ArrayUtils.concatDifferentiatingProperty(this.comments, results.records, 'id');
      this.pageInfo = results.pageInfo;
    });
  }

  submit() {
    if (this.ownComment?.length) {
      this.error = false;
      const user = User.fromLocalStorage();
      const comment = {
        sugestaoId: this.suggestion.id,
        texto: this.ownComment,
        usuario: `${user.firstName} ${user.lastName ?? ''}`,
        userId: user.id
      };
      this.ownComment = '';
      this.commentService
        .create(comment)
        .subscribe((result: Comment) => {
          this.pageInfo.totalElements++;
          this.comments = [result].concat(this.comments);
        });
    } else {
      this.error = true;
    }
  }

  like() {
    const userId = User.fromLocalStorage().id;
    if (this.suggestion.deuLike) {
      this.voteService.deleteByUserIdAndSuggestionId(userId, this.suggestion.id).subscribe(() => {
        this.suggestion.deuLike = false;
        this.suggestion.numeroLikes--;
      });
    } else if (this.suggestion.deuDislike) {
      this.openLikeDialog(() => {
        this.suggestion.deuDislike = false;
        this.suggestion.numeroDislikes--;
      });
    } else {
      this.openLikeDialog();
    }
  }

  dislike() {
    const userId = User.fromLocalStorage().id;
    if (this.suggestion.deuDislike) {
      this.voteService.deleteByUserIdAndSuggestionId(userId, this.suggestion.id).subscribe(() => {
        this.suggestion.deuDislike = false;
        this.suggestion.numeroDislikes--;
      });
    } else if (this.suggestion.deuLike) {
      this.openDislikeDialog(() => {
        this.suggestion.deuLike = false;
        this.suggestion.numeroLikes--;
      });
    } else {
      this.openDislikeDialog();
    }
  }

  openLikeDialog(callbackFn?: () => void): void {
    const dialogRef = this.dialog.open(LikeModalComponent, {
      width: '94vw',
      data: {
        title: 'Que bom que gostou!',
        icon: 'fa fa-heart text-danger',
        aprovado: true,
        id: this.suggestion.id
      }
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) {
        this.suggestion.numeroLikes++;
        this.suggestion.deuLike = true;
        this.suggestion.deuDislike = false;
        if (callbackFn) {
          callbackFn();
        }
      }
    });
  }

  openDislikeDialog(callbackFn?: () => void): void {
    const dialogRef = this.dialog.open(LikeModalComponent, {
      width: '94vw',
      data: {
        title: 'Ah! Que pena! :(',
        icon: 'fa fa-heart-broken text-danger',
        aprovado: false,
        id: this.suggestion.id
      }
    });

    dialogRef.afterClosed().subscribe(ok => {
      if (ok) {
        this.suggestion.numeroDislikes++;
        this.suggestion.deuLike = false;
        this.suggestion.deuDislike = true;
        if (callbackFn) {
          callbackFn();
        }
      }
    });
  }

  public upload() {
    this.fileService.requestAndUpload()
    .subscribe(url => this.ownComment = `${url} ${this.ownComment}`);
  }

  get content() {
    return StringUtils.cut(this.suggestion.descricaoSugestao, 280);
  }

  get button() {
    return this.isSelected ? 'Mostrar menos' : 'Continuar lendo';
  }

}
