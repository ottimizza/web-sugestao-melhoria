import { Component, OnInit } from '@angular/core';
import { ActionButton } from '@shared/components/action-buttons/action-buttons.component';
import { MatDialog } from '@angular/material';
import { OutflowModalComponent } from '@modules/timeline/outflow-modal/outflow-modal.component';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { HackingRule } from '@shared/components/search/models/HackingRule';
import { SearchOption } from '@shared/components/search/models/SearchOption';
import { environment } from '@env';
import { User } from '@shared/models/User';
import { Outflow } from '@shared/models/Outflow';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { OutflowService } from '@app/http/outflow.service';
import { ArrayUtils } from '@shared/utils/array.utils';
import { ToastService } from '@shared/services/toast.service';
import { LoggerUtils } from '@shared/utils/logger.utills';
import { DateUtils } from '@shared/utils/date-utils';

@Component({
  templateUrl: './outflow.component.html',
  styleUrls: ['./outflow.component.scss']
})
export class OutflowComponent implements OnInit {

  filters = [
    SearchOption.builder()
      .id('topic')
      .value({ topicoId: environment.topic.id })
      .description(`Produto: ${environment.topic.name}`)
      .build()
  ];

  currentUser: User;

  button: ActionButton[] = [
    {
      id: 'outflow',
      icon: 'fal fa-frown',
      label: 'Tenho um desabafo!',
    }
  ];

  outflows: Outflow[];

  pageInfo: PageInfo;
  isFetching: boolean;

  constructor(
    public dialog: MatDialog,
    public outflowService: OutflowService,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
    console.log(this.currentUser.type === 0);
    this.fetch();
  }

  public get defaultRule() {
    return SearchRule.builder()
      .id('text')
      .description('Procurar por: "{0}"')
      .value({ texto: '' })
      .build();
  }

  hackings() {
    if (this.currentUser?.type === 0) {
      return [
        HackingRule.builder()
          .description('ID do produto: "{0}"')
          .id('productId')
          .value({ topicoId: '' })
          .regex(/(produto)\:\s(?<value>.+)/ig)
          .build()
      ];
    }

    return [];
  }

  getDate(date: string) {
    // @ts-ignore
    const postDate = new Date(date.split('-')).getTime();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today.getTime() - (24 * 60 * 60 * 1000));

    const beforeYesterday = new Date(yesterday.getTime() - (24 * 60 * 60 * 1000));

    if (postDate === today.getTime()) {
      return 'Hoje';
    } else if (postDate === yesterday.getTime()) {
      return 'Ontem';
    } else if (postDate === beforeYesterday.getTime()) {
      return 'Anteontem';
    }
    return DateUtils.getDateString(new Date(postDate));
  }

  openDialog() {
    const dialogRef = this.dialog.open(OutflowModalComponent, {
      width: '94vw'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.outflows = [result].concat(this.outflows);
      }
    });
  }

  filterApply(event: SearchOption) {
    const existingFilter = this.filters.filter(el => el.id === event.id);
    if (existingFilter.length > 0) {
      this.filters.splice(this.filters.indexOf(existingFilter[0]), 1);
    }
    this.filters.push(event);
    this.fetch();
  }

  removeFilter(event: SearchOption) {
    this.filters.splice(this.filters.indexOf(event), 1);
  }

  fetch() {
    if (!this.isFetching) {
      this.pageInfo = null;
      this.outflows = [];
      this.nextPage();
    }
  }

  nextPage() {
    const pageCriteria = {
      pageIndex: this.pageInfo ? this.pageInfo.pageIndex + 1 : 0,
      pageSize: 15
    };
    const filter: any = {};
    this.filters.forEach(f => Object.assign(filter, f.value));
    Object.assign(filter, pageCriteria);

    if (this.currentUser.type !== 0) {
      Object.assign(filter, { userId: this.currentUser.id });
    }

    if (!this.isFetching && (!this.pageInfo || this.pageInfo.hasNext)) {
      this.isFetching = true;
      console.log(this.isFetching);
      this.toastService.showSnack('Obtendo desabafos');
      this.outflowService.getOutflows(filter).subscribe(results => {
        this.isFetching = false;
        this.toastService.hideSnack();
        this.outflows = ArrayUtils.concatDifferentiatingProperty(results.records, this.outflows, 'id');
        this.pageInfo = results.pageInfo;
      }, err => {
        this.isFetching = false;
        this.toastService.show('Falha ao obter desabafos!', 'danger');
        LoggerUtils.throw(err);
      });
    }
  }

}
