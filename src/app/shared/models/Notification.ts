import { User } from './User';

export class NotificaitonMessage {
  constructor(
    public tag: string,
    public title: string,
    public body: string,
    public click_action: string,
    // public notification_count: string,
    public default_vibrate_timings = 'true',
    public vibrate_timings = ['1s'],
    public color = '#ffffff',
    public sticky = true,
    public notification_priority = 1,
    // public image = 'https://ottimizza.com.br/wp-content/themes/ottimizza/images/logo-inverse.png',
    public icon = NotificaitonMessage.getIcon(),
    ) {}

    private static getIcon() {
      return User.fromLocalStorage().avatar || 'https://i.imgur.com/hOhe9Eh.png';
    }
}

export class PushNotification {
    public notification: NotificaitonMessage;

    constructor(
      public username: string,
      public applicationId: string,
      tag: string,
      title: string,
      body: string,
      action?: string,
    ) {
      this.notification = new NotificaitonMessage(tag, title, body, action);
    }

}
