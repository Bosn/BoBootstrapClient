import { ENTITY_TYPE } from '@app/state/const'
import { SharedState, IUploadPhotoState } from '@app/state/ducks/shared/types'
import { MSG_TYPE } from '@app/views/components/common/Message'
import {  FETCH_LOGIN_INFO_SUCCESS, SharedAction, SHOW_MESSAGE, UPLOAD_PHOTO_FAILURE, UPLOAD_PHOTO_REQUEST, UPLOAD_PHOTO_SUCCESS, CLEAR_PHOTO, FETCH_LOGIN_INFO_REQUEST, FETCH_LOGIN_INFO_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,  LOGOUT_SUCCESS, PROGRESS_BEGIN, PROGRESS_END, FETCH_SERVER_TIME_SUCCESS, FETCH_USER_SETTINGS_SUCCESS, UPDATE_USER_SETTING_REQUEST, UPDATE_USER_SETTING_FAILURE, UPDATE_USER_SETTING_SUCCESS, FETCH_USER_SETTINGS_FAILURE, FETCH_USER_SETTINGS_REQUEST } from './actions'
import { combineReducers } from 'redux'
import { ILoginInfo, IMessage } from '@app/types'

const SHARED_INIT_DATA = {
  loginInfo: {
    id: 0,
    sex: true,
    entityType: ENTITY_TYPE.CUSTOMER,
    name: '',
    nickname: '',
    title: '',
    accessList: [],
    avatarImg: '',
    companyId: 0,
    weChatAppId: '',
    isFetching: false,
    signature: '',
  },
  message: {
    message: '',
    type: MSG_TYPE.INFO,
    timestamp: new Date().getTime(),
  },
  uploadPhoto: {
    path: '',
    isFetching: false,
  },
  favoriteMenuLabels: {
    data: '',
    isFetching: false,
  },
}

export function isLogining(state: boolean = false, action: SharedAction): boolean {
  switch (action.type) {
    case LOGIN_REQUEST:
      return true
    case LOGIN_SUCCESS:
    case LOGIN_FAILURE:
      return false
  }
  return state
}

export function loginInfo(state: ILoginInfo = SHARED_INIT_DATA.loginInfo, action: SharedAction): ILoginInfo {
  switch (action.type) {
    case FETCH_LOGIN_INFO_REQUEST:
      return { ...state, isFetching: true }
    case FETCH_LOGIN_INFO_FAILURE:
      return { ...state, isFetching: false }
    case FETCH_LOGIN_INFO_SUCCESS:
      if (action.payload.isOk) {
        return { ...state, ...action.payload.data }
      } else {
        return SHARED_INIT_DATA.loginInfo
      }
    case LOGOUT_SUCCESS:
      return SHARED_INIT_DATA.loginInfo
  }
  return state
}

export function message(state: IMessage = SHARED_INIT_DATA.message, action: SharedAction): IMessage {
  switch (action.type) {
    case SHOW_MESSAGE:
      return { ...action.payload, timestamp: new Date().getTime() }
  }
  return state
}

export function uploadPhoto(state: IUploadPhotoState = SHARED_INIT_DATA.uploadPhoto, action: SharedAction): IUploadPhotoState {
  switch (action.type) {
    case UPLOAD_PHOTO_REQUEST:
      return { ...state, isFetching: true }
    case UPLOAD_PHOTO_FAILURE:
      return { ...state, isFetching: false }
    case UPLOAD_PHOTO_SUCCESS:
      return { isFetching: false, path: action.payload.data.path }
    case CLEAR_PHOTO:
      return { isFetching: false, path: '' }
  }
  return state
}

export function oldPageUrl(state: string = '', action: SharedAction): string {
  switch (action.type) {

  }
  return state
}

export function isInProgress(state: boolean = false, action: SharedAction): boolean {
  switch (action.type) {
    case PROGRESS_BEGIN:
      return true
    case PROGRESS_END:
      return false
  }
  return state
}

export function now(state: Date = new Date(), action: SharedAction): Date {
  switch (action.type) {
    case FETCH_SERVER_TIME_SUCCESS:
      return new Date(action.payload.data)
  }
  return state
}

export function userSettings(state: { [key: string]: string } = {}, action: SharedAction): { [key: string]: string } {
  switch (action.type) {
    case FETCH_USER_SETTINGS_SUCCESS: {
      if (action.payload.isOk) {
        return {
          ...state,
          ...action.payload.data,
        }
      }
      break
    }
  }
  return state
}

export function userSettingsIsUpdating(state: boolean = false, action: SharedAction) {
  switch (action.type) {
    case UPDATE_USER_SETTING_REQUEST:
    case FETCH_USER_SETTINGS_REQUEST:
      return true
    case UPDATE_USER_SETTING_FAILURE:
    case UPDATE_USER_SETTING_SUCCESS:
    case FETCH_USER_SETTINGS_FAILURE:
    case FETCH_USER_SETTINGS_SUCCESS:
      return false
  }
  return state
}

export const SharedReducer = combineReducers<SharedState, SharedAction>({
  isLogining,
  loginInfo,
  message,
  uploadPhoto,
  oldPageUrl,
  isInProgress,
  now,
  userSettings,
  userSettingsIsUpdating,
})
