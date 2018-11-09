import { Employee } from '@app/state/ducks/smart/employee/types'
import SelectedEntityList from '@app/views/components/common/SelectedEntityList'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Slide from '@material-ui/core/Slide'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import * as React from 'react'

const styles = ({ spacing }: Theme) => createStyles({
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  margin: {
    margin: spacing.unit * 2,
  },
})

function Transition(props: Props) {
  return <Slide direction="up" {...props} />
}

interface Props extends WithStyles<typeof styles> {
  open: boolean
  selected: Employee[]
  openHandler: () => void
  closeHandler: () => void
  saveHandler: (params: Partial<Employee>) => void
}

interface States {
  level: number
  password: string
  salary: string
  showPassword: boolean
}

const EmployeeEditDialog = withStyles(styles)(
  class extends React.Component<Props, States> {
    constructor(props: Props) {
      super(props)
      this.state = {
        level: -1,
        password: '',
        showPassword: false,
        salary: '',
      }
      this.handleClickOpen = this.handleClickOpen.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.handleSave = this.handleSave.bind(this)
      this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
      this.handleChange = this.handleChange.bind(this)
    }

    public handleClickOpen() {
      this.props.openHandler()
    }

    public handleChange = (name: 'level' | 'password' | 'salary') => (event: any) => {
      this.setState({
        [name]: event.target.value,
      } as any)
    }

    public handleClose = () => {
      this.props.closeHandler()
      this.clearState()
    }

    public handleMouseDownPassword(event: any) {
      event.preventDefault()
    }

    public handleClickShowPassword = () => {
      this.setState({ showPassword: !this.state.showPassword })
    }

    public clearState() {
      // [TODO]
    }

    public handleSave() {
      this.props.saveHandler({
        password: this.state.password,
      })
      this.props.closeHandler()
      this.clearState()
    }

    public render() {
      const { classes, open, selected } = this.props
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
                  批量修改档案
              </Typography>
                <Button color="inherit" onClick={this.handleSave}>
                  保存
              </Button>
              </Toolbar>
            </AppBar>
            <SelectedEntityList selected={selected} />
            <List>
              <ListItem>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input
                    id="password"
                    autoComplete="new-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                          onMouseDown={this.handleMouseDownPassword}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </ListItem>
            </List>
            <Typography variant="caption" className={classes.margin}>* 未选择或填写的选项，不会被修改。</Typography>
          </Dialog>
        </div>
      )
    }
  }
)

export default EmployeeEditDialog
