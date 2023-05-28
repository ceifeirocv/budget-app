import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { formatCurrency } from '../helpers';

function ExpenseItem({ expense }) {
  dayjs.extend(utc);
  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{dayjs.utc(expense.createdAt).local().format('DD-MM-YYYY HH:mm')}</td>
    </>
  );
}

ExpenseItem.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    createdAt: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    budgetId: PropTypes.string.isRequired,
  }).isRequired,
};

export default ExpenseItem;
