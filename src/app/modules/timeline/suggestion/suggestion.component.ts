import { Component, Input } from '@angular/core';
import { Suggestion } from '@shared/models/Suggestion';
import { StringCutterUtils } from '@shared/utils/string-cutter.util';
import { User } from '@shared/models/User';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {

  @Input() suggestion: Suggestion;

  get title(): string {
    return StringCutterUtils.cut(this.suggestion.problema, 65);
  }

  get content() {
    return StringCutterUtils.cut(`${this.suggestion.sugestaoMelhoria} ${this.suggestion.resultadoEsperado}`, 100);
  }

  get hour() {
    return '3 horas atrás';
  }

  get name() {
    const user = User.fromLocalStorage();
    return `${user.firstName} ${user.lastName}`;
  }

}
