import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { MessagingService } from '@app/services/messaging.service';
import { UpdateService } from '@app/services/update.service';
import { RxEvent } from '@app/services/rx-event.service';
import { MobileUtils } from '@shared/utils/mobile.utils';
import { PopulatorService } from '@app/services/populator.service';
import { TopicService } from '@app/http/topic.service';
import { environment } from '@env';
import { ToastService } from '@shared/services/toast.service';
import { Topic } from '@shared/models/Topic';
import { LoggerUtils } from '@shared/utils/logger.utills';
import { Router } from '@angular/router';
import { User } from '@shared/models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public updateAvailable = false;
  public isFetchingTopic = true;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private events: RxEvent,
    private updateService: UpdateService,
    private messagingService: MessagingService,
    public topicService: TopicService,
    public toastService: ToastService,
    public router: Router
  ) {
    if (User.fromLocalStorage().email) {
      this._verifyTopic();
    } else {
      this.isFetchingTopic = false;
    }
    this.updateService.checkForUpdates();
    this.events.subscribe('sw::update', () => {
      this.updateAvailable = true;
    });
  }

  public subscribeToSidebarToggleEvents() {
    this.events.subscribe('sidebar::toggle', () => {
      const body = this.document.getElementsByTagName('body')[0];

      body.classList.toggle('show-sidebar');
    });
  }

  refresh() {
    window.location.reload();
  }

  public ngOnInit() {
    this.messagingService.receiveMessage();
    this.messagingService.currentMessage.subscribe();
  }

  private _verifyTopic() {
    this.toastService.showSnack('Detectando produto...');
    this.topicService.getTopics({ nome: environment.topic.name }).subscribe(result => {
      if (result.records && result.records.length) {
        environment.topic.id = result.records[0].id;
        this.toastService.hideSnack();
        this.isFetchingTopic = false;
      } else {
        this._createTopic();
      }
    });
  }

  private _createTopic() {
    this.topicService.create({ ativo: true, nome: environment.topic.name }).subscribe(async (result: any) => {
      environment.topic.id = result.id;
      this.toastService.show(`Tópico relacionado ao produto ${environment.topic.name} criado com sucesso!`, 'success');
      await new Promise(resolve => setTimeout(resolve, 3000));
      this.isFetchingTopic = false;
    }, err => {
      this.toastService.show(`Falha ao criar tópico relacionado ao produto ${environment.topic.name}`, 'danger');
      throw err;
    });
  }

}
