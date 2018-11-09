import { doFetchGuideKey, DoFetchGuideKeyAction, historyPush } from '@app/state/ducks/shared/actions'
import { Customer, getIdentityTypeStr } from '@app/state/ducks/smart/customer/types'
import { TItemState, ILoginInfo } from '@app/types'
import URLUtils from '@app/utilities/url'
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
import { doDeleteCustomer, DoDeleteCustomerAction } from '@app/state/ducks/smart/customer/actions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import FormatUtils from '@app/utilities/format'
import { RootState } from '@app/state/rootReducer'

import Joyride from 'react-joyride'
import { Typography } from '@material-ui/core'
import { GUIDE_KEY } from '@app/state/const'
import { RouterAction } from 'connected-react-router'
import { getLoginInfo } from '@app/state/ducks/shared/selectors'
import { blue } from '@material-ui/core/colors'

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
  avatarList: {
    margin: spacing.unit,
    marginLeft: spacing.unit * 2,
    marginTop: 0,
  },
  topCtl: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  summaryTable: {
    margin: spacing.unit * 2,
  },
  options: {
  },
  cards: {
  },
  speedDial: {
    position: 'fixed',
    bottom: spacing.unit * 2,
    right: spacing.unit * 2 + 65,
  },
  fab: {
    backgroundColor: blue[500],
  },
})

export interface Props extends WithStyles<typeof styles> {
  customer: TItemState<Customer>
  loginInfo: ILoginInfo
  editData: () => void
  doDeleteCustomer: (id: number) => DoDeleteCustomerAction
  doFetchGuideKey: (key: GUIDE_KEY, cb: (existed: boolean) => void) => DoFetchGuideKeyAction
  historyPush: (path: string) => RouterAction
}

export interface States {
  anchorEleOptions: any
  tabValue: number
  confirmDialogOpen: boolean
  guideOpen: boolean
  speedDialOpen: boolean
}

const ViewCustomer = withStyles(styles)(
  class extends React.Component<Props, States> {

    constructor(props: Props) {
      super(props)
      this.state = {
        anchorEleOptions: null,
        tabValue: 0,
        confirmDialogOpen: false,
        guideOpen: false,
        speedDialOpen: false,
      }
    }

    handleClickMenu = (e: React.MouseEvent<any>) => {
      this.setState({ anchorEleOptions: e.currentTarget })
    }

    handleCloseMenu = () => {
      this.setState({ anchorEleOptions: null })
    }

    handleTabChange = (_event: any, value: any) => {
      this.setState({ tabValue: value })
    }

    goBack = () => {
      window.history.back()
    }

    handleConfirmDialogCancel = () => {
      this.setState({
        confirmDialogOpen: false,
      })
    }

    handleConfirmDialogOk = () => {
      this.props.doDeleteCustomer(this.props.customer.id)
      this.setState({
        confirmDialogOpen: false,
      })
    }

    componentDidMount() {
      this.props.doFetchGuideKey(GUIDE_KEY.MEMBER_VIEW, (existed) => {
        if (!existed) {
          setTimeout(() => {
            this.setState({ guideOpen: true })
          }, 1000)
        }
      })
    }

    render() {
      const { customer, classes, editData } = this.props
      const { anchorEleOptions, confirmDialogOpen, guideOpen } = this.state

      const Detail = () => (
        <List className={classes.detailContainer}>
          <ListItem>
            <ListItemText primary="手机" secondary={customer.mobile} />
          </ListItem>
          <Divider />
          {customer.birthday && <>
            <ListItem>
              <ListItemText primary="生日" secondary={`${FormatUtils.date(FormatUtils.fromBirthday(customer.birthday) || new Date())}`} />
            </ListItem>
            <Divider /></>}
          {customer.email && <>
            <ListItem>
              <ListItemText primary="Email" secondary={`${customer.email}`} />
            </ListItem>
            <Divider /></>}
          {customer.address && <>
            <ListItem>
              <ListItemText primary="地址" secondary={`${customer.address}`} />
            </ListItem>
            <Divider /></>}
          {customer.identityType && customer.identityNo && <>
            <ListItem>
              <ListItemText primary="证件" secondary={`${getIdentityTypeStr(customer.identityType)} - ${customer.identityNo}`} />
            </ListItem>
            <Divider /></>}
          {customer.emergencyContactPhone && <>
            <ListItem>
              <ListItemText primary="紧急联系人" secondary={`${customer.emergencyContactName} / ${customer.emergencyContactRelationship} / ${customer.emergencyContactPhone}`} />
            </ListItem>
            <Divider /></>}
          {customer.desc && <>
            <ListItem>
              <ListItemText primary="备注" secondary={`${customer.desc}`} />
            </ListItem>
            <Divider /></>}

        </List >
      )
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
              className={classes.options}
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
              <MenuItem onClick={() => { this.setState({ confirmDialogOpen: true }); this.handleCloseMenu() }}> 删除用户 </MenuItem>
              <MenuItem onClick={() => { this.setState({ guideOpen: true }); this.handleCloseMenu() }}> 帮助 </MenuItem>
            </Menu>
          </div>
          <div className={classes.top}>
            <Avatar className={classes.avatar} src={URLUtils.getAvatarUrl(customer.avatarImg, customer.sex)} />
            <ListItemText
              className={classes.summary}
              primary={customer.name}
              secondary={`${customer.sex ? '男' : '女'}`}
            />
          </div>
          <Tabs
            value={this.state.tabValue}
            indicatorColor="secondary"
            textColor="secondary"
            onChange={this.handleTabChange}
          >
            <Tab label="档案" />
          </Tabs>
          {this.state.tabValue === 0 && <Detail />}
          {this.state.tabValue === 0 && <>
            <Button
              variant="fab"
              color="secondary"
              className={classes.mainOp}
              onClick={editData}
            >
              <SaveIcon />
            </Button>
          </>
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
              是否确认删除该用户，该操作不可恢复！
              </DialogContent>
            <DialogActions>
              <Button onClick={this.handleConfirmDialogCancel} color="primary"> 取消 </Button>
              <Button onClick={this.handleConfirmDialogOk} color="primary"> 确认 </Button>
            </DialogActions>
          </Dialog>
          <Joyride
            continuous={true}
            scrollToFirstStep={true}
            showProgress={true}
            showSkipButton={true}
            run={guideOpen}
            locale={{
              skip: '跳过',
              next: '下一步',
              back: '上一步',
              last: '完成',
            }}
            steps={[
              {
                title: '修改用户资料',
                disableBeacon: true,
                content: <Typography variant="body1">点击这里可以修改资料哦</Typography>,
                placement: 'top',
                target: `.${classes.mainOp}`,
              }, {
                title: '更多选项',
                disableBeacon: true,
                content: <Typography variant="body1">在这里可以进入更多选项，如编辑用户、删除用户、帮助等等。</Typography>,
                placement: 'bottom',
                target: `.${classes.options}`,
              },
            ]}
          />
        </div>
      )
    }
  }
)

const mapStateToProps = (state: RootState) => ({
  loginInfo: getLoginInfo(state),
})

const mapDispatchToProps = ({
  doDeleteCustomer,
  doFetchGuideKey,
  historyPush,
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewCustomer)
