import { EMPLOYEE_INIT } from '@app/state/ducks/smart/employee/reducers'
import { Employee } from '@app/state/ducks/smart/employee/types'
import { MobileMask } from '@app/utilities/mask'
import { vText } from '@app/utilities/validator'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import FormControl from '@material-ui/core/FormControl'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Slide from '@material-ui/core/Slide'
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import * as React from 'react'
import { Avatar } from '@material-ui/core'
import URLUtils from '@app/utilities/url'
import PhotoUploader from '@app/views/components/common/PhotoUploader'
import { connect } from 'react-redux'
import { RootState } from '@app/state/rootReducer'
import { getUploadPhoto } from '@app/state/ducks/shared/selectors'
import { clearPhoto, ClearPhotoAction } from '@app/state/ducks/shared/actions'

const styles = ({ spacing }: Theme) => createStyles({
  root: {
  },
  appBar: {
    position: 'relative',
  },
  flex: {
    flex: 1,
  },
  margin: {
    margin: spacing.unit * 2,
  },
  container: {
    padding: spacing.unit * 2,
  },
  btnUpload: {
    marginLeft: spacing.unit,
  },
})

function Transition(props: Props) {
  return <Slide direction="up" {...props} />
}

interface Props extends WithStyles<typeof styles> {
  employee?: Employee,
  open: boolean
  avatarPhoto: {
    isFetching: boolean
    path: string,
  }
  openHandler: () => void
  closeHandler: () => void
  saveHandler: (employee: Employee) => void
  uploadPhoto?: (file: any) => any
  clearPhoto: () => ClearPhotoAction
}

interface States {
  employee: Employee
  showError: boolean
}

const EditEmployee = withStyles(styles)(
  class extends React.Component<Props, States> {
    constructor(props: Props) {
      super(props)
      this.state = {
        employee: EMPLOYEE_INIT,
        showError: false,
      }
      this.handleClickOpen = this.handleClickOpen.bind(this)
      this.handleClose = this.handleClose.bind(this)
      this.handleSave = this.handleSave.bind(this)
      this.handleChange = this.handleChange.bind(this)
      this.createHandleChange = this.createHandleChange.bind(this)
      this.handleImageChange = this.handleImageChange.bind(this)
    }

    public static getDerivedStateFromProps(nextProps: Props, prevState: States) {
      if (!nextProps.employee || nextProps.employee.id === prevState.employee.id) {
        return null
      } else {
        return {
          ...prevState,
          employee: nextProps.employee,
        }
      }
    }

    public handleClickOpen() {
      this.props.openHandler()
    }

    public handleChange = (event: any) => {
      this.setProperty(event.target.name, event.target.value)
    }

    public createHandleChange = (name: string) => (event: any) => {
      this.setProperty(name, event.target.value)
    }

    public setProperty(name: string, val: any) {
      switch (name) {
        case 'sex':
        val = val === 'true'
      }
      this.setState({
        employee: {
          ...this.state.employee,
          [name]: val,
        },
      } as any)
    }

    public handleClose = () => {
      this.props.closeHandler()
      this.clearState()
    }

    public clearState() {
      this.setState({
        employee: EMPLOYEE_INIT,
        showError: false,
      })
    }

    public handleSave() {
      const { name, nickname, mobile } = this.state.employee
      if (vText(name) && vText(nickname) && vText(mobile)) {
        this.props.saveHandler(this.state.employee)
        this.props.closeHandler()
        this.clearState()
      } else {
        this.setState({
          showError: true,
        })
      }
    }

    componentDidUpdate() {
      const path = URLUtils.getLastFileName(this.props.avatarPhoto.path)
      if (path && this.state.employee.avatarImg !== path) {
        this.setState({
          employee: {
            ...this.state.employee,
            avatarImg: path,
          },
        })
      }
    }

    componentDidMount() {
      this.props.clearPhoto()
    }

    handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
      e.preventDefault()
      if (!e.target.files) { return }
      const file = e.target.files[0]
      if (this.props.uploadPhoto) {
        this.props.uploadPhoto(file)
      }
    }

    public render() {
      const { classes, open, avatarPhoto } = this.props
      const { employee, showError } = this.state

      let avatarImg = employee.avatarImg
      if (avatarPhoto.path) {
        avatarImg = URLUtils.getLastFileName(avatarPhoto.path)
      }
      return (
        <div className={classes.root}>
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
                  编辑员工资料
              </Typography>
                <Button color="inherit" onClick={this.handleSave}>
                  保存
              </Button>
              </Toolbar>
            </AppBar>
            <List>
              {employee.id > 0 ?
                <ListItem>
                  <Avatar src={URLUtils.getAvatarUrl(avatarImg, employee.sex, 120)} />
                  <PhotoUploader hidePhoto={true} label={'上传头像'} />
                </ListItem> : null
              }
              <ListItem>
                <TextField
                  error={showError && !vText(employee.name)}
                  required={true}
                  label="姓名"
                  name="name"
                  fullWidth={true}
                  value={employee.name || ''}
                  onChange={this.handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  error={showError && !vText(employee.nickname)}
                  required={true}
                  label="昵称"
                  name="nickname"
                  fullWidth={true}
                  value={employee.nickname || ''}
                  onChange={this.handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  error={showError && !vText(employee.mobile)}
                  required={true}
                  label="手机"
                  name="mobile"
                  fullWidth={true}
                  value={employee.mobile && employee.mobile.trim() || ''}
                  onChange={this.handleChange}
                  InputProps={{
                    inputComponent: MobileMask,
                  }}
                />
              </ListItem>
              <ListItem>
                <FormControl fullWidth={true}>
                  <InputLabel htmlFor="sex">性别</InputLabel>
                  <Select
                    value={String(employee.sex) || ''}
                    name="sex"
                    onChange={this.handleChange}
                    inputProps={{ id: 'sex' }}
                  >
                    <MenuItem value={'true'}>男</MenuItem>
                    <MenuItem value={'false'}>女</MenuItem>
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <TextField
                  label="E-mail"
                  name="email"
                  fullWidth={true}
                  value={employee.email || ''}
                  onChange={this.handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="身份证"
                  name="identityNo"
                  fullWidth={true}
                  value={employee.identityNo || ''}
                  onChange={this.handleChange}
                />
              </ListItem>
              <ListItem>
                <FormControl fullWidth={true}>
                  <TextField
                    rowsMax="4"
                    value={employee.desc || ''}
                    multiline={true}
                    label="备注"
                    style={{ width: '95%' }}
                    name="desc"
                    onChange={this.handleChange}
                  />
                </FormControl>
              </ListItem>
            </List>
          </Dialog>
        </div >
      )
    }
  }
)

const mapStateToProps = (state: RootState) => ({
  avatarPhoto: getUploadPhoto(state),
})

const mapDispatchToProps = ({
  clearPhoto,
})

export default connect(mapStateToProps, mapDispatchToProps)(EditEmployee)
