import { takeLatest, put, take, takeEvery } from 'redux-saga/effects'
import { AnyAction } from 'redux'
import { showMessage } from '@app/state/ducks/shared/actions'
import { MSG_TYPE } from '@app/views/components/common/Message'
import config from '@app/../config'
import { push } from 'connected-react-router'
import { DoUpdateCustomerAction, updateCustomer, UPDATE_CUSTOMER_SUCCESS, DoDeleteCustomerAction, deleteCustomer, DeleteCustomerSuccessAction, DELETE_CUSTOMER_SUCCESS, DO_UPDATE_CUSTOMER, DO_DELETE_CUSTOMER } from './actions'

const V = config.VERSION

function* doUpdateCustomerSaga(action: DoUpdateCustomerAction) {
  const { customer, cb } = action.payload
  yield put(updateCustomer(customer) as AnyAction)
  const updateAction = yield take(UPDATE_CUSTOMER_SUCCESS)
  if (updateAction.payload.isOk) {
    yield put(showMessage('更新成功！', MSG_TYPE.SUCCESS))
  } else {
    yield put(showMessage(`更新失败：${updateAction.payload.errMsg}`, MSG_TYPE.ERROR))
  }
  cb && cb(updateAction.payload.isOk)
}

function* doDeleteCustomerSaga(action: DoDeleteCustomerAction) {
  const customerId = action.payload.customerId
  yield put(deleteCustomer(customerId) as AnyAction)
  const deleteAction: DeleteCustomerSuccessAction = yield take(DELETE_CUSTOMER_SUCCESS)
  if (deleteAction.payload.isOk) {
    yield put(showMessage(`删除成功！`, MSG_TYPE.SUCCESS))
    yield put(push(`/${V}/smart/customer/list`))
  } else {
    yield put(showMessage(`删除失败：${deleteAction.payload.errMsg}`, MSG_TYPE.ERROR))
  }
}

const customerSagas = [
  takeLatest(DO_UPDATE_CUSTOMER, doUpdateCustomerSaga),
  takeEvery(DO_DELETE_CUSTOMER, doDeleteCustomerSaga),
]

export default customerSagas
