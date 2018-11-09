import * as React from 'react'
import { withStyles, WithStyles, createStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'

const styles = () => createStyles({
  root: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    zIndex: 10000,
  },
  progress: {
    position: 'absolute',
    top: `calc(50% - 25px)`,
    left: `calc(50% - 25px)`,
    zIndex: 10000,
  },
})

interface Props extends WithStyles<typeof styles> {
}

const Mask = withStyles(styles)(({ classes }: Props) => (
  <div className={classes.root}>
    <CircularProgress className={classes.progress} size={50} />
  </div>
))

export default Mask

// .loading-mask {
//   position: absolute;
//   top: calc(50% - 25px);
//   left: calc(50% - 25px);
//   z-index: 1000;
// }

// .loading-mask::before {
//   content: '';
//   position: absolute;
//   top: 0;
//   right: 0;
//   bottom: 0;
//   left: 0;
//   background-color: rgba(0, 0, 0, 0.25);
// }
