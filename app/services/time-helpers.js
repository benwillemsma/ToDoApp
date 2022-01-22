import Service from '@ember/service';

export default class TimeHelpersService extends Service {
  intervalTypes = ['None', 'minute', 'hour', 'day', 'week', 'month', 'year'];

  timesOverlap(start1, end1, start2, end2) {
    return end1 > start2 && start1 < end2;
  }

  addInterval([indate, count, type]) {
    let outdate = new Date(indate);
    if (typeof type === 'string' || type instanceof String)
      type = type.toLocaleLowerCase();
    switch (type) {
      case 'minute':
      case 'minutes':
      case 1:
        outdate.setMinutes(outdate.getMinutes() + count);
        break;
      case 'hour':
      case 'hours':
      case 2:
        outdate.setHours(outdate.getHours() + count);
        break;
      case 'day':
      case 'days':
      case 3:
        outdate.setDate(outdate.getDate() + count);
        break;
      case 'week':
      case 'weeks':
      case 4:
        outdate.setDate(outdate.getDate() + 7 * count);
        break;
      case 'month':
      case 'months':
      case 5:
        outdate.setMonth(outdate.getMonth() + count);
        break;
      case 'year':
      case 'years':
      case 6:
        outdate.setFullYear(outdate.getFullYear() + count);
        break;
      default:
        break;
    }
    return outdate;
  }
}
