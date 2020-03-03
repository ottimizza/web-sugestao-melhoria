export class MobileUtils {

  private static _resizingFunctions: ((event: Event) => void)[] = [];

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

  public static onResize(callbackFn: (event: Event) => void) {
    this._resizingFunctions.push(callbackFn);
  }

  public static windowIsResizing(event: Event) {
    // ! Este método deve ser chamado SOMENTE pelo app.component
    this._resizingFunctions.forEach(cbfn => cbfn(event));
  }

}
