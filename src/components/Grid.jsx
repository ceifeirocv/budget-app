import useSWR from 'swr';

import { fetcher } from '../helpers';
import AddBudgetForm from './AddBudgetForm';
import AddExpenseForm from './AddExpenseForm';
import BudgetItem from './BudgetItem';
import DashboardExpenseTable from './DashboardExpenseTable';
import Spinner from './Spinner';

function Grid() {
  const { data, error, isLoading } = useSWR('/budget', fetcher);
  if (error) throw error;

  if (isLoading) {
    return (
      <div className="grid-sm">
        <Spinner />
      </div>
    );
  }

  if (!data) {
    return (
      <div>
        <div className="grid-sm">
          <p>Personal budgeting is the secret to financial freedom</p>
          <p>Create a budget to get started</p>
          <AddBudgetForm />
        </div>
      </div>
    );
  }

  return (
    <div className="grid-sm">
      <div className="grid-lg">
        <div className="flex-lg">
          <AddBudgetForm />
          {data.budgets.length > 0 && (<AddExpenseForm budgets={data.budgets} />) }
        </div>
        <h2>Existing Budgets</h2>
        <div className="budgets">
          {
            data.budgets.map((budget) => (
              // <div>{budget.id}</div>
              <BudgetItem key={budget.id} budget={budget} />
            ))
          }
        </div>
        <DashboardExpenseTable />
      </div>
    </div>
  );
}

export default Grid;
