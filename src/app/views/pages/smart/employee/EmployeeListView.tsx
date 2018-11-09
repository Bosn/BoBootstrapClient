import { getLoginInfo } from '@app/state/ducks/shared/selectors'
import { createEmployee, fetchEmployeeList, submitBatchAccessEdit, submitBatchDataEdit } from '@app/state/ducks/smart/employee/actions'
import { getEmployeeList } from '@app/state/ducks/smart/employee/selectors'
import { Employee } from '@app/state/ducks/smart/employee/types'
import { RootState } from '@app/state/rootReducer'
import { ILoginInfo, IPager, TPagerListState } from '@app/types'
import EmployeeTable from '@app/views/components/smart/employee/EmployeeTable'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import * as React from 'react'
import { connect } from 'react-redux'

const styles = () => createStyles({
  container: {
    maxHeight: 300,
    overflowY: 'auto' as 'auto',
  },
})

interface Props extends WithStyles<typeof styles> {
  list: TPagerListState<Employee>
  timestamp: Date
  loginInfo: ILoginInfo,
  fetchEmployeeList: (pager?: IPager) => any
  createEmployee: (employee: Employee) => any
  submitBatchAccessEdit: (accesses: number[], employeeIds: number[]) => any
  submitBatchDataEdit: (params: Partial<Employee>, employeeIds: number[]) => any
  submitSwitchCompany: (companyId: number, employeeIds: number[]) => any
}

interface States {
}

const EmployeeListView = withStyles(styles)(
  class extends React.Component<Props, States> {
    constructor(props: Props) {
      super(props)
      this.doSubmitBatchAccessEdit = this.doSubmitBatchAccessEdit.bind(this)
      this.doSubmitBatchDataEdit = this.doSubmitBatchDataEdit.bind(this)
      this.doSubmitCreateEmployee = this.doSubmitCreateEmployee.bind(this)
      this.doSubmitSwitchCompany = this.doSubmitSwitchCompany.bind(this)
    }
    public doSubmitBatchAccessEdit(accesses: number[], employeeIds: number[]) {
      this.props.submitBatchAccessEdit(accesses, employeeIds)
    }
    public doSubmitBatchDataEdit(params: Partial<Employee>, employeeIds: number[]) {
      this.props.submitBatchDataEdit(params, employeeIds)
    }
    public doSubmitCreateEmployee(employee: Employee) {
      this.props.createEmployee(employee)
    }
    public doSubmitSwitchCompany(companyId: number, employeeIds: number[]) {
      this.props.submitSwitchCompany(companyId, employeeIds)
    }
    public render() {
      const { list, timestamp, fetchEmployeeList, loginInfo } = this.props
      return (
      <EmployeeTable
        list={list}
        timestamp={timestamp}
        loginInfo={loginInfo}
        fetchEmployeeList={fetchEmployeeList}
        submitBatchAccessEdit={this.doSubmitBatchAccessEdit}
        submitBatchDataEdit={this.doSubmitBatchDataEdit}
        submitCreateEmployee={this.doSubmitCreateEmployee}
      />
      )
    }
  }
)

const mapStateToProps = (state: RootState) => ({
  list: getEmployeeList(state),
  loginInfo: getLoginInfo(state),
  timestamp: state.smart.employee.listTimestamp,
})

const mapDispatchToProps = ({
  fetchEmployeeList,
  createEmployee,
  submitBatchAccessEdit,
  submitBatchDataEdit,
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeListView)
