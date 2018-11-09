import { ACCESS_TYPE, EMPLOYEE_NORMAL_ACCESS_TYPE_LIST } from '@app/state/sharedConsts/access'
import { IAsync, TItemState, TPagerListState } from '@app/types'
import ArrayUtils from '@app/utilities/array'

export interface Employee {
  id: number
  sex: boolean
  name: string
  nickname: string
  avatarImg: string
  mobile: string
  company?: {
    name: string,
  }
  desc?: string
  email?: string
  identityNo?: string
  socialInsuranceEnabled?: boolean
  password?: string
}

export interface EmployeeState {
  list: TPagerListState<Employee>
  listTimestamp: Date
  view: TItemState<Employee>
  viewAccesses: ViewAccessesState
  batchEdit: IAsync
}

export interface ViewAccessesState extends IAsync {
  accesses: number[]
}

export function getAccessLabel(access: ACCESS_TYPE) {
  return ArrayUtils.getLabel(EMPLOYEE_NORMAL_ACCESS_TYPE_LIST, access)
}
