import { makeStyles } from '@mui/styles';
import { green, indigo, red } from '@mui/material/colors';

export default makeStyles({
  avatarIncome: {
    color: '#fff',
    backgroundColor: green[500],
  },
  avatarExpense: {
    color: '#fff',
    backgroundColor: red[500],
  },
  avatarHistory: {
    color: '#fff',
    backgroundColor: indigo[400],
  },
  list: {
    maxHeight: '150px',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 4,
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: `inset 0 0 6px rgba(0, 0, 0, 0.3)`,
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'darkgrey',
      outline: `1px solid slategrey`,
    },
  },
});
