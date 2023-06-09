import { Outlet, useLoaderData } from 'react-router-dom';

// assets
import wave from '../assets/wave.svg';

// components
import Nav from '../components/Nav';

// helpers
import { fetchData } from '../helpers';

// loader
export function mainLoader() {
  const token = fetchData('token');
  return {
    token,
  };
}

function Main() {
  const { token } = useLoaderData();
  return (
    <div className="layout">
      <Nav token={token} />
      <main>
        <Outlet />
      </main>
      <img src={wave} alt="" />
    </div>
  );
}

export default Main;
