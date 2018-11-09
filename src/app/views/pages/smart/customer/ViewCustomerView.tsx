import { historyPush } from '@app/state/ducks/shared/actions'
import { doUpdateCustomer, DoUpdateCustomerAction, fetchCustomer } from '@app/state/ducks/smart/customer/actions'
import { Customer } from '@app/state/ducks/smart/customer/types'
import EditCustomer from '@app/views/components/smart/customer/EditCustomer'
import ViewCustomer from '@app/views/components/smart/customer/ViewCustomer'
import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { TItemState } from '@app/types'
import { getCustomer } from '@app/state/ducks/smart/customer/selectors'
import { RootState } from '@app/state/rootReducer'
import Loading from '@app/views/components/common/Loading'

interface Props extends RouteComponentProps<{ id: string }> {
  customer: TItemState<Customer>
  historyPush: (path: string) => any
  doUpdateCustomer: (customer: Partial<Customer>, cb: (isOk: boolean) => void) => DoUpdateCustomerAction
  fetchCustomer: (id: number) => any
}

interface States {
  isEditingData: boolean
  isAddingCard: boolean
}

const ViewCustomerView = (
  class extends React.Component<Props, States> {
    readonly id: number
    constructor(props: Props) {
      super(props)
      this.id = +this.props.match.params.id

      this.state = {
        isEditingData: false,
        isAddingCard: false,
      }
    }

    editData = () => {
      this.setState({ isEditingData: true })
    }

    saveData = (customer: Partial<Customer>) => {
      this.props.doUpdateCustomer(customer, (isOk) => {
        if (isOk) {
          this.setState({
            isEditingData: false,
          })
          if (customer.id) {
            this.props.fetchCustomer(customer.id)
          }
        }
      })
    }

    componentDidMount() {
      this.props.fetchCustomer(+this.props.match.params.id)
    }

    render() {
      const { customer } = this.props
      const { isEditingData } = this.state

      return (
        <div>
          {customer && customer.id ?
            <ViewCustomer
              editData={this.editData}
              customer={customer}
            /> : <Loading />
          }
          <EditCustomer
            open={isEditingData}
            customer={customer}
            closeHandler={() => { this.setState({ isEditingData: false }) }}
            saveHandler={this.saveData}
          />
        </div >
      )
    }
  }
)

const mapStateToProps = (state: RootState) => ({
  customer: getCustomer(state),
})

const mapDispatchToProps = ({
  historyPush,
  doUpdateCustomer,
  fetchCustomer,
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewCustomerView)
