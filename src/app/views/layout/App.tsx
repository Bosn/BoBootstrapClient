import Routes from '@app/routes'
import { RootState } from '@app/state/rootReducer'
import { IMessage, ILoginInfo } from '@app/types'
import Message from '@app/views/components/common/Message'
import { withStyles } from '@material-ui/core/styles'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import * as React from 'react'
import { connect } from 'react-redux'
import GlobalStyles from './GlobalStyles'
import MuiTheme from './MuiTheme'
import ErrorBoundary from '@app/views/layout/ErrorBoundary'
import Layout from './Layout'
import { getLoginInfo } from '@app/state/ducks/shared/selectors'
import { historyPush, RSAAA, logout } from '@app/state/ducks/shared/actions'
import { Location } from 'history'
import { AnyAction } from 'redux'
import { menuItemOnClick } from './MenuConfig'
import Mask from '../components/common/Mask'

export interface AppProps {
  message: IMessage
  loginInfo: ILoginInfo
  location: Location
  isInProgress: boolean
  logout: () => RSAAA
  historyPush: (path: string) => AnyAction
  switchCurUserCompany: (companyId: number) => RSAAA
}

class App extends React.Component<AppProps> {
  render() {
    const { message, location, logout, loginInfo, isInProgress, historyPush} = this.props
    return (
      <MuiThemeProvider theme={MuiTheme}>
        {isInProgress && <Mask />}
        <Message messageInfo={message} />
        <ErrorBoundary>
          <Layout
            location={location}
            theme={MuiTheme}
            logout={logout}
            loginInfo={loginInfo}
            onMenuItemClick={(url: string, old: boolean) => {
              const item = menuItemOnClick(url, old, loginInfo)
              historyPush(item)
            }}
          >
            <Routes />
          </Layout>
        </ErrorBoundary>
      </MuiThemeProvider>
    )
  }
}

const mapStateToProps = (state: RootState) => ({
  message: state.shared.message,
  loginInfo: getLoginInfo(state),
  location: (state as any).router.location as Location,
  isInProgress: state.shared.isInProgress,
})

const mapDispatchToProps = {
  historyPush,
  logout,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(GlobalStyles)(App))
