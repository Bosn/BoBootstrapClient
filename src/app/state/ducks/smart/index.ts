import { combineReducers } from 'redux'
import { EmployeeAction } from '@app/state/ducks/smart/employee/actions'
import { EmployeeReducer } from '@app/state/ducks/smart/employee/reducers'
import { EmployeeState } from '@app/state/ducks/smart/employee/types'
import { CustomerState } from './customer/types'
import { CustomerReducer } from './customer/reducers'
import { CustomerAction } from './customer/actions'

export interface SmartState {
  employee: EmployeeState
  customer: CustomerState
}

export type SmartAction =  EmployeeAction | CustomerAction

export const smartReducer = combineReducers<SmartState, SmartAction>({
  employee: EmployeeReducer,
  customer: CustomerReducer,
})
