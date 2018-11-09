import config from '@app/../config'
import { DEFAULT_PAGER } from '@app/state/const'
import { employeeSchema } from '@app/state/ducks/smart/employee/schemas'
import { Employee } from '@app/state/ducks/smart/employee/types'
import { CommonFetchFailureAction, mergeRSAABase } from '@app/state/rootAction'
import { IPager, TCommonError } from '@app/types'
import { normalize } from 'normalizr'
import { RSAA } from 'redux-api-middleware'
import { $Call } from 'utility-types'

const ROOT = config.API_CONFIG.ROOT

export type FETCH_EMPLOYEE_LIST_REQUEST = 'smart/employee/FETCH_EMPLOYEE_LIST_REQUEST'
export const FETCH_EMPLOYEE_LIST_REQUEST: FETCH_EMPLOYEE_LIST_REQUEST = 'smart/employee/FETCH_EMPLOYEE_LIST_REQUEST'

export type FETCH_EMPLOYEE_LIST_SUCCESS = 'smart/employee/FETCH_EMPLOYEE_LIST_SUCCESS'
export const FETCH_EMPLOYEE_LIST_SUCCESS: FETCH_EMPLOYEE_LIST_SUCCESS = 'smart/employee/FETCH_EMPLOYEE_LIST_SUCCESS'

export type FETCH_EMPLOYEE_LIST_FAILURE = 'smart/employee/FETCH_EMPLOYEE_LIST_FAILURE'
export const FETCH_EMPLOYEE_LIST_FAILURE: FETCH_EMPLOYEE_LIST_FAILURE = 'smart/employee/FETCH_EMPLOYEE_LIST_FAILURE'

export const fetchEmployeeList = (pager: IPager = DEFAULT_PAGER) => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/employee/list?limit=${pager.limit}&offset=${pager.offset}&order=${pager.order || 'desc'}&orderBy=${pager.orderBy || 'id'}&query=${pager.query || ''}`,
      types: [
        FETCH_EMPLOYEE_LIST_REQUEST,
        {
          type: FETCH_EMPLOYEE_LIST_SUCCESS,
          payload: (_action: any, _state: any, res: any) => {
            return res.json().then((json: any) => ({ data: normalize(json.data.rows, [employeeSchema]), count: json.data.count }))
          },
        },
        FETCH_EMPLOYEE_LIST_FAILURE,
      ],
    }),
  }
}

export interface FetchEmployeeListSuccessAction {
  type: FETCH_EMPLOYEE_LIST_SUCCESS
  payload: {
    count: number
    data: {
      result: number[]
      entities: {
        employees: { [key: number]: Employee },
      },
    },
  }
}

export type SUBMIT_BATCH_ACCESS_EDIT_REQUEST = 'smart/employee/SUBMIT_BATCH_ACCESS_EDIT_REQUEST'
export const SUBMIT_BATCH_ACCESS_EDIT_REQUEST: SUBMIT_BATCH_ACCESS_EDIT_REQUEST = 'smart/employee/SUBMIT_BATCH_ACCESS_EDIT_REQUEST'

export type SUBMIT_BATCH_ACCESS_EDIT_SUCCESS = 'smart/employee/SUBMIT_BATCH_ACCESS_EDIT_SUCCESS'
export const SUBMIT_BATCH_ACCESS_EDIT_SUCCESS: SUBMIT_BATCH_ACCESS_EDIT_SUCCESS = 'smart/employee/SUBMIT_BATCH_ACCESS_EDIT_SUCCESS'

export type SUBMIT_BATCH_ACCESS_EDIT_FAILURE = 'smart/employee/SUBMIT_BATCH_ACCESS_EDIT_FAILURE'
export const SUBMIT_BATCH_ACCESS_EDIT_FAILURE: SUBMIT_BATCH_ACCESS_EDIT_FAILURE = 'smart/employee/SUBMIT_BATCH_ACCESS_EDIT_FAILURE'

export const submitBatchAccessEdit = (accesses: number[], employeeIds: number[]) => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/employee/submitBatchAccessEdit`,
      method: 'POST',
      body: JSON.stringify({
        accesses,
        ids: employeeIds,
      }),
      types: [SUBMIT_BATCH_ACCESS_EDIT_REQUEST, SUBMIT_BATCH_ACCESS_EDIT_SUCCESS, SUBMIT_BATCH_ACCESS_EDIT_FAILURE],
    }),
  }
}

