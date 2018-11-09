import * as React from 'react'
import { RefObject, FormEvent } from 'react'
import { createStyles, WithStyles, withStyles, Theme } from '@material-ui/core'
import { drawerWidth, menuHeight } from '@app/state/const'

const styles = ({ spacing, breakpoints }: Theme) => createStyles({
  root: {
    '-webkit-overflow-scrolling': 'touch',
    overflowY: 'scroll',
    position: 'fixed',
    right: 0,
    bottom: 0,
    [breakpoints.up('md')]: {
      left: drawerWidth + spacing.unit * 3 * 2,
      top: menuHeight + spacing.unit * 3 * 2,
    },
    [breakpoints.down('sm')]: {
      left: 0,
      top: menuHeight,
    },
  },
  frame: {
    width: '100%',
    height: '100%',
    // [breakpoints.up('md')]: {
    //   width: `calc(100% - ${drawerWidth + spacing.unit * 3 * 2}px)`,
    //   height: `calc(100% - ${menuHeight + spacing.unit * 3 * 2}px)`,
    // },
    // [breakpoints.down('sm')]: {
    //   width: '100%',
    //   height: `calc(100% - ${menuHeight}px)`,
    // },
    // border: '0',
    // position: 'absolute',
  },
})

interface Props extends WithStyles<typeof styles> {
  src: string
  onLoad?: (e: FormEvent<HTMLIFrameElement>) => void
}

const Iframe = withStyles(styles)(
  class extends React.PureComponent<Props> {
    iframeRef: RefObject<HTMLIFrameElement>

    constructor(props: Props) {
      super(props)
      this.iframeRef = React.createRef()
    }

    render() {
      const { classes, ...props } = this.props
      return (
        <div className={classes.root}>
          <iframe
            ref={this.iframeRef}
            frameBorder={'0'}
            className={classes.frame}
            {...props}
          />
        </div>
      )
    }
  }
)

export default Iframe
