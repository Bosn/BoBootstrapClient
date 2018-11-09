import { RootState } from '@app/state/rootReducer'
import { createSelector } from 'reselect'

const customerListSelector = (state: RootState) => state.smart.customer.list

export const getCustomerList = createSelector(
  customerListSelector,
  result => result
)

const customerSelector = (state: RootState) => state.smart.customer.view

export const getCustomer = createSelector(
  customerSelector,
  result => result
)
