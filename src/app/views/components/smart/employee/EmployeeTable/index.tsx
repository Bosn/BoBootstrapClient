import config from '@app/../config'
import { historyPush } from '@app/state/ducks/shared/actions'
import { Employee } from '@app/state/ducks/smart/employee/types'
import { ILoginInfo, IPager, TOrder, TPagerListState } from '@app/types'
import URLUtils from '@app/utilities/url'
import Loading from '@app/views/components/common/Loading'
import NoData from '@app/views/components/common/NoData'
import EditEmployee from '@app/views/components/smart/employee/EditEmployee'
import AccessEditDialog from '@app/views/components/smart/employee/EmployeeTable/AccessEditDialog'
import EmployeeEditDialog from '@app/views/components/smart/employee/EmployeeTable/EmployeeEditDialog'
import EmployeeTableHead from '@app/views/components/smart/employee/EmployeeTable/EmployeeTableHead'
import EmployeeTableToolbar from '@app/views/components/smart/employee/EmployeeTable/EmployeeTableToolbar'
import { Avatar, Button, createStyles, FormControl, Hidden, Input, InputAdornment, Theme, withStyles, WithStyles } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import AddIcon from '@material-ui/icons/Add'
import SearchIcon from '@material-ui/icons/Search'
import * as _ from 'lodash'
import * as React from 'react'
import { connect } from 'react-redux'
import LocalState from '@app/utilities/localState'
import { PAGE_STATE_KEY } from '@app/state/const'

const V = config.VERSION

