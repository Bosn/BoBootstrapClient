import { DO_UPDATE_AVATAR_IMG, DoUpdateAvatarImgAction, updateAvatarImg, UPDATE_AVATAR_IMG_SUCCESS, DO_FETCH_GUIDE_KEY, DoFetchGuideKeyAction, fetchGuideKey, FetchGuideKeySuccessAction, FETCH_GUIDE_KEY_SUCCESS, fetchServerTime, DO_FETCH_USER_SETTINGS, DoFetchUserSettingsAction, fetchUserSettings, FETCH_USER_SETTINGS_SUCCESS, DO_UPDATE_USER_SETTING, DoUpdateUserSettingAction, updateUserSetting, UPDATE_USER_SETTING_SUCCESS } from './actions'
import config from '@app/../config'
import { FETCH_LOGIN_INFO_SUCCESS, fetchLoginInfo, FetchLoginInfoSuccessAction, showMessage, LOGIN_SUCCESS, LoginSuccessAction, LOGOUT_SUCCESS, LogoutSuccessAction  } from '@app/state/ducks/shared/actions'
import { MSG_TYPE } from '@app/views/components/common/Message'
import { push } from 'connected-react-router'
import { call, put, take, takeLatest, takeEvery, all, select } from 'redux-saga/effects'
import { AnyAction } from 'redux'
import { getLoginInfo } from './selectors'
import { ILoginInfo } from '@app/types'
import { ENTITY_TYPE } from '@app/state/const'

const V = config.VERSION

function* loadGlobalData() {
  yield put(fetchLoginInfo() as AnyAction)
  const fetchLoginInfoSuccess: FetchLoginInfoSuccessAction = yield take(FETCH_LOGIN_INFO_SUCCESS)
  if (!fetchLoginInfoSuccess.payload.isOk) {
    yield put(push(`/${V}/smart/login`))
  }
  yield put(fetchServerTime() as AnyAction)
}

function* loginSuccessSaga(action: LoginSuccessAction) {
  if (action.payload.isOk) {
    yield all([take(FETCH_LOGIN_INFO_SUCCESS), call(loadGlobalData)])
    const loginInfo: ILoginInfo = yield select(getLoginInfo)
    if (loginInfo.entityType === ENTITY_TYPE.EMPLOYEE) {
      yield put(push(`/${V}/smart/`))
    } else {
      yield put(push(`/${V}/dolores/`))
    }
  } else {
    yield put(showMessage(`登陆失败：${action.payload.errMsg}`, MSG_TYPE.ERROR))
  }
}

function* logoutSuccessSaga(action: LogoutSuccessAction) {
  if (action.payload.isOk) {
    yield put(push(`/${V}/smart/login`))
  }
}

function* doUpdateAvatarImgSaga(action: DoUpdateAvatarImgAction) {
  const payload = action.payload
  yield put(updateAvatarImg(payload.customerId, payload.path) as AnyAction)
  yield take(UPDATE_AVATAR_IMG_SUCCESS)
  payload.cb && payload.cb()
}

function* doFetchGuideKeySaga(action: DoFetchGuideKeyAction) {
  const { key, cb } = action.payload
  yield put(fetchGuideKey(key) as AnyAction)
  const fetchAction: FetchGuideKeySuccessAction = yield take(FETCH_GUIDE_KEY_SUCCESS)
  cb(fetchAction.payload.data)
}

function* doFetchUserSettingsSaga(action: DoFetchUserSettingsAction) {
  const { keys, cb } = action.payload
  yield put(fetchUserSettings(keys) as AnyAction)
  const fetchAction = yield take(FETCH_USER_SETTINGS_SUCCESS)
  cb && cb(fetchAction.payload.isOk)
}

function* doUpdateUserSettingSaga(action: DoUpdateUserSettingAction) {
  const { key, value, cb } = action.payload
  yield put(updateUserSetting(key, value) as AnyAction)
  const opAction = yield take(UPDATE_USER_SETTING_SUCCESS)
  cb && cb(opAction.payload.isOk)
}

const sharedSagas = [
  call(loadGlobalData),
  takeEvery(LOGIN_SUCCESS, loginSuccessSaga),
  takeEvery(LOGOUT_SUCCESS, logoutSuccessSaga),
  takeLatest(DO_UPDATE_AVATAR_IMG, doUpdateAvatarImgSaga),
  takeLatest(DO_FETCH_GUIDE_KEY, doFetchGuideKeySaga),
  takeLatest(DO_FETCH_USER_SETTINGS, doFetchUserSettingsSaga),
  takeLatest(DO_UPDATE_USER_SETTING, doUpdateUserSettingSaga),
]

export default sharedSagas
