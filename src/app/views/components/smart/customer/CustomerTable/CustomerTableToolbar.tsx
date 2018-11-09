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
  options: {
  },
  title: {
    margin: spacing.unit * 2,
  },
})

interface Props extends WithStyles<typeof styles> {
  numSelected: number
  isBatchEditMode: boolean
  historyPush: (path: string) => any
  showGuide: () => void
  handleExitBatchMode: () => any
  handleEnableBatchMode: () => void
  handleCreate: () => void
  getClasses?: (classes: any) => void
}

interface States {
  anchorEleBatchEdit: any
  anchorEleOptions: any
}

const CustomerTableToolbar = withStyles(styles)(
  class extends React.Component<Props, States> {
    constructor(props: Props) {
      super(props)
      this.state = {
        anchorEleBatchEdit: null,
        anchorEleOptions: null,
      }
    }

    handleEditOpen = (event: any) => {
      this.setState({ anchorEleBatchEdit: event.currentTarget })
    }

    handleOptionsOpen = (event: any) => {
      this.setState({ anchorEleOptions: event.currentTarget })
    }

    handleEditClose = () => {
      this.setState({ anchorEleBatchEdit: null })
    }

    handleOptionsClose = () => {
      this.setState({ anchorEleOptions: null })
    }

    componentDidMount() {
      this.props.getClasses && this.props.getClasses(this.props.classes)
    }

    render() {
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
                (<Typography variant="h6" id="tableTitle"> 用户列表 </Typography>)
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
                      className={classes.options}
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
            <MenuItem>暂无</MenuItem>
          </Menu>
          <Menu
            id="eleOptions"
            anchorEl={this.state.anchorEleOptions as any}
            open={Boolean(this.state.anchorEleOptions)}
            onClose={this.handleOptionsClose}
          >
            <MenuItem onClick={() => { this.props.handleCreate(); this.handleOptionsClose() }}> 添加用户 </MenuItem>
            <MenuItem onClick={() => { this.props.showGuide(); this.handleOptionsClose() }}> 帮助 </MenuItem>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerTableToolbar)
