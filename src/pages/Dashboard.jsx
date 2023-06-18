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
import Grid from '../components/Grid';

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
      await createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      mutate('/budget');
      return toast.success('Budget Created');
    } catch (error) {
      throw new Error('There was a problem creationg your Budget');
    }
  }

  if (_action === 'createExpense') {
    try {
      // create an expense
      await createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      mutate('/expense');
      return toast.success(`Expense ${values.newExpense} Added`);
    } catch (error) {
      throw new Error('There was a problem adding your Expense');
    }
  }

  if (_action === 'deleteExpense') {
    try {
      // create an expense
      deleteExpenseById({
        id: values.expenseId,
      });
      mutate('/expense');
      return toast.success('Expense deleted');
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
