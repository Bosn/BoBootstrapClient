import * as React from 'react'
import { createStyles, WithStyles, withStyles, Theme, withTheme } from '@material-ui/core'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import Hidden from '@material-ui/core/Hidden'
import MenuIcon from '@material-ui/icons/Menu'
import EmployeeMenu from '@app/views/layout/EmployeeMenu'
import { ILoginInfo } from '@app/types'
import MyAccount from '@app/views/components/common/MyAccount'
import { Location } from 'history'
import { LOGIN_PATH, HOME_PATH } from '@app/routes/SmartRoutes'
import { ENTITY_TYPE, drawerWidth } from '@app/state/const'

const styles = (theme: Theme) => createStyles({
  root: {
    flexGrow: 1,
    height: '100%',
    zIndex: 1,
    overflowX: 'hidden',
    overflowY: 'auto',
    display: 'flex',
    width: '100%',
  },
  miniLogo: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
  },
  appBar: {
    position: 'absolute',
    zIndex: theme.zIndex.drawer + 1,
  },
  navIconHide: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    [theme.breakpoints.up('md')]: {
      position: 'relative',
    },
    minWidth: 0,
  },
  content: {
    flexGrow: 1,
    overflowX: 'hidden',
    backgroundColor: theme.palette.background.default,
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 3,
    },
  },
  contentForLogin: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
  },
  contentForCustomer: {
    flexGrow: 1,
  },
  toolbarContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  logoAndSwitcher: {
    display: 'flex',
    alignItems: 'center',
  },
})

interface Props extends WithStyles<typeof styles> {
  loginInfo: ILoginInfo
  location: Location
  theme: Theme
  logout: () => void
  onMenuItemClick: (url: string, old: boolean) => void
}

interface States {
  mobileOpen: boolean
}

const Layout = withStyles(styles)(
  class extends React.Component<Props, States> {
    constructor(props: Props) {
      super(props)
      this.state = {
        mobileOpen: false,
      }
    }

    handleDrawerToggle = () => {
      this.setState(state => ({ mobileOpen: !state.mobileOpen }))
    }

    render() {
      const { children, classes, theme, loginInfo, onMenuItemClick, location } = this.props
      if (!theme) {
        return null
      }
      let contentClass = location.pathname === LOGIN_PATH || location.pathname === HOME_PATH ? classes.contentForLogin : classes.content
      if (loginInfo.entityType !== ENTITY_TYPE.EMPLOYEE) {
        contentClass = classes.contentForCustomer
      }

      return (
        <div className={classes.root}>
          {loginInfo.entityType === ENTITY_TYPE.EMPLOYEE &&
            <AppBar className={classes.appBar} position="absolute">
              <Toolbar className={classes.toolbarContainer}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.navIconHide}
                >
                  <MenuIcon />
                </IconButton>
                <div className={classes.logoAndSwitcher}>
                  <Hidden smDown={true} >
                    <Typography variant="h5" color="inherit" noWrap={true}>BoBootstrap Lab</Typography>
                  </Hidden>
                </div>
                <Hidden smDown={true}>
                  <MyAccount loginInfo={loginInfo} onMenuItemClick={onMenuItemClick} logout={this.props.logout} />
                </Hidden>
              </Toolbar>
            </AppBar>
          }
          {loginInfo.id !== 0 && loginInfo.entityType === ENTITY_TYPE.EMPLOYEE ?
            <>
              <Hidden mdUp={true}>
                <Drawer
                  variant="temporary"
                  anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                  open={this.state.mobileOpen}
                  onClose={this.handleDrawerToggle}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                >
                  <Typography variant="h5" color="inherit" noWrap={true} className={classes.miniLogo}>BoBootstrap Lab</Typography>
                  <EmployeeMenu
                    loginInfo={loginInfo}
                    onClick={
                      (url, old) => {
                        this.props.onMenuItemClick(url, old); this.setState({ mobileOpen: false })
                      }}
                  />
                </Drawer>
              </Hidden>
              <Hidden smDown={true} implementation="css">
                <Drawer
                  variant="permanent"
                  open={true}
                  classes={{
                    paper: classes.drawerPaper,
                  }}
                >
                  <div className={classes.toolbar} />
                  <EmployeeMenu loginInfo={loginInfo} onClick={this.props.onMenuItemClick} />
                </Drawer>
              </Hidden>
            </>
            : null}
          <main className={contentClass}>
            {loginInfo.entityType === ENTITY_TYPE.EMPLOYEE &&
              <div className={classes.toolbar} />
            }
            {children}
          </main>
        </div>
      )
    }
  }
)

export default withTheme()(Layout)
