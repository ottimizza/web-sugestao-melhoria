import { Component, OnInit } from '@angular/core';
import { Suggestion } from '@shared/models/Suggestion';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { SearchOption } from '@shared/components/search/models/SearchOption';
import { HackingRule } from '@shared/components/search/models/HackingRule';
import { LoggerUtils } from '@shared/utils/logger.utills';

enum SortingType {
  RELEVANCIA = 'Relevância',
  DATA_DE_CRIACAO = 'Data de Criação'
}

@Component({
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  product: string;
  suggestions: Suggestion[] = [];
  sortingType = SortingType.RELEVANCIA;
  filters = [
    SearchOption.builder()
      .id('product')
      .value({ product: 'Bussola' })
      .description('Produto: Bussola')
      .build()
  ];

  ngOnInit(): void {
    this.fake();
  }

  sortBy() {
    this.sortingType = this.sortingType === SortingType.RELEVANCIA ? SortingType.DATA_DE_CRIACAO : SortingType.RELEVANCIA;
  }

  public get defaultRule() {
    return SearchRule.builder()
      .id('default')
      .description('Procurar por "{0}"')
      .build();
  }

  hackings() {
    return [
      this._hackingFactory('tag', /(tag)\:\s(?<value>.+)/ig, 'Buscar pela tag'),
      this._hackingFactory('title', /(titulo)\:\s(?<value>.+)/ig, 'Buscar pelo título'),
      this._hackingFactory('title', /(título)\:\s(?<value>.+)/ig, 'Buscar pelo título'),
      this._hackingFactory('problem', /(problema)\:\s(?<value>.+)/ig, 'Problema a ser resolvido'),
      this._hackingFactory('suggestion', /(sugestao)\:\s(?<value>.+)/ig, 'Sugestão de melhoria'),
      this._hackingFactory('suggestion', /(sugestão)\:\s(?<value>.+)/ig, 'Sugestão de melhoria'),
      this._hackingFactory('result', /(resultado)\:\s(?<value>.+)/ig, 'Resultado esperado'),
    ];
  }

  private _hackingFactory(id: string, regex: RegExp, description: string) {
    return HackingRule.builder()
      .id(id)
      .regex(regex)
      .description(`${description}: "{0}"`)
      .build();
  }

  filterApply(event: SearchOption) {
    const existingFilter = this.filters.filter(el => el.id === event.id);
    if (existingFilter.length > 0) {
      this.filters.splice(this.filters.indexOf(existingFilter[0]), 1);
    }
    this.filters.push(event);
    // this.filterFetch();
  }

  fake() {
    this.product = 'Bussola Contábil';

    for (let i = 0; i < 20; i++) {
      const s = new Suggestion(
        Math.round(Math.random() * 10000),
        'Bussola',
        'URGENTE!',
        // tslint:disable: max-line-length
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum hendrerit faucibus. Proin accumsan enim in eros pulvinar, sit posuere.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum hendrerit faucibus. Proin accumsan enim in eros pulvinar, sit posuere.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin rutrum hendrerit faucibus. Proin accumsan enim in eros pulvinar, sit posuere.',
        false,
        false,
        true,
        '321',
        14,
        4122,
        22,
        new Date()
      ).addTag('bussola')
       .addTag('urgente!')
       .addTag('Cor')
       .addTag('fundo');
      this.suggestions.push(s);
    }

  }

}
