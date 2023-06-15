import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Link, useFetcher } from 'react-router-dom';
import { TrashIcon } from '@heroicons/react/24/solid';
import { formatCurrency } from '../helpers';

dayjs.extend(utc);
function ExpenseItem({ expense, showBudget = true }) {
  const fetcher = useFetcher();

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{dayjs.utc(expense.createdAt).local().format('DD-MM-YYYY HH:mm')}</td>
      {
        showBudget && (
          <td>
            <Link
              to={`/budget/${expense.budgetId}`}
              style={{
                '--accent': expense.Budget.color,
              }}
            >
              {expense.Budget.name}
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

export default ExpenseItem;
