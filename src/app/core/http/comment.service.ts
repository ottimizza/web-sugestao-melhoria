import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { Comment } from '@shared/models/Comment';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { HttpHandlerService } from '@app/services/http-handler.service';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpHandlerService) {}

  getById(id: number) {
    const url = `${BASE_URL}/api/comentario/${id}`;
    return this.http.get(url, 'Falha ao detalhes do comentário!');
  }

  getComments(searchCriteria: any) {
    const url = `${BASE_URL}/api/comentario`;
    return this.http.get<GenericPageableResponse<Comment>>([url, searchCriteria], 'Falha ao obter comentários!');
  }

  create(comment: Comment) {
    const url = `${BASE_URL}/api/comentario`;
    return this.http.post(url, comment, 'Falha ao criar comentário!');
  }

  delete(id: number) {
    const url = `${BASE_URL}/api/comentario/${id}`;
    return this.http.delete(url, 'Falha ao excluir comentário!');
  }

}
