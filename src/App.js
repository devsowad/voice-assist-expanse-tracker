import { Container, Grid } from '@mui/material';
import {
  ErrorPanel,
  PushToTalkButton,
  PushToTalkButtonContainer,
} from '@speechly/react-ui';
import React from 'react';
import Details from './components/Details/Details';
import Main from './components/Main/Main';

const App = () => {
  return (
    <Container>
      <Grid
        container
        spacing={3}
        alignItems='center'
        justifyContent='center'
        style={{ height: '100vh' }}
      >
        <Grid item xs={12} sm={4}>
          <Details title='Income' />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Main />
        </Grid>
        <Grid item xs={12} sm={4}>
          <Details title='Expense' />
        </Grid>
      </Grid>
      <PushToTalkButtonContainer>
        <PushToTalkButton />
        <ErrorPanel />
      </PushToTalkButtonContainer>
    </Container>
  );
};

export default App;
