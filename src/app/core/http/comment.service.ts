import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { Comment } from '@shared/models/Comment';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private authenticationService: AuthenticationService) {}

  getById(id: number) {
    const url = `${BASE_URL}/api/comentario/${id}`;
    return this.http.get(url, this._headers);
  }

  getComments(searchCriteria: any) {
    const params = this._encode(searchCriteria);
    const url = `${BASE_URL}/api/comentario?${params}`;
    return this.http.get<GenericPageableResponse<Comment>>(url, this._headers);
  }

  create(comment: Comment) {
    const url = `${BASE_URL}/api/comentario`;
    return this.http.post(url, comment, this._headers);
  }

  delete(id: number) {
    const url = `${BASE_URL}/api/comentario/${id}`;
    return this.http.delete(url, this._headers);
  }

  private _encode(params: any): string {
    return Object.keys(params).map((key) => {
      return [key, params[key]].map(encodeURIComponent).join('=');
    }).join('&');
  }

  private get _headers() {
    const headers = this.authenticationService.getAuthorizationHeaders();
    return { headers };
  }

}
