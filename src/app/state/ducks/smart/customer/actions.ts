import config from '@app/../config'
import { CommonFetchFailureAction, mergeRSAABase } from '@app/state/rootAction'
import { RSAA } from 'redux-api-middleware'
import { TCommonError, IPager } from '@app/types'
import { $Call } from 'utility-types'
import { Customer } from './types'
import { DEFAULT_PAGER } from '@app/state/const'
import { customerSchema } from './schemas'
import { normalize } from 'normalizr'

const ROOT = config.API_CONFIG.ROOT

export type FETCH_CUSTOMER_LIST_REQUEST = 'smart/customer/FETCH_CUSTOMER_LIST_REQUEST'
export const FETCH_CUSTOMER_LIST_REQUEST: FETCH_CUSTOMER_LIST_REQUEST = 'smart/customer/FETCH_CUSTOMER_LIST_REQUEST'

export type FETCH_CUSTOMER_LIST_SUCCESS = 'smart/customer/FETCH_CUSTOMER_LIST_SUCCESS'
export const FETCH_CUSTOMER_LIST_SUCCESS: FETCH_CUSTOMER_LIST_SUCCESS = 'smart/customer/FETCH_CUSTOMER_LIST_SUCCESS'

export type FETCH_CUSTOMER_LIST_FAILURE = 'smart/customer/FETCH_CUSTOMER_LIST_FAILURE'
export const FETCH_CUSTOMER_LIST_FAILURE: FETCH_CUSTOMER_LIST_FAILURE = 'smart/customer/FETCH_CUSTOMER_LIST_FAILURE'

export const fetchCustomerList = (pager: IPager = DEFAULT_PAGER, search: { advisorId: number, trainerId: number }) => {
  const { advisorId, trainerId } = search
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/customer/list?limit=${pager.limit}&offset=${pager.offset}&order=${pager.order || 'desc'}&orderBy=${pager.orderBy || 'id'}&query=${pager.query || ''}&trainerId=${trainerId || ''}&advisorId=${advisorId}`,
      types: [
        FETCH_CUSTOMER_LIST_REQUEST,
        {
          type: FETCH_CUSTOMER_LIST_SUCCESS,
          payload: (_action: any, _state: any, res: any) => {
            return res.json().then((json: any) => ({ data: normalize(json.data.rows, [customerSchema]), count: json.data.count }))
          },
        },
        FETCH_CUSTOMER_LIST_FAILURE,
      ],
    }),
  }
}

export interface FetchCustomerListSuccessAction {
  type: FETCH_CUSTOMER_LIST_SUCCESS
  payload: {
    count: number
    data: {
      result: number[]
      entities: {
        customers: { [key: number]: Customer },
      },
    },
  }
}

export type SUBMIT_BATCH_DATA_EDIT_REQUEST = 'smart/customer/SUBMIT_BATCH_DATA_EDIT_REQUEST'
export const SUBMIT_BATCH_DATA_EDIT_REQUEST: SUBMIT_BATCH_DATA_EDIT_REQUEST = 'smart/customer/SUBMIT_BATCH_DATA_EDIT_REQUEST'

export type SUBMIT_BATCH_DATA_EDIT_SUCCESS = 'smart/customer/SUBMIT_BATCH_DATA_EDIT_SUCCESS'
export const SUBMIT_BATCH_DATA_EDIT_SUCCESS: SUBMIT_BATCH_DATA_EDIT_SUCCESS = 'smart/customer/SUBMIT_BATCH_DATA_EDIT_SUCCESS'

export type SUBMIT_BATCH_DATA_EDIT_FAILURE = 'smart/customer/SUBMIT_BATCH_DATA_EDIT_FAILURE'
export const SUBMIT_BATCH_DATA_EDIT_FAILURE: SUBMIT_BATCH_DATA_EDIT_FAILURE = 'smart/customer/SUBMIT_BATCH_DATA_EDIT_FAILURE'

export const submitBatchDataEdit = (params: Partial<Customer>, customerIds: number[]) => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/customer/submitBatchDataEdit`,
      method: 'POST',
      body: JSON.stringify({
        ...params,
        ids: customerIds,
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

export type FETCH_CUSTOMER_REQUEST = 'smart/customer/FETCH_CUSTOMER_REQUEST'
export const FETCH_CUSTOMER_REQUEST: FETCH_CUSTOMER_REQUEST = 'smart/customer/FETCH_CUSTOMER_REQUEST'

export type FETCH_CUSTOMER_SUCCESS = 'smart/customer/FETCH_CUSTOMER_SUCCESS'
export const FETCH_CUSTOMER_SUCCESS: FETCH_CUSTOMER_SUCCESS = 'smart/customer/FETCH_CUSTOMER_SUCCESS'

export type FETCH_CUSTOMER_FAILURE = 'smart/customer/FETCH_CUSTOMER_FAILURE'
export const FETCH_CUSTOMER_FAILURE: FETCH_CUSTOMER_FAILURE = 'smart/customer/FETCH_CUSTOMER_FAILURE'

export const fetchCustomer = (id: number) => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/customer/get/${id}`,
      types: [FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS, FETCH_CUSTOMER_FAILURE],
    }),
  }
}

export interface FetchCustomerSuccessAction {
  type: FETCH_CUSTOMER_SUCCESS
  payload: {
    isOk: boolean,
    data: Customer,
  }
}

export type DELETE_CUSTOMER_REQUEST = 'smart/customer/DELETE_CUSTOMER_REQUEST'
export const DELETE_CUSTOMER_REQUEST: DELETE_CUSTOMER_REQUEST = 'smart/customer/DELETE_CUSTOMER_REQUEST'

export type DELETE_CUSTOMER_SUCCESS = 'smart/customer/DELETE_CUSTOMER_SUCCESS'
export const DELETE_CUSTOMER_SUCCESS: DELETE_CUSTOMER_SUCCESS = 'smart/customer/DELETE_CUSTOMER_SUCCESS'

export type DELETE_CUSTOMER_FAILURE = 'smart/customer/DELETE_CUSTOMER_FAILURE'
export const DELETE_CUSTOMER_FAILURE: DELETE_CUSTOMER_FAILURE = 'smart/customer/DELETE_CUSTOMER_FAILURE'

export const deleteCustomer = (id: number) => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/customer/delete/${id}`,
      types: [DELETE_CUSTOMER_REQUEST, DELETE_CUSTOMER_SUCCESS, DELETE_CUSTOMER_FAILURE],
    }),
  }
}