export interface SubmitBatchAccessEditSuccessAction {
  type: SUBMIT_BATCH_ACCESS_EDIT_SUCCESS
  payload: {
    isOk: true,
    data: number[],
  } | TCommonError
}

export type SUBMIT_BATCH_DATA_EDIT_REQUEST = 'smart/employee/SUBMIT_BATCH_DATA_EDIT_REQUEST'
export const SUBMIT_BATCH_DATA_EDIT_REQUEST: SUBMIT_BATCH_DATA_EDIT_REQUEST = 'smart/employee/SUBMIT_BATCH_DATA_EDIT_REQUEST'

export type SUBMIT_BATCH_DATA_EDIT_SUCCESS = 'smart/employee/SUBMIT_BATCH_DATA_EDIT_SUCCESS'
export const SUBMIT_BATCH_DATA_EDIT_SUCCESS: SUBMIT_BATCH_DATA_EDIT_SUCCESS = 'smart/employee/SUBMIT_BATCH_DATA_EDIT_SUCCESS'

export type SUBMIT_BATCH_DATA_EDIT_FAILURE = 'smart/employee/SUBMIT_BATCH_DATA_EDIT_FAILURE'
export const SUBMIT_BATCH_DATA_EDIT_FAILURE: SUBMIT_BATCH_DATA_EDIT_FAILURE = 'smart/employee/SUBMIT_BATCH_DATA_EDIT_FAILURE'

export const submitBatchDataEdit = (params: Partial<Employee>, employeeIds: number[]) => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/employee/submitBatchDataEdit`,
      method: 'POST',
      body: JSON.stringify({
        ...params,
        ids: employeeIds,
      }),
      types: [SUBMIT_BATCH_DATA_EDIT_REQUEST, SUBMIT_BATCH_DATA_EDIT_SUCCESS, SUBMIT_BATCH_DATA_EDIT_FAILURE],
    }),
  }
}

export interface SubmitBatchDataEditSuccessAction {
  type: SUBMIT_BATCH_DATA_EDIT_SUCCESS
  payload: {
    isOk: true,
    data: number[],
  } | TCommonError
}

export type FETCH_EMPLOYEE_REQUEST = 'smart/employee/FETCH_EMPLOYEE_REQUEST'
export const FETCH_EMPLOYEE_REQUEST: FETCH_EMPLOYEE_REQUEST = 'smart/employee/FETCH_EMPLOYEE_REQUEST'

export type FETCH_EMPLOYEE_SUCCESS = 'smart/employee/FETCH_EMPLOYEE_SUCCESS'
export const FETCH_EMPLOYEE_SUCCESS: FETCH_EMPLOYEE_SUCCESS = 'smart/employee/FETCH_EMPLOYEE_SUCCESS'

export type FETCH_EMPLOYEE_FAILURE = 'smart/employee/FETCH_EMPLOYEE_FAILURE'
export const FETCH_EMPLOYEE_FAILURE: FETCH_EMPLOYEE_FAILURE = 'smart/employee/FETCH_EMPLOYEE_FAILURE'

export const fetchEmployee = (id: number) => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/employee/get/${id}`,
      types: [FETCH_EMPLOYEE_REQUEST, FETCH_EMPLOYEE_SUCCESS, FETCH_EMPLOYEE_FAILURE],
    }),
  }
}

export interface FetchEmployeeSuccessAction {
  type: FETCH_EMPLOYEE_SUCCESS
  payload: {
    isOk: boolean,
    data: Employee,
  }
}

export type CREATE_EMPLOYEE_REQUEST = 'smart/employee/CREATE_EMPLOYEE_REQUEST'
export const CREATE_EMPLOYEE_REQUEST: CREATE_EMPLOYEE_REQUEST = 'smart/employee/CREATE_EMPLOYEE_REQUEST'

