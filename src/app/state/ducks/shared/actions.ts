import { UploadPhotoSuccessAction } from './actions'
import config from '@app/../config'
import { CommonFetchFailureAction, mergeRSAABase } from '@app/state/rootAction'
import { IEntitySummary, ILoginInfo, TCommonError, TCB } from '@app/types'
import { MSG_TYPE } from '@app/views/components/common/Message'
import { push } from 'connected-react-router'
import { RSAA } from 'redux-api-middleware'
import { $Call } from 'utility-types'
import { ENTITY_TYPE, GUIDE_KEY, CACHE_KEY } from '@app/state/const'

const ROOT = config.API_CONFIG.ROOT

export type RSAAA = {
  [key: string]: any
}

export type FETCH_LOGIN_INFO_REQUEST = 'shared/FETCH_LOGIN_INFO_REQUEST'
export const FETCH_LOGIN_INFO_REQUEST: FETCH_LOGIN_INFO_REQUEST = 'shared/FETCH_LOGIN_INFO_REQUEST'

export type FETCH_LOGIN_INFO_SUCCESS = 'shared/FETCH_LOGIN_INFO_SUCCESS'
export const FETCH_LOGIN_INFO_SUCCESS: FETCH_LOGIN_INFO_SUCCESS = 'shared/FETCH_LOGIN_INFO_SUCCESS'

export type FETCH_LOGIN_INFO_FAILURE = 'shared/FETCH_LOGIN_INFO_FAILURE'
export const FETCH_LOGIN_INFO_FAILURE: FETCH_LOGIN_INFO_FAILURE = 'shared/FETCH_LOGIN_INFO_FAILURE'

export const fetchLoginInfo = () => {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/fetchLoginInfo`,
      types: [FETCH_LOGIN_INFO_REQUEST, FETCH_LOGIN_INFO_SUCCESS, FETCH_LOGIN_INFO_FAILURE],
    }),
  }
}

export interface FetchLoginInfoSuccessAction {
  type: FETCH_LOGIN_INFO_SUCCESS,
  payload: {
    isOk: true,
    data: ILoginInfo,
  } | TCommonError
}

export type SHOW_MESSAGE = 'shared/SHOW_MESSAGE'
export const SHOW_MESSAGE: SHOW_MESSAGE = 'shared/SHOW_MESSAGE'

export function showMessage(message: string, type?: MSG_TYPE): ShowMessageAction {
  let t: MSG_TYPE
  if (type === undefined) {
    t = MSG_TYPE.INFO
  } else {
    t = type
  }

  const result = {
    type: SHOW_MESSAGE,
    payload: {
      message,
      type: t,
    },
  }
  return result
}

export interface ShowMessageAction {
  type: SHOW_MESSAGE
  payload: {
    message: string
    type: MSG_TYPE
  }
}

export type UPLOAD_PHOTO_REQUEST = 'shared/UPLOAD_PHOTO_REQUEST'
export const UPLOAD_PHOTO_REQUEST: UPLOAD_PHOTO_REQUEST = 'shared/UPLOAD_PHOTO_REQUEST'

export type UPLOAD_PHOTO_SUCCESS = 'shared/UPLOAD_PHOTO_SUCCESS'
export const UPLOAD_PHOTO_SUCCESS: UPLOAD_PHOTO_SUCCESS = 'shared/UPLOAD_PHOTO_SUCCESS'

export type UPLOAD_PHOTO_FAILURE = 'shared/UPLOAD_PHOTO_FAILURE'
export const UPLOAD_PHOTO_FAILURE: UPLOAD_PHOTO_FAILURE = 'shared/UPLOAD_PHOTO_FAILURE'

export function uploadPhoto(file: any) {
  const data = new FormData()
  data.append('photo', file)

  return {
    [RSAA]: ({
      credentials: 'include',
      endpoint: `${ROOT}/uploadPhoto`,
      method: 'POST',
      body: data,
      types: [UPLOAD_PHOTO_REQUEST, UPLOAD_PHOTO_SUCCESS, UPLOAD_PHOTO_SUCCESS],
    }),
  }
}

export interface UploadPhotoSuccessAction {
  type: UPLOAD_PHOTO_SUCCESS
  payload: {
    isOk: boolean
    data: {
      path: string,
    },
  }
}

export type UPDATE_AVATAR_IMG_REQUEST = 'shared/UPDATE_AVATAR_IMG_REQUEST'
export const UPDATE_AVATAR_IMG_REQUEST: UPDATE_AVATAR_IMG_REQUEST = 'shared/UPDATE_AVATAR_IMG_REQUEST'

export type UPDATE_AVATAR_IMG_SUCCESS = 'shared/UPDATE_AVATAR_IMG_SUCCESS'
export const UPDATE_AVATAR_IMG_SUCCESS: UPDATE_AVATAR_IMG_SUCCESS = 'shared/UPDATE_AVATAR_IMG_SUCCESS'

export type UPDATE_AVATAR_IMG_FAILURE = 'shared/UPDATE_AVATAR_IMG_FAILURE'
export const UPDATE_AVATAR_IMG_FAILURE: UPDATE_AVATAR_IMG_FAILURE = 'shared/UPDATE_AVATAR_IMG_FAILURE'

export function updateAvatarImg(customerId: number, path: string) {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/membership/updateAvatarImg/${customerId}`,
      method: 'POST',
      body: JSON.stringify({ path }),
      types: [UPDATE_AVATAR_IMG_REQUEST, UPDATE_AVATAR_IMG_SUCCESS, UPDATE_AVATAR_IMG_SUCCESS],
    }),
  }
}

