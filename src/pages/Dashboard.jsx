import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createBudget, fetchData } from '../helpers';
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';

export function dashboardLoader() {
  const userName = fetchData('userName');
  const budgets = fetchData('budgets');
  return { userName, budgets };
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
}

function Dashboard() {
  const { userName, budgets } = useLoaderData();

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
          <div className="grid-small">
            {/* {budgets ? () : ()} */}
            <div className="grid-lg">
              <div className="flex-lg">
                <AddBudgetForm />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}

export default Dashboard;
