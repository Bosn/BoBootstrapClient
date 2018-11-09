import { historyPush } from '@app/state/ducks/shared/actions'
import { createStyles, Menu, MenuItem, Theme, withStyles, WithStyles } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import { lighten } from '@material-ui/core/styles/colorManipulator'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import CancelIcon from '@material-ui/icons/Cancel'
import EditIcon from '@material-ui/icons/Edit'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import classNames from 'classnames'
import * as React from 'react'
import { connect } from 'react-redux'

const styles = ({ spacing, palette }: Theme) => createStyles({
  root: {
  },
  highlight:
    palette.type === 'light'
      ? {
        color: palette.secondary.main,
        backgroundColor: lighten(palette.secondary.light, 0.85),
      }
      : {
        color: palette.text.primary,
        backgroundColor: palette.secondary.dark,
      },
  topCtl: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  actions: {
  },
  title: {
    margin: spacing.unit * 2,
  },
})

interface Props extends WithStyles<typeof styles> {
  numSelected: number
  isBatchEditMode: boolean
  historyPush: (path: string) => any
  handleBatchEditAccess: () => void
  handleBatchEditData: () => void
  handleExitBatchMode: () => any
  handleEnableBatchMode: () => void
  handleBatchSwitchCompany: () => any
  handleCreate: () => void
}

interface States {
  anchorEleBatchEdit: any
  anchorEleOptions: any
}

const EmployeeTableToolbar = withStyles(styles)(
  class extends React.Component<Props, States> {
    constructor(props: Props) {
      super(props)
      this.handleEditOpen = this.handleEditOpen.bind(this)
      this.handleEditClose = this.handleEditClose.bind(this)
      this.handleOptionsOpen = this.handleOptionsOpen.bind(this)
      this.handleOptionsClose = this.handleOptionsClose.bind(this)
      this.handleBatchEditAccess = this.handleBatchEditAccess.bind(this)
      this.handleBatchEditData = this.handleBatchEditData.bind(this)
      this.handleBatchSwitchCompany = this.handleBatchSwitchCompany.bind(this)
      this.state = {
        anchorEleBatchEdit: null,
        anchorEleOptions: null,
      }
    }

    public handleEditOpen(event: any) {
      this.setState({ anchorEleBatchEdit: event.currentTarget })
    }

    public handleOptionsOpen(event: any) {
      this.setState({ anchorEleOptions: event.currentTarget })
    }

    public handleEditClose() {
      this.setState({ anchorEleBatchEdit: null })
    }

    public handleOptionsClose() {
      this.setState({ anchorEleOptions: null })
    }

    public handleBatchEditAccess() {
      this.props.handleBatchEditAccess()
      this.handleEditClose()
    }

    public handleBatchEditData() {
      this.props.handleBatchEditData()
      this.handleEditClose()
    }

    public handleBatchSwitchCompany() {
      this.props.handleBatchSwitchCompany()
      this.handleEditClose()
    }

    public render() {
      const { numSelected, classes, isBatchEditMode } = this.props

      return (
        <div
          className={classNames(classes.root, {
            [classes.highlight]: numSelected > 0,
          })}
        >
          <div className={classes.topCtl}>
            <div className={classes.title}>
              {isBatchEditMode ?
                (<Typography color="inherit" variant="subtitle1"> 已选择 {numSelected} 人 </Typography>) :
                (<Typography variant="h6" id="tableTitle"> 员工列表 </Typography>)
              }
            </div>
            <div className={classes.actions}>
              {isBatchEditMode ? (
                <div>
                  {numSelected > 0 &&
                    <IconButton
                      aria-label="Edit"
                      aria-owns={this.state.anchorEleBatchEdit ? 'eleBatchEdit' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleEditOpen}
                    >
                      <EditIcon />
                    </IconButton>
                  }
                  <Tooltip title="退出批量编辑模式">
                    <IconButton
                      aria-label="Cancel"
                      onClick={() => { this.props.handleExitBatchMode() }}
                    >
                      <CancelIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              ) : (
                  <Tooltip title="功能列表">
                    <IconButton
                      aria-label="options"
                      aria-owns={this.state.anchorEleOptions ? 'eleOptions' : undefined}
                      aria-haspopup="true"
                      onClick={this.handleOptionsOpen}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                )}
            </div>
          </div>
          <Menu
            id="eleBatchEdit"
            anchorEl={this.state.anchorEleBatchEdit as any}
            open={Boolean(this.state.anchorEleBatchEdit)}
            onClose={this.handleEditClose}
          >
            <MenuItem onClick={this.handleBatchEditData}>批量编辑资料</MenuItem>
            <MenuItem onClick={this.handleBatchEditAccess}>批量设置权限</MenuItem>
            <MenuItem onClick={this.handleBatchSwitchCompany}>批量员工转组织</MenuItem>
          </Menu>
          <Menu
            id="eleOptions"
            anchorEl={this.state.anchorEleOptions as any}
            open={Boolean(this.state.anchorEleOptions)}
            onClose={this.handleOptionsClose}
          >
            <MenuItem onClick={() => { this.props.handleCreate(); this.handleOptionsClose() }}> 添加员工 </MenuItem>
            <MenuItem
              onClick={() => {
                this.props.handleEnableBatchMode()
                this.handleOptionsClose()
              }}
            >
              批量修改
            </MenuItem>
            <MenuItem>帮助</MenuItem>
          </Menu>

        </div>
      )
    }
  }
)

const mapStateToProps = () => ({
})

const mapDispatchToProps = ({
  historyPush,
})

export default connect(mapStateToProps, mapDispatchToProps)(EmployeeTableToolbar)
