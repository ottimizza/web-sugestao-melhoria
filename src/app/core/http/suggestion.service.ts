import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Suggestion } from '@shared/models/Suggestion';
import { HttpHandlerService } from '@app/services/http-handler.service';
import { map, switchMap } from 'rxjs/operators';
import { GenericResponse } from '@shared/models/GenericResponse';
import { MessagingService } from '@app/services/messaging.service';
import { forkJoin, from } from 'rxjs';
import { PushNotification } from '@shared/models/Notification';
import { UserService } from './users.service';
import { User } from '@shared/models/User';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { CommentService } from './comment.service';

const BASE_URL = environment.serviceUrl;

@Injectable({ providedIn: 'root' })
export class SuggestionService {

  constructor(
    private _http: HttpHandlerService,
    private messaging: MessagingService,
    private userService: UserService,
    private commentService: CommentService
  ) {}

  public getSuggestions(searchCriteria: any) {
    const url = `${BASE_URL}/api/sugestao`;
    return this._http.get([url, searchCriteria], 'Falha ao obter sugestões!');
  }

  public getById(id: number) {
    const url = `${BASE_URL}/api/sugestao/${id}`;
    return this._http.get<GenericResponse<Suggestion>>(url, 'Falha ao obter detalhes da sugestão!');
  }

  public create(suggestion: Suggestion) {
    const url = `${BASE_URL}/api/sugestao`;
    return this._http.post(url, suggestion, 'Falha ao criar sugestão!');
  }

  public deleteById(id: number) {
    const url = `${BASE_URL}/api/sugestao/${id}`;
    return this._http.delete(url, 'Falha ao excluir sugestão!');
  }

  public notify(suggestionId: number) {
    const currentUser = User.fromLocalStorage();

    return this.envolvedUsers(suggestionId, currentUser)
    .pipe(
      switchMap(result => forkJoin(result.map(id => this.userService.fetchById(id)))),
      map(result => result.map(gr => gr.record.email || gr.record.username)),
      switchMap(result => {
        const sendNotifications$ = result.map(username => {
          const notification = new PushNotification(
            username,
            this.messaging.APPLICATION_ID,
            'ATUALIZACAO',
            'Novo comentário',
            `${currentUser.firstName} ${currentUser.lastName ? currentUser.lastName + ' ' : ''}comentou em uma sugestão em que você está envolvido`
          );
          return this.messaging.sendNotification(notification);
        });
        return forkJoin(sendNotifications$);
      }),
      map(() => 'Success!')
    );
  }

  private envolvedUsers(id: number, user: User) {
    const promise = new Promise<number[]>(async resolve => {

      const ids: number[] = [];

      const suggestion = await this.getById(id).toPromise();
      ids.push(suggestion.record.userId);

      let pageInfo = new PageInfo({ hasNext: true, pageIndex: 0 });
      while (pageInfo.hasNext) {
        const filter = { pageIndex: pageInfo.pageIndex, pageSize: 10, sugestaoId: suggestion.record.id };
        const comment = await this.commentService.getComments(filter).toPromise();

        ids.push(...comment.records.map(com => com.userId));

        pageInfo = comment.pageInfo;
        pageInfo.pageIndex++;

      }

      resolve(ids.filter(userId => userId !== user.id));

    });
    return from(promise);
  }

}
