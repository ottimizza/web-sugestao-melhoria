import { Component, OnInit, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { MessagingService } from '@app/services/messaging.service';
import { ToastService } from '@shared/services/toast.service';
import { UpdateService } from '@app/services/update.service';
import { RxEvent } from '@app/services/rx-event.service';
import { TopicService } from '@app/http/topic.service';
import { User } from '@shared/models/User';
import { environment } from '@env';
import { ArrayUtils } from '@shared/utils/array.utils';

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
    private zone: NgZone
  ) {
    const authJson = localStorage.getItem('auth-session');
    if (User.fromLocalStorage()?.email && authJson && authJson !== '{}') {
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
    this.messagingService.requestPermission();
    this.messagingService.receiveMessage();
    this.messagingService.currentMessage.subscribe(notification => {
      this.zone.run(() => {
        const msg = notification?.notification;
        if (!msg) { return; }

        console.log(msg);

        const audio = new Audio('assets/audios/notifications.mp3');
        audio.play();

        this.toastService.show(msg.body, 'primary');

      });
    });
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
    });
  }

}
