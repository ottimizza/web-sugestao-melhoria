import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { MessagingService } from '@app/services/messaging.service';
import { UpdateService } from '@app/services/update.service';
import { RxEvent } from '@app/services/rx-event.service';
import { MobileUtils } from '@shared/utils/mobile.utils';
import { PopulatorService } from '@app/services/populator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public updateAvailable = false;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    private events: RxEvent,
    private updateService: UpdateService,
    private messagingService: MessagingService,
    private populatorService: PopulatorService
  ) {
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

  onResize(event: Event) {
    MobileUtils.windowIsResizing(event);
  }

  public ngOnInit() {
    // if (MobileUtils.isMobile) {
    //   LoggerUtils.log(`Dispositivo MOBILE`);
    // } else {
    //   LoggerUtils.log(`Dispositivo DESKTOP`);
    // }

    this.messagingService.receiveMessage();
    this.messagingService.currentMessage.subscribe();

  }

}
