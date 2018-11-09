import { PAGE_STATE_KEY } from '@app/state/const'

export default class LocalState {
  public static get(key: string): any {
    try {
      const json = localStorage.getItem(key)
      if (json) {
        return JSON.parse(json)
      } else {
        return null
      }
    } catch (ex) {
      return null
    }
  }

  public static set(key: string, val: any) {
    try {
      localStorage.setItem(key, JSON.stringify(val))
    } catch (ex) {
      // nothing
    }
  }
  public static tryLoadPageState(key: PAGE_STATE_KEY) {
    const state = this.get(key)
    return state || {}
  }
}
