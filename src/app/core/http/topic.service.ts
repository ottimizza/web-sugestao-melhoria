import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { Topic } from '@shared/models/Topic';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(private _http: HttpClient, private _authenticationService: AuthenticationService) { }

  getById(id: number) {
    const url = `${BASE_URL}/api/topico/${id}`;
    return this._http.get(url, this._headers);
  }

  getTopics(searchCriteria: any) {
    const params = this._encode(searchCriteria);
    const url = `${BASE_URL}/api/topico?${params}`;
    return this._http.get<GenericPageableResponse<{ id: number, nome: string, ativo: boolean }>>(url, this._headers);
  }

  create(topic: Topic) {
    const url = `${BASE_URL}/api/topico`;
    return this._http.post(url, topic, this._headers);
  }

  delete(id: number) {
    const url = `${BASE_URL}/api/topico/${id}`;
    return this._http.delete(url, this._headers);
  }

  private _encode(params: any): string {
    return Object.keys(params).map((key) => {
      return [key, params[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }

  private get _headers() {
    const headers = this._authenticationService.getAuthorizationHeaders();
    return { headers };
  }

}
