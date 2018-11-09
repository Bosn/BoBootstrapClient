import * as React from 'react'
import { createStyles, withStyles, WithStyles, Menu, MenuItem, Theme, Button, Avatar } from '@material-ui/core'
import { ILoginInfo } from '@app/types'
import URLUtils from '@app/utilities/url'

const styles = ({ spacing }: Theme) => createStyles({
  root: {
  },
  label: {
    marginLeft: spacing.unit * 3,
  },
  button: {
    color: '#ffffff',
  },
  myAvatar: {
    marginLeft: spacing.unit,
  },
})

interface Props extends WithStyles<typeof styles> {
  loginInfo: ILoginInfo
  logout: () => void
  onMenuItemClick: (url: string, old: boolean) => void
}

interface States {
  anchorEl: HTMLElement | undefined
}

const MyAccount = withStyles(styles)(
  class extends React.PureComponent<Props, States> {
    constructor(props: Props) {
      super(props)
      this.state = {
        anchorEl: undefined,
      }
    }
    handleClick = (event: any) => {
      this.setState({ anchorEl: event.currentTarget })
    };

    handleClose = () => {
      this.setState({ anchorEl: undefined })
    };
    render() {
      const anchorEl = this.state.anchorEl
      const { loginInfo, classes, onMenuItemClick } = this.props
      if (loginInfo.id === 0) {
        return null
      }
      return (
        <>
          <div
            aria-owns={anchorEl ? 'simple-menu' : undefined}
            aria-haspopup="true"
            onClick={this.handleClick}
            className={classes.label}
          >

            <Button className={classes.button}>
              Hi, {loginInfo.name}!
              <Avatar src={URLUtils.getAvatarUrl(loginInfo.avatarImg, loginInfo.sex)} className={classes.myAvatar} />
            </Button>
          </div>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={() => { this.handleClose(); onMenuItemClick('%2Fmembership%2Fmyspace', true) }}>修改密码</MenuItem>
            <MenuItem onClick={() => { this.handleClose(); this.props.logout() }}>退出登录</MenuItem>
            }
          </Menu >
        </>
      )

    }
  }
)

export default MyAccount
