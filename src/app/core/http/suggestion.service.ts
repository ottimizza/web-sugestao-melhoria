import { Injectable } from '@angular/core';
import { environment } from '@env';
import { Suggestion } from '@shared/models/Suggestion';
import { HttpHandlerService } from '@app/services/http-handler.service';

const BASE_URL = environment.serviceUrl;

@Injectable({ providedIn: 'root' })
export class SuggestionService {

  constructor(private _http: HttpHandlerService) {}

  public getSuggestions(searchCriteria: any) {
    const url = `${BASE_URL}/api/sugestao`;
    return this._http.get([url, searchCriteria], 'Falha ao obter sugestões!');
  }

  public getById(id: number) {
    const url = `${BASE_URL}/api/sugestao/${id}`;
    return this._http.get(url, 'Falha ao obter detalhes da sugestão!');
  }

  public create(suggestion: Suggestion) {
    const url = `${BASE_URL}/api/sugestao`;
    return this._http.post(url, suggestion, 'Falha ao criar sugestão!');
  }

  public deleteById(id: number) {
    const url = `${BASE_URL}/api/sugestao/${id}`;
    return this._http.delete(url, 'Falha ao excluir sugestão!');
  }

}
