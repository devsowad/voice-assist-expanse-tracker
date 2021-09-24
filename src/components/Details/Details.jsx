import { Card, CardContent, CardHeader, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';
import React from 'react';
import useStyles from './styles';
import useTransactions from '../../hooks/useTransactions';
import { Box } from '@mui/system';

const Details = ({ title }) => {
  const { income, expense } = useStyles();
  const { total, chartData } = useTransactions(title);

  return (
    <Card className={title === 'Income' ? income : expense}>
      <Box display='flex' alignItems='center' justifyContent='space-between'>
        <CardHeader title={title} />
        <Typography variant='h6' style={{ marginRight: '0.9rem' }}>
          ${total}
        </Typography>
      </Box>
      <CardContent>
        <Typography variant='h5' />
        <Doughnut data={chartData} />
      </CardContent>
    </Card>
  );
};

export default Details;
