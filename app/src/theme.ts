import { createTheme } from '@mui/material/styles';
import {  red } from '@mui/material/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e'//'#2196f3',
    },
    secondary: {
      main: '#f50057'
    },
    error: {
      main: red.A400,
    },
  },
  components: {
    MuiMenu: {
      styleOverrides: {
        list: {
          backgroundColor: 'background.paper',
          //color: 'white'
       }
      }
    }
  }
});

export default theme;
