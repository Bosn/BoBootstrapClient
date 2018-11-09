import * as React from 'react'
import { RootState } from '@app/state/rootReducer'
import { getLoginInfo } from '@app/state/ducks/shared/selectors'
import { connect } from 'react-redux'
import { ILoginInfo } from '@app/types'
import { Paper, Typography } from '@material-ui/core'
import ErrorIcon from '@material-ui/icons/Error'
import LogUtils, { WEB_LOG_TYPE } from '@app/utilities/log'
import { NODE_ENV_TYPE } from '@app/state/const'

interface Props {
  loginInfo: ILoginInfo
  router: any
}

interface States {
  hasError: boolean
  info: React.ErrorInfo | null
  error: Error | null
}

class ErrorBoundary extends React.Component<Props, States>  {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      info: null,
      error: null,
    }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    this.setState({ hasError: true, info, error })
  }

  render() {
    const { error, info } = this.state
    const { loginInfo, router, children } = this.props
    const errorStr = error && error.message ? encodeURIComponent(error.message) : ''
    const infoStr = info && info.componentStack ? encodeURIComponent(info.componentStack) : ''
    const loginInfoStr = encodeURIComponent(`id=${loginInfo.id}&name=${loginInfo.name}&entityType=${loginInfo.entityType}&companyId=${loginInfo.companyId}`)
    const logType = WEB_LOG_TYPE.ERROR
    const root = LogUtils.getURLRoot()
    const locationStr = encodeURIComponent(JSON.stringify(router.location))
    const logUrl = `${root}type=${logType}&error=${errorStr}&info=${infoStr}&loginInfo=${loginInfoStr}&location=${locationStr}`
    return this.state.hasError && process.env.NODE_ENV === NODE_ENV_TYPE.PROD ?
      (
        <p>
          <Paper style={{ margin: 16, padding: 8, maxWidth: 800 }}>
            <Typography variant="h5"> <ErrorIcon /> 发生错误</Typography>
            <Typography variant="body1"> 很抱歉，系统发生未知错误！本机器人已自动分析错误原因并上报日志，请联系系统运维人员寻求帮助。给您带来的不便深表歉意！</Typography>
          </Paper>
          <img src={logUrl} />
        </p>
      ) :
      children
  }
}

const mapStateToProps = (state: RootState) => ({
  loginInfo: getLoginInfo(state),
  router: (state as any).router,
})

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ErrorBoundary)
