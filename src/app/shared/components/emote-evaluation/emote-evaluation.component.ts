import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-emote',
  templateUrl: './emote-evaluation.component.html'
})
export class EmoteEvaluationComponent {

  @Input() question: string;

  @Output() evaluation: EventEmitter<number> = new EventEmitter();

  selected: 'bad' | 'meh' | 'top';

  get info() {
    return {
      bad: 'Não',
      meh: 'Não tenho certeza',
      top: 'Sim'
    };
  }

  select(val: 'bad' | 'meh' | 'top') {
    this.selected = val;
    if (val === 'bad') {
      this.evaluation.emit(1);
    } else if (val === 'meh') {
      this.evaluation.emit(2);
    } else if (val === 'top') {
      this.evaluation.emit(3);
    }
  }

}
