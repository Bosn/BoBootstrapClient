
import * as React from 'react'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core'
import List from '@material-ui/core/List'
import { ILoginInfo } from '@app/types'
import MainMenuItem from '@app/views/components/common/MainMenuItem'
import { EmployeeMenuData } from '@app/views/layout/MenuConfig'

const styles = (theme: Theme) => createStyles({
  root: {
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
})

interface Props extends WithStyles<typeof styles> {
  loginInfo: ILoginInfo
  onClick: (url: string, old: boolean) => void
}

const MainMenu = withStyles(styles)(
  class extends React.PureComponent<Props> {
    constructor(props: Props) {
      super(props)
    }

    render() {
      const { classes, loginInfo } = this.props
      const { accessList } = loginInfo
      if (loginInfo.id === 0) {
        return null
      }
      return (
        <div className={classes.root}>
          <List>
            {EmployeeMenuData.map(x => <MainMenuItem key={x.label} item={x} accessList={accessList} onClick={this.props.onClick} />)}
          </List>
        </div>
      )
    }
  }
)

export default MainMenu
