import * as React from 'react'
import { WithStyles, withStyles, createStyles } from '@material-ui/core'
import Iframe from '@app/views/components/common/Iframe'
import { RootState } from '@app/state/rootReducer'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router'
import { getLoginInfo } from '@app/state/ducks/shared/selectors'
import { ILoginInfo } from '@app/types'
import { FormEvent } from 'react'
import { AnyAction } from 'redux'
import { historyPush } from '@app/state/ducks/shared/actions'
import { menuItemOnClick } from '@app/views/layout/MenuConfig'

const styles = () => createStyles({
  root: {
  },
})

interface Props extends WithStyles<typeof styles>, RouteComponentProps<{ url: string }> {
  loginInfo: ILoginInfo
  historyPush: (path: string) => AnyAction
}

const OldPageLoaderView = withStyles(styles)(
  class extends React.Component<Props> {

    url: string = ''

    onLoadHandler = (e: FormEvent<HTMLIFrameElement>) => {
      const target: any = e.target
      const location: Location = target.contentWindow.location
      const url = location.pathname + location.search
      this.url = url
      this.props.historyPush(menuItemOnClick(url, true, this.props.loginInfo))
    }

    shouldComponentUpdate(nextProps: Props) {
      const url = decodeURIComponent(nextProps.match.params.url)
      return this.props.loginInfo.companyId !== nextProps.loginInfo.companyId ||
        this.url !== url
    }

    render() {
      const { match, loginInfo } = this.props
      const key = `${loginInfo.companyId}|${match.params.url}`
      return (
        <Iframe
          key={key}
          src={decodeURIComponent(match.params.url)}
          onLoad={this.onLoadHandler}
        />
      )
    }
  }
)

const mapStateToProps = (state: RootState) => ({
  oldPageUrl: state.shared.oldPageUrl,
  loginInfo: getLoginInfo(state),
})

const mapDispatchToProps = ({
  historyPush,
})

export default connect(mapStateToProps, mapDispatchToProps)(OldPageLoaderView)