export interface UpdateAvatarImgSuccessAction {
  type: UPDATE_AVATAR_IMG_SUCCESS
  payload: {
    isOk: boolean
  } | TCommonError
}

export type DO_UPDATE_AVATAR_IMG = 'shared/DO_UPDATE_AVATAR_IMG'
export const DO_UPDATE_AVATAR_IMG: DO_UPDATE_AVATAR_IMG = 'shared/DO_UPDATE_AVATAR_IMG'

export function doUpdateAvatarImg(params: { customerId: number, path: string }, cb?: () => void): DoUpdateAvatarImgAction {
  return {
    type: DO_UPDATE_AVATAR_IMG,
    payload: {
      ...params,
      cb,
    },
  }
}

export interface DoUpdateAvatarImgAction {
  type: DO_UPDATE_AVATAR_IMG
  payload: {
    customerId: number
    path: string
    cb?: () => void
  }
}

export type CHECK_MOBILE_EXISTS_REQUEST = 'shared/CHECK_MOBILE_EXISTS_REQUEST'
export const CHECK_MOBILE_EXISTS_REQUEST: CHECK_MOBILE_EXISTS_REQUEST = 'shared/CHECK_MOBILE_EXISTS_REQUEST'

export type CHECK_MOBILE_EXISTS_SUCCESS = 'shared/CHECK_MOBILE_EXISTS_SUCCESS'
export const CHECK_MOBILE_EXISTS_SUCCESS: CHECK_MOBILE_EXISTS_SUCCESS = 'shared/CHECK_MOBILE_EXISTS_SUCCESS'

export type CHECK_MOBILE_EXISTS_FAILURE = 'shared/CHECK_MOBILE_EXISTS_FAILURE'
export const CHECK_MOBILE_EXISTS_FAILURE: CHECK_MOBILE_EXISTS_FAILURE = 'shared/CHECK_MOBILE_EXISTS_FAILURE'

