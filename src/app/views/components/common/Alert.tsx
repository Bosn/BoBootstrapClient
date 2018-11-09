import * as React from 'react'
import classNames from 'classnames'
import CheckCircleIcon from '@material-ui/icons/CheckCircle'
import ErrorIcon from '@material-ui/icons/Error'
import InfoIcon from '@material-ui/icons/Info'
import green from '@material-ui/core/colors/green'
import amber from '@material-ui/core/colors/amber'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import WarningIcon from '@material-ui/icons/Warning'
import { Theme, createStyles, WithStyles, withStyles } from '@material-ui/core/styles'

const variantIcon = {
  success: CheckCircleIcon,
  warning: WarningIcon,
  error: ErrorIcon,
  info: InfoIcon,
}

const styles = ({ palette, spacing }: Theme) => createStyles({
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: palette.error.dark,
  },
  info: {
    backgroundColor: palette.primary.dark,
  },
  warning: {
    backgroundColor: amber[700],
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: spacing.unit,
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
})

interface Props extends WithStyles<typeof styles> {
  variant: 'success' | 'error' | 'info' | 'warning'
  className?: string
  message?: string
}

const Alert = withStyles(styles)((props: Props) => {
  const { classes, className, message, variant, ...other } = props
  const Icon = variantIcon[variant]

  return (
    <SnackbarContent
      className={classNames(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span className={classes.message}>
          <Icon className={classNames(classes.icon, classes.iconVariant)} />
          {message}
        </span>}
      {...other}
    />
  )
})

export default Alert
