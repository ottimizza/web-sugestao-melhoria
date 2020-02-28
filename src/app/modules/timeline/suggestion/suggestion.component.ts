import { Component, Input, Output } from '@angular/core';
import { Suggestion } from '@shared/models/Suggestion';
import { StringCutterUtils } from '@shared/utils/string-cutter.util';
import { User } from '@shared/models/User';
import { EventEmitter } from 'protractor';
import { MobileUtils } from '@shared/utils/mobile.utils';

@Component({
  selector: 'app-suggestion',
  templateUrl: './suggestion.component.html',
  styleUrls: ['./suggestion.component.scss']
})
export class SuggestionComponent {

  @Input() suggestion: Suggestion;
  isSelected = false;

  get title(): string {
    const divisor = MobileUtils.isMobile ? 48 : 120;
    return StringCutterUtils.cut(this.suggestion.titulo, divisor);
  }

  get content() {
    const divisor = MobileUtils.isMobile ? 100 : 400;
    return StringCutterUtils.cut(`${this.suggestion.problema} ${this.suggestion.sugestaoMelhoria} ${this.suggestion.resultadoEsperado}`, divisor);
  }

  get button() {
    if (this.isSelected) {
      return 'Mostrar menos';
    } else {
      return 'Continuar lendo';
    }
  }

  get hour() {
    return '3 horas atrás';
  }

  get name() {
    const user = User.fromLocalStorage();
    return `${user.firstName} ${user.lastName}`;
  }

}
