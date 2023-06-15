import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteExpenseById, getExpenses } from '../helpers';
import Table from '../components/Table';

export async function expensesLoader() {
  const expenses = await getExpenses();
  return { expenses };
}

// eslint-disable-next-line consistent-return
export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === 'deleteExpense') {
    try {
      // create an expense
      await deleteExpenseById({
        id: values.expenseId,
      });
      return toast.success('Expense deleted');
    } catch (error) {
      throw new Error('There was a problem deleting your Expense');
    }
  }
}

function ExpensesPage() {
  const { expenses } = useLoaderData();

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {
        expenses && expenses.length > 0 ? (
          <div className="grid-md">
            <h2>
              <small>
                (
                {expenses.length}
                {' '}
                total)
              </small>
            </h2>
            <Table expenses={expenses} />
          </div>
        ) : (
          <p>No expenses to show</p>
        )
      }
    </div>
  );
}

export default ExpensesPage;