export type CREATE_EMPLOYEE_SUCCESS = 'smart/employee/CREATE_EMPLOYEE_SUCCESS'
export const CREATE_EMPLOYEE_SUCCESS: CREATE_EMPLOYEE_SUCCESS = 'smart/employee/CREATE_EMPLOYEE_SUCCESS'

export type CREATE_EMPLOYEE_FAILURE = 'smart/employee/CREATE_EMPLOYEE_FAILURE'
export const CREATE_EMPLOYEE_FAILURE: CREATE_EMPLOYEE_FAILURE = 'smart/employee/CREATE_EMPLOYEE_FAILURE'

export const createEmployee = (employee: Employee) => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/employee/create`,
      method: 'POST',
      body: JSON.stringify(employee),
      types: [CREATE_EMPLOYEE_REQUEST, CREATE_EMPLOYEE_SUCCESS, CREATE_EMPLOYEE_FAILURE],
    }),
  }
}

export interface CreateEmployeeSuccessAction {
  type: CREATE_EMPLOYEE_SUCCESS
  payload: {
    isOk: true,
    data: number,
  } | TCommonError
}

export type FETCH_EMPLOYEE_ACCESSES_REQUEST = 'smart/employee/FETCH_EMPLOYEE_ACCESSES_REQUEST'
export const FETCH_EMPLOYEE_ACCESSES_REQUEST: FETCH_EMPLOYEE_ACCESSES_REQUEST = 'smart/employee/FETCH_EMPLOYEE_ACCESSES_REQUEST'

export type FETCH_EMPLOYEE_ACCESSES_SUCCESS = 'smart/employee/FETCH_EMPLOYEE_ACCESSES_SUCCESS'
export const FETCH_EMPLOYEE_ACCESSES_SUCCESS: FETCH_EMPLOYEE_ACCESSES_SUCCESS = 'smart/employee/FETCH_EMPLOYEE_ACCESSES_SUCCESS'

export type FETCH_EMPLOYEE_ACCESSES_FAILURE = 'smart/employee/FETCH_EMPLOYEE_ACCESSES_FAILURE'
export const FETCH_EMPLOYEE_ACCESSES_FAILURE: FETCH_EMPLOYEE_ACCESSES_FAILURE = 'smart/employee/FETCH_EMPLOYEE_ACCESSES_FAILURE'

export const fetchEmployeeAccesses = (id: number) => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/employee/get/accesses/${id}`,
      types: [FETCH_EMPLOYEE_ACCESSES_REQUEST, FETCH_EMPLOYEE_ACCESSES_SUCCESS, FETCH_EMPLOYEE_ACCESSES_FAILURE],
    }),
  }
}

export interface FetchEmployeeAccessesSuccessAction {
  type: FETCH_EMPLOYEE_ACCESSES_SUCCESS
  payload: {
    isOk: boolean,
    data: number[],
  }
}

export type DELETE_EMPLOYEE_BIND_REQUEST = 'smart/employee/DELETE_EMPLOYEE_BIND_REQUEST'
export const DELETE_EMPLOYEE_BIND_REQUEST: DELETE_EMPLOYEE_BIND_REQUEST = 'smart/employee/DELETE_EMPLOYEE_BIND_REQUEST'

export type DELETE_EMPLOYEE_BIND_SUCCESS = 'smart/employee/DELETE_EMPLOYEE_BIND_SUCCESS'
export const DELETE_EMPLOYEE_BIND_SUCCESS: DELETE_EMPLOYEE_BIND_SUCCESS = 'smart/employee/DELETE_EMPLOYEE_BIND_SUCCESS'

export type DELETE_EMPLOYEE_BIND_FAILURE = 'smart/employee/DELETE_EMPLOYEE_BIND_FAILURE'
export const DELETE_EMPLOYEE_BIND_FAILURE: DELETE_EMPLOYEE_BIND_FAILURE = 'smart/employee/DELETE_EMPLOYEE_BIND_FAILURE'

