import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createExpense, deleteItem, getAllMatchingItems } from '../helpers';
import BudgetItem from '../components/BudgetItem';
import AddExpenseForm from '../components/AddExpenseForm';
import Table from '../components/Table';

export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: 'budgets',
    key: 'id',
    value: params.id,
  })[0];

  if (!budget) {
    throw new Error('The budget you are trying to find does not exist');
  }

  const expenses = await getAllMatchingItems({
    category: 'expenses',
    key: 'budgetId',
    value: params.id,
  });

  return { budget, expenses };
}

// eslint-disable-next-line consistent-return
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

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

  if (_action === 'deleteExpense') {
    try {
      // create an expense
      deleteItem({
        key: 'expenses',
        id: values.expenseId,
      });
      return toast.success('Expense deleted Added');
    } catch (error) {
      throw new Error('There was a problem deleting your Expense');
    }
  }
}

function BudgetPage() {
  const { budget, expenses } = useLoaderData();

  return (
    <div className="grid-lg" style={{ '--accent': budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span>
        {' '}
        Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} />
        <AddExpenseForm budgets={[budget]} />
      </div>
      <div>
        {
          expenses && expenses.length > 0 && (
            <div className="grid-md">
              <h2>
                <spam className="accent">{budget.name}</spam>
                {' '}
                Expenses
              </h2>
              <Table
                expenses={
                  expenses
                    .sort((a, b) => b.createdAt - a.createdAt)
                }
                showBudget={false}
              />
            </div>
          )
        }
      </div>
    </div>
  );
}

export default BudgetPage;
