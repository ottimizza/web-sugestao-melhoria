import { Component, OnInit } from '@angular/core';
import { environment } from '@env';

import { MatDialog } from '@angular/material/dialog';

import { OutflowModalComponent } from '@modules/timeline/outflow-modal/outflow-modal.component';
import { ActionButton, HexColor } from '@shared/components/action-buttons/action-buttons.component';
import { SearchOption } from '@shared/components/search/models/SearchOption';
import { HackingRule } from '@shared/components/search/models/HackingRule';
import { SearchRule } from '@shared/components/search/models/SearchRule';
import { PageInfo } from '@shared/models/GenericPageableResponse';
import { ToastService } from '@shared/services/toast.service';
import { OutflowService } from '@app/http/outflow.service';
import { LoggerUtils } from '@shared/utils/logger.utills';
import { ArrayUtils } from '@shared/utils/array.utils';
import { DateUtils } from '@shared/utils/date-utils';
import { Outflow } from '@shared/models/Outflow';
import { User } from '@shared/models/User';
import { UserService } from '@app/http/users.service';
import { finalize } from 'rxjs/operators';

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
  AVATAR_PLACEHOLDER = './assets/images/Portrait_Placeholder.png';

  button: ActionButton[] = [
    {
      id: 'outflow',
      icon: 'fal fa-frown',
      label: 'Tenho um desabafo!',
      color: new HexColor(environment.defaultColor)
    }
  ];

  outflows: any[];

  pageInfo: PageInfo;
  isFetching: boolean;

  constructor(
    public dialog: MatDialog,
    public outflowService: OutflowService,
    public toastService: ToastService,
    public userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = User.fromLocalStorage();
    if (environment.topic.id === 0) {
      window.location.href = '/';
    } else {
      this.fetch();
    }
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
    this.fetch();
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
      this.toastService.showSnack('Obtendo desabafos');
      this.outflowService.getOutflows(filter)
        .pipe(finalize(() => this.isFetching = false))
        .subscribe(results => {
        this.toastService.hideSnack();
        results.records = results.records.map(rec => {
          const avatar = { avatar: this.AVATAR_PLACEHOLDER };
          return Object.assign(rec, avatar);
        });
        this.outflows = ArrayUtils.concatDifferentiatingProperty(this.outflows, results.records, 'id');
        this.pageInfo = results.pageInfo;
        this._getAvatars();
      });
    }
  }

  private _getAvatars() {
    this.outflows.filter(out => out.avatar === this.AVATAR_PLACEHOLDER)
      .forEach(outflow => {
        this.userService.fetchById(outflow.userId).subscribe(user => {
          if (user.record.avatar) {
            this.outflows[this.outflows.indexOf(outflow)].avatar = user.record.avatar;
          }
        });
      });
  }

}

function expo(num: number, power: number) {
  const initalNum = num;
  for (let i = 1; i < power; i++) {
    num *= initalNum;
  }
  return num;
}
