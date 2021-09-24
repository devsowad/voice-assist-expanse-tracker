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
      appId={process.env.REACT_APP_SPEECHLY_APP_ID}
      language='en-US'
    >
      <Provider>
        <App />
      </Provider>
    </SpeechProvider>
  </ThemeProvider>,
  document.getElementById('root')
);
