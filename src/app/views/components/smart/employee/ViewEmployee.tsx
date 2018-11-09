import config from '@app/../config'
import { historyPush, RSAAA } from '@app/state/ducks/shared/actions'
import { Employee, getAccessLabel, ViewAccessesState } from '@app/state/ducks/smart/employee/types'
import { TItemState } from '@app/types'
import URLUtils from '@app/utilities/url'
import Loading from '@app/views/components/common/Loading'
import NoData from '@app/views/components/common/NoData'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import LeftIcon from '@material-ui/icons/ChevronLeft'
import MenuIcon from '@material-ui/icons/Menu'
import SaveIcon from '@material-ui/icons/Save'
import * as React from 'react'
import { connect } from 'react-redux'
import { deleteEmployeeBind, doDeleteEmployee, DoDeleteEmployeeAction } from '@app/state/ducks/smart/employee/actions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'

const V = config.VERSION

const styles = ({ spacing }: Theme) => createStyles({
  root: {
    backgroundColor: '#ffffff',
  },
  mainOp: {
    position: 'fixed',
    right: spacing.unit * 2,
    bottom: spacing.unit * 2,
  },
  top: {
    display: 'flex',
  },
  avatar: {
    margin: spacing.unit * 2,
  },
  summary: {
    marginTop: spacing.unit * 2,
  },
  detailContainer: {
  },
  topCtl: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  summaryTable: {
    margin: spacing.unit * 2,
  },
})

export interface Props extends WithStyles<typeof styles> {
  employee: TItemState<Employee>
  accesses: ViewAccessesState
  historyPush: (path: string) => any
  editData: () => any
  editAccess: () => any
  deleteEmployeeBind: (employeeId: number) => RSAAA
  doDeleteEmployee: (id: number) => DoDeleteEmployeeAction
}

export interface States {
  anchorEleOptions: any
  tabValue: number
  confirmDialogOpen: boolean
}

const ViewEmployee = withStyles(styles)(
  class extends React.Component<Props, States> {

    constructor(props: Props) {
      super(props)
      this.handleClickMenu = this.handleClickMenu.bind(this)
      this.handleCloseMenu = this.handleCloseMenu.bind(this)
      this.goBack = this.goBack.bind(this)
      this.state = {
        anchorEleOptions: null,
        tabValue: 0,
        confirmDialogOpen: false,
      }
    }

    public handleClickMenu = (e: React.MouseEvent<any>) => {
      this.setState({ anchorEleOptions: e.currentTarget })
    }

    public handleCloseMenu = () => {
      this.setState({ anchorEleOptions: null })
    }

    public handleTabChange = (_event: any, value: any) => {
      this.setState({ tabValue: value })
    }

    goBack() {
      this.props.historyPush(`/${V}/smart/employee/list`)
    }

    handleConfirmDialogCancel = () => {
      this.setState({
        confirmDialogOpen: false,
      })
    }

    handleConfirmDialogOk = () => {
      this.props.doDeleteEmployee(this.props.employee.id)
      this.setState({
        confirmDialogOpen: false,
      })
    }

    public render() {
      const { employee, classes, editAccess, editData, accesses } = this.props
      const { anchorEleOptions, confirmDialogOpen } = this.state

      const Detail = () => (
        <List className={classes.detailContainer}>
          <ListItem>
            <ListItemText primary="昵称" secondary={employee.nickname} />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="手机" secondary={employee.mobile} />
          </ListItem>
          <Divider />
          {employee.email &&
            <div>
              <Divider />
              <ListItem>
                <ListItemText primary="E-mail" secondary={employee.email} />
              </ListItem>
            </div>
          }
          {employee.identityNo &&
            <div>
              <Divider />
              <ListItem>
                <ListItemText primary="身份证" secondary={employee.identityNo} />
              </ListItem>
            </div>
          }
          {employee.desc &&
            <div>
              <Divider />
              <ListItem>
                <ListItemText primary="备注" secondary={employee.desc} />
              </ListItem>
            </div>
          }
        </List >
      )

      const Accesses = () => {
        if (accesses.isFetching) {
          return <Loading title="权限记录" />
        } else if (accesses.accesses.length === 0) {
          return <NoData title="权限记录" />
        } else {
          return (
            <List className={classes.detailContainer}>
              {accesses.accesses.map(x => <ListItem key={x}><ListItemText secondary={getAccessLabel(x)} /></ListItem>)}
            </List>
          )
        }
      }

      return (
        <div className={classes.root}>
          <div className={classes.topCtl}>
            <IconButton
              onClick={this.goBack}
            >
              <LeftIcon />
            </IconButton>
            <IconButton
              aria-label="options"
              aria-owns={anchorEleOptions ? 'eleOptions' : undefined}
              aria-haspopup="true"
              onClick={this.handleClickMenu}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="eleOptions"
              anchorEl={anchorEleOptions}
              open={Boolean(anchorEleOptions)}
              onClose={this.handleCloseMenu}
            >
              <MenuItem onClick={() => { editData(); this.handleCloseMenu() }}> 编辑资料 </MenuItem>
              <MenuItem onClick={() => { editAccess(); this.handleCloseMenu() }}> 设置权限 </MenuItem>
              <MenuItem onClick={() => { this.setState({ confirmDialogOpen: true }); this.handleCloseMenu() }}> 删除员工 </MenuItem>
            </Menu>
          </div>
          <div className={classes.top}>
            <Avatar className={classes.avatar} src={URLUtils.getAvatarUrl(employee.avatarImg, employee.sex)} />
            <ListItemText
              className={classes.summary}
              primary={employee.name}
            />
          </div>
          <Tabs
            value={this.state.tabValue}
            indicatorColor="secondary"
            textColor="secondary"
            onChange={this.handleTabChange}
          >
            <Tab label="档案" />
            <Tab label="权限" />
          </Tabs>
          {this.state.tabValue === 0 && <Detail />}
          {this.state.tabValue === 1 && <Accesses />}
          {this.state.tabValue === 0 ?
            <Button
              variant="fab"
              color="secondary"
              className={classes.mainOp}
              onClick={editData}
            >
              <SaveIcon />
            </Button> : null
          }
          {this.state.tabValue === 1 ?
            <Button
              variant="fab"
              color="secondary"
              className={classes.mainOp}
              onClick={editAccess}
            >
              <SaveIcon />
            </Button> : null
          }
          <Dialog
            disableBackdropClick={true}
            disableEscapeKeyDown={true}
            open={confirmDialogOpen}
            maxWidth="xs"
            aria-labelledby="confirmation-dialog-title"
          >
            <DialogTitle id="confirmation-dialog-title">确认</DialogTitle>
            <DialogContent>
              是否确认删除该员工，该操作不可恢复！
              </DialogContent>
            <DialogActions>
              <Button onClick={this.handleConfirmDialogCancel} color="primary"> 取消 </Button>
              <Button onClick={this.handleConfirmDialogOk} color="primary"> 确认 </Button>
            </DialogActions>
          </Dialog>
        </div>
      )
    }
  }
)

const mapStateToProps = () => ({
})

const mapDispatchToProps = ({
  historyPush,
  deleteEmployeeBind,
  doDeleteEmployee,
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewEmployee)
