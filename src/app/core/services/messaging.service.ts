import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { HttpHandlerService } from './http-handler.service';
import { environment } from '@env';
import { User } from '@shared/models/User';
import { PushNotification } from '@shared/models/Notification';

const BASE_URL = `${environment.messagingBaseUrl}/api/v1/notifications/fcm`;

@Injectable({ providedIn: 'root' })
export class MessagingService {

  public readonly APPLICATION_ID = 'ottimizza-sugestao-de-melhorias';

  currentMessage = new BehaviorSubject(null);

  constructor(public afm: AngularFireMessaging, private http: HttpHandlerService) {
    // this.afm.messaging.subscribe((messaging: any) => {
    //   messaging.onMessage = messaging.onMessage.bind(messaging);
    //   messaging._next = (payload: any) => {
    //     console.log(payload);
    //     this.currentMessage.next(payload);
    //   };
    //   messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
    // });
  }

  public requestPermission() {
    this.afm.requestToken.subscribe(token => {
      this._registerUser(token).subscribe(() => {
        this._sendTestNotification();
      });
    }, err => {
      console.error('Unable to get permission to notify.', err);
    });
  }

  public receiveMessage() {
    this.afm.messages.subscribe((messaging: any) => {
      messaging.onMessage = messaging.onMessage.bind(messaging);
      messaging._next = (payload: any) => {
        console.log(payload);
        this.currentMessage.next(payload);
      };
      messaging.onTokenRefresh = messaging.onTokenRefresh.bind(messaging);
    });
  }

  public sendNotification(notification: PushNotification) {
    const url = `${BASE_URL}/push`;
    return this.http.post(url, notification, 'Falha ao notificar usuário!');
  }

  private _registerUser(token: string) {
    const url = `${BASE_URL}/subscribe`;
    const body = { username: this._username, registrationId: token, applicationId: this.APPLICATION_ID };
    return this.http.post(url, body, 'Falha ao regristrar-se no serviço de notificações');
  }

  private _sendTestNotification() {
    const notification = new PushNotification(
      this._username,
      this.APPLICATION_ID,
      'Validando conexão com o servidor de notificações',
      'Sucesso!',
      'Notificações habilitadas com sucesso!'
    );
    notification.notification.icon = 'https://ottimizza.com.br/wp-content/themes/ottimizza/images/favicon.ico';
    this.sendNotification(notification).subscribe();
  }

  private get _username() {
    const currentUser = User.fromLocalStorage();
    return currentUser.email || currentUser.username;
  }

}
