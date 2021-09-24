import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import React, { useContext, useEffect, useState } from 'react';
import { DatePicker } from '@mui/lab';
import { ExpanseTrackerContext } from '../../../context/context';
import { v4 as uuid } from 'uuid';
import {
  incomeCategories,
  expenseCategories,
} from '../../../constants/categories';
import moment from 'moment';
import { useSpeechContext } from '@speechly/react-client';
import Snackbar from '../../snackbar/Snackbar';

const initialState = {
  type: 'Income',
  category: '',
  amount: '',
  date: moment().format('D MMMM Y'),
};

const Form = () => {
  const [formData, setFormData] = useState(initialState);
  const { addTransactions } = useContext(ExpanseTrackerContext);
  const { segment } = useSpeechContext();
  const [open, setOpen] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTypeChange = e => {
    setFormData({ ...formData, type: e.target.value, category: '' });
  };

  const handleDateChange = date => {
    setFormData({ ...formData, date: moment(date).format('D MMMM Y') });
  };

  const handleSubmit = e => {
    e.preventDefault();
    createTransaction();
  };

  const createTransaction = () => {
    if (
      formData.amount &&
      formData.type &&
      formData.date &&
      formData.category
    ) {
      addTransactions({
        ...formData,
        amount: Number(formData.amount),
        id: uuid(),
      });
      setFormData(initialState);
      setOpen(true);
    }
  };

  const categories =
    formData.type === 'Income' ? incomeCategories : expenseCategories;

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === 'add_expense') {
        setFormData({ ...formData, type: 'Expense' });
      } else if (segment.intent.intent === 'add_income') {
        setFormData({ ...formData, type: 'Income' });
      } else if (
        segment.isFinal &&
        segment.intent.intent === 'create_transaction'
      ) {
        createTransaction();
      } else if (
        segment.isFinal &&
        segment.intent.intent === 'cancel_transaction'
      ) {
        setFormData(initialState);
      }
      segment.entities.forEach(e => {
        const { type, value } = e;
        console.log(type);
        if (type === 'date') {
          handleDateChange(e.value);
        } else if (type === 'category') {
          const category = `${value.charAt(0)}${value
            .slice(1)
            .toLocaleLowerCase()}`;
          if (incomeCategories.map(ic => ic.type).includes(category)) {
            setFormData({
              ...formData,
              type: 'Income',
              category,
            });
          } else if (expenseCategories.map(ec => ec.type).includes(category)) {
            setFormData({
              ...formData,
              type: 'Expense',
              category,
            });
          }
        } else if (type === 'amount') {
          setFormData({ ...formData, amount: value });
        }
      });
      if (segment.isFinal) {
        createTransaction();
      }
    }
  }, [segment]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Snackbar open={open} setOpen={setOpen} />
        <Grid item xs={12}>
          {segment && (
            <Typography
              color='secondary'
              align='center'
              variant='subtitle2'
              gutterBottom
            >
              {segment.words.map(w => w.value).join(' ')}
            </Typography>
          )}
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant='filled'>
            <InputLabel>Type</InputLabel>
            <Select value={formData.type} onChange={handleTypeChange}>
              <MenuItem value='Income'>Income</MenuItem>
              <MenuItem value='Expense'>Expense</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth variant='filled'>
            <InputLabel>Category</InputLabel>
            <Select
              name='category'
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map(({ type }) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name='amount'
            value={formData.amount}
            onChange={handleChange}
            type='number'
            label='Amount'
            variant='filled'
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label='Date'
              name='date'
              value={formData.date}
              onChange={handleDateChange}
              renderInput={props => <TextField {...props} variant='filled' />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' color='primary' fullWidth variant='outlined'>
            Create
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default Form;
