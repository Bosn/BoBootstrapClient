import sharedSagas from '@app/state/ducks/shared/sagas'
import employeeSagas from '@app/state/ducks/smart/employee/sagas'
import { all } from 'redux-saga/effects'
import customerSagas from '@app/state/ducks/smart/customer/sagas'

function* rootSaga() {
  yield all([
    ...sharedSagas,
    ...customerSagas,
    ...employeeSagas,
  ])
}

export default rootSaga
