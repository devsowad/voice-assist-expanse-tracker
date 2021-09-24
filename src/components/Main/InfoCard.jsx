import { Typography } from '@mui/material';
import React from 'react';

const InfoCard = () => {
  const isTrue = Math.round(Math.random());

  return (
    <>
      <Typography
        align='center'
        variant='subtitle2'
        style={{ marginTop: '5px' }}
      >
        Try saying:
      </Typography>
      <Typography align='center' variant='subtitle2' color='primary'>
        Add {isTrue ? 'income ' : 'expense '}
        for {isTrue ? '$100 ' : '$50 '}
        in Category {isTrue ? 'business ' : 'house '}
        for {isTrue ? 'Monday ' : 'Thursday '}...
      </Typography>
    </>
  );
};

export default InfoCard;
