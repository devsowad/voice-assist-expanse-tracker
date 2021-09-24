import React, { useContext } from 'react';
import {
  Avatar,
  IconButton,
  List as MUIList,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Slide,
} from '@mui/material';
import { MoneyOff, Delete, History } from '@mui/icons-material';
import useStyles from './styles';
import { ExpanseTrackerContext } from '../../../context/context';

const List = () => {
  const classes = useStyles();
  const { transactions, deleteTransactions } = useContext(
    ExpanseTrackerContext
  );

  return (
    <MUIList dense={false} className={classes.list}>
      {transactions.length ? (
        transactions.map(transaction => (
          <Slide
            direction='down'
            in
            mountOnEnter
            unmountOnExit
            key={transaction.id}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar
                  className={
                    transaction.type === 'Income'
                      ? classes.avatarIncome
                      : classes.avatarExpense
                  }
                >
                  <MoneyOff />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={transaction.category}
                secondary={`$${transaction.amount} - ${transaction.date}`}
              />
              <ListItemSecondaryAction>
                <IconButton
                  edge='end'
                  aria-label='delete'
                  onClick={e => deleteTransactions(transaction.id)}
                >
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Slide>
        ))
      ) : (
        <Slide direction='up' in>
          <ListItem>
            <ListItemAvatar>
              <Avatar className={classes.avatarHistory}>
                <History />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary='Add your income or expense'
              secondary='Here you will see all your history'
            />
          </ListItem>
        </Slide>
      )}
    </MUIList>
  );
};

export default List;
