import React, { createContext, useReducer } from 'react';
import contextReducer from './contextReducer';

const initialState = JSON.parse(localStorage.getItem('transactions')) || [];

export const ExpanseTrackerContext = createContext(initialState);

const Provider = ({ children }) => {
  const [transactions, dispatch] = useReducer(contextReducer, initialState);

  const deleteTransactions = id =>
    dispatch({ type: 'DELETE_TRANSACTION', payload: id });

  const addTransactions = transaction =>
    dispatch({ type: 'ADD_TRANSACTION', payload: transaction });

  const balance = transactions.reduce(
    (acc, transaction) =>
      transaction.type === 'Expense'
        ? (acc -= transaction.amount)
        : (acc += transaction.amount),
    0
  );

  return (
    <ExpanseTrackerContext.Provider
      value={{ deleteTransactions, addTransactions, transactions, balance }}
    >
      {children}
    </ExpanseTrackerContext.Provider>
  );
};

export default Provider;