const styles = ({ spacing }: Theme) => createStyles({
  root: {
    width: '100%',
    paddingBottom: 56 + spacing.unit * 2,
  },
  btnAdd: {
    position: 'fixed',
    right: spacing.unit * 2,
    bottom: spacing.unit * 2,
  },
  table: {
  },
  search: {
    width: 300,
    marginLeft: spacing.unit * 2,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  companySwitcher: {
    marginLeft: spacing.unit * 2,
  },
})

interface Props extends WithStyles<typeof styles> {
  list: TPagerListState<Employee>
  timestamp: Date
  loginInfo: ILoginInfo,
  historyPush: (path: string) => any
  fetchEmployeeList: (pager?: IPager) => void
  submitBatchAccessEdit: (accesses: number[], employeeIds: number[]) => void
  submitBatchDataEdit: (params: Partial<Employee>, employeeIds: number[]) => void
  submitCreateEmployee: (employee: Employee) => void
}

interface States {
  order: TOrder
  orderBy: ColumnKey
  selected: Employee[]
  data: Employee[]
  isFetching: boolean
  count: number
  page: number
  rowsPerPage: number
  accessEditDialogOpen: boolean
  dataEditDialogOpen: boolean
  isBatchEditMode: boolean
  query: string
  isCreatingData: boolean
  switchCompanyOpen: boolean
  timestamp: Date
}

export type ColumnKey = 'avatarImg' | 'id' | 'name' | 'levelStr'

interface ColumnDataItem {
  id: ColumnKey
  numeric: boolean
  disablePadding: boolean
  label: string
  sortable: boolean
}

export const columnData: ColumnDataItem[] = [
  { id: 'id', numeric: false, disablePadding: false, label: 'ID', sortable: true },
  { id: 'avatarImg', numeric: false, disablePadding: true, label: '', sortable: false },
  { id: 'name', numeric: false, disablePadding: true, label: '姓名', sortable: true },
  { id: 'levelStr', numeric: false, disablePadding: true, label: '级别', sortable: false },
]

const INIT_STATE = {
  order: 'desc' as TOrder,
  orderBy: 'id' as ColumnKey,
  selected: [],
  data: [],
  count: 0,
  isFetching: false,
  page: 0,
  rowsPerPage: 10,
  accessEditDialogOpen: false,
  dataEditDialogOpen: false,
  switchCompanyOpen: false,
  isBatchEditMode: false,
  isCreatingData: false,
  query: '',
}

const EmployeeTable = withStyles(styles)(
  class extends React.Component<Props, States> {

    searchTimeout: NodeJS.Timer | undefined = undefined

    constructor(props: Props) {
      super(props)
      this.state = {
        ...INIT_STATE,
        timestamp: props.timestamp,
        ...LocalState.tryLoadPageState(PAGE_STATE_KEY.EMPLOYEE_LIST_VIEW),
      }
      this.fetch = this.fetch.bind(this)

      this.handleRequestSort = this.handleRequestSort.bind(this)
      this.handleSelectAllClick = this.handleSelectAllClick.bind(this)
      this.handleClick = this.handleClick.bind(this)
      this.handleChangePage = this.handleChangePage.bind(this)
      this.handleChangeRowsPerPage = this.handleChangeRowsPerPage.bind(this)
      this.handleBatchEditAccess = this.handleBatchEditAccess.bind(this)
      this.handleBatchEditData = this.handleBatchEditData.bind(this)
      this.handleSaveBatchAccessEdit = this.handleSaveBatchAccessEdit.bind(this)
      this.handleSaveBatchDataEdit = this.handleSaveBatchDataEdit.bind(this)
      this.handleSearch = this.handleSearch.bind(this)
      this.saveData = this.saveData.bind(this)
    }

    public static getDerivedStateFromProps(nextProps: Props, prevState: States) {
      const listData = nextProps.list.data
      const data = listData.result.map(id => listData.entities.employees[id])
      return {
        ...prevState,
        count: nextProps.list.count,
        isFetching: nextProps.list.data.isFetching,
        data,
        query: prevState.query,
        timestamp: nextProps.timestamp,
      }
    }

    handleRequestSort = (_event: any, property: ColumnKey) => {
      if (!_.includes(['id', 'name'], property)) { return }
      const orderBy = property
      let order: TOrder = 'desc'
      if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc'
      }
      this.setState({ order, orderBy, page: 0 }, () => { this.fetch() })
    }

    handleBatchEditAccess() {
      this.setState({
        accessEditDialogOpen: true,
      })
    }

    handleBatchEditData() {
      this.setState({
        dataEditDialogOpen: true,
      })
    }

    handleSearch(event: any) {
      if (this.searchTimeout) {
        clearTimeout(this.searchTimeout)
      }
      this.setState({ query: event.target.value }, () => {
        const DELAY_TIMEOUT = 300
        this.searchTimeout = setTimeout(() => {
          this.searchTimeout = undefined
          this.fetch()
        }, DELAY_TIMEOUT) as any
      })
    }

    fetch() {
      const { rowsPerPage, page, order, orderBy, query } = this.state
      this.props.fetchEmployeeList({
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        order,
        orderBy: orderBy === 'levelStr' ? 'level' : orderBy,
        query,
      })
    }

    componentDidMount() {
      this.fetch()
    }

    componentDidUpdate(prevProps: Props) {
      if (+prevProps.timestamp !== +this.props.timestamp) {
        this.fetch()
      }
    }

    componentWillUnmount() {
      const { page, order, orderBy, rowsPerPage, query } = this.state
      LocalState.set(PAGE_STATE_KEY.EMPLOYEE_LIST_VIEW, {
        page, order, orderBy, rowsPerPage, query,
      })
    }

    handleSelectAllClick(_event: any, checked: boolean) {
      if (checked) {
        this.setState({ selected: this.state.data })
        return
      }
      this.setState({ selected: [] })
    }

    handleClick(_event: React.MouseEvent<HTMLTableRowElement>, id: number) {
      if (!this.state.isBatchEditMode) {
        this.props.historyPush(`/${V}/smart/employee/view/${id}`)
      }
      const { selected } = this.state
      const selectedIndex = _.findIndex(selected, x => x.id === id)
      const selectedItem = this.props.list.data.entities.employees[id]
      let newSelected: Employee[] = []
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, selectedItem)
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1))
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1))
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        )
      }
      this.setState({ selected: newSelected })
    }

    handleChangePage(_event: any, page: number) {
      this.setState({ page }, () => { this.fetch() })
    }

    handleChangeRowsPerPage(event: any) {
      this.setState({ rowsPerPage: event.target.value }, () => { this.fetch() })
    }

    handleSaveBatchAccessEdit(acceses: number[]) {
      this.props.submitBatchAccessEdit(acceses, this.state.selected.map(x => x.id))
      this.handleSelectAllClick(null, false)
      this.setState({
        isBatchEditMode: false,
      })
    }

    handleSaveBatchDataEdit(params: Partial<Employee>) {
      this.props.submitBatchDataEdit(params, this.state.selected.map(x => x.id))
      this.handleSelectAllClick(null, false)
      this.setState({
        isBatchEditMode: false,
      })
    }

    saveData(employee: Employee) {
      this.props.submitCreateEmployee(employee)
    }

    isSelected = (id: number) => _.findIndex(this.state.selected, x => x.id === id) !== -1

    public render() {
      const { classes } = this.props
      const {
        data, order, orderBy, selected, rowsPerPage, page, isFetching, count,
        accessEditDialogOpen, isBatchEditMode, dataEditDialogOpen, query, isCreatingData,
      } = this.state
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage)

      return (
        <Paper className={classes.root}>
          <AccessEditDialog
            open={accessEditDialogOpen}
            openHandler={() => { this.setState({ accessEditDialogOpen: true }) }}
            closeHandler={() => { this.setState({ accessEditDialogOpen: false }) }}
            saveHandler={this.handleSaveBatchAccessEdit}
            selected={selected}
          />
          <EmployeeEditDialog
            open={dataEditDialogOpen}
            openHandler={() => { this.setState({ dataEditDialogOpen: true }) }}
            closeHandler={() => { this.setState({ dataEditDialogOpen: false }) }}
            saveHandler={this.handleSaveBatchDataEdit}
            selected={selected}
          />
          <div>
            <EditEmployee
              open={isCreatingData}
              openHandler={() => { this.setState({ isCreatingData: true }) }}
              closeHandler={() => { this.setState({ isCreatingData: false }) }}
              saveHandler={this.saveData}
            />
            <EmployeeTableToolbar
              isBatchEditMode={this.state.isBatchEditMode}
              numSelected={selected.length}
              handleBatchEditAccess={this.handleBatchEditAccess}
              handleBatchEditData={this.handleBatchEditData}
              handleExitBatchMode={() => {
                this.setState({
                  isBatchEditMode: false,
                  selected: [],
                })
              }}
              handleEnableBatchMode={() => {
                this.setState({
                  isBatchEditMode: true,
                })
              }}
              handleCreate={() => {
                this.setState({
                  isCreatingData: true,
                })
              }}
              handleBatchSwitchCompany={() => {
                this.setState({
                  switchCompanyOpen: true,
                })
              }}
            />
            <FormControl className={classes.search}>
              <Input
                id="search-icon"
                placeholder="检索姓名、ID、手机"
                onChange={this.handleSearch}
                value={query}
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                }
              />
            </FormControl>
            {isFetching && <Loading title="员工列表" />}
            {count === 0 ? <NoData /> :
              <div className={classes.tableWrapper}>
                <Table className={classes.table} aria-labelledby="tableTitle">
                  <EmployeeTableHead
                    numSelected={selected.length}
                    order={order}
                    orderBy={orderBy}
                    onSelectAllClick={this.handleSelectAllClick}
                    onRequestSort={this.handleRequestSort}
                    rowCount={data.length}
                    isBatchEditMode={isBatchEditMode}
                  />
                  <TableBody>
                    {data.map(n => {
                      const isSelected = this.isSelected(n.id)
                      return (
                        <TableRow
                          hover={true}
                          onClick={event => this.handleClick(event, n.id)}
                          role="checkbox"
                          aria-checked={isSelected}
                          tabIndex={-1}
                          key={n.id}
                          selected={isSelected}
                        >
                          {isBatchEditMode ?
                            <TableCell padding="checkbox">
                              <Checkbox checked={isSelected} />
                            </TableCell>
                            :
                            <TableCell>{n.id}</TableCell>
                          }
                          <TableCell>
                            <Avatar src={URLUtils.getAvatarUrl(n.avatarImg, n.sex)} />
                          </TableCell>
                          <TableCell component="th" scope="row"> {n.name} </TableCell>
                          <Hidden xsDown={true}>
                            <TableCell>{n.sex ? '男' : '女'}</TableCell>
                          </Hidden>
                          <Hidden xsDown={true}>
                            <TableCell>{n.mobile}</TableCell>
                          </Hidden>
                          <Hidden smDown={true}>
                            <TableCell>{n.company ? n.company.name : '-'}</TableCell>
                          </Hidden>
                          <Hidden smDown={true}>
                            <TableCell>{n.nickname}</TableCell>
                          </Hidden>
                          <Hidden lgDown={true}>
                            <TableCell>{n.email}</TableCell>
                          </Hidden>
                          <Hidden lgDown={true}>
                            <TableCell>{n.identityNo}</TableCell>
                          </Hidden>
                        </TableRow>
                      )
                    })}
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 49 * emptyRows }} >
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            }
            <TablePagination
              component="div"
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              labelRowsPerPage="每页条目数"
              backIconButtonProps={{
                'aria-label': '上一页',
              }}
              nextIconButtonProps={{
                'aria-label': '下一页',
              }}
              onChangePage={this.handleChangePage}
              onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
            <Button
              variant="fab"
              color="secondary"
              className={classes.btnAdd}
              onClick={() => { this.setState({ isCreatingData: true }) }}
            >
              <AddIcon />
            </Button>
          </div>
        </Paper>
      )
    }
  }
)

const mapStateToProps = () => ({
})

const mapDispatchToProps = ({
  historyPush,
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTable)
