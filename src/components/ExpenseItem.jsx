import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Link, useFetcher } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/solid';
import { formatCurrency, getAllMatchingItems } from '../helpers';

dayjs.extend(utc);
function ExpenseItem({ expense, showBudget = true }) {
  const fetcher = useFetcher();

  const budget = getAllMatchingItems({
    category: 'budgets',
    key: 'id',
    value: expense.budgetId,
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{dayjs.utc(expense.createdAt).local().format('DD-MM-YYYY HH:mm')}</td>
      {
        showBudget && (
          <td>
            <Link
              to={`/budget/${budget.id}`}
              style={{
                '--accent': budget.color,
              }}
            >
              {budget.name}
            </Link>
          </td>
        )
      }
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
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
  showBudget: PropTypes.bool.isRequired,
};

export default ExpenseItem;
