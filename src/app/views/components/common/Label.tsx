import * as React from 'react'
import { createStyles, WithStyles, withStyles } from '@material-ui/core'
import classnames from 'classnames'
import { red, green, grey, orange } from '@material-ui/core/colors'

const styles = () => createStyles({
  root: {
    display: 'inline-block',
    fontSize: 12,
    padding: '2px 8px',
    backgroundColor: grey[500],
    color: '#FFFFFF',
  },
  error: {
    backgroundColor: red[500],
    color: '#FFFFFF',
  },
  warning: {
    backgroundColor: orange[300],
    color: '#FFFFFF',
  },
  success: {
    backgroundColor: green[200],
    color: '#FFFFFF',
  },
})

interface Props extends WithStyles<typeof styles> {
  type?: LABEL_TYPE
  className?: string
  text: string
}

export enum LABEL_TYPE {
  DEFAULT,
  ERROR,
  WARNING,
  SUCCESS,
}

const Label = withStyles(styles)((props: Props) => {
  const { classes } = props
  const clsList = [classes.root]
  if (props.className) {
    clsList.push(props.className)
  }
  if (props.type === LABEL_TYPE.ERROR) {
    clsList.push(classes.error)
  } else if (props.type === LABEL_TYPE.WARNING) {
    clsList.push(classes.warning)
  } else if (props.type === LABEL_TYPE.SUCCESS) {
    clsList.push(classes.success)
  }
  return <div className={classnames(...clsList)}>{props.text}</div>
})

export default Label
