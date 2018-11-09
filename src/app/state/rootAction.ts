import { SharedAction } from '@app/state/ducks/shared/actions'
import { ApiError } from 'redux-api-middleware'
import { SmartAction } from '@app/state/ducks/smart'

export interface CommonFetchFailureAction {
  payload: ApiError
  error: true
}

const RSAA_BASE = {
  credentials: 'include',
  method: 'GET',
  headers: { 'Content-Type': 'application/json' },
}

export const mergeRSAABase = (obj: object) => {
  return {...RSAA_BASE, ...obj}
}

export type RootAction = SharedAction | SmartAction