export function checkMobileExists(mobile: string) {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/checkMobileExists?mobile=${mobile}`,
      types: [CHECK_MOBILE_EXISTS_REQUEST, CHECK_MOBILE_EXISTS_SUCCESS, CHECK_MOBILE_EXISTS_SUCCESS],
    }),
  }
}

export interface CheckMobileExistsSuccessAction {
  type: CHECK_MOBILE_EXISTS_SUCCESS
  payload: {
    isOk: boolean
    data: {
      exists: false
    } | {
      exists: true
      companyId: number
      entityId: number
      entityType: ENTITY_TYPE
      name: string
    },
  }
}

export type CLEAR_PHOTO = 'shared/CLEAR_PHOTO'
export const CLEAR_PHOTO: CLEAR_PHOTO = 'shared/CLEAR_PHOTO'

export const clearPhoto = () => ({
  type: CLEAR_PHOTO,
})

export interface ClearPhotoAction {
  type: CLEAR_PHOTO
}

export type QUERY_CUSTOMER_REQUEST = 'shared/QUERY_CUSTOMER_REQUEST'
export const QUERY_CUSTOMER_REQUEST: QUERY_CUSTOMER_REQUEST = 'shared/QUERY_CUSTOMER_REQUEST'

export type QUERY_CUSTOMER_SUCCESS = 'shared/QUERY_CUSTOMER_SUCCESS'
export const QUERY_CUSTOMER_SUCCESS: QUERY_CUSTOMER_SUCCESS = 'shared/QUERY_CUSTOMER_SUCCESS'

export type QUERY_CUSTOMER_FAILURE = 'shared/QUERY_CUSTOMER_FAILURE'
export const QUERY_CUSTOMER_FAILURE: QUERY_CUSTOMER_FAILURE = 'shared/QUERY_CUSTOMER_FAILURE'

export function queryCustomer(query: string, cb: (res: { isOk: boolean, data: IEntitySummary[] }) => void) {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/membership/queryCustomer?query=${encodeURIComponent(query)}`,
      types: [QUERY_CUSTOMER_REQUEST, {
        type: QUERY_CUSTOMER_SUCCESS,
        payload: (_action: any, _state: any, res: any) => {
          return res.json().then((json: any) => cb(json))
        },
      }, QUERY_CUSTOMER_SUCCESS],
    }),
  }
}

export type LOGIN_REQUEST = 'shared/LOGIN_REQUEST'
export const LOGIN_REQUEST: LOGIN_REQUEST = 'shared/LOGIN_REQUEST'

export type LOGIN_SUCCESS = 'shared/LOGIN_SUCCESS'
export const LOGIN_SUCCESS: LOGIN_SUCCESS = 'shared/LOGIN_SUCCESS'

export type LOGIN_FAILURE = 'shared/LOGIN_FAILURE'
export const LOGIN_FAILURE: LOGIN_FAILURE = 'shared/LOGIN_FAILURE'

export function login(account: string, password: string, captcha: string) {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/login`,
      body: JSON.stringify({
        account,
        password,
        captcha,
      }),
      method: 'POST',
      types: [LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_SUCCESS],
    }),
  }
}

export interface LoginSuccessAction {
  type: LOGIN_SUCCESS
  payload: {
    isOk: true
  } | TCommonError
}

export type LOGOUT_REQUEST = 'shared/LOGOUT_REQUEST'
export const LOGOUT_REQUEST: LOGOUT_REQUEST = 'shared/LOGOUT_REQUEST'

export type LOGOUT_SUCCESS = 'shared/LOGOUT_SUCCESS'
export const LOGOUT_SUCCESS: LOGOUT_SUCCESS = 'shared/LOGOUT_SUCCESS'

export type LOGOUT_FAILURE = 'shared/LOGOUT_FAILURE'
export const LOGOUT_FAILURE: LOGOUT_FAILURE = 'shared/LOGOUT_FAILURE'

export function logout() {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/logout`,
      types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_SUCCESS],
    }),
  }
}

export interface LogoutSuccessAction {
  type: LOGOUT_SUCCESS
  payload: {
    isOk: true
  } | TCommonError
}

export type FETCH_GUIDE_KEY_REQUEST = 'shared/FETCH_GUIDE_KEY_REQUEST'
export const FETCH_GUIDE_KEY_REQUEST: FETCH_GUIDE_KEY_REQUEST = 'shared/FETCH_GUIDE_KEY_REQUEST'

export type FETCH_GUIDE_KEY_SUCCESS = 'shared/FETCH_GUIDE_KEY_SUCCESS'
export const FETCH_GUIDE_KEY_SUCCESS: FETCH_GUIDE_KEY_SUCCESS = 'shared/FETCH_GUIDE_KEY_SUCCESS'

export type FETCH_GUIDE_KEY_FAILURE = 'shared/FETCH_GUIDE_KEY_FAILURE'
export const FETCH_GUIDE_KEY_FAILURE: FETCH_GUIDE_KEY_FAILURE = 'shared/FETCH_GUIDE_KEY_FAILURE'

