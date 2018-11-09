import CircularProgress from '@material-ui/core/CircularProgress'
import Paper from '@material-ui/core/Paper'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import * as React from 'react'

const styles = ({ spacing }: Theme) => createStyles({
  root: {
    height: 80,
  },
  progress: {
    margin: spacing.unit * 2,
    float: 'left' as 'left',
  },
  typography: {
    float: 'left' as 'left',
    marginTop: 25,
  },
})

interface Props extends WithStyles<typeof styles> {
}

const LoadingCard = withStyles(styles)(({ classes }: Props) => {
  return (
    <Paper className={classes.root} elevation={4}>
      <CircularProgress className={classes.progress} />
      <Typography variant="subtitle1" component="h3" className={classes.typography}>加载中...</Typography>
    </Paper>
  )
})

export default LoadingCard
