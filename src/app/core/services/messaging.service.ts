import { Injectable, Inject } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/messaging';

@Injectable({ providedIn: 'root' })
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(public afm: AngularFireMessaging) {
  this.afm.messaging.subscribe((_messaging: any) => {
    // _messaging.onMessage = _messaging.onMessage.bind(_messaging);
    _messaging._next = (payload: any) => console.log(payload);
    _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
  });
  }

  requestPermission() {
    this.afm.requestToken.subscribe(token => {
      console.log(token);
    },
    err => {
      console.error('Unable to get permission to notify.', err);
    });
  }

  receiveMessage() {
    this.afm.messages.subscribe(payload => {
      console.log('new message received. ', payload);
      this.currentMessage.next(payload);
    });
  }

}
