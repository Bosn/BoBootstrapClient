export default class FormatUtils {
  public static money(s: string | number) {
    if (s === '') { return '-' }
    s = '' + s
    let isNegative = false
    if (s.substring(0, 1) === '-') {
      s = s.substring(1)
      isNegative = true
    }
    if (s.indexOf('.') > -1) {
      const sub = s.substring(s.indexOf('.' + 1))
      if (sub.length > 2) {
        s = s.substring(0, s.indexOf('.') + 3)
      }
    }
    let suffix = ''
    if (s.indexOf('.') >= 1) {
      suffix = s.substring(s.indexOf('.'))
      s = s.substring(0, s.indexOf('.'))
    }
    const arr = []
    for (let i = 0; i < s.length; i++) {
      if (i % 3 === 0 && i !== 0) {
        arr.push(',')
      }
      arr.push(s.charAt(s.length - i - 1))
    }
    return `￥${isNegative ? '-' : ''}${arr.reverse().join('')}${suffix}`
  }

  public static num(s: string | number) {
    const str = this.money(s)
    return str.substring(1)
  }

  public static date(d: number | string | Date, type?: undefined | 'yyyyMMdd' | 'MM/dd' | 'std') {
    if (typeof d === 'number' || !isNaN(+d)) {
      d = new Date(+d)
    } else if (typeof d === 'string') {
      d = new Date(d)
    }

    const year = d.getFullYear()
    const month = addZero(d.getMonth() + 1 + '')
    const day = addZero(d.getDate() + '')

    if (type === 'yyyyMMdd') {
      return year + month + day
    } else if (type === 'MM/dd') {
      return month + '/' + day
    } else if (type === 'std') {
      return year + '/' + month + '/' + day
    }
    return year + '-' + month + '-' + day
  }

  public static time(d: number | string | Date, isTail?: boolean) {
    if (typeof d === 'number' || !isNaN(+d)) {
      d = new Date(+d)
    } else if (typeof d === 'string') {
      d = new Date(d)
    }
    const result = addZero(d.getHours() + '') + ':' + addZero(d.getMinutes() + '')

    return isTail && result === '00:00' ? '24:00' : result
  }

  public static datetime(d: number | string | Date) {
    return `${this.date(d)} ${this.time(d)}`
  }

  public static numText(val: any) {
    if (typeof val === 'number') {
      return val
    }
    return val || ''
  }

  public static day(d: number) {
    if (d === 1) { return '一' }
    if (d === 2) { return '二' }
    if (d === 3) { return '三' }
    if (d === 4) { return '四' }
    if (d === 5) { return '五' }
    if (d === 6) { return '六' }
    if (d === 0) { return '日' }
    return '-'
  }

  public static companyShort(name: string) {
    if (!name) { return name }
    const iL = name.indexOf('（')
    const iR = name.indexOf('）')
    if (iL > -1 && iR > -1) {
      name = name.substring(iL + 1, iR)
    }
    return name
  }

  public static fromBirthday(val: string): Date | null {
    if (val) {
      if (val.length === 4) {
        return new Date(`${new Date().getFullYear()}-${val.substring(0, 2)}-${val.substring(2)}`)
      } else if (val.length === 8) {
        return new Date(`${val.substring(0, 4)}-${val.substring(4, 6)}-${val.substring(6)}`)
      }
    }
    return null
  }

  public static parseDate(d: string): Date | null {
    const try1 = new Date(d)
    if (+try1 > 0) {
      return this.setZero(try1)
    }
    if (d.length === 8) {
      const try2 = new Date(`${d.substring(0, 4)}-${d.substring(4, 6)}-${d.substring(6)}`)
      if (+try2 > 0) {
        return this.setZero(try2)
      }
    }
    return null
  }

  public static setZero(d: Date) {
    d.setHours(0)
    d.setMinutes(0)
    d.setSeconds(0)
    d.setMilliseconds(0)
    return d
  }

  public static timeByHour(hour: number) {
    let prefix = String(Math.floor(hour))
    if (prefix.length === 1) {
      prefix = '0' + prefix
    }
    const suffix = hour === Math.floor(hour) ? '00' : '30'
    return `${prefix}:${suffix}`
  }

  public static short(str: string, num: number = 20) {
    return str.length <= 20 ? str : str.substring(0, num) + '...'
  }
}

function addZero(str: string) {
  str = str + ''
  if (str && str.length === 1) {
    return '0' + str
  }
  return str
}
