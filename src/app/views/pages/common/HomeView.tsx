import { getLoginInfo } from '@app/state/ducks/shared/selectors'
import { ILoginInfo } from '@app/types'
import { createStyles, Theme, WithStyles, withStyles, Paper } from '@material-ui/core'
import * as React from 'react'
import { RootState } from '@app/state/rootReducer'
import { connect } from 'react-redux'
import * as _ from 'lodash'

const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing.unit * 3,
    },
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundSize: 'cover',
    opacity: 0.85,
  },
})

interface Props extends WithStyles<typeof styles> {
  loginInfo: ILoginInfo
}

const HomeView = withStyles(styles)(
  class extends React.PureComponent<Props> {
    constructor(props: Props) {
      super(props)
      this.state = {
      }
    }

    render() {
      const { classes } = this.props
      return (
        <Paper className={classes.root}>
          This is BoBootsrap home page.
        </Paper>
      )
    }
  }
)

const mapStateToProps = (state: RootState) => ({
  loginInfo: getLoginInfo(state),
})

const mapDispatchToProps = ({
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeView)
