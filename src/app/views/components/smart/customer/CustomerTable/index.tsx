import config from '@app/../config'
import { historyPush, RSAAA, doFetchGuideKey, DoFetchGuideKeyAction } from '@app/state/ducks/shared/actions'
import { Customer } from '@app/state/ducks/smart/customer/types'
import { ILoginInfo, IPager, TOrder, TPagerListState, IEntitySummary } from '@app/types'
import URLUtils from '@app/utilities/url'
import Loading from '@app/views/components/common/Loading'
import NoData from '@app/views/components/common/NoData'
import EditCustomer from '@app/views/components/smart/customer/EditCustomer'
import CustomerTableHead from '@app/views/components/smart/customer/CustomerTable/CustomerTableHead'
import CustomerTableToolbar from '@app/views/components/smart/customer/CustomerTable/CustomerTableToolbar'
import { Avatar, Button, createStyles, FormControl, Hidden, Input, InputAdornment, Theme, withStyles, WithStyles, Typography } from '@material-ui/core'
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
import { doUpdateCustomer, DoUpdateCustomerAction, fetchCustomerList } from '@app/state/ducks/smart/customer/actions'
import { RootState } from '@app/state/rootReducer'
import { getCustomerList } from '@app/state/ducks/smart/customer/selectors'
import { getLoginInfo } from '@app/state/ducks/shared/selectors'
import Joyride from 'react-joyride'
import { GUIDE_KEY, PAGE_STATE_KEY } from '@app/state/const'
import LocalState from '@app/utilities/localState'

const V = config.VERSION

const styles = ({ spacing }: Theme) => createStyles({
  title: {
    position: 'absolute',
    left: spacing.unit * 2,
    top: -spacing.unit,
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 0,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '12px',
    lineHeight: 1,
  },
  listItem: {
    position: 'relative',
    marginTop: spacing.unit * 2,
    width: 280,
  },
  root: {
    width: '100%',
    paddingBottom: 56 + spacing.unit * 2,
  },
  firstRow: {
  },
  btnAdd: {
    position: 'fixed',
    right: spacing.unit * 2,
    bottom: spacing.unit * 2,
  },
  table: {
  },
  btnClear: {
    marginLeft: spacing.unit,
  },
  search: {
    width: 210,
    marginLeft: spacing.unit * 2,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
  companySwitcher: {
    marginLeft: spacing.unit * 2,
  },
  head: {
  },
  btnExpand: {
    marginLeft: spacing.unit * 2,
    position: 'relative',
    top: -spacing.unit,
  },
  advancedSearch: {
  },
})

interface Props extends WithStyles<typeof styles> {
  list: TPagerListState<Customer>
  timestamp: Date
  loginInfo: ILoginInfo,
  fetchCustomerList: (pager: IPager) => RSAAA
  doUpdateCustomer: (customer: Partial<Customer>, cb: (isOk: boolean) => void) => DoUpdateCustomerAction
  historyPush: (path: string) => any
  doFetchGuideKey: (key: GUIDE_KEY, cb: (existed: boolean) => void) => DoFetchGuideKeyAction
}

interface States {
  order: TOrder
  orderBy: ColumnKey
  selected: Customer[]
  data: Customer[]
  isFetching: boolean
  count: number
  page: number
  rowsPerPage: number
  isBatchEditMode: boolean
  query: string
  isCreatingData: boolean
  timestamp: Date
  guideOpen: boolean
  toolbarClasses: any
  advancedSearchOpen: boolean
  selectedEmployees: IEntitySummary[]
  searchType: SEARCH_TYPE
}

enum SEARCH_TYPE {
  BY_ADVISOR = 1,
  BY_TRAINER = 2,
}

export type ColumnKey = 'avatarImg' | 'id' | 'name'

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
]

const INIT_STATE: States = {
  timestamp: new Date(),
  order: 'desc' as TOrder,
  orderBy: 'id' as ColumnKey,
  selected: [],
  data: [],
  count: 0,
  isFetching: false,
  page: 0,
  rowsPerPage: 10,
  isBatchEditMode: false,
  isCreatingData: false,
  query: '',
  guideOpen: false,
  toolbarClasses: { options: '' },
  advancedSearchOpen: false,
  selectedEmployees: [],
  searchType: SEARCH_TYPE.BY_ADVISOR,
}

