import * as React from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

const styles = () => createStyles({
  root: {
    display: 'inline',
    color: grey[500],
  },
})

interface Props extends WithStyles<typeof styles> {
}

const Hint = withStyles(styles)(
  class extends React.Component<Props> {
    render() {
      const { classes, children } = this.props
      return (
        <div className={classes.root}> {children} </div>
      )
    }
  }
)

export default Hint
