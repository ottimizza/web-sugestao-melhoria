import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { Vote } from '@shared/models/Vote';
import { HttpHandlerService } from '@app/services/http-handler.service';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private _http: HttpHandlerService) { }

  getById(id: number) {
    const url = `${BASE_URL}/api/voto/${id}`;
    return this._http.get(url, 'Falha ao obter detalhes do voto!');
  }

  getVotes(searchCriteria: any) {
    const url = `${BASE_URL}/api/voto`;
    return this._http.get([url, searchCriteria], 'Falha ao obter votos!');
  }

  create(vote: Vote) {
    const url = `${BASE_URL}/api/voto`;
    return this._http.post(url, vote, 'Falha ao criar votos!');
  }

  delete(id: number) {
    const url = `${BASE_URL}/api/voto/${id}`;
    return this._http.delete(url, 'Falha ao excluir voto!');
  }

  deleteByUserIdAndSuggestionId(userId: number, suggestionId: number) {
    const url = `${BASE_URL}/api/voto/${suggestionId}/${userId}`;
    return this._http.delete(url, 'Falha ao excluir voto antigo!');
  }

}
