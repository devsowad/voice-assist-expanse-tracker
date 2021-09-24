import { useContext } from 'react';
import {
  expenseCategories,
  incomeCategories,
  resetCategories,
} from '../constants/categories';
import { ExpanseTrackerContext } from '../context/context';

const useTransactions = title => {
  resetCategories();

  const { transactions } = useContext(ExpanseTrackerContext);
  const transactionPerType = transactions.filter(({ type }) => type === title);
  const total = transactionPerType.reduce(
    (acc, currVal) => (acc += currVal.amount),
    0
  );
  const categories = title === 'Income' ? incomeCategories : expenseCategories;
  transactionPerType.forEach(t => {
    const category = categories.find(({ type }) => type === t.category);
    if (category) category.amount += t.amount;
  });

  const filteredCategories = categories.filter(c => c.amount > 0);

  const chartData = {
    datasets: [
      {
        data: filteredCategories.map(c => c.amount),
        backgroundColor: filteredCategories.map(c => c.color),
      },
    ],
    labels: filteredCategories.map(c => c.type),
  };

  return { total, chartData };
};

export default useTransactions;
