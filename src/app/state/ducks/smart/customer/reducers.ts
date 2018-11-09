
import { CustomerAction, FETCH_CUSTOMER_FAILURE, FETCH_CUSTOMER_LIST_FAILURE, FETCH_CUSTOMER_LIST_REQUEST, FETCH_CUSTOMER_LIST_SUCCESS, FETCH_CUSTOMER_REQUEST, FETCH_CUSTOMER_SUCCESS, UPDATE_CUSTOMER_LIST_TIMESTAMP } from '@app/state/ducks/smart/customer/actions'
import { Customer, CustomerState } from '@app/state/ducks/smart/customer/types'
import { combineReducers } from 'redux'
import { TPagerListState, TItemState } from '@app/types'

const CUSTOMER_LIST_INIT: TPagerListState<Customer> = {
  data: {
    isFetching: false, result: [], entities: { customers: {} },
  },
  count: 0,
}

function list(state: TPagerListState<Customer> = CUSTOMER_LIST_INIT, action: CustomerAction): TPagerListState<Customer> {
  switch (action.type) {
    case FETCH_CUSTOMER_LIST_SUCCESS:
      return { ...action.payload, data: { ...action.payload.data, isFetching: false } }
    case FETCH_CUSTOMER_LIST_REQUEST:
      return { ...state, data: { ...state.data, isFetching: true } }
    case FETCH_CUSTOMER_LIST_FAILURE:
      return { ...state, data: { ...state.data, isFetching: false } }
  }
  return state
}

export const CUSTOMER_INIT: TItemState<Customer> = {
  id: 0,
  sex: true,
  name: '',
  avatarImg: '',
  mobile: '',
  isFetching: false,
}

function view(state: TItemState<Customer> = CUSTOMER_INIT, action: CustomerAction): TItemState<Customer> {
  switch (action.type) {
    case FETCH_CUSTOMER_REQUEST:
    case FETCH_CUSTOMER_FAILURE:
      return { ...state, isFetching: true }
    case FETCH_CUSTOMER_SUCCESS:
      return { ...action.payload.data, isFetching: false }
  }
  return state
}

function listTimestamp(state: Date = new Date(), action: CustomerAction): Date {
  switch (action.type) {
    case UPDATE_CUSTOMER_LIST_TIMESTAMP:
      return new Date()
  }
  return state
}

export const CustomerReducer = combineReducers<CustomerState, CustomerAction>({
  list,
  listTimestamp,
  view,
})
