import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
  // palette: {
  //   primary: blue,
  //   secondary: pink,
  // }
  palette: {
    primary: {
      light: '#8699dc',
      main: '#2a334f',
      dark: '#010c27',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff9f5b',
      main: '#dd6f2e',
      dark: '#a54100',
      contrastText: '#fff',
    },
  },
});

export default theme;
