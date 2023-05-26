import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import { fetchData } from '../helpers';
import Intro from '../components/Intro';

export function dashboardLoader() {
  const userName = fetchData('userName');
  return userName;
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
  const userName = useLoaderData();

  return (
    <>
      {userName ? (<p>{userName}</p>) : <Intro />}
    </>
  );
}

export default Dashboard;