export interface DeleteCustomerSuccessAction {
  type: DELETE_CUSTOMER_SUCCESS
  payload: {
    isOk: true,
  } | TCommonError
}

export type UPDATE_CUSTOMER_REQUEST = 'smart/customer/UPDATE_CUSTOMER_REQUEST'
export const UPDATE_CUSTOMER_REQUEST: UPDATE_CUSTOMER_REQUEST = 'smart/customer/UPDATE_CUSTOMER_REQUEST'

export type UPDATE_CUSTOMER_SUCCESS = 'smart/customer/UPDATE_CUSTOMER_SUCCESS'
export const UPDATE_CUSTOMER_SUCCESS: UPDATE_CUSTOMER_SUCCESS = 'smart/customer/UPDATE_CUSTOMER_SUCCESS'

export type UPDATE_CUSTOMER_FAILURE = 'smart/customer/UPDATE_CUSTOMER_FAILURE'
export const UPDATE_CUSTOMER_FAILURE: UPDATE_CUSTOMER_FAILURE = 'smart/customer/UPDATE_CUSTOMER_FAILURE'

export const updateCustomer = (customer: Partial<Customer>) => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/customer/update/${customer.id}`,
      method: 'POST',
      body: JSON.stringify(customer),
      types: [UPDATE_CUSTOMER_REQUEST, UPDATE_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_FAILURE],
    }),
  }
}

export interface UpdateCustomerSuccessAction {
  type: UPDATE_CUSTOMER_SUCCESS
  payload: {
    isOk: true
  } | TCommonError
}

export type DO_UPDATE_CUSTOMER = 'smart/customer/DO_UPDATE_CUSTOMER'
export const DO_UPDATE_CUSTOMER: DO_UPDATE_CUSTOMER = 'smart/customer/DO_UPDATE_CUSTOMER'

export const doUpdateCustomer = (customer: Partial<Customer>, cb: (isOk: boolean) => void) => ({
  type: DO_UPDATE_CUSTOMER,
  payload: {
    customer, cb,
  },
} as DoUpdateCustomerAction)

export interface DoUpdateCustomerAction {
  type: DO_UPDATE_CUSTOMER
  payload: {
    customer: Partial<Customer>
    cb: (isOk: boolean) => void
  }
}

export type DO_DELETE_CUSTOMER = 'smart/customer/DO_DELETE_CUSTOMER'
export const DO_DELETE_CUSTOMER: DO_DELETE_CUSTOMER = 'smart/customer/DO_DELETE_CUSTOMER'

export const doDeleteCustomer = (customerId: number) => ({
  type: DO_DELETE_CUSTOMER,
  payload: {
    customerId,
  },
}) as DoDeleteCustomerAction

export interface DoDeleteCustomerAction {
  type: DO_DELETE_CUSTOMER
  payload: {
    customerId: number
  }
}

export type UPDATE_CUSTOMER_LIST_TIMESTAMP = 'smart/customer/UPDATE_CUSTOMER_LIST_TIMESTAMP'
export const UPDATE_CUSTOMER_LIST_TIMESTAMP: UPDATE_CUSTOMER_LIST_TIMESTAMP = 'smart/customer/UPDATE_CUSTOMER_LIST_TIMESTAMP'

export const updateCustomerListTimestamp = () => ({
  type: UPDATE_CUSTOMER_LIST_TIMESTAMP,
})
const actions = {
  updateCustomerListTimestamp,
  doUpdateCustomer,
}

const returnsOfActions = [
  ...Object.values(actions),
]

interface RequestAction {
  type: FETCH_CUSTOMER_LIST_REQUEST | SUBMIT_BATCH_DATA_EDIT_REQUEST | FETCH_CUSTOMER_REQUEST
}

type FailureAction = {
  type: FETCH_CUSTOMER_LIST_FAILURE | SUBMIT_BATCH_DATA_EDIT_FAILURE |
  FETCH_CUSTOMER_FAILURE
} & CommonFetchFailureAction

export type CustomerAction = $Call<typeof returnsOfActions[number]> | FailureAction | RequestAction |
  FetchCustomerListSuccessAction | FetchCustomerListSuccessAction | SubmitBatchDataEditSuccessAction | FetchCustomerSuccessAction
