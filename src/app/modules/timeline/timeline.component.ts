import { Component, OnInit } from '@angular/core';
import { environment } from '@env';

import { MatDialog } from '@angular/material/dialog';

import { ActionButton, HexColor } from '@shared/components/action-buttons/action-buttons.component';
import { SuggestionModalComponent } from './suggestion-modal/suggestion-modal.component';
import { OutflowModalComponent } from './outflow-modal/outflow-modal.component';
import { SearchOption } from '@shared/components/search/models/SearchOption';
import { HackingRule } from '@shared/components/search/models/HackingRule';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { SuggestionService } from '@app/http/suggestion.service';
import { ToastService } from '@shared/services/toast.service';
import { LoggerUtils } from '@shared/utils/logger.utills';
import { MobileUtils } from '@shared/utils/mobile.utils';
import { Suggestion, SuggestionStatus } from '@shared/models/Suggestion';
import { ArrayUtils } from '@shared/utils/array.utils';
import { User } from '@shared/models/User';
import { finalize } from 'rxjs/operators';
import { PushNotification } from '@shared/models/Notification';
import { MessagingService } from '@app/services/messaging.service';

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

  pageInfo: PageInfo;
  isFetching: boolean;

  counter = 0;

  buttons: ActionButton[] = [
    {
      id: 'suggestion',
      icon: 'fal fa-lightbulb-on',
      label: 'Tenho uma sugestão!',
      color: new HexColor(environment.defaultColor)
    },
    // {
    //   id: 'outflow',
    //   icon: 'fal fa-frown',
    //   label: 'Tenho um desabafo!',
    //   color: 'btn-light'
    // }
  ];

  filters = [
    SearchOption.builder()
      .id('topic')
      .value({ topicoId: environment.topic.id })
      .description(`Produto: ${environment.topic.name}`)
      .build(),
    SearchOption.builder()
      .id('status')
      .value({ status: 1 })
      .description('Estado: Aberta')
      .build()
  ];

  constructor(
    public dialog: MatDialog,
    public suggestionService: SuggestionService,
    public toastService: ToastService,
    public messagingService: MessagingService
  ) { }

  ngOnInit(): void {
    if (environment.topic.id === 0) {
      window.location.href = '/';
    } else {
      this.nextPage();
    }
  }

  removeFilter(value: SearchOption) {
    const filter = this.filters.filter(el => el.id === value.id);
    if (filter.length > 0) {
      this.filters.splice(this.filters.indexOf(filter[0]), 1);
    }
    this.fetch();
  }

  fetch() {
    if (!this.isFetching) {
      this.pageInfo = null;
      this.suggestions = [];
      this.nextPage();
    }
  }

  nextPage() {
    const pageCriteria = {
      pageIndex: this.pageInfo ? this.pageInfo.pageIndex + 1 : 0,
      pageSize: 15
    };
    const user = {
      userId: User.fromLocalStorage().id
    };
    const filter: any = {};
    this.filters.forEach(fil => Object.assign(filter, fil.value));
    Object.assign(filter, pageCriteria);
    Object.assign(filter, user);

    if ((!this.pageInfo || this.pageInfo.hasNext) && !this.isFetching) {
      this.isFetching = true;
      this.toastService.showSnack('Buscando sugestões');
      this.suggestionService.getSuggestions(filter)
        .pipe(finalize(() => this.isFetching = false))
        .subscribe((results: any) => {

        this.suggestions = ArrayUtils.concatDifferentiatingProperty(this.suggestions, results.records, 'id');
        this.pageInfo = results.pageInfo;

        if (!this.suggestions?.length) {
          this.toastService.show(
            `Não há sugestões aplicáveis para ${this.filters.length === 1 ? 'este produto' : 'a pesquisa'}`,
            'warning'
          );
        } else {
          this.toastService.hideSnack();
        }
      });
    }
  }

  onClick(id: string) {
    switch (id) {
      case 'outflow':
        this.openOutflowDialog();
        break;
      case 'suggestion':
        this.openSuggestionModal();
        break;
    }
  }

  openOutflowDialog() {
    const dialogRef = this.dialog.open(OutflowModalComponent, {
      width: '94vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      LoggerUtils.log(result);
    });
  }

  openSuggestionModal() {
    const dialogRef = this.dialog.open(SuggestionModalComponent, {
      width: '94vw',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.suggestions = [result].concat(this.suggestions);
      }
    });
  }

  get info() {
    return {
      new: 'Deseja dizer alguma coisa?',
      suggestion: 'Tenho uma sugestão!',
      outflow: 'Tenho um desabafo!'
    };
  }

  sortBy() {
    this.sortingType = this.sortingType === SortingType.RELEVANCIA ? SortingType.DATA_DE_CRIACAO : SortingType.RELEVANCIA;
  }

  public get defaultRule() {
    return SearchRule.builder()
      .id('title')
      .description('Título: "{0}"')
      .value({ titulo: '' })
      .build();
  }

  get isMobile() {
    return MobileUtils.isMobile;
  }

  hackings() {
    return [
      this._hackingFactory('problem', /(problema)\:\s(?<value>.+)/ig, 'Problema a ser resolvido', { problemaResolvido: '' }),
      this._hackingFactory('suggestion', /(sugestao)\:\s(?<value>.+)/ig, 'Sugestão de melhoria', { descricaoSugestao: '' }),
      this._hackingFactory('suggestion', /(sugestão)\:\s(?<value>.+)/ig, 'Sugestão de melhoria', { descricaoSugestao: '' }),
      this._hackingFactory('suggestion', /(melhoria)\:\s(?<value>.+)/ig, 'Sugestão de Melhoria', { descricaoSugestao: '' }),
      this._hackingFactory('title', /(titulo)\:\s(?<value>.+)/ig, 'Buscar pelo título', { titulo: '' }),
      this._hackingFactory('title', /(título)\:\s(?<value>.+)/ig, 'Buscar pelo título', { titulo: '' }),
      // this._hackingFactory('tag', /(tag)\:\s(?<value>.+)/ig, 'Buscar pela tag', {})
    ];
  }

  filteringRules() {
    return [
      SearchRule.builder()
        .id('status')
        .value({ status: SuggestionStatus.ABERTO })
        .description('Estado: Aberta')
        .keywords(['aberta', 'abertas', 'aberto', 'abertos', 'open'])
        .build(),
      SearchRule.builder()
        .id('status')
        .value({ status: SuggestionStatus.ARQUIVADO })
        .description('Estado: Arquivada')
        .keywords(['arquivada', 'arquivadas', 'arquivado', 'arquivados'])
        .build(),
      SearchRule.builder()
        .id('status')
        .value({ status: SuggestionStatus.APROVADO })
        .description('Estado: Aprovada')
        .keywords(['aprovada', 'aprovadas', 'aprovado', 'aprovados', 'fechada'])
        .build(),
    ];
  }

  private _hackingFactory(id: string, regex: RegExp, description: string, value: any) {
    return HackingRule.builder()
      .id(id)
      .regex(regex)
      .description(`${description}: "{0}"`)
      .value(value)
      .build();
  }

  filterApply(event: SearchOption) {
    const existingFilter = this.filters.filter(el => el.id === event.id);
    if (existingFilter.length > 0) {
      this.filters.splice(this.filters.indexOf(existingFilter[0]), 1);
    }
    this.filters.push(event);
    this.fetch();
  }

  public async testeNotifications() {
    console.log('botão foi clicado')
    await new Promise(resolve => setTimeout(resolve, 5000));
    const notification = new PushNotification(
      'rodrigo.moraes@ottimizza.com.br',
      this.messagingService.APPLICATION_ID,
      'abc',
      'UMA NOTIFICAÇÃO',
      'Eu sou uma notificação!!!'
    );
    this.messagingService.sendNotification(notification).subscribe(() => alert('notificação enviada'));
  }

}
