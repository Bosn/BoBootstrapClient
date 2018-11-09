import { Customer, IDENTITY_TYPE_LIST, IDENTITY_TYPE } from '@app/state/ducks/smart/customer/types'
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
import { CUSTOMER_INIT } from '@app/state/ducks/smart/customer/reducers'
import { SelectedItem } from '../common/EntityACList'
import DatePicker from '../../common/DatePicker'
import FormatUtils from '@app/utilities/format'
import { Moment } from 'moment'

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
  title: {
    position: 'absolute',
    left: 0,
    top: -spacing.unit * 2,
    color: 'rgba(0, 0, 0, 0.54)',
    padding: 0,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: '12px',
    lineHeight: 1,
  },
  fieldBtn: {
    marginLeft: spacing.unit,
  },
  moreSpace: {
    marginTop: spacing.unit * 2,
  },
})

function Transition(props: Props) {
  return <Slide direction="up" {...props} />
}

interface Props extends WithStyles<typeof styles> {
  customer?: Customer,
  open: boolean
  avatarPhoto: {
    isFetching: boolean
    path: string,
  }
  closeHandler: () => void
  saveHandler: (customer: Customer) => void
  uploadPhoto?: (file: any) => any
  clearPhoto: () => ClearPhotoAction
}

interface States {
  customer: Customer
  showError: boolean
  bindOpen: boolean
}

const EditCustomer = withStyles(styles)(
  class extends React.Component<Props, States> {
    constructor(props: Props) {
      super(props)
      this.state = {
        customer: CUSTOMER_INIT,
        showError: false,
        bindOpen: false,
      }
    }

    static getDerivedStateFromProps(nextProps: Props, prevState: States) {
      if (!nextProps.customer || nextProps.customer.id === prevState.customer.id) {
        return null
      } else {
        return {
          ...prevState,
          customer: nextProps.customer,
        }
      }
    }

    handleChange = (event: any) => {
      this.setProperty(event.target.name, event.target.value)
    }

    createHandleChange = (name: string) => (event: any) => {
      this.setProperty(name, event.target.value)
    }

    setProperty = (name: string, val: any) => {
      this.setState({
        customer: {
          ...this.state.customer,
          [name]: val,
        },
      } as any)
    }

    handleClose = () => {
      this.props.closeHandler()
      this.clearState()
    }

    clearState = () => {
      this.setState({
        customer: CUSTOMER_INIT,
        showError: false,
      })
    }

    handleSave = () => {
      const { name, mobile } = this.state.customer
      if (vText(name) && vText(mobile)) {
        this.props.saveHandler(this.state.customer)
      } else {
        this.setState({
          showError: true,
        })
      }
    }

    advisorChangeHandler = (selected: SelectedItem[]) => {
      if (selected.length > 0) {
        this.setProperty('advisorId', selected[0].id)
      }
    }

    componentDidUpdate() {
      const path = URLUtils.getLastFileName(this.props.avatarPhoto.path)
      if (path && this.state.customer.avatarImg !== path) {
        this.setState({
          customer: {
            ...this.state.customer,
            avatarImg: path,
          },
        })
      }
    }

    componentDidMount() {
      this.props.clearPhoto()
    }

    handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault()
      if (!e.target.files) { return }
      const file = e.target.files[0]
      if (this.props.uploadPhoto) {
        this.props.uploadPhoto(file)
      }
    }

    setPropertyTrainers = (selected: SelectedItem[]) => {
      this.setProperty('trainers', selected)
    }

    handleBirthdayChange = (moment: Moment) => {
      this.setProperty('birthday', FormatUtils.date(moment.toISOString(), 'yyyyMMdd'))
    }

    setCompanyIdCreator = (companyId: number) => {
      return (e: any) => {
        if (e.target.checked) {
          this.setProperty('companyId', companyId)
        }
      }
    }

    render() {
      const { classes, open, avatarPhoto } = this.props
      const { customer, showError } = this.state
      let avatarImg = customer.avatarImg
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
                  编辑
              </Typography>
                <Button color="inherit" onClick={this.handleSave}>
                  保存
              </Button>
              </Toolbar>
            </AppBar>
            <List>
              {customer.id > 0 ?
                <ListItem>
                  <Avatar src={URLUtils.getAvatarUrl(avatarImg, customer.sex, 120)} />
                  <PhotoUploader hidePhoto={true} label={'上传头像'} />
                </ListItem> : null
              }
              <ListItem>
                <TextField
                  error={showError && !vText(customer.name)}
                  required={true}
                  label="姓名"
                  name="name"
                  value={customer.name || ''}
                  onChange={this.handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  error={showError && !vText(customer.mobile)}
                  required={true}
                  label="手机"
                  name="mobile"
                  value={customer.mobile && customer.mobile.trim() || ''}
                  onChange={this.handleChange}
                  InputProps={{
                    inputComponent: MobileMask,
                  }}
                />
              </ListItem>
              <ListItem>
                <FormControl>
                  <InputLabel htmlFor="sex">性别</InputLabel>
                  <Select
                    value={String(customer.sex) || ''}
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
                <DatePicker
                  label="生日"
                  name="birthday"
                  value={customer.birthday ? FormatUtils.fromBirthday(customer.birthday) : null}
                  onChange={this.handleBirthdayChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="Email"
                  name="email"
                  value={customer.email || ''}
                  onChange={this.handleChange}
                />
              </ListItem>
              <ListItem>
                <FormControl>
                  <InputLabel htmlFor="identityType">证件类型</InputLabel>
                  <Select
                    value={customer.identityType || IDENTITY_TYPE.ID}
                    name="identityType"
                    onChange={this.handleChange}
                  >
                    {IDENTITY_TYPE_LIST.map(x => <MenuItem key={x.value} value={x.value}>{x.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </ListItem>
              <ListItem>
                <TextField
                  label="证件号码"
                  name="identityNo"
                  value={customer.identityNo || ''}
                  onChange={this.handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="紧急联络人姓名"
                  name="emergencyContactName"
                  value={customer.emergencyContactName || ''}
                  onChange={this.handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="紧急联络人关系"
                  name="emergencyContactRelationship"
                  value={customer.emergencyContactRelationship || ''}
                  onChange={this.handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="紧急联络人电话"
                  name="emergencyContactPhone"
                  value={customer.emergencyContactPhone || ''}
                  onChange={this.handleChange}
                />
              </ListItem>
              <ListItem>
                <TextField
                  label="地址"
                  name="address"
                  value={customer.address || ''}
                  onChange={this.handleChange}
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(EditCustomer)
