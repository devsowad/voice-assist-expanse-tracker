import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import React, { useContext } from 'react';
import Form from './Form/Form';
import useStyles from './styles';
import List from './List/List';
import { ExpanseTrackerContext } from '../../context/context';
import InfoCard from './InfoCard';

const Main = () => {
  const classes = useStyles();
  const { balance } = useContext(ExpanseTrackerContext);

  return (
    <Card>
      <CardHeader title='Expense Tracker' subheader='Powered by Speechly' />
      <CardContent>
        <Typography align='center' variant='h6'>
          Total Balance ${balance}
        </Typography>
        <InfoCard />
        <Divider className={classes.divider} />

        <Form />
      </CardContent>
      <CardContent className={classes.cartContent}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <List />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Main;
