import { RootState } from '@app/state/rootReducer'
import { createSelector } from 'reselect'

const LoginInfoSelector = (state: RootState) => state.shared.loginInfo

export const getLoginInfo = createSelector(
  LoginInfoSelector,
  loginInfo => loginInfo
)

const UploadPhotoSelector = (state: RootState) => state.shared.uploadPhoto

export const getUploadPhoto = createSelector(
  UploadPhotoSelector,
  uploadPhoto => uploadPhoto
)

export const sharedDataSelector = (state: RootState) => state.shared

export const getSharedData = createSelector(
  sharedDataSelector,
  result => result
)
