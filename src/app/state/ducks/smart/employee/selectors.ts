import { RootState } from '@app/state/rootReducer'
import { createSelector } from 'reselect'

const employeeListSelector = (state: RootState) => state.smart.employee.list

export const getEmployeeList = createSelector(
  employeeListSelector,
  list => list
)

const employeeSelector = (state: RootState) => state.smart.employee.view

export const getEmployee = createSelector(
  employeeSelector,
  employee => employee
)

const employeeAccessesSelector = (state: RootState) => state.smart.employee.viewAccesses

export const getEmployeeAccesses = createSelector(
  employeeAccessesSelector,
  result => result
)
