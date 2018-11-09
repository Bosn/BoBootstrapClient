import { SharedReducer } from '@app/state/ducks/shared/reducers'
import { SharedState } from '@app/state/ducks/shared/types'
import { smartReducer, SmartState } from '@app/state/ducks/smart'
import { combineReducers } from 'redux'
import { RootAction } from './rootAction'

export interface RootState {
  shared: SharedState,
  smart: SmartState,
}

const rootReducer = combineReducers<RootState, RootAction>({
  shared: SharedReducer,
  smart: smartReducer,
})

export default rootReducer
