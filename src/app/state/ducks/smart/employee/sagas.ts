import { showMessage } from '@app/state/ducks/shared/actions'
import { CREATE_EMPLOYEE_SUCCESS, CreateEmployeeSuccessAction, fetchEmployee, fetchEmployeeAccesses, fetchEmployeeList, SUBMIT_BATCH_ACCESS_EDIT_SUCCESS, SUBMIT_BATCH_DATA_EDIT_SUCCESS, SubmitBatchAccessEditSuccessAction, SubmitBatchDataEditSuccessAction, updateEmployeeListTimestamp, DELETE_EMPLOYEE_BIND_SUCCESS, DeleteEmployeeBindSuccessAction, DO_DELETE_EMPLOYEE, DoDeleteEmployeeAction, deleteEmployee, DELETE_EMPLOYEE_SUCCESS, DeleteEmployeeSuccessAction } from '@app/state/ducks/smart/employee/actions'
import { MSG_TYPE } from '@app/views/components/common/Message'
import { put, takeLatest, take, takeEvery } from 'redux-saga/effects'
import { AnyAction } from 'redux'
import config from '@app/../config'
import { push } from 'connected-react-router'

const V = config.VERSION

function* submitBatchAccessEditSagas(action: SubmitBatchAccessEditSuccessAction) {
  if (action.payload.isOk) {
    yield put(showMessage('修改成功！', MSG_TYPE.SUCCESS))
    if (action.payload.data.length) {
      yield put(fetchEmployeeAccesses(action.payload.data[0]) as any)
    }
  } else {
    yield put(showMessage(`修改失败: ${action.payload.errMsg}`, MSG_TYPE.ERROR))
  }
}

function* submitBatchDataEditSagas(action: SubmitBatchDataEditSuccessAction) {
  if (action.payload.isOk) {
    yield put(showMessage('修改成功！', MSG_TYPE.SUCCESS))
    yield put(updateEmployeeListTimestamp())
    if (action.payload.data.length) {
      yield put(fetchEmployee(action.payload.data[0]) as any)
    }
  } else {
    yield put(showMessage(`修改失败：${action.payload.errMsg}`, MSG_TYPE.ERROR))
  }
}

function* submitCreateEmployeeSaga(action: CreateEmployeeSuccessAction) {
  if (action.payload.isOk) {
    yield put(showMessage('添加成功！', MSG_TYPE.SUCCESS))
    yield put(fetchEmployeeList({ offset: 0, limit: 10, order: 'desc', orderBy: 'id' }) as any)
  } else {
    yield put(showMessage(`添加失败！${action.payload.errMsg}`, MSG_TYPE.ERROR))
  }
}

function* deleteEmployeeBindSuccessSaga(action: DeleteEmployeeBindSuccessAction) {
  if (action.payload.isOk) {
    yield put(showMessage('清除绑定成功！', MSG_TYPE.SUCCESS))
  } else {
    yield put(showMessage(`清楚绑定失败！${action.payload.errMsg}`, MSG_TYPE.ERROR))
  }
}

function* doDeleteEmployeeSaga(action: DoDeleteEmployeeAction) {
  const employeeId = action.payload.employeeId
  yield put(deleteEmployee(employeeId) as AnyAction)
  const deleteAction: DeleteEmployeeSuccessAction = yield take(DELETE_EMPLOYEE_SUCCESS)
  if (deleteAction.payload.isOk) {
    yield put(showMessage(`删除成功！`, MSG_TYPE.SUCCESS))
    yield put(push(`/${V}/smart/employee/list`))
  } else {
    yield put(showMessage(`删除失败：${deleteAction.payload.errMsg}`, MSG_TYPE.ERROR))
  }
}

const employeeSagas = [
  takeLatest(SUBMIT_BATCH_ACCESS_EDIT_SUCCESS, submitBatchAccessEditSagas),
  takeLatest(SUBMIT_BATCH_DATA_EDIT_SUCCESS, submitBatchDataEditSagas),
  takeLatest(CREATE_EMPLOYEE_SUCCESS, submitCreateEmployeeSaga),
  takeLatest(DELETE_EMPLOYEE_BIND_SUCCESS, deleteEmployeeBindSuccessSaga),
  takeEvery(DO_DELETE_EMPLOYEE, doDeleteEmployeeSaga),
]

export default employeeSagas
