import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from '@app/authentication/authentication.service';
import { environment } from '@env';
import { Outflow } from '@shared/models/Outflow';
import { GenericPageableResponse } from '@shared/models/GenericPageableResponse';
import { HttpHandlerService } from '@app/services/http-handler.service';

const BASE_URL = environment.serviceUrl;

@Injectable({
  providedIn: 'root'
})
export class OutflowService {

  constructor(private _http: HttpHandlerService) { }

  public getOutflows(searchCriteria: any) {
    const url = `${BASE_URL}/api/desabafo`;
    return this._http.get<GenericPageableResponse<Outflow>>([url, searchCriteria], 'Falha ao obter desabafos!');
  }

  public create(outflow: Outflow) {
    const url = `${BASE_URL}/api/desabafo`;
    return this._http.post(url, outflow, 'Falha ao criar desabafo!');
  }

}