export function fetchGuideKey(key: GUIDE_KEY) {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/membership/fetchGuideKey/${key}`,
      types: [FETCH_GUIDE_KEY_REQUEST, FETCH_GUIDE_KEY_SUCCESS, FETCH_GUIDE_KEY_SUCCESS],
    }),
  }
}

export interface FetchGuideKeySuccessAction {
  type: FETCH_GUIDE_KEY_SUCCESS
  payload: {
    isOk: true
    data: boolean
  }
}

export type DO_FETCH_GUIDE_KEY = 'shared/DO_FETCH_GUIDE_KEY'
export const DO_FETCH_GUIDE_KEY: DO_FETCH_GUIDE_KEY = 'shared/DO_FETCH_GUIDE_KEY'

export const doFetchGuideKey = (key: GUIDE_KEY, cb: (existed: boolean) => void) => ({
  type: DO_FETCH_GUIDE_KEY,
  payload: {
    key,
    cb,
  },
})

export interface DoFetchGuideKeyAction {
  type: DO_FETCH_GUIDE_KEY
  payload: {
    key: GUIDE_KEY
    cb: (existed: boolean) => void
  }
}

export function historyPush(path: string) {
  return push(path)
}

export type PROGRESS_BEGIN = 'shared/PROGRESS_BEGIN'
export const PROGRESS_BEGIN: PROGRESS_BEGIN = 'shared/PROGRESS_BEGIN'

export type PROGRESS_END = 'shared/PROGRESS_END'
export const PROGRESS_END: PROGRESS_END = 'shared/PROGRESS_END'

export function progressBegin(): ProgressAction {
  return {
    type: PROGRESS_BEGIN,
  }
}

export function progressEnd(): ProgressAction {
  return {
    type: PROGRESS_END,
  }
}

export interface ProgressAction {
  type: PROGRESS_BEGIN | PROGRESS_END
}

export type FETCH_SERVER_TIME_REQUEST = 'shared/FETCH_SERVER_TIME_REQUEST'
export const FETCH_SERVER_TIME_REQUEST: FETCH_SERVER_TIME_REQUEST = 'shared/FETCH_SERVER_TIME_REQUEST'

export type FETCH_SERVER_TIME_SUCCESS = 'shared/FETCH_SERVER_TIME_SUCCESS'
export const FETCH_SERVER_TIME_SUCCESS: FETCH_SERVER_TIME_SUCCESS = 'shared/FETCH_SERVER_TIME_SUCCESS'

export type FETCH_SERVER_TIME_FAILURE = 'shared/FETCH_SERVER_TIME_FAILURE'
export const FETCH_SERVER_TIME_FAILURE: FETCH_SERVER_TIME_FAILURE = 'shared/FETCH_SERVER_TIME_FAILURE'

export function fetchServerTime() {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/now`,
      types: [FETCH_SERVER_TIME_REQUEST, FETCH_SERVER_TIME_SUCCESS, FETCH_SERVER_TIME_SUCCESS],
    }),
  }
}

export interface FetchServerTimeSuccessAction {
  type: FETCH_SERVER_TIME_SUCCESS
  payload: {
    isOk: true
    data: number
  }
}

export type FETCH_USER_SETTINGS_REQUEST = 'shared/FETCH_USER_SETTINGS_REQUEST'
export const FETCH_USER_SETTINGS_REQUEST: FETCH_USER_SETTINGS_REQUEST = 'shared/FETCH_USER_SETTINGS_REQUEST'

export type FETCH_USER_SETTINGS_SUCCESS = 'shared/FETCH_USER_SETTINGS_SUCCESS'
export const FETCH_USER_SETTINGS_SUCCESS: FETCH_USER_SETTINGS_SUCCESS = 'shared/FETCH_USER_SETTINGS_SUCCESS'

export type FETCH_USER_SETTINGS_FAILURE = 'shared/FETCH_USER_SETTINGS_FAILURE'
export const FETCH_USER_SETTINGS_FAILURE: FETCH_USER_SETTINGS_FAILURE = 'shared/FETCH_USER_SETTINGS_FAILURE'

