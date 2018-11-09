import { Typography } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import * as React from 'react'

const styles = ({ spacing }: Theme) => createStyles({
  root: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: spacing.unit * 2,
  },
  text: {
    marginTop: spacing.unit,
  },
})

interface Props extends WithStyles<typeof styles> {
  title?: string
  content?: string
}

const Loading = withStyles(styles)(({ classes, title, content }: Props) => (
  <div className={classes.root}>
    <LinearProgress />
    <Typography variant="body1" className={classes.text}>{content || `加载${title || ''}中...`}</Typography>
  </div>
))

export default Loading
