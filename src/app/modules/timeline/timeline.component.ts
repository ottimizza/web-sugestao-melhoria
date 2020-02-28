import { Component, OnInit } from '@angular/core';
import { Suggestion } from '@shared/models/Suggestion';

@Component({
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  product: string;
  suggestions: Suggestion[] = [];
  sortingType = 'Relevância';

  ngOnInit(): void {
    this.fake();
  }

  sortBy() {
    this.sortingType = this.sortingType === 'Relevância' ? 'Data de Criação' : 'Relevância';
  }

  fake() {
    this.product = 'Bussola Contábil';

    for (let i = 0; i < 20; i++) {
      const s = new Suggestion(
        Math.round(Math.random() * 10000),
        'URGENTE!',
        'Muito branco',
        'Mudar o fundo para rosa choque',
        'Aumento da produtividade em no mínimo 327% pois o software irá prender mais a minha atenção',
        false,
        false,
        true,
        '321',
        14,
        4122,
        22,
        new Date()
      ).addTag('bussola').addTag('urgente!').addTag('Cor').addTag('fundo');
      this.suggestions.push(s);
    }

  }

}
