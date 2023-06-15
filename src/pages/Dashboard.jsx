import { Link, useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';

import {
  createBudget, createExpense, deleteExpenseById, fetchData, getBudgets, getExpenses, oauthSignIn,
} from '../helpers';
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';

export async function dashboardLoader() {
  const user = fetchData('user');
  const budgets = await getBudgets();
  const expenses = await getExpenses();

  return {
    budgets,
    expenses,
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
      return toast.success('Expense deleted');
    } catch (error) {
      throw new Error('There was a problem deleting your Expense');
    }
  }
}

function Dashboard() {
  const {
    budgets, expenses, user,
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
          <div className="grid-sm">
            { budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {
                    budgets.map((budget) => (
                      // <div>{budget.id}</div>
                      <BudgetItem key={budget.id} budget={budget} expenses={expenses} />
                    ))
                  }
                </div>
                <div>
                  {
                    expenses && expenses.length > 0 && (
                      <div className="grid-md">
                        <h2>Recente Expenses</h2>
                        <Table
                          expenses={
                            expenses
                              .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                              .slice(0, 8)
                          }
                        />
                        {
                          expenses.length > 8 && (
                            <Link to="expenses" className="btn btn--dark">
                              View all expenses
                            </Link>
                          )
                        }
                      </div>
                    )
                  }
                </div>
              </div>
            ) : (
              <div>
                <div className="grid-sm">
                  <p>Personal budgeting is the secret to financial freedom</p>
                  <p>Create a budget to get started</p>
                  <AddBudgetForm />
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}

export default Dashboard;
