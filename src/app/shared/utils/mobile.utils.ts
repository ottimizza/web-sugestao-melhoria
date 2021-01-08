import { Subject } from 'rxjs';

export class MobileUtils {

  private static resize$ = new Subject<unknown>();

  public static get isMobile() {
    const toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];

    return toMatch.some(toMatchItem => navigator.userAgent.match(toMatchItem));
  }

  public static get onResize() {
    return this.resize$.asObservable();
  }

  public static windowIsResizing(event?: any) {
    this.resize$.next(event);
  }

}