const CustomerTable = withStyles(styles)(
  class extends React.Component<Props, States> {

    searchTimeout: NodeJS.Timer | undefined = undefined

    constructor(props: Props) {
      super(props)
      this.state = {
        ...INIT_STATE,
        timestamp: props.timestamp,
        ...LocalState.tryLoadPageState(PAGE_STATE_KEY.CUSTOMER_LIST_VIEW),
      }
    }

    public static getDerivedStateFromProps(nextProps: Props, prevState: States) {
      const listData = nextProps.list.data
      const data = listData.result.map(id => listData.entities.customers[id])
      return {
        ...prevState,
        count: nextProps.list.count,
        isFetching: nextProps.list.data.isFetching,
        data,
        timestamp: nextProps.timestamp,
      }
    }

    handleRequestSort = (_event: any, property: ColumnKey) => {
      if (!_.includes(['id', 'name', 'levelStr'], property)) { return }
      const orderBy = property
      let order: TOrder = 'desc'
      if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc'
      }
      this.setState({ order, orderBy, page: 0 }, () => { this.fetch() })
    }

    handleSearch = (event: any) => {
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

    fetch = () => {
      const { rowsPerPage, page, order, orderBy, query } = this.state
      this.props.fetchCustomerList({
        limit: rowsPerPage,
        offset: page * rowsPerPage,
        order,
        orderBy,
        query,
      })
    }

    componentDidMount() {
      this.props.doFetchGuideKey(GUIDE_KEY.MEMBER_LIST, (existed) => {
        if (!existed) {
          setTimeout(() => {
            this.setState({ guideOpen: true })
          }, 1000)
        }
      })
      this.fetch()
    }

    componentDidUpdate(prevProps: Props) {
      if (+prevProps.timestamp !== +this.props.timestamp ||
        (prevProps.loginInfo.companyId > 0 && prevProps.loginInfo.companyId !== this.props.loginInfo.companyId)) {
        this.fetch()
      }
    }

    componentWillUnmount() {
      const { page, order, orderBy, rowsPerPage, query, advancedSearchOpen, selectedEmployees, searchType } = this.state
      LocalState.set(PAGE_STATE_KEY.CUSTOMER_LIST_VIEW, {
        page, order, orderBy, rowsPerPage, query, advancedSearchOpen, selectedEmployees, searchType,
      })
    }

    handleSelectAllClick = (_event: any, checked: boolean) => {
      if (checked) {
        this.setState({ selected: this.state.data })
        return
      }
      this.setState({ selected: [] })
    }

    handleClick = (_event: React.MouseEvent<HTMLTableRowElement>, id: number) => {
      if (!this.state.isBatchEditMode) {
        this.props.historyPush(`/${V}/smart/customer/view/${id}`)
      }
      const { selected } = this.state
      const selectedIndex = _.findIndex(selected, x => x.id === id)
      const selectedItem = this.props.list.data.entities.customers[id]
      let newSelected: Customer[] = []
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

    handleChangePage = (_event: any, page: number) => {
      this.setState({ page }, () => { this.fetch() })
    }

    handleChangeRowsPerPage = (event: any) => {
      this.setState({ rowsPerPage: event.target.value }, () => { this.fetch() })
    }

    saveData = (customer: Customer) => {
      this.props.doUpdateCustomer(customer, isOk => {
        if (isOk) {
          this.setState({
            isCreatingData: false,
          })
          this.fetch()
        }
      })
    }

    isSelected = (id: number) => _.findIndex(this.state.selected, x => x.id === id) !== -1

    setSearchType = (e: any) => {
      const val = +e.target.value
      this.setState({
        searchType: val,
      }, () => {
        if (this.state.selectedEmployees.length) {
          this.fetch()
        }
      })
    }

    render() {
      const { classes } = this.props
      const {
        data, order, orderBy, selected, rowsPerPage, page, isFetching, count,
        isBatchEditMode, query, isCreatingData,
      } = this.state
      const emptyRows = rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage)

      return (
        <Paper className={classes.root}>
          <EditCustomer
            open={isCreatingData}
            closeHandler={() => { this.setState({ isCreatingData: false }) }}
            saveHandler={this.saveData}
          />
          <CustomerTableToolbar
            isBatchEditMode={this.state.isBatchEditMode}
            numSelected={selected.length}
            getClasses={(classes) => { this.setState({ toolbarClasses: classes }) }}
            showGuide={() => { this.setState({ guideOpen: true }) }}
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
          {count === 0 ? <NoData /> :
            <div className={classes.tableWrapper}>
              <Table className={classes.table} aria-labelledby="tableTitle">
                <CustomerTableHead
                  className={classes.head}
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={this.handleSelectAllClick}
                  onRequestSort={this.handleRequestSort}
                  rowCount={data.length}
                  isBatchEditMode={isBatchEditMode}
                />
                <TableBody>
                  {data.map((n, i) => {
                    const isSelected = this.isSelected(n.id)
                    return (
                      <TableRow
                        className={i === 0 ? classes.firstRow : ''}
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
          {isFetching && <Loading title="用户列表" />}
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
          <Joyride
            continuous={true}
            scrollToFirstStep={true}
            showProgress={true}
            showSkipButton={true}
            run={this.state.guideOpen}
            locale={{
              skip: '跳过',
              next: '下一步',
              back: '上一步',
              last: '完成',
            }}
            steps={[
              {
                title: '帮助',
                disableBeacon: true,
                content: <Typography variant="body1">欢迎进入BoBootstrap客户管理演示</Typography>,
                placement: 'center',
                target: `#tableTitle`,
              }, {
                title: '用户详情',
                disableBeacon: true,
                content: <Typography variant="body1">点击任意用户，可查看、修改用户详细资料。</Typography>,
                placement: 'bottom',
                target: `.${classes.firstRow}`,
              }, {
                title: '表头排序',
                disableBeacon: true,
                content: <Typography variant="body1">点击任意列的标题，可进行排序哦！</Typography>,
                placement: 'bottom',
                target: `.${classes.head}`,
              }, {
                title: '添加用户',
                disableBeacon: true,
                content: <Typography variant="body1">点击该按钮，可以录入新用户。</Typography>,
                placement: 'bottom',
                target: `.${classes.btnAdd}`,
              }, {
                title: '更多选项',
                disableBeacon: true,
                content: <Typography variant="body1">点击这里，可以查看更多操作。如添加用户、批量操作、帮助等等。</Typography>,
                placement: 'bottom',
                target: `.${this.state.toolbarClasses.options}`,
              },
            ]}
          />
        </Paper>
      )
    }
  }
)

const mapStateToProps = (state: RootState) => ({
  list: getCustomerList(state),
  loginInfo: getLoginInfo(state),
  timestamp: state.smart.customer.listTimestamp,
})

const mapDispatchToProps = ({
  historyPush,
  doUpdateCustomer,
  fetchCustomerList,
  doFetchGuideKey,
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTable)
