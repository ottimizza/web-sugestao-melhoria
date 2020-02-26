import { Component, OnInit } from '@angular/core';
import { Suggestion } from '@shared/models/Suggestion';

@Component({
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  product: string;
  suggestions: Suggestion[] = [];

  ngOnInit(): void {
    this.fake();
  }

  fake() {
    this.product = 'Bussola Contábil';

    for (let i = 0; i < 20; i++) {
      this.suggestions.push(new Suggestion(
        'Muito branco',
        'Mudar o fundo para rosa choque',
        'Aumento da produtividade em no mínimo 327%',
        false,
        false,
        true,
        '321',
        14,
        4122,
        22,
        new Date()
      ));
    }

  }

}
