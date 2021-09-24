import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { createTheme } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline, responsiveFontSizes } from '@mui/material';
import Provider from './context/context';
import { SpeechProvider } from '@speechly/react-client';

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: '#109648',
    },
  },
  typography: {
    fontFamily: ['Poppins'],
  },
});

ReactDOM.render(
  <ThemeProvider theme={responsiveFontSizes(theme)}>
    <CssBaseline />
    <SpeechProvider
      appId='a0d0cab8-930e-4863-ad55-637351fe2a84'
      language='en-US'
    >
      <Provider>
        <App />
      </Provider>
    </SpeechProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
