import { toast } from 'react-toastify';
import useSWR, { mutate } from 'swr';
import { deleteExpenseById, fetcher } from '../helpers';
import Table from '../components/Table';
import Spinner from '../components/Spinner';

// export async function expensesLoader() {
//   const expenses = await getExpenses();
//   return { expenses };
// }

// eslint-disable-next-line consistent-return
export async function expensesAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === 'deleteExpense') {
    try {
      await toast.promise(
        deleteExpenseById({
          id: values.expenseId,
        }),
        {
          pending: 'Deleting Expense',
          success: 'Expense Delete',
          error: 'There was a problem deleting your Expense',
        },
      );
      mutate('/expense');
      return null;
    } catch (error) {
      throw new Error('There was a problem deleting your Expense');
    }
  }
}

function ExpensesPage() {
  // const { expenses } = useLoaderData();
  const { data, error, isLoading } = useSWR('/expense', fetcher);
  if (error) throw error;

  if (isLoading) {
    return (
      <div className="grid-lg">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {
        data.expenses && data.expenses.length > 0 ? (
          <div className="grid-md">
            <h2>
              <small>
                (
                {data.expenses.length}
                {' '}
                total)
              </small>
            </h2>
            <Table expenses={data.expenses} />
          </div>
        ) : (
          <p>No expenses to show</p>
        )
      }
    </div>
  );
}

export default ExpensesPage;
