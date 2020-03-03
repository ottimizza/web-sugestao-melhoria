import { Component, OnInit } from '@angular/core';
import { Suggestion } from '@shared/models/Suggestion';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { SearchOption } from '@shared/components/search/models/SearchOption';
import { HackingRule } from '@shared/components/search/models/HackingRule';

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
      this._hackingFactory('result', /(resultado)\:\s(?<value>.+)/ig, 'Resultado esperado')
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

  }

  fake() {
    this.product = 'Bussola Contábil';

    for (let i = 0; i < 20; i++) {
      const s = new Suggestion(
        Math.round(Math.random() * 10000),
        'URGENTE!',
        // tslint:disable: max-line-length
        'Desta maneira, o acompanhamento das preferências de consumo desafia a capacidade de equalização do sistema de formação de quadros que corresponde às necessidades. No mundo atual, o consenso sobre a necessidade de qualificação apresenta tendências no sentido de aprovar a manutenção dos conhecimentos estratégicos para atingir a excelência. Neste sentido, a mobilidade dos capitais internacionais possibilita uma melhor visão global das posturas dos órgãos dirigentes com relação às suas atribuições. Todavia, a necessidade de renovação processual estende o alcance e a importância do orçamento setorial.',
        'Por conseguinte, a estrutura atual da organização assume importantes posições no estabelecimento de todos os recursos funcionais envolvidos. Desta maneira, o consenso sobre a necessidade de qualificação estimula a padronização das diretrizes de desenvolvimento para o futuro. Assim mesmo, a crescente influência da mídia possibilita uma melhor visão global dos procedimentos normalmente adotados. A prática cotidiana prova que a necessidade de renovação processual afeta positivamente a correta previsão das direções preferenciais no sentido do progresso. Por outro lado, o aumento do diálogo entre os diferentes setores produtivos oferece uma interessante oportunidade para verificação do sistema de formação de quadros que corresponde às necessidades.',
        'O que temos que ter sempre em mente é que o acompanhamento das preferências de consumo aponta para a melhoria dos níveis de motivação departamental. Por outro lado, o consenso sobre a necessidade de qualificação nos obriga à análise dos conhecimentos estratégicos para atingir a excelência. No entanto, não podemos esquecer que a adoção de políticas descentralizadoras cumpre um papel essencial na formulação das condições inegavelmente apropriadas. Todavia, a complexidade dos estudos efetuados estende o alcance e a importância de alternativas às soluções ortodoxas. Pensando mais a longo prazo, o novo modelo estrutural aqui preconizado agrega valor ao estabelecimento das novas proposições.',
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
