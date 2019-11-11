import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFCA28',
      contrastText: '#FFF'
    },
    secondary: {
      main: '#FFA000'
    },
    error: {
      main: red.A400
    },
    background: {
      default: '#FFF'
    }
  }
})

export default theme
