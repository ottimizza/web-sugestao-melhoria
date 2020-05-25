import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { Vote } from '@shared/models/Vote';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private _http: HttpClient, private _authenticationService: AuthenticationService) { }

  getById(id: number) {
    const url = `${BASE_URL}/api/voto/${id}`;
    return this._http.get(url, this._headers);
  }

  getVotes(searchCriteria: any) {
    const params = this._encode(searchCriteria);
    const url = `${BASE_URL}/api/voto?${params}`;
    return this._http.get(url, this._headers);
  }

  create(vote: Vote) {
    const url = `${BASE_URL}/api/voto`;
    return this._http.post(url, vote, this._headers);
  }

  delete(id: number) {
    const url = `${BASE_URL}/api/voto/${id}`;
    return this._http.delete(url, this._headers);
  }

  deleteByUserIdAndSuggestionId(userId: number, suggestionId: number) {
    const url = `${BASE_URL}/api/voto/seila`;
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
