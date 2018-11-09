import { IOption } from '@app/types'

export default class DataUtils {
  public static getTextByValue(list: Array<IOption | { label: string, value: string | number }>, value: string | number) {
    if (!value) {
      return '-'
    }
    for (const item of list) {
      if (item.value === value) {
        const o: any = item
        return o.text || o.label
      }
    }
    return '-'
  }

}
