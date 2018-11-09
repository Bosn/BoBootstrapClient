
import { EmployeeAction, FETCH_EMPLOYEE_ACCESSES_FAILURE, FETCH_EMPLOYEE_ACCESSES_REQUEST, FETCH_EMPLOYEE_ACCESSES_SUCCESS, FETCH_EMPLOYEE_FAILURE, FETCH_EMPLOYEE_LIST_FAILURE, FETCH_EMPLOYEE_LIST_REQUEST, FETCH_EMPLOYEE_LIST_SUCCESS, FETCH_EMPLOYEE_REQUEST, FETCH_EMPLOYEE_SUCCESS, SUBMIT_BATCH_ACCESS_EDIT_FAILURE, SUBMIT_BATCH_ACCESS_EDIT_REQUEST, SUBMIT_BATCH_ACCESS_EDIT_SUCCESS, UPDATE_EMPLOYEE_LIST_TIMESTAMP } from '@app/state/ducks/smart/employee/actions'
import { Employee, EmployeeState, ViewAccessesState } from '@app/state/ducks/smart/employee/types'
import { IAsync, TItemState, TPagerListState } from '@app/types'
import { combineReducers } from 'redux'

const EMPLOYEE_LIST_INIT: TPagerListState<Employee> = {
  data: {
    isFetching: false, result: [], entities: { employees: {} },
  },
  count: 0,
}

function list(state: TPagerListState<Employee> = EMPLOYEE_LIST_INIT, action: EmployeeAction): TPagerListState<Employee> {
  switch (action.type) {
    case FETCH_EMPLOYEE_LIST_SUCCESS:
      return { ...action.payload, data: { ...action.payload.data, isFetching: false } }
    case FETCH_EMPLOYEE_LIST_REQUEST:
      return { ...state, data: { ...state.data, isFetching: true } }
    case FETCH_EMPLOYEE_LIST_FAILURE:
      return { ...state, data: { ...state.data, isFetching: false } }
  }
  return state
}

export const EMPLOYEE_INIT: TItemState<Employee> = {
  id: 0,
  sex: true,
  name: '',
  nickname: '',
  avatarImg: '',
  mobile: '',
  isFetching: false,
}

function view(state: TItemState<Employee> = EMPLOYEE_INIT, action: EmployeeAction): TItemState<Employee> {
  switch (action.type) {
    case FETCH_EMPLOYEE_REQUEST:
    case FETCH_EMPLOYEE_FAILURE:
      return { ...state, isFetching: true }
    case FETCH_EMPLOYEE_SUCCESS:
      return { ...action.payload.data, isFetching: false }
  }
  return state
}

function viewAccesses(state: ViewAccessesState = { isFetching: false, accesses: [] }, action: EmployeeAction): ViewAccessesState {
  switch (action.type) {
    case FETCH_EMPLOYEE_ACCESSES_REQUEST:
      return { ...state, isFetching: true }
    case FETCH_EMPLOYEE_ACCESSES_FAILURE:
      return { ...state, isFetching: false }
    case FETCH_EMPLOYEE_ACCESSES_SUCCESS:
      return { accesses: action.payload.data, isFetching: false }
  }
  return state
}

function batchEdit(state: IAsync = { isFetching: false }, action: EmployeeAction): IAsync {
  switch (action.type) {
    case SUBMIT_BATCH_ACCESS_EDIT_REQUEST:
      return { isFetching: true }
    case SUBMIT_BATCH_ACCESS_EDIT_FAILURE:
    case SUBMIT_BATCH_ACCESS_EDIT_SUCCESS:
      return { isFetching: false }
  }
  return state
}

function listTimestamp(state: Date = new Date(), action: EmployeeAction): Date {
  switch (action.type) {
    case UPDATE_EMPLOYEE_LIST_TIMESTAMP:
      return new Date()
  }
  return state
}

export const EmployeeReducer = combineReducers<EmployeeState, EmployeeAction>({
  list,
  listTimestamp,
  view,
  viewAccesses,
  batchEdit,
})
