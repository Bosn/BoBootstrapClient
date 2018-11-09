import { TPagerListState, TItemState } from '@app/types'

export interface Customer {
  id: number
  name: string
  avatarImg: string
  sex: boolean
  mobile: string

  companyId?: number
  birthday?: string
  email?: string
  identityType?: IDENTITY_TYPE
  identityNo?: string
  emergencyContactName?: string
  emergencyContactPhone?: string
  emergencyContactRelationship?: string
  desc?: string
  address?: string
}

export interface CustomerState {
  list: TPagerListState<Customer>
  listTimestamp: Date
  view: TItemState<Customer>
}

export enum IDENTITY_TYPE {
  /** China Identity Card */
  ID = 1,
  /** Passport */
  PASSPORT = 2,
  /** for others */
  OTHER = 100,
}

export const IDENTITY_TYPE_LIST = [
  { label: '身份证', value: IDENTITY_TYPE.ID },
  { label: '护照', value: IDENTITY_TYPE.PASSPORT },
  { label: '其它', value: IDENTITY_TYPE.OTHER },
]

export function getIdentityTypeStr(type: IDENTITY_TYPE) {
  switch (type) {
    case IDENTITY_TYPE.ID:
      return '身份证'
    case IDENTITY_TYPE.PASSPORT:
      return '护照'
    case IDENTITY_TYPE.OTHER:
      return '其它'
  }
  return '-'
}