export function fetchUserSettings(keys: CACHE_KEY[]) {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/membership/fetchUserSettings`,
      method: 'POST',
      body: JSON.stringify({ keys }),
      types: [FETCH_USER_SETTINGS_REQUEST, FETCH_USER_SETTINGS_SUCCESS, FETCH_USER_SETTINGS_SUCCESS],
    }),
  }
}

export interface FetchUserSettingsSuccessAction {
  type: FETCH_USER_SETTINGS_SUCCESS
  payload: {
    isOk: true
    data: { [key: string]: string }
  } | TCommonError
}

export type DO_FETCH_USER_SETTINGS = 'shared/DO_FETCH_USER_SETTINGS'
export const DO_FETCH_USER_SETTINGS: DO_FETCH_USER_SETTINGS = 'shared/DO_FETCH_USER_SETTINGS'

export function doFetchUserSettings(keys: CACHE_KEY[], cb: (isOk: boolean) => void): DoFetchUserSettingsAction {
  return {
    type: DO_FETCH_USER_SETTINGS,
    payload: { keys, cb },
  }
}

export interface DoFetchUserSettingsAction {
  type: DO_FETCH_USER_SETTINGS
  payload: {
    keys: CACHE_KEY[]
    cb: (isOk: boolean) => void
  }
}

export type UPDATE_USER_SETTING_REQUEST = 'shared/UPDATE_USER_SETTING_REQUEST'
export const UPDATE_USER_SETTING_REQUEST: UPDATE_USER_SETTING_REQUEST = 'shared/UPDATE_USER_SETTING_REQUEST'

export type UPDATE_USER_SETTING_SUCCESS = 'shared/UPDATE_USER_SETTING_SUCCESS'
export const UPDATE_USER_SETTING_SUCCESS: UPDATE_USER_SETTING_SUCCESS = 'shared/UPDATE_USER_SETTING_SUCCESS'

export type UPDATE_USER_SETTING_FAILURE = 'shared/UPDATE_USER_SETTING_FAILURE'
export const UPDATE_USER_SETTING_FAILURE: UPDATE_USER_SETTING_FAILURE = 'shared/UPDATE_USER_SETTING_FAILURE'

export function updateUserSetting(key: CACHE_KEY, value: string) {
  return {
    [RSAA]: mergeRSAABase({
      endpoint: `${ROOT}/membership/updateUserSetting/${key}`,
      method: 'POST',
      body: JSON.stringify(value ? { value } : {}),
      types: [UPDATE_USER_SETTING_REQUEST, UPDATE_USER_SETTING_SUCCESS, UPDATE_USER_SETTING_SUCCESS],
    }),
  }
}

export interface UpdateUserSettingSuccessAction {
  type: UPDATE_USER_SETTING_SUCCESS
  payload: {
    isOk: true
  } | TCommonError
}

export type DO_UPDATE_USER_SETTING = 'shared/DO_UPDATE_USER_SETTING'
export const DO_UPDATE_USER_SETTING = 'shared/DO_UPDATE_USER_SETTING'

export const doUpdateUserSetting = (key: CACHE_KEY, value: string, cb: TCB) => ({
  type: DO_UPDATE_USER_SETTING,
  payload: {
    cb,
    key,
    value,
  },
})

export interface DoUpdateUserSettingAction {
  type: DO_UPDATE_USER_SETTING
  payload: {
    cb: TCB
    key: CACHE_KEY
    value: string
  }
}

export const actions = {
  showMessage,
  clearPhoto,
  doFetchGuideKey,
  progressBegin,
  progressEnd,
}

const returnsOfActions = [
  ...Object.values(actions),
]

export interface SharedRequestAction {
  type: FETCH_LOGIN_INFO_REQUEST | UPLOAD_PHOTO_REQUEST | LOGIN_REQUEST | LOGOUT_REQUEST |
  FETCH_GUIDE_KEY_REQUEST | FETCH_USER_SETTINGS_REQUEST |
  UPDATE_USER_SETTING_REQUEST
}

export type SharedFailureAction = {
  type: FETCH_LOGIN_INFO_FAILURE | UPLOAD_PHOTO_FAILURE | LOGIN_FAILURE | LOGOUT_FAILURE |
  FETCH_GUIDE_KEY_FAILURE | FETCH_USER_SETTINGS_FAILURE | UPDATE_USER_SETTING_FAILURE
} & CommonFetchFailureAction

export type SharedAction = $Call<typeof returnsOfActions[number]> | UploadPhotoSuccessAction |
  FetchLoginInfoSuccessAction | SharedFailureAction | SharedRequestAction | ClearPhotoAction |
  LoginSuccessAction | LogoutSuccessAction | FetchGuideKeySuccessAction | FetchServerTimeSuccessAction |
  FetchUserSettingsSuccessAction | UpdateUserSettingSuccessAction
