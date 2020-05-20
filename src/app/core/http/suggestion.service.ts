import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { Suggestion } from '@shared/models/Suggestion';

const BASE_URL = environment.storageBaseUrl;

@Injectable({ providedIn: 'root' })
export class SuggestionService {

  constructor(private _http: HttpClient, private _authenticationService: AuthenticationService) {}

  public getSuggestions(searchCriteria: any) {
    const params = this._encode(searchCriteria);
    const url = `${BASE_URL}/api/sugestao?${params}`;
    return this._http.get(url, this._headers);
  }

  public getById(id: number) {
    const url = `${BASE_URL}/api/sugestao/${id}`;
    return this._http.get(url, this._headers);
  }

  public create(suggestion: Suggestion) {
    const url = `${BASE_URL}/api/sugestao`;
    return this._http.post(url, suggestion, this._headers);
  }

  public deleteById(id: number) {
    const url = `${BASE_URL}/api/sugestao/${id}`;
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
