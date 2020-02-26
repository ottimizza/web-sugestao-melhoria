import { Component, Input, Output } from '@angular/core';
import { Suggestion } from '@shared/models/Suggestion';
import { StringCutterUtils } from '@shared/utils/string-cutter.util';
import { User } from '@shared/models/User';
import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {

  @Input() suggestion: Suggestion;
  isSelected = false;

  get title(): string {
    return StringCutterUtils.cut(this.suggestion.titulo, 48);
  }

  get content() {
    return StringCutterUtils.cut(`${this.suggestion.problema} ${this.suggestion.sugestaoMelhoria} ${this.suggestion.resultadoEsperado}`, 100);
  }

  get hour() {
    return '3 horas atrás';
  }

  get name() {
    const user = User.fromLocalStorage();
    return `${user.firstName} ${user.lastName}`;
  }

}
