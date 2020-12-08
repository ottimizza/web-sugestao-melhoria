export class DateUtils {

  public static format(date: Date) {
    let day = date.getDate().toString();
    let month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();

    day = +day < 10 ? `0${day}` : day;
    month = +month < 10 ? `0${month}` : month;

    return `${day}/${month}/${year}`;
  }

  public static ymdToDmy(date: string) {
    if (date.length !== 10) {
      throw new Error('The date passed to the method DateUtils.ymdToDmy() is not in the formate yyyy-mm-dd');
    } else {
      const dates = date.split('-');
      if (dates.length !== 3) {
        throw new Error('The date passed to the method DateUtils.ymdToDmy() is not in the formate yyyy-mm-dd');
      }
      return `${dates[2]}/${dates[1]}/${dates[0]}`;
    }
  }

  public static ymdToCompetence(date: string) {
    const dates = date.split('-');
    return `${dates[1]}/${dates[0]}`;
  }

  public static lastCompetence(competence: string) {
    const dates = competence.split('/').map(d => +d);
    if (dates[0] > 1) {
      const month = dates[0] - 1;
      let monthText = `${month}`;
      if (month < 10) {
        monthText = '0' + monthText;
      }
      return `${monthText}/${dates[1]}`;
    } else {
      return `12/${dates[1] - 1}`;
    }

  }

  public static getTracedDate(date: Date) {
    const dates = this._getDateInfos(date);
    return `${dates[2]}-${dates[1]}-${dates[0]}`;
  }

  public static getDateString(date: Date) {
    const dates = this._getDateInfos(date);
    return `${dates[0]}/${dates[1]}/${dates[2]}`;
  }

  private static _getDateInfos(date: Date) {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    let fullDay = `${day}`;
    let fullMonth = `${month}`;
    if (day < 10) {
      fullDay = '0' + fullDay;
    }
    if (month < 10) {
      fullMonth = '0' + fullMonth;
    }

    return [fullDay, fullMonth, year];
  }

}