export const deleteEmployeeBind = (employeeId: number) => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/wechat/deleteBind/employee/${employeeId}`,
      types: [DELETE_EMPLOYEE_BIND_REQUEST, DELETE_EMPLOYEE_BIND_SUCCESS, DELETE_EMPLOYEE_BIND_FAILURE],
    }),
  }
}

export interface DeleteEmployeeBindSuccessAction {
  type: DELETE_EMPLOYEE_BIND_SUCCESS
  payload: {
    isOk: true,
  } | TCommonError
}
export type DELETE_EMPLOYEE_REQUEST = 'smart/employee/DELETE_EMPLOYEE_REQUEST'
export const DELETE_EMPLOYEE_REQUEST: DELETE_EMPLOYEE_REQUEST = 'smart/employee/DELETE_EMPLOYEE_REQUEST'

export type DELETE_EMPLOYEE_SUCCESS = 'smart/employee/DELETE_EMPLOYEE_SUCCESS'
export const DELETE_EMPLOYEE_SUCCESS: DELETE_EMPLOYEE_SUCCESS = 'smart/employee/DELETE_EMPLOYEE_SUCCESS'

export type DELETE_EMPLOYEE_FAILURE = 'smart/employee/DELETE_EMPLOYEE_FAILURE'
export const DELETE_EMPLOYEE_FAILURE: DELETE_EMPLOYEE_FAILURE = 'smart/employee/DELETE_EMPLOYEE_FAILURE'

export const deleteEmployee = (id: number) => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/employee/delete/${id}`,
      types: [DELETE_EMPLOYEE_REQUEST, DELETE_EMPLOYEE_SUCCESS, DELETE_EMPLOYEE_FAILURE],
    }),
  }
}

export interface DeleteEmployeeSuccessAction {
  type: DELETE_EMPLOYEE_SUCCESS
  payload: {
    isOk: true,
  } | TCommonError
}

export type DO_DELETE_EMPLOYEE = 'smart/employee/DO_DELETE_EMPLOYEE'
export const DO_DELETE_EMPLOYEE: DO_DELETE_EMPLOYEE = 'smart/employee/DO_DELETE_EMPLOYEE'

export const doDeleteEmployee = (employeeId: number) => ({
  type: DO_DELETE_EMPLOYEE,
  payload: {
    employeeId,
  },
}) as DoDeleteEmployeeAction

export interface DoDeleteEmployeeAction {
  type: DO_DELETE_EMPLOYEE
  payload: {
    employeeId: number
  }
}

export type UPDATE_EMPLOYEE_LIST_TIMESTAMP = 'smart/employee/UPDATE_EMPLOYEE_LIST_TIMESTAMP'
export const UPDATE_EMPLOYEE_LIST_TIMESTAMP: UPDATE_EMPLOYEE_LIST_TIMESTAMP = 'smart/employee/UPDATE_EMPLOYEE_LIST_TIMESTAMP'

export const updateEmployeeListTimestamp = () => ({
  type: UPDATE_EMPLOYEE_LIST_TIMESTAMP,
})

export const actions = {
  updateEmployeeListTimestamp,
}

const returnsOfActions = [
  ...Object.values(actions),
]

interface RequestAction {
  type: FETCH_EMPLOYEE_LIST_REQUEST | SUBMIT_BATCH_ACCESS_EDIT_REQUEST | SUBMIT_BATCH_DATA_EDIT_REQUEST | FETCH_EMPLOYEE_REQUEST |
  FETCH_EMPLOYEE_ACCESSES_REQUEST | DELETE_EMPLOYEE_BIND_REQUEST
}

type FailureAction = {
  type: FETCH_EMPLOYEE_LIST_FAILURE | SUBMIT_BATCH_ACCESS_EDIT_FAILURE | SUBMIT_BATCH_DATA_EDIT_FAILURE | FETCH_EMPLOYEE_FAILURE |
  FETCH_EMPLOYEE_ACCESSES_FAILURE | DELETE_EMPLOYEE_BIND_FAILURE
} & CommonFetchFailureAction

export type EmployeeAction = $Call<typeof returnsOfActions[number]> | RequestAction | FailureAction | FetchEmployeeListSuccessAction |
  SubmitBatchAccessEditSuccessAction | SubmitBatchDataEditSuccessAction | FetchEmployeeSuccessAction | FetchEmployeeAccessesSuccessAction |
  DeleteEmployeeBindSuccessAction
