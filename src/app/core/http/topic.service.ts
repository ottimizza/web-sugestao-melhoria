import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { Topic } from '@shared/models/Topic';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { RouterLink, Router } from '@angular/router';
import { HttpHandlerService } from '@app/services/http-handler.service';

const BASE_URL = environment.storageBaseUrl;

interface TopicWithId {
  id: number;
  nome: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private _http: HttpHandlerService) { }

  getById(id: number) {
    const url = `${BASE_URL}/api/topico/${id}`;
    return this._http.get(url, 'Falha ao obter tópico');
  }

  getTopics(searchCriteria: any) {
    const url = `${BASE_URL}/api/topico`;
    return this._http.get<GenericPageableResponse<TopicWithId>>([url, searchCriteria], 'Falha ao obter tópicos');
  }

  create(topic: Topic) {
    const url = `${BASE_URL}/api/topico`;
    return this._http.post(url, topic, `Falha ao criar tópico relacionado ao produto ${environment.topic.name}!`);
  }

  delete(id: number) {
    const url = `${BASE_URL}/api/topico/${id}`;
    return this._http.delete(url, 'Falha ao excluir tópico!');
  }

}
