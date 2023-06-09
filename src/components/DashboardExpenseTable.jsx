import { Link } from 'react-router-dom';
import useSWR from 'swr';
import Table from './Table';
import { fetcher } from '../helpers';
import Spinner from './Spinner';

function DashboardExpenseTable() {
  const { data, error, isLoading } = useSWR('/expense', fetcher);
  if (error) throw error;

  if (isLoading) return <Spinner />;

  return (
    <div>
      {
        data.expenses && data.expenses.length > 0 && (
          <div className="grid-md">
            <h2>Recente Expenses</h2>
            <Table
              expenses={
                data.expenses
                  .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
                  .slice(0, 8)
              }
            />
            {
              data.expenses.length > 8 && (
                <Link to="expenses" className="btn btn--dark">
                  View all expenses
                </Link>
              )
            }
          </div>
        )
      }
    </div>
  );
}

export default DashboardExpenseTable;
