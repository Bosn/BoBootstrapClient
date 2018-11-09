import { Typography } from '@material-ui/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { withStyles, Theme, createStyles, WithStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { LoadingComponentProps } from 'react-loadable'

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

interface Props extends WithStyles<typeof styles>, LoadingComponentProps {
}

const LoadingView = withStyles(styles)((props: Props) => {
  if (props.error) {
    return <Typography variant="body1" className={props.classes.text}>发生错误</Typography>
  } else if (props.timedOut) {
    return <Typography variant="body1" className={props.classes.text}>加载超时</Typography>
  } else if (props.pastDelay) {
    return (
      <>
        <LinearProgress />
        <Typography variant="body1" className={props.classes.text}>{`加载中...`}</Typography>
      </>
    )
  } else {
    return null
  }
})

export default LoadingView
