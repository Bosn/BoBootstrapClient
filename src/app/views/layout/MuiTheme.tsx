import createMuiTheme from '@material-ui/core/styles/createMuiTheme'

const COLOR_PRIMARY_MAIN = '#E53935'

export const theme = {
  palette: {
    primary: {
      light: '#EF5350',
      main: COLOR_PRIMARY_MAIN,
      dark: '#C62828',
      contrastText: '#fff',
    },
  },
  overrides: {
    MuiTableCell: {
      root: {
        padding: `8px 16px`,
      },
    },
  },
}

const MuiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  overrides: {
    MuiTableCell: {
      root: {
        padding: '0 16px',
      },
    },
  },
  ...theme,
})

export default MuiTheme
