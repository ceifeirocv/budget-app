import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// layouts
import Main, { mainLoader } from './layout/Main';

// Routes
import Error from './pages/Error';
import Dashboard, { dashboardAction, dashboardLoader } from './pages/Dashboard';
import { logoutAction } from './actions/logout';
import ExpensesPage, { expensesAction, expensesLoader } from './pages/ExpensesPage';
import BudgetPage, { budgetAction, budgetLoader } from './pages/BudgetPage';
import { deleteBudget } from './actions/delete';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
        loader: dashboardLoader,
        action: dashboardAction,
        errorElement: <Error />,
      },
      {
        path: 'expenses',
        element: <ExpensesPage />,
        loader: expensesLoader,
        action: expensesAction,
        errorElement: <Error />,
      },
      {
        path: 'budget/:id',
        element: <BudgetPage />,
        loader: budgetLoader,
        action: budgetAction,
        errorElement: <Error />,
        children: [
          {
            path: 'delete',
            action: deleteBudget,
          },
        ],
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
