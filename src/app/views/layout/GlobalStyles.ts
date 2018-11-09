import grey from '@material-ui/core/colors/grey'
import { StyleRules, Theme } from '@material-ui/core/styles'

const GlobalStyles = (theme: Theme) => ({
  '@global': {
    'body': {
      margin: 0,
      padding: 0,
      backgroundColor: grey[200],
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif;',
    },
    '.ml1': {
      marginLeft: theme.spacing.unit,
    },
    '.mr1': {
      marginRight: theme.spacing.unit,
    },
    'ol': {
      padding: `0 ${theme.spacing.unit * 2}px`,
    },
    'ul': {
      padding: `0 ${theme.spacing.unit * 2}px`,
    },
    'li': {
      padding: `${theme.spacing.unit}px 0`,
    },
  },
}) as StyleRules

export default GlobalStyles
