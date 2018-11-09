import * as React from 'react'
import { WithStyles, withStyles, createStyles, Paper, ListItem, List, InputLabel, FormControl, Input, InputAdornment, IconButton, Theme, Typography, Button, CircularProgress } from '@material-ui/core'
import { connect } from 'react-redux'
import { ILoginInfo } from '@app/types'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import PhoneIcon from '@material-ui/icons/PhoneIphone'
import CodeIcon from '@material-ui/icons/Code'
import { login, RSAAA, historyPush } from '@app/state/ducks/shared/actions'
import * as _ from 'lodash'
import { RootState } from '@app/state/rootReducer'
import { green } from '@material-ui/core/colors'
import Refresh from '@material-ui/icons/Refresh'
import config from '@app/../config'
import { AnyAction } from 'redux'
import { getLoginInfo } from '@app/state/ducks/shared/selectors'
import { menuHeight } from '@app/state/const'

const V = config.VERSION

const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    paddingTop: menuHeight + theme.spacing.unit * 3,
    overflow: 'hidden',
    backgroundSize: 'cover',
  },
  container: {
    width: 350,
    margin: 'auto',
    opacity: 0.85,
  },
  ctl: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  captcha: {
    width: 108,
    height: 36,
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonWrapper: {
    position: 'relative',
  },
})

interface Props extends WithStyles<typeof styles> {
  loginInfo: ILoginInfo
  isLogining: boolean
  login: (account: string, password: string, captcha: string) => RSAAA
  historyPush: (path: string) => AnyAction
}

interface States {
  account: string
  password: string
  captcha: string
  captchaSeed: Date
  showPassword: boolean
}

const LoginView = withStyles(styles)(
  class extends React.PureComponent<Props, States> {
    constructor(props: Props) {
      super(props)
      this.state = {
        account: '',
        password: '',
        captcha: '',
        captchaSeed: new Date(),
        showPassword: false,
      }
      this.handleChange = this.handleChange.bind(this)
      this.handleClickShowPassword = this.handleClickShowPassword.bind(this)
      this.refreshCaptchaHandler = this.refreshCaptchaHandler.bind(this)
      this.doLoginHandler = this.doLoginHandler.bind(this)
    }

    handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      this.setState({
        [e.target.name]: e.target.value,
      } as any)
    }

    handleMouseDownPassword(event: any) {
      event.preventDefault()
    }

    handleClickShowPassword = () => {
      this.setState({ showPassword: !this.state.showPassword })
    }

    componentDidUpdate() {
      if (this.props.loginInfo.id > 0) {
        this.props.historyPush(`/${V}/smart/`)
      }
    }

    refreshCaptchaHandler() {
      this.setState({
        captchaSeed: new Date(),
      })
    }

    onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.keyCode === 13) {
        this.doLoginHandler()
      }
    }

    doLoginHandler() {
      const { account, password, captcha } = this.state
      this.props.login(account, password, captcha)
    }

    render() {
      const { classes, isLogining } = this.props
      const { account, password, captcha, showPassword, captchaSeed } = this.state
      return (
        <div className={classes.root}>
          <Paper className={classes.container}>
            <form>
              <List>
                <ListItem>
                  <Typography variant="h6">登陆</Typography>
                </ListItem>
                <ListItem>
                  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="account">手机</InputLabel>
                    <Input
                      tabIndex={0}
                      name="account"
                      value={account}
                      autoFocus={true}
                      onChange={this.handleChange}
                      endAdornment={
                        <InputAdornment position="end" tabIndex={100}>
                          <IconButton>
                            <PhoneIcon />
                          </IconButton>
                        </InputAdornment>}
                    />
                  </FormControl>
                </ListItem>
                <ListItem>
                  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="password">密码</InputLabel>
                    <Input
                      tabIndex={1}
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onKeyDown={this.onKeyDownHandler}
                      autoComplete="current-password"
                      onChange={this.handleChange}
                      endAdornment={
                        <InputAdornment position="end" tabIndex={101}>
                          <IconButton
                            aria-label="Toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>}
                    />
                  </FormControl>
                </ListItem>
                <ListItem>
                  <FormControl fullWidth={true}>
                    <InputLabel htmlFor="captcha">验证码</InputLabel>
                    <Input
                      tabIndex={2}
                      name="captcha"
                      value={captcha}
                      autoComplete="new-password"
                      onKeyDown={this.onKeyDownHandler}
                      onChange={this.handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton>
                            <CodeIcon />
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </ListItem>
                <ListItem className={classes.ctl} onClick={this.refreshCaptchaHandler}>
                  <div>
                    <img src={`/captcha?t=${+captchaSeed}`} className={classes.captcha} />
                    <Refresh />
                  </div>
                  <div className={classes.buttonWrapper}>
                    <Button variant="contained" color="primary" tabIndex={3} onClick={this.doLoginHandler} disabled={isLogining}>登陆</Button>
                    {isLogining && <CircularProgress size={24} className={classes.buttonProgress} />}
                  </div>
                </ListItem>
              </List>
            </form>
          </Paper>
        </div>
      )
    }
  }
)

const mapStateToProps = (state: RootState) => ({
  isLogining: state.shared.isLogining,
  loginInfo: getLoginInfo(state),
})

const mapDispatchToProps = ({
  login,
  historyPush,
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginView)
