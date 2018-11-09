import { IDateRange } from '@app/types'
import FormatUtils from './format'
import moment from 'moment'
import { DATE_CONST } from '@app/state/const'

export default class DateUtils {
  public static getDateRangeByOffset(offset: number): IDateRange {
    if (offset >= 0 || offset <= -24) {
      offset = 0
    }
    const startDate = new Date()
    startDate.setDate(1)
    startDate.setHours(0)
    startDate.setMinutes(0)
    startDate.setSeconds(0)
    if (offset < 0) {
      startDate.setMonth(startDate.getMonth() + offset)
    }

    let endDate
    endDate = new Date(startDate.getTime())
    endDate.setMonth(endDate.getMonth() + 1)
    return { begin: startDate, end: endDate }
  }

  public static getDateRangeByQuickDate(val: QUICK_DATE): IDateRange {
    let startDate: Date = new Date()
    let endDate: Date = FormatUtils.setZero(new Date(new Date().getTime() + DATE_CONST.DAY))
    switch (+val) {
      case QUICK_DATE.TODAY:
        startDate = FormatUtils.setZero(new Date())
        endDate = new Date(+startDate + DATE_CONST.DAY)
        break
      case QUICK_DATE.THIS_WEEK:
        startDate = moment().startOf('isoWeek').toDate()
        break
      case QUICK_DATE.THIS_MONTH:
        startDate = moment().startOf('month').toDate()
        break
      case QUICK_DATE.THIS_YEAR:
        startDate = moment().startOf('year').toDate()
        break
      case QUICK_DATE.LAST_MONTH:
        startDate = moment().startOf('month').toDate()
        endDate = new Date(+startDate)
        startDate.setMonth(startDate.getMonth() - 1)
        break
    }
    return { begin: startDate, end: endDate }
  }

  public static setZero(d: Date) {
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)
    d.setMilliseconds(0)
    return d
  }

  public static getDayRange(date: Date): IDateRange {
    const begin = this.setZero(date || new Date())
    const end = new Date(+begin)
    end.setDate(end.getDate() + 1)
    return { begin, end }
  }

}

export enum QUICK_DATE {
  TODAY = 1,
  THIS_WEEK = 2,
  THIS_MONTH = 3,
  THIS_YEAR = 4,
  LAST_MONTH = 5,
}

export const QUICK_DATE_LIST = [
  { text: '今天', value: QUICK_DATE.TODAY },
  { text: '本周', value: QUICK_DATE.THIS_WEEK },
  { text: '本月', value: QUICK_DATE.THIS_MONTH },
  { text: '今年', value: QUICK_DATE.THIS_YEAR },
  { text: '上个月', value: QUICK_DATE.LAST_MONTH },
]
