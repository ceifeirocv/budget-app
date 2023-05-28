import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBudget, createExpense, fetchData } from '../helpers';
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';
import AddExpenseForm from '../components/AddExpenseForm';
import BudgetItem from '../components/BudgetItem';
import Table from '../components/Table';

export function dashboardLoader() {
  const userName = fetchData('userName');
  const budgets = fetchData('budgets');
  const expenses = fetchData('expenses');
  return { userName, budgets, expenses };
}

// eslint-disable-next-line consistent-return
export async function dashboardAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === 'newUser') {
    try {
      localStorage.setItem('userName', JSON.stringify(values.userName));
      return toast.success(`Welcome ${values.userName}`);
    } catch (error) {
      throw new Error('There was a problem creationg your acount');
    }
  }

  if (_action === 'createBudget') {
    try {
      // create Budget
      createBudget({
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
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });
      return toast.success(`Expense ${values.newExpense} Added`);
    } catch (error) {
      throw new Error('There was a problem adding your Expense');
    }
  }
}

function Dashboard() {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back,
            {' '}
            <span className="accent">{userName}</span>
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
                      <BudgetItem key={budget.id} budget={budget} />
                    ))
                  }
                </div>
                <div>
                  {
                    expenses && expenses.length > 0 && (
                      <div className="grid-md">
                        <h2>Recente Expenses</h2>
                        <Table expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)} />
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
