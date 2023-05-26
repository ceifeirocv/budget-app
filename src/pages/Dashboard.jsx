import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchData } from '../helpers';
import Intro from '../components/Intro';
import AddBudgetForm from '../components/AddBudgetForm';

export function dashboardLoader() {
  const userName = fetchData('userName');
  const budgets = fetchData('budgets');
  return { userName, budgets };
}

export async function dashboardAction({ request }) {
  const data = await request.formData();
  const formData = Object.fromEntries(data);
  try {
    localStorage.setItem('userName', JSON.stringify(formData.userName));
    return toast.success(`Welcome ${formData.userName}`);
  } catch (error) {
    throw new Error('There was a problem creationg your acount');
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
      ) : <Intro />}
    </>
  );
}

export default Dashboard;
