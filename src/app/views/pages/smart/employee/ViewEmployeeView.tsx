import { historyPush } from '@app/state/ducks/shared/actions'
import { fetchEmployee, fetchEmployeeAccesses, submitBatchAccessEdit, submitBatchDataEdit } from '@app/state/ducks/smart/employee/actions'
import { getEmployee, getEmployeeAccesses } from '@app/state/ducks/smart/employee/selectors'
import { Employee, ViewAccessesState } from '@app/state/ducks/smart/employee/types'
import { RootState } from '@app/state/rootReducer'
import { TItemState } from '@app/types'
import Loading from '@app/views/components/common/Loading'
import EditEmployee from '@app/views/components/smart/employee/EditEmployee'
import AccessEditDialog from '@app/views/components/smart/employee/EmployeeTable/AccessEditDialog'
import ViewEmployee from '@app/views/components/smart/employee/ViewEmployee'
import { createStyles, withStyles, WithStyles } from '@material-ui/core'
import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'

const styles = () => createStyles({
  container: {
  },
})

interface Props extends WithStyles<typeof styles>, RouteComponentProps<{ id: string }> {
  employee: TItemState<Employee>
  accesses: ViewAccessesState
  fetchEmployee: (id: number) => any
  fetchEmployeeAccesses: (id: number) => any
  submitBatchAccessEdit: (accesses: number[], employeeIds: number[]) => any
  submitBatchDataEdit: (employee: Partial<Employee>, employeeIds: number[]) => any
  submitSwitchCompany: (companyId: number, employeeIds: number[]) => any
  historyPush: (path: string) => any
}

interface States {
  isEditingData: boolean
  isEditingAccess: boolean
}

const ViewEmployeeView = withStyles(styles)(
  class extends React.Component<Props, States> {
    readonly id: number
    constructor(props: Props) {
      super(props)
      this.editData = this.editData.bind(this)
      this.editAccess = this.editAccess.bind(this)
      this.saveData = this.saveData.bind(this)
      this.saveAccess = this.saveAccess.bind(this)
      this.id = +this.props.match.params.id

      this.state = {
        isEditingData: false,
        isEditingAccess: false,
      }
    }

    editData() {
      this.setState({ isEditingData: true })
    }
    editAccess() {
      this.setState({ isEditingAccess: true })
    }

    saveData(employee: Partial<Employee>) {
      this.setState({
        isEditingData: false,
      })
      this.props.submitBatchDataEdit(employee, [this.id])
    }

    saveAccess(accesses: number[]) {
      this.setState({
        isEditingAccess: false,
      })
      this.props.submitBatchAccessEdit(accesses, [this.id])
    }

    componentDidMount() {
      const id = +this.props.match.params.id
      this.props.fetchEmployee(id)
      this.props.fetchEmployeeAccesses(id)
    }

    render() {
      const { employee, accesses, classes } = this.props
      const { isEditingData, isEditingAccess } = this.state

      return employee.isFetching ? <Loading /> : (
        <div className={classes.container}>
          <ViewEmployee
            employee={employee}
            accesses={accesses}
            editData={this.editData}
            editAccess={this.editAccess}
          />
          <EditEmployee
            open={isEditingData}
            employee={employee}
            openHandler={() => { this.setState({ isEditingData: true }) }}
            closeHandler={() => { this.setState({ isEditingData: false }) }}
            saveHandler={this.saveData}
          />
          <AccessEditDialog
            open={isEditingAccess}
            openHandler={() => { this.setState({ isEditingAccess: true }) }}
            closeHandler={() => { this.setState({ isEditingAccess: false }) }}
            saveHandler={this.saveAccess}
            accesses={accesses.accesses}
            selected={[employee]}
          />
        </div >
      )
    }
  }
)

const mapStateToProps = (state: RootState) => ({
  employee: getEmployee(state),
  accesses: getEmployeeAccesses(state),
})

const mapDispatchToProps = ({
  historyPush,
  fetchEmployee,
  fetchEmployeeAccesses,
  submitBatchAccessEdit,
  submitBatchDataEdit,
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewEmployeeView)
