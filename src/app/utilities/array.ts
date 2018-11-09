export default class ArrayUtils {
  public static getLabel(arr: Array<{ label: string, value: string | number }>, val: string | number) {
    // tslint:disable-next-line:triple-equals
    const items = arr.filter(x => x.value == val)
    if (items.length) {
      return items[0].label
    }
    return '-'
  }
}
