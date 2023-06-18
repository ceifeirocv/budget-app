import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { mutate } from 'swr';

import {
  createBudget,
  createExpense,
  deleteExpenseById,
  fetchData,
  // getBudgets,
  // getExpenses,
  oauthSignIn,
} from '../helpers';
import Intro from '../components/Intro';
import Grid from '../components/DashbordGrid';

export async function dashboardLoader() {
  const user = fetchData('user');
  // const budgets = await getBudgets();
  // const expenses = await getExpenses();

  return {
    // budgets,
    // expenses,
    user,
  };
}

// eslint-disable-next-line consistent-return
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === 'newUser') {
    try {
      await oauthSignIn();
      return null;
    } catch (error) {
      throw new Error('There was a problem creating your acount');
    }
  }

  if (_action === 'createBudget') {
    try {
      // create Budget
      await toast.promise(
        createBudget({
          name: values.newBudget,
          amount: values.newBudgetAmount,
        }),
        {
          pending: 'Creating Budget',
          success: 'Budget Created',
          error: 'There was a problem creationg your Budget',
        },
      );

      mutate('/budget');
      return null;
    } catch (error) {
      throw new Error('There was a problem creationg your Budget');
    }
  }

  if (_action === 'createExpense') {
    try {
      // create an expense
      await toast.promise(
        createExpense({
          name: values.newExpense,
          amount: values.newExpenseAmount,
          budgetId: values.newExpenseBudget,
        }),
        {
          pending: 'Creating Expense',
          success: 'Expense Created',
          error: 'There was a problem creating your Expense',
        },
      );
      mutate('/expense');
      return null;
    } catch (error) {
      throw new Error('There was a problem adding your Expense');
    }
  }

  if (_action === 'deleteExpense') {
    try {
      // create an expense

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

function Dashboard() {
  const {
    // budgets, expenses,
    user,
  } = useLoaderData();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {user ? (
        <div className="dashboard">
          <h1>
            Welcome back,
            {' '}
            <span className="accent">{ user.name }</span>
          </h1>
          <Grid />
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}

export default Dashboard;
