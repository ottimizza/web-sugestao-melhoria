import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { Outflow } from '@shared/models/Outflow';

const BASE_URL = environment.storageBaseUrl;

@Injectable({
  providedIn: 'root'
})
export class OutflowService {

  constructor(private _http: HttpClient, private _authenticationService: AuthenticationService) { }

  public getOutflows(searchCriteria: any) {
    const params = this._encode(searchCriteria);
    const url = `${BASE_URL}/api/desabafo?${params}`;
    return this._http.get(url, this._headers);
  }

  public create(outflow: Outflow) {
    const url = `${BASE_URL}/api/desabafo`;
    return this._http.post(url, outflow, this._headers);
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
