import _ from 'lodash';
import moment from 'moment-timezone';
import { DateTime } from 'luxon';
import { timer } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class ClockHelper {
  tzLocal = '';

  constructor() {
    this.tzLocal = moment.tz(moment.tz.guess(true)).format('Z');
  }

  timezones(timezones) {
    const predefine = {
      utc: { name: 'UTC', offset: '+00:00', clock: '' },
      hongkong: { name: 'Asia/Hong Kong', offset: '+08:00', clock: '' },
      local: {
        name: moment.tz.guess(true),
        offset: moment.tz(moment.tz.guess()).format('Z'),
        clock: ''
      }
    };

    return _.pickBy(predefine, (v, k) => {
      return timezones.includes(k);
    });
  }

  runClock(timezones) {
    return timer(0, 1000).subscribe(() => {
      timezones.forEach(timezone => {
        timezone.clock = moment().utcOffset(timezone.offset).format('D MMM, HH:mm:ss');
      });
    });
  }

  offsetTime(datetime, offset, format = 'YYYY-MM-DD HH:mm:ss') {
    return moment(datetime).utcOffset(offset).format(format);
  }

  offsetToZoneTime(datetime, offset, format = "yyyy-MM-dd HH:mm:ss") {
    const zone = this.toZoneName(offset);
    return DateTime.fromISO(datetime, { zone }).toFormat(format)
  }

  predefineRange(type, range) {
    switch (type) {
      case 'sport':
      case 'fifa':
        return this.predefine(range, this.tzLocal, '-04:00');
      case 'normal':
        return this.predefine(range, this.tzLocal, this.tzLocal);
      default:
        return this.predefine(range, '+00:00', '+00:00');
    }
  }

  // format:
  // datetime = string, 2019-11-05 12:34:56
  // fromFormat, toFormat = string, "+00:00", "+08:00", "-06:00", "sport", "fifa", "utc"
  convert(datetime, fromFormat, toFormat) {
    const tzOffsetFrom = this.toTimezone(fromFormat);
    const tzOffsetTo = this.toTimezone(toFormat);
    return this.convertDateTimeByTimezone(datetime, tzOffsetFrom, tzOffsetTo);
  }

  range([datefrom, dateto], fromFormat, toFormat) {
    const tzOffsetFrom = this.toTimezone(fromFormat);
    const tzOffsetTo = this.toTimezone(toFormat);

    const from = this.convertDateTimeByTimezone(datefrom, tzOffsetFrom, tzOffsetTo);
    const to = this.convertDateTimeByTimezone(dateto, tzOffsetFrom, tzOffsetTo);

    // in range, date-TO need to add one day for date-time query
    // >= 2019-11-04 00:00:00 && < 2019-11-06 00:00:00
    // NOT >= 2019-11-04 00:00:00 && < 2019-11-05 00:00:00
    const cdatefrom = from;
    const cdateto = moment(to).add(1, 'days');

    return [cdatefrom, cdateto];
  }

  // predefine for date, not datetime
  // we still returning moment object
  // but please never use the time(HH:mm:ss) in format.
  // but please never add/substract in time manner.
  // date = reference for "today", in case user need to know a specific predefine date range of that date
  // usually date = today
  // ONlY IN WEB: have to use local timezone to get today's date
  predefine(range, fromFormat, toFormat, today = moment().format()) {
    today = moment(today).utcOffset(this.tzLocal).format();
    const tzOffsetFrom = this.toTimezone(fromFormat);
    const tzOffsetTo = this.toTimezone(toFormat);

    let from, to, start;
    start = this.convertDateTimeByTimezone(today, tzOffsetFrom, tzOffsetTo);
    start = moment(start.format('YYYY-MM-DD 00:00:00'));

    switch (range) {
      case 'today':
        from = start;
        to = from.clone().add(0, 'day');
        break;
      case 'yesterday':
        from = start.subtract(1, 'day');
        to = from.clone().add(0, 'day');
        break;
      case 'tomorrow':
        from = start.add(1, 'day');
        to = from.clone().add(0, 'day');
        break;
      case 'this-week':
        from = start.startOf('isoWeek'); // start on monday
        to = from.clone().add(1, 'weeks').subtract(1, 'days');
        break;
      case 'last-week':
        from = start.startOf('isoWeek').subtract(1, 'weeks'); // start on monday
        to = from.clone().add(1, 'weeks').subtract(1, 'days');
        break;
      case 'next-week':
        from = start.startOf('isoWeek').add(1, 'weeks'); // start on monday
        to = from.clone().add(1, 'weeks');
        break;
      case 'this-month':
        from = start.startOf('month');
        to = from.clone().endOf('month');
        break;
      case 'last-month':
        from = start.startOf('month').subtract(1, 'months');
        to = from.clone().endOf('month');
        break;
      case 'next-month':
        from = start.startOf('month').add(1, 'months');
        to = from.clone().endOf('month');
        break;
    }

    return [from, to];
  }

  // The most lowest level of convert function
  // it expect date-time only, with timezone-from and timezone-to
  // format:
  // datetime = string, 2019-11-05 12:34:56
  // tzOffsetFrom, tzOffsetTo = string, "+00:00", "+08:00", "-06:00"
  // WARNING: it return in UTC anyhow.
  //  the return moment object is NOT for timezone purpose
  //  it just make the user convenient in add/substract, formating.
  convertDateTimeByTimezone(datetime, tzOffsetFrom, tzOffsetTo) {
    const tzOffsetFromInv = this.inverseTimezone(tzOffsetFrom);

    const AtoUTC = moment(datetime).utcOffset(tzOffsetFromInv);
    // console.log('AtoUTC ', AtoUTC.format());

    const UTCtoB = moment(AtoUTC.format()).utcOffset(tzOffsetTo);
    // console.log('UTCtoB ', UTCtoB.format());

    const result = moment(UTCtoB.format());

    return result;
  }

  convertDateTimeByTimezoneMS(datetime, tzOffsetFrom, tzOffsetTo) {
    const tzOffsetFromInv = this.inverseTimezone(tzOffsetFrom);

    const AtoUTC = moment(datetime).utcOffset(tzOffsetFromInv);
    // console.log('AtoUTC ', AtoUTC.format());

    const UTCtoB = moment(AtoUTC.format('YYYY-MM-DD HH:mm:ss.SSS')).utcOffset(tzOffsetTo);
    // console.log('UTCtoB ', UTCtoB.format());

    const result = moment(UTCtoB.format('YYYY-MM-DD HH:mm:ss.SSS'));

    return result;
  }

  toTimezone(format) {
    switch (format) {
      case 'fifa':
      case 'sports': return '-04:00';
      case 'utc': return '+00:00';
      default: return format;
    }
  }


  toZoneName(format) {

    switch (format) {
      case '+00:00': return 'UTC';
      case '+01:00': return 'Etc/GMT-1';
      case '+02:00': return 'Etc/GMT-2';
      case '+03:00': return 'Etc/GMT-3';
      case '+04:00': return 'Etc/GMT-4';
      case '+05:00': return 'Etc/GMT-5';
      case '+06:00': return 'Etc/GMT-6';
      case '+07:00': return 'Etc/GMT-7';
      case '+08:00': return 'Etc/GMT-8';
      case '+09:00': return 'Etc/GMT-9';
      case '+10:00': return 'Etc/GMT-10';
      case '+11:00': return 'Etc/GMT-11';
      case '+12:00': return 'Etc/GMT-12';
      case '+13:00': return 'Etc/GMT-13';
      case '+14:00': return 'Etc/GMT-14';
      default: return format;
    }


  }



  inverseTimezone(tzoffset) {
    switch (tzoffset[0]) {
      case '+': return tzoffset.replace('+', '-');
      case '-': return tzoffset.replace('-', '+');
    }
  }
}

export { ClockHelper };
