import { Employee } from '@app/state/ducks/smart/employee/types'
import { EMPLOYEE_NORMAL_ACCESS_TYPE_LIST, MAP_ROLE_TYPE_TO_ACCESS_TYPE_LIST, ROLE_TYPE_LIST } from '@app/state/sharedConsts/access'
import SelectedEntityList from '@app/views/components/common/SelectedEntityList'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Checkbox from '@material-ui/core/Checkbox'
import Chip from '@material-ui/core/Chip'
import Dialog from '@material-ui/core/Dialog'
import FormControl from '@material-ui/core/FormControl/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Slide from '@material-ui/core/Slide'
import { createStyles, Theme, withStyles, WithStyles, withTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import * as _ from 'lodash'
import * as React from 'react'
import { ReactText } from 'react'

const styles = ({ spacing }: Theme) => createStyles({
  appBar: {
    position: 'relative',
  },

  flex: {
    flex: 1,
  },
  formControl: {
    margin: spacing.unit,
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: spacing.unit / 4,
  },
  accessList: {
    height: '60%',
    overflowY: 'auto',
  },
  listItemContainer: {
  },
  listItemRoot: {
    padding: 0,
  },
})

function Transition(props: Props) {
  return <Slide direction="up" {...props} />
}

interface Props extends WithStyles<typeof styles> {
  open: boolean
  selected: Employee[]
  theme: Theme
  accesses?: number[]
  openHandler: () => void
  closeHandler: () => void
  saveHandler: (accesses: number[]) => void
}

interface States {
  roles: string[]
  accessesO: number[]
  accesses: number[]
}

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

const AccessEditDialog = withStyles(styles)(
  class extends React.Component<Props, States> {
    constructor(props: Props) {
      super(props)
      this.state = {
        roles: [],
        accesses: [],
        accessesO: props.accesses || [],
      }
      this.handleClickOpen = this.handleClickOpen.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.handleToggle = this.handleToggle.bind(this)
      this.handleSave = this.handleSave.bind(this)
    }

    public static getDerivedStateFromProps(nextProps: Props, prevState: States) {
      if (_.difference(nextProps.accesses, prevState.accessesO).length === 0) {
        return null
      } else {
        return {
          ...prevState,
          accesses: nextProps.accesses,
          accessesO: nextProps.accesses,
        }
      }
    }

    public handleClickOpen = () => {
      this.props.openHandler()
    }

    public handleClose = () => {
      this.props.closeHandler()
      // this.clearState()
    }

    public clearState() {
      this.setState({
        roles: [],
        accesses: [],
      })
    }

    public handleChange = (event: any) => {
      this.setState({ roles: event.target.value }, () => {
        this.renderAccessesByRoles()
      })
    }

    public renderAccessesByRoles() {
      const roles = this.state.roles
      const accesses: number[] = []
      for (const role of roles) {
        const roleAcceses = MAP_ROLE_TYPE_TO_ACCESS_TYPE_LIST[role]
        for (const roleAccess of roleAcceses) {
          if (accesses.indexOf(roleAccess) === -1) {
            accesses.push(roleAccess)
          }
        }
      }
      this.setState({ accesses })
    }

    public handleToggle = (value: number) => () => {
      const { accesses } = this.state
      if (accesses.indexOf(value) === -1) {
        this.setState({
          accesses: [...accesses, value],
        })
      } else {
        this.setState({
          accesses: accesses.filter(x => x !== value),
        })
      }
    }

    public handleSave() {
      this.props.saveHandler(this.state.accesses)
      this.props.closeHandler()
      // this.clearState()
    }

    public render() {
      const { classes, open, theme, selected } = this.props
      return (
        <div>
          <Dialog
            fullScreen={true}
            open={open}
            onClose={this.handleClose}
            TransitionComponent={Transition}
          >
            <AppBar className={classes.appBar} color="secondary">
              <Toolbar>
                <IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
                  <CloseIcon />
                </IconButton>
                <Typography variant="h6" color="inherit" className={classes.flex}>
                  {selected.length > 1 ? '批量设置权限' : '设置权限'}
                </Typography>
                <Button color="inherit" onClick={this.handleSave}>
                  保存
              </Button>
              </Toolbar>
            </AppBar>
            <SelectedEntityList selected={selected} />
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="select-multiple-chip">选择角色</InputLabel>
              <Select
                multiple={true}
                value={this.state.roles}
                onChange={this.handleChange}
                input={<Input id="select-multiple-chip" />}
                renderValue={(selectedVal: ReactText[]) => (
                  <div className={classes.chips}>
                    {
                      selectedVal.map(item =>
                        <Chip
                          key={item}
                          label={ROLE_TYPE_LIST.filter(x => x.value === item).map(x => x.label).join('')}
                          className={classes.chip}
                        />
                      )}
                  </div>
                )}
                MenuProps={MenuProps}
              >
                {ROLE_TYPE_LIST.map(item => (
                  <MenuItem
                    key={item.value}
                    value={item.value}
                    style={{
                      fontWeight:
                        _.findIndex(this.state.roles, item.value) === -1
                          ? theme && theme.typography.fontWeightRegular
                          : theme && theme.typography.fontWeightMedium,
                    }}
                  >
                    {ROLE_TYPE_LIST.filter(x => x.value === item.value).map(x => <span key={x.value}>{x.label}</span>)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <List className={classes.accessList}>{
              EMPLOYEE_NORMAL_ACCESS_TYPE_LIST.map(item =>
                <ListItem
                  key={item.value}
                  role={undefined}
                  button={true}
                  classes={{
                    container: classes.listItemContainer,
                    root: classes.listItemRoot,
                  }}
                  onClick={this.handleToggle(item.value)}
                >
                  <Checkbox
                    checked={this.state.accesses.indexOf(item.value) !== -1}
                    tabIndex={-1}
                    disableRipple={true}
                  />
                  <ListItemText secondary={item.label} />
                </ListItem>
              )
            }
            </List>
          </Dialog>
        </div>
      )
    }
  }
)

export default withTheme()(AccessEditDialog)
