import { ILoginInfo, IMessage } from '@app/types'

export enum BOTTOM_NAVIGATION_ITEM_TYPE {
  CRM_INDEX = 'CRM_INDEX',
  CRM_DOC_LIST = 'CRM_DOC_LIST',
  CRM_VISIT_LIST = 'CRM_VISIT_LIST',
  CRM_ACTIVITY_LIST = 'CRM_ACTIVITY_LIST',
  CRM_THREAD_LIST = 'CRM_THREAD_LIST',

  DOLORES_INDEX = 'DOLORES_INDEX',
  DOLORES_RESERVE = 'DOLORES_RESERVE',
  DOLORES_TRAINING = 'DOLORES_TRAINING',
  DOLORES_DATA = 'DOLORES_DATA',
  DOLORES_SETTING = 'DOLORES_SETTING',
}

export interface SharedState {
  isLogining: boolean
  loginInfo: ILoginInfo
  message: IMessage
  uploadPhoto: IUploadPhotoState
  oldPageUrl: string
  isInProgress: boolean
  now: Date
  userSettings: { [key: string]: string }
  userSettingsIsUpdating: boolean
}

export interface OpLog {
  id: number
  entityId: number
  entityType: number
  logType: LOG_TYPE
  createdAt: string
  msg: string
  params: any
}

export enum LOG_TYPE {
  GROUP_TRAINING = 1,
  CARD = 10,
}

export interface IUploadPhotoState {
  path: string
  isFetching: boolean,
}

export interface IMenuLabels {
  data: string
  isFetching: boolean
}

export interface IMySummaryData {
  nickname?: string
  signature?: string
  avatarImg?: string
}
